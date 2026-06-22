"use server";

import { requireAdmin } from "@/src/lib/auth-guards";
import { prisma } from "@/src/lib/prisma";

export const getPaginatedUsers = async () => {
  const admin = await requireAdmin();

  if (!admin.ok) return { status: admin.status };

  try {
    const users = await prisma.user.findMany({
      orderBy: { name: "asc" },
    });

    return { status: "success", users };
  } catch (error) {
    return {
      status: "Error",
      message: error instanceof Error ? error.message : "Error inesperado",
    };
  }
};
