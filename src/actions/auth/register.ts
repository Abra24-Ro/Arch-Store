"use server";

import { prisma } from "@/src/lib/prisma";
import bcrypt from "bcryptjs";

export const registerUser = async (
  name: string,
  lastName: string,
  password: string,
  email: string,
) => {
  try {
    const user = await prisma.user.create({
      data: {
        name,
        lastName,
        password: bcrypt.hashSync(password, 10),
        email: email.toLowerCase(),
      },
      select:{
        id: true,
        name: true,
        lastName: true,
        email: true,
      }
    });
    return { success: true, user };
  } catch (error) {
    console.error("Error registering user:", error);
    return { success: false, error: "Error registering user" };
  }
};
