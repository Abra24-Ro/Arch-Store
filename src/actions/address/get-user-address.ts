"use server";

import { auth } from "@/src/auth";
import { prisma } from "@/src/lib/prisma";
import { Address } from "@/src/types";

export const getUserAddress = async (): Promise<Partial<Address> | null> => {
  const session = await auth();
  const userId = session?.user?.id;

  // Address lookup is scoped to the authenticated session user.
  if (!userId) return null;

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



