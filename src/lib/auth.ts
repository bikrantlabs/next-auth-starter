import { PrismaAdapter } from "@auth/prisma-adapter"
import { UserRole } from "@prisma/client"
import NextAuth, { DefaultSession } from "next-auth"

import authConfig from "./auth.config"
import { db } from "./db"
import { getAccountByUserId } from "./server/account"
import { getUserById } from "./server/get-user"
import { getTwoFactorConfirmationByUserId } from "./server/two-factor-confirmation"

declare module "next-auth" {
  /**
   * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** The user's postal address. */
      role: UserRole
      twoFactorEnabled: boolean
      isOAuth: boolean
      /**
       * By default, TypeScript merges new interface properties and overwrites existing ones.
       * In this case, the default session user properties will be overwritten,
       * with the new ones defined above. To keep the default session user properties,
       * you need to add them back into the newly declared interface.
       */
    } & DefaultSession["user"]
  }
}
// Object destructuring and immediately exporting
export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  callbacks: {
    /**
     * The return value of `signIn` callback determines whether the user is allowed to sign-in or not
     *
     * This callback fires whenever the `signIn` function is called.
     */
    async signIn({ user, account }) {
      // Allow OAuth without email verification
      if (account?.provider !== "credentials") return true
      if (user.id) {
        const existingUser = await getUserById(user.id)

        // Prevent sign-in without email verification
        if (!existingUser?.emailVerified) return false

        if (existingUser.twoFactorEnabled) {
          const confirmation = await getTwoFactorConfirmationByUserId(
            existingUser.id
          )
          if (!confirmation) return false
          // Delete two factor confirmation for next sign in
          await db.twoFactorConfirmation.delete({
            where: {
              id: confirmation.id,
            },
          })
        }
      }
      return true
    },
    /**
     * We can also extend `session` like we've extended jwt token.
     *
     * @example
     * ```
     * session.someField = "someValue"
     * ```
     *
     * Then wherever we use `const session = auth()`, we will get the extended session.
     */
    async session({ token, session }) {
      console.log(`🔥 auth.ts:76 ~ Data ~`, { token, session })
      if (session.user) {
        if (token.sub) session.user.id = token.sub
        if (token.role) session.user.role = token.role as UserRole
        session.user.twoFactorEnabled = token.twoFactorEnabled as boolean
        session.user.name = token.name
        session.user.email = token.email as string
        session.user.isOAuth = token.isOAuth as boolean
      }

      return session
    },
    /**
     * If we modify token here, it will be passed to `session` field in `session` callback
     * @example
     * ```ts
     * token.customField = "customField"
     * ```
     *
     * Then we can access `session.customField` in `session` callback
     */
    async jwt({ token }) {
      if (!token.sub) return token

      const existingUser = await getUserById(token.sub)
      if (!existingUser) return token

      const existingAccount = await getAccountByUserId(existingUser.id)

      token.isOAuth = !!existingAccount
      token.name = existingUser.name
      token.email = existingUser.email
      token.role = existingUser.role
      token.twoFactorEnabled = existingUser.twoFactorEnabled
      return token
    },
  },
  events: {
    async linkAccount({ user }) {
      if (user.id) {
        await db.user.update({
          where: {
            id: user.id,
          },
          data: {
            emailVerified: new Date(),
          },
        })
      }
    },
  },
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  adapter: PrismaAdapter(db),
  session: {
    /**
     * Prisma doesn't work on edge, and neither does the session strategy
     * hence we have to use jwt strategy
     */

    strategy: "jwt",
  },
  ...authConfig,
})
