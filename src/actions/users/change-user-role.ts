"use server";

import { requireAdmin } from "@/src/lib/auth-guards";
import { prisma } from "@/src/lib/prisma";
import { revalidatePath } from "next/cache";

// TODO:
//* Actualmente el rol actual llega desde el cliente.
//* En una futura refactorización se debería consultar
//* el rol actual desde la base de datos y calcular
//* el siguiente estado en el servidor.

export const changeUserRole = async (
  userId: string,
  role: "admin" | "user",
) => {
  const admin = await requireAdmin();

  if (!admin.ok) return { status: admin.status };

  try {
    const newRole = role === "admin" ? "user" : "admin";
    await prisma.user.update({
      where: { id: userId },
      data: { role: newRole },
    });
    revalidatePath("/admin/users");
    return { status: "success" };
  } catch (error) {
    return {
      status: "Error",
      message: error instanceof Error ? error.message : "Error inesperado",
    };
  }
};
