import { withAuth } from "next-auth/middleware"

export default withAuth(
  function middleware(req) {
    // Middleware logic if needed
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