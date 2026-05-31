"use server";
import { prisma } from "@/src/lib/prisma";

export const getCountries = async () => {
  try {
    const countries = await prisma.country.findMany({
      orderBy: {
        name: "asc",
      },
    });
    return countries;
  } catch {
    console.error("Error fetching countries");
    return [];
  }
};
