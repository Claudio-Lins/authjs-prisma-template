import NextAuth from "next-auth"
import createMiddleware from "next-intl/middleware"
import { NextResponse } from "next/server"
import authConfig from "./auth.config"
import { configRoutes } from "./config/routes"
import { createRouteMatchers } from "./lib/route"

const { auth } = NextAuth(authConfig)

const intlMiddleware = createMiddleware({
  // A list of all locales that are supported
  locales: ["en", "es", "pt"],

  // Used when no locale matches
  defaultLocale: "en",
})

export default auth(async (req) => {
  const response = await intlMiddleware(req)

  if (response) return response

  const { isPublicRoute, isProtectedRoute, isApiRoute, isAuthRoute } =
    createRouteMatchers(configRoutes, req)
  const { nextUrl } = req
  const isLoggedIn = !!req.auth

  console.log(`Public: ${isPublicRoute}`)
  console.log(`Protected: ${isProtectedRoute}`)
  console.log(`Api: ${isApiRoute}`)
  console.log(`Auth: ${isAuthRoute}`)

  if (isProtectedRoute && !isLoggedIn) {
    return NextResponse.redirect(new URL("/auth/login", req.url))
  }

  return NextResponse.next()
})

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
    "/",
    "/(es|en|pt)/:path*",
  ],
}
