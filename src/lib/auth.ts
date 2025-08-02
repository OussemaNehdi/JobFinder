import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { db } from "~/server/db";
import { env } from "~/env";

export const authOptions = {
  secret: env.NEXTAUTH_SECRET,
  trustHost: true, // This is important for Vercel deployments
  session: { 
    strategy: "jwt" as const,
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        const user = await db.user.findUnique({ where: { email: credentials.email } });
        if (!user) return null;
        const valid = await bcrypt.compare(credentials.password, user.password);
        if (!valid) return null;
        return { id: user.id, email: user.email } as any;
      },
    }),
  ],
  pages: {
    signIn: "/login",
    error: "/login",
  },
  debug: env.NODE_ENV === "development",
  callbacks: {
    async jwt({ token, user }: { token: any; user?: any }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      if (token?.id) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
};
