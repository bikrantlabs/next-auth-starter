import { LoginSchema } from "@/actions/login/schema"
import bcrypt from "bcryptjs"
import type { NextAuthConfig } from "next-auth"
import Credentials from "next-auth/providers/credentials"

import { getUserByEmail } from "./server/get-user"

const authConfig = {
  providers: [
    Credentials({
      async authorize(credentials) {
        const validatedField = LoginSchema.safeParse(credentials)
        if (validatedField.success) {
          const { email, password } = validatedField.data
          const user = await getUserByEmail(email)
          if (!user || !user.password) return null

          const passwordMatch = await bcrypt.compare(password, user.password)
          if (passwordMatch) return user
        }
        return null
      },
    }),
  ],
} satisfies NextAuthConfig

export default authConfig
