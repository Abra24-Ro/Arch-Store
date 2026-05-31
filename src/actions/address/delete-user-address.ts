"use server";
import { prisma } from "@/src/lib/prisma";

export const deleteUserAddress = async (userId: string) => {
  try {
    await prisma.userAddress.delete({
      where: { userId },
    });
    return { success: true };
  } catch (error) {
    console.error("Error deleting user address:", error);
    return { success: false, message: "Failed to delete user address." };
  }
};
