import NextAuth from "next-auth"

import authConfig from "@/lib/auth.config"

const { auth } = NextAuth(authConfig)

export default auth((req) => {
  console.log(req.nextUrl.pathname)
})

// Don't invoke middleware for these paths

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
}
