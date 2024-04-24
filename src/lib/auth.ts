import { PrismaAdapter } from "@auth/prisma-adapter"
import { UserRole } from "@prisma/client"
import NextAuth from "next-auth"

import authConfig from "./auth.config"
import { db } from "./db"
import { getUserById } from "./server/get-user"

// Object destructuring and immediately exporting
export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  callbacks: {
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
      if (session.user) {
        if (token.sub) session.user.id = token.sub
        if (token.role) session.user.role = token.role as UserRole
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
      token.role = existingUser.role

      return token
    },
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
