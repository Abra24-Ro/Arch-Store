"use server";

import { prisma } from "@/src/lib/prisma";
import { Address } from "@/src/types";

export const getUserAddress = async (
  userId: string,
): Promise<Partial<Address> | null> => {
  try {
    const address = await prisma.userAddress.findUnique({
      where: { userId },
    });

    if (!address) return null;

    const { countryId, address2, id, userId: _userId, ...rest } = address;

    return {
      ...rest,
      country: countryId,
      address2: address2 ?? "",
    };
  } catch (error) {
    console.error("Error getting user address:", error);
    return null;
  }
};
