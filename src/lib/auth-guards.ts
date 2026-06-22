import { auth } from "@/src/auth";

export const requireAdmin = async () => {
  const session = await auth();

  if (!session?.user) {
    return {
      ok: false as const,
      status: "Unauthorized" as const,
      message: "Debes iniciar sesión.",
    };
  }

  if (session.user.role !== "admin") {
    return {
      ok: false as const,
      status: "Forbidden" as const,
      message: "No tienes permisos para realizar esta acción.",
    };
  }

  return {
    ok: true as const,
    session,
  };
};
