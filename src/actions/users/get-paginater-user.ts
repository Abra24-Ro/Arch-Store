"use server";

import { auth } from "@/src/auth";
import { prisma } from "@/src/lib/prisma";

export const getPaginatedUsers = async () => {
  const session = await auth();

  if (!session?.user) return { status: "Unauthorized" };
  if (session.user.role !== "admin") return { status: "Forbidden" };

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
