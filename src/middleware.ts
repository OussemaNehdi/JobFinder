import { withAuth } from "next-auth/middleware"
import { NextResponse } from 'next/server'

export default withAuth(
  function middleware(req) {
    // Added to avoid any caching issues with authentication state
    const response = NextResponse.next()
    response.headers.set('Cache-Control', 'no-store, max-age=0')
    return response
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
    pages: {
      signIn: "/login",
    },
  }
)

// Make sure this matcher is very specific
export const config = {
  matcher: [
    "/search/:path*", 
    "/saved/:path*"
  ]
}