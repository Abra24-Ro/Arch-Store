"use server";

import { auth } from "@/src/auth";
import { prisma } from "@/src/lib/prisma";

export const getAllOrders = async () => {
  const session = await auth();

  if (!session?.user) return { status: "Unauthorized" };
  if (session.user.role !== "admin") return { status: "Forbidden" };

  try {
    const orders = await prisma.order.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        orderAddress: {
          select: { firstName: true, lastName: true },
        },
      },
    });

    return { status: "success", orders };
  } catch (error) {
    return {
      status: "Error",
      message: error instanceof Error ? error.message : "Error inesperado",
    };
  }
};
