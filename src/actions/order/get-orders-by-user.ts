"use server";

import { auth } from "@/src/auth";
import { prisma } from "@/src/lib/prisma";

export const getOrdersByUser = async () => {
  const session = await auth();

  if (!session?.user) return { status: "Unauthorized" };

  try {
    const orders = await prisma.order.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: "desc" }, // ← más recientes primero
      include: {
        orderAddress: {
          select: {
            firstName: true,
            lastName:  true,
          },
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