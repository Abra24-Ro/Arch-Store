"use server";

import { auth } from "@/src/auth";
import { prisma } from "@/src/lib/prisma";

export const getOrderById = async (id: string) => {
  const session = await auth();

  if (!session?.user) return { status: "Unauthorized" };

  try {
    const order = await prisma.order.findUnique({
      where: {
        id,
        ...(session.user.role !== "admin" && { userId: session.user.id }),
      },
      include: {
        orderAddress: true,
        orderItems: {
          select: {
            price:    true,
            quantity: true,
            size:     true,
            product: {
              select: {
                title: true,
                slug:  true,
                productImages: {
                  select: { url: true },
                  take: 1,
                },
              },
            },
          },
        },
      },
    });

    if (!order) return { status: "NotFound", message: "Orden no encontrada" };

    return { status: "success", order };

  } catch (error) {
    return {
      status: "Error",
      message: error instanceof Error ? error.message : "Error inesperado",
    };
  }
};