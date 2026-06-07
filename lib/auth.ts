import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Phone OTP",
      credentials: {
        phone: { label: "Phone", type: "tel" },
        otp: { label: "OTP", type: "text" },
        name: { label: "Name", type: "text" },
      },
      async authorize(credentials) {
        if (!credentials?.phone || !credentials?.otp) return null;

        const phone = credentials.phone;
        const otp = credentials.otp;
        const name = credentials.name || "Pilgrim";

        // Validate phone format
        if (!/^\d{10}$/.test(phone)) return null;

        // Demo OTP validation
        if (otp !== "123456") return null;

        // Demo users
        const demoUsers: Record<string, any> = {
          "9876543210": { id: "user-1", name: "Arjun Sharma", role: "PILGRIM", language: "hi" },
          "9876543211": { id: "user-2", name: "Volunteer Priya", role: "VOLUNTEER", language: "hi" },
          "9876543212": { id: "user-3", name: "Admin", role: "ADMIN", language: "en" },
        };

        const existingUser = demoUsers[phone];
        if (existingUser) {
          return { ...existingUser, phone, email: `${phone}@kumbh.demo` };
        }

        // New user auto-registration
        return {
          id: `user-${Date.now()}`,
          name,
          phone,
          email: `${phone}@kumbh.demo`,
          role: "PILGRIM",
          language: "hi",
        };
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as any).role || "PILGRIM";
        token.phone = (user as any).phone;
        token.language = (user as any).language || "hi";
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id;
        (session.user as any).role = token.role;
        (session.user as any).phone = token.phone;
        (session.user as any).language = token.language;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  secret: process.env.NEXTAUTH_SECRET,
};
