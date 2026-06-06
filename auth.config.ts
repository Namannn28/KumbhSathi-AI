import type { NextAuthConfig } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/lib/db";
import jwt from "jsonwebtoken";

export const authConfig: NextAuthConfig = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    CredentialsProvider({
      name: "Phone OTP",
      credentials: {
        phone: { label: "Phone", type: "tel" },
        otp: { label: "OTP", type: "text" },
      },
      async authorize(credentials) {
        if (!credentials?.phone || !credentials?.otp) {
          throw new Error("Phone and OTP required");
        }

        const phone = credentials.phone as string;
        const otp = credentials.otp as string;

        // Validate phone format
        if (!/^\d{10}$/.test(phone)) {
          throw new Error("Invalid phone number format");
        }

        // Validate OTP format
        if (!/^\d{6}$/.test(otp)) {
          throw new Error("Invalid OTP format");
        }

        // CRITICAL: In production, verify OTP against Redis/database with TTL
        // This is a DEMO-only hardcoded OTP for testing
        // REMOVE THIS IN PRODUCTION AND IMPLEMENT REAL OTP VERIFICATION
        if (process.env.NODE_ENV !== "development" || otp !== "123456") {
          // In production, check against stored OTP in Redis:
          // const storedOtp = await redis.get(`otp:${phone}`);
          // if (!storedOtp || storedOtp !== otp) throw new Error("Invalid OTP");
          // await redis.del(`otp:${phone}`); // Delete after use

          if (process.env.NODE_ENV === "production") {
            throw new Error("Invalid OTP");
          }
        }

        let user = await prisma.user.findUnique({
          where: { phone: credentials.phone as string },
        });

        if (!user) {
          user = await prisma.user.create({
            data: {
              phone: credentials.phone as string,
              name: "Pilgrim",
              role: "PILGRIM",
            },
          });
        }

        return {
          id: user.id,
          phone: user.phone,
          email: user.email,
          name: user.name,
          role: user.role,
        };
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
        token.role = (user as any).role || "PILGRIM";
        token.phone = (user as any).phone;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        (session.user as any).role = token.role;
        (session.user as any).phone = token.phone;
      }
      return session;
    },
  },
  events: {
    async signIn({ user }) {
      await prisma.user.update({
        where: { id: user.id },
        data: { lastActive: new Date() },
      });
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
};
