import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

import bcrypt from "bcryptjs";
import { z } from "zod";

import { prisma } from "./lib/prisma";
import { authConfig } from "./auth.config";

export const { auth, signIn, signOut, handlers } = NextAuth({
  ...authConfig,

  callbacks: {
    ...authConfig.callbacks,

    async jwt({ token, user }) {
      if (user) {
        token.data = user; // ← solo al hacer login
      }
      return token;
    },

    async session({ session, token }) {
      if (!token.data) return session;

      // ← leer rol fresco de DB en cada request
      const dbUser = await prisma.user.findUnique({
        where: { id: (token.data as any).id },
        select: { role: true },
      });

      session.user = {
        ...(token.data as any),
        role: dbUser?.role ?? "user", // ← rol siempre actualizado
      };

      return session;
    },
  },

  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({
            email: z.string().email(),
            password: z.string().min(6),
          })
          .safeParse(credentials);

        if (!parsedCredentials.success) return null;

        const { email, password } = parsedCredentials.data;

        const user = await prisma.user.findUnique({
          where: {
            email: email.toLowerCase(),
          },
        });

        if (!user) return null;

        const isMatching = await bcrypt.compare(password, user.password);

        if (!isMatching) return null;

        const { password: _, ...rest } = user;

        return rest;
      },
    }),
  ],
});
