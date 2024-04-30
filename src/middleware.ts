import NextAuth from "next-auth"

import authConfig from "@/lib/auth.config"

import {
  apiAuthPrefix,
  authRotues,
  DEFAULT_LOGIN_REDIRECT,
  LOGIN_ROUTE,
  publicRoutes,
} from "./routes"

const { auth } = NextAuth(authConfig)

export default auth((req) => {
  const { nextUrl } = req
  console.log(`🔥 middleware.ts:17 ~ Route ~`, nextUrl.pathname)
  const isLoggedIn = !!req.auth

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix)
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname)
  const isAuthRoute = authRotues.includes(nextUrl.pathname)

  if (isApiAuthRoute) return

  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
    } else {
      return
    }
  }

  if (!isLoggedIn && !isPublicRoute) {
    let callbackUrl = nextUrl.pathname
    if (nextUrl.search) {
      callbackUrl += nextUrl.search
    }
    const encodedCallback = encodeURIComponent(callbackUrl)
    return Response.redirect(
      new URL(LOGIN_ROUTE + `?callbackUrl=${encodedCallback}`, nextUrl)
    )
  }
  return
})

// Don't invoke middleware for these paths

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
}
