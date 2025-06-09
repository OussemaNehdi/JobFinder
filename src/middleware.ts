import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ token, req }) {
      // Protect /search and /saved
      const protectedRoutes = ["/search", "/saved"];
      const isProtected = protectedRoutes.some((route) =>
        req.nextUrl.pathname.startsWith(route)
      );
      const isLoggedIn = !!token;
      if (isProtected && !isLoggedIn) {
        return false;
      }
      return true;
    },
  },
});

export const config = {
  matcher: ["/search/:path*", "/saved/:path*"],
};