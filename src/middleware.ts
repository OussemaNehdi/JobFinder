import { withAuth } from "next-auth/middleware"
import { NextResponse } from 'next/server'

/**
 * Simple middleware to check if the user is authenticated
 * This approach eliminates the double redirect issue
 */
export default withAuth(
  function middleware(req) {
    // Create the response with appropriate headers for authentication
    const response = NextResponse.next()
    
    // Critical: prevent caching of authenticated pages
    response.headers.set('Cache-Control', 'private, no-cache, no-store, max-age=0, must-revalidate')
    response.headers.set('Pragma', 'no-cache')
    response.headers.set('Expires', '-1')
    
    // Ensure cookies are transmitted correctly
    if (process.env.NODE_ENV === 'production') {
      // In production, make sure cookies are secure
      response.headers.set('Set-Cookie', 'SameSite=Lax; Secure; Path=/');
    }
    
    return response
  },
  {
    callbacks: {
      // The core fix - this function gets the token from the session
      authorized: ({ token }) => {
        // Return true if the user has a valid token
        return !!token
      },
    },
    // When not authorized, redirect to the login page
    pages: {
      signIn: "/login",
    },
  }
)

// For NextAuth middleware, simplify matchers to avoid issues
export const config = {
  matcher: [
    "/search", 
    "/saved"
  ]
}