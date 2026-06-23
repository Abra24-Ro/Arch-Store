"use server";
import { auth } from "@/src/auth";
import { prisma } from "@/src/lib/prisma";

export const deleteUserAddress = async () => {
  const session = await auth();
  const userId = session?.user?.id;

  // Delete only the address owned by the authenticated session user.
  if (!userId) {
    return { success: false, message: "Usuario no autenticado." };
  }

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





