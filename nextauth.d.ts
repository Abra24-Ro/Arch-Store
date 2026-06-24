import type { JWT as DefaultJWT } from "next-auth/jwt";

type UserRole = "admin" | "user";

type AuthUser = {
  id: string;
  name: string;
  email: string;
  emailVerified: Date | null;
  role: UserRole;
  lastName?: string | null;
  image?: string | null;
};

declare module "next-auth" {
  interface Session {
    user: AuthUser;
  }

  interface User extends AuthUser {}
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    data?: AuthUser;
  }
}