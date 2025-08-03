import { withAuth } from "next-auth/middleware"
import { NextResponse } from 'next/server'

export default withAuth(
  function middleware(req) {
    // Get the pathname from the URL
    const { pathname } = req.nextUrl
    
    // Create the response and add proper caching headers to prevent stale auth state
    const response = NextResponse.next()
    
    // Ensure authentication state is never cached
    response.headers.set('Cache-Control', 'no-store, no-cache, max-age=0, must-revalidate')
    response.headers.set('Pragma', 'no-cache')
    response.headers.set('Expires', '0')
    
    // If in development mode, also set cookies to be secure
    if (process.env.NODE_ENV === 'production') {
      response.headers.set('Set-Cookie', 'SameSite=Strict; Secure')
    }
    
    return response
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        // Only allow authenticated users
        return !!token
      },
    },
    pages: {
      // Customize the sign in page URL
      signIn: "/login",
    },
  }
)

// Use a more specific matcher to avoid over-protecting routes
export const config = {
  matcher: [
    // Protected routes - match exact paths for better performance
    "/search",
    "/search/:path*", 
    "/saved",
    "/saved/:path*"
  ]
}