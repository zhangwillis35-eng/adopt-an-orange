import { auth } from "@/lib/auth"
import { NextResponse } from "next/server"

export default auth((req) => {
  const { pathname } = req.nextUrl
  const isLoggedIn = !!req.auth

  // /user/* 路由需要登录
  if (pathname.startsWith("/user")) {
    if (!isLoggedIn) {
      const loginUrl = new URL("/login", req.nextUrl.origin)
      loginUrl.searchParams.set("callbackUrl", pathname)
      return NextResponse.redirect(loginUrl)
    }
  }

  // /admin/* 路由需要登录且 role === ADMIN
  if (pathname.startsWith("/admin")) {
    if (!isLoggedIn) {
      const loginUrl = new URL("/login", req.nextUrl.origin)
      loginUrl.searchParams.set("callbackUrl", pathname)
      return NextResponse.redirect(loginUrl)
    }

    const role = req.auth?.user?.role
    if (role !== "ADMIN") {
      return NextResponse.redirect(new URL("/", req.nextUrl.origin))
    }
  }

  return NextResponse.next()
})

export const config = {
  matcher: ["/user/:path*", "/admin/:path*"],
}
