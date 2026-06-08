"use server";

import { prisma } from "@/src/lib/prisma";

export const getCategories = async () => {
  const categories = await prisma.category.findMany({
    orderBy: { name: "asc" },
  });

  if (!categories) {
    throw new Error("No categories found");
  }

  return categories;
};
