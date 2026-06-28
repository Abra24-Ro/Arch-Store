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
      if (user?.id && user.name && user.email && user.role) {
        token.data = {
          id: user.id,
          name: user.name,
          email: user.email,
          emailVerified: user.emailVerified ?? null,
          role: user.role,
          lastName: user.lastName,
          image: user.image,
        };
      }

      return token;
    },

    async session({ session, token }) {
      if (!token.data) return session;

      const dbUser = await prisma.user.findUnique({
        where: { id: token.data.id },
        select: {
          name: true,
          lastName: true,
          email: true,
          role: true,
          image: true,
        },
      });

      if (!dbUser) return session;

      session.user = {
        ...token.data,
        name: dbUser.name,
        lastName: dbUser.lastName,
        email: dbUser.email,
        role: dbUser.role,
        image: dbUser.image,
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
