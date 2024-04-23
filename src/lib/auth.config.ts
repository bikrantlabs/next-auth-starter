import type { NextAuthConfig } from "next-auth"
import Github from "next-auth/providers/github"

const authConfig = {
  providers: [Github],
} satisfies NextAuthConfig

export default authConfig
