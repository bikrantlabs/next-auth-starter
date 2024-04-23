import NextAuth from "next-auth"
import Github from "next-auth/providers/github"

// Object destructuring and immediately exporting
export const {
  handlers: { GET, POST },
  auth,
} = NextAuth({ providers: [Github] })
