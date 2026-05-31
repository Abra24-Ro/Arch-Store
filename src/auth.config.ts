import type { NextAuthConfig } from "next-auth";

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: "/auth/login",
    newUser: "/auth/new-account",
  },

  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;

      const isCheckoutRoute =
        nextUrl.pathname.startsWith("/checkout");

      if (isCheckoutRoute && !isLoggedIn) {
        return false;
      }

      return true;
    },
  },

  providers: [],
};