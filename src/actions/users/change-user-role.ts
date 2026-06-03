"use server";

import { auth } from "@/src/auth";
import { prisma } from "@/src/lib/prisma";
import { revalidatePath } from "next/cache";

export const changeUserRole = async (
  userId: string,
  role: "admin" | "user",
) => {
  const session = await auth();

  if (!session?.user) return { status: "Unauthorized" };
  if (session.user.role !== "admin") return { status: "Forbidden" };
  try {
    const newRole = role === "admin" ? "user" : "admin";
    const user = await prisma.user.update({
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
