"use server";

import { auth } from "@/src/auth";
import { prisma } from "@/src/lib/prisma";
import { updateProfileSchema } from "@/src/schemas";
import { revalidatePath } from "next/cache";

export const updateProfile = async (data: unknown) => {
  const session = await auth();

  if (!session?.user) {
    return {
      success: false,
      message: "Debes iniciar sesión para actualizar tu perfil.",
    };
  }

  const parsed = updateProfileSchema.safeParse(data);

  if (!parsed.success) {
    return {
      success: false,
      message: parsed.error.errors[0]?.message ?? "Datos inválidos.",
    };
  }

  try {
    const user = await prisma.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        name: parsed.data.name,
        lastName: parsed.data.lastName,
      },
      select: {
        id: true,
        name: true,
        lastName: true,
        email: true,
        role: true,
        image: true,
      },
    });

    revalidatePath("/profile");

    return {
      success: true,
      message: "Perfil actualizado.",
      user,
    };
  } catch {
    return {
      success: false,
      message: "No se pudo actualizar el perfil.",
    };
  }
};