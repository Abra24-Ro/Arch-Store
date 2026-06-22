"use server";

import { requireAdmin } from "@/src/lib/auth-guards";
import { prisma } from "@/src/lib/prisma";

export const getAllOrders = async () => {
  const admin = await requireAdmin();

  if (!admin.ok) return { status: admin.status };

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
