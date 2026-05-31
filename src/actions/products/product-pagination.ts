"use server";

import { Gender } from "@/src/generated/prisma/enums";
import { prisma } from "@/src/lib/prisma";

interface PaginationsOptions {
  page?: number;
  take?: number;
  gender?: Gender;
}

export const getPaginationProductWithImages = async ({
  page = 1,
  take = 12,
  gender,
}: PaginationsOptions) => {
  const safePage = Math.max(1, isNaN(page) ? 1 : page);
  const safeTake = Math.max(1, isNaN(take) ? 12 : take);

  try {
    const whereClause = gender ? { gender } : {};

    const [products, totalCount] = await Promise.all([
      prisma.product.findMany({
        take: safeTake,
        skip: (safePage - 1) * safeTake,
        include: {
          productImages: {
            take: 2,
            select: { url: true },
          },
        },
        where: whereClause,
      }),
      prisma.product.count({
        where: whereClause,
      }),
    ]);
    const totalPages = Math.ceil(totalCount / safeTake);

    return {
      currentPage: safePage,
      totalPages,
      totalCount,
      products: products.map((product) => ({
        ...product,
        images: product.productImages.map((image) => image.url),
      })),
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
};
