"use server";

import { auth } from "@/src/auth";
import { prisma } from "@/src/lib/prisma";
import { Address } from "@/src/types";


export const setUserAddress = async (address: Address) => {
  const session = await auth();
  const userId = session?.user?.id;

  // Ownership comes from the server session, never from client-provided ids.
  if (!userId) {
    return { success: false, message: "Usuario no autenticado." };
  }

  try {
    const newAddress = await createOrReplaceUserAddress(address, userId);

    return {
      success: true,
      address: newAddress,
    };
  } catch (error) {
    console.error("Error setting user address:", error);
    return { success: false, message: "Failed to set user address." };
  }
};


// Receives a trusted userId derived by the public action from auth().
const createOrReplaceUserAddress = async (address: Address, userId: string) => {
  try {
    
    const storedAddress = await prisma.userAddress.findUnique({
      where: { userId },
    });

    const addressToSave = {
      userId: userId,
      address: address.address,
      address2: address.address2,
      city: address.city,
      countryId: address.country,
      firstName: address.firstName,
      lastName: address.lastName,
      postalCode: address.postalCode,
      phone: address.phone,
    };

    if (!storedAddress) {
      const newAddress = await prisma.userAddress.create({
        data: addressToSave,
      });
      return newAddress;
    }

    const updateAddress = await prisma.userAddress.update({
      where: { userId },
      data: addressToSave,
    });
     return updateAddress;
  } catch (error) {
    console.error("Error creating/replacing user address:", error);
    throw new Error("Failed to create/replace user address.");
  }
};
