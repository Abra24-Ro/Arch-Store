"use server";

import { Prisma } from "@/src/generated/prisma";
import { prisma } from "@/src/lib/prisma";
import { registerSchema } from "@/src/schemas";
import bcrypt from "bcryptjs";

export const registerUser = async (
  name: string,
  lastName: string,
  password: string,
  email: string,
) => {
  const parsed = registerSchema.safeParse({
    name,
    lastName,
    password,
    email,
  });

  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.errors[0]?.message ?? "Datos de registro inválidos.",
    };
  }

  const data = parsed.data;

  try {
    const user = await prisma.user.create({
      data: {
        name: data.name,
        lastName: data.lastName,
        password: bcrypt.hashSync(data.password, 10),
        email: data.email,
      },
      select: {
        id: true,
        name: true,
        lastName: true,
        email: true,
      },
    });
    return { success: true, user };
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return {
        success: false,
        error: "Ya existe una cuenta con este correo.",
      };
    }
    return {
      success: false,
      error: "No se pudo crear la cuenta. Intenta nuevamente.",
    };
  }
};
