"use server";

import { prisma } from "@/src/lib/prisma";

export const getAllProducts = async () => {
  try {
    const products = await prisma.product.findMany({
      orderBy: { title: "asc" },
      include: {
        productImages: {
          take:   1,
          select: { url: true },
        },
      },
    });

    return {
      status: "success",
      products: products.map((p) => ({
        ...p,
        images: p.productImages.map((img) => img.url),
      })),
    };
  } catch (error) {
    return {
      status:   "Error",
      message:  error instanceof Error ? error.message : "Error inesperado",
      products: [],
    };
  }
};