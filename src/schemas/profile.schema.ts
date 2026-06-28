import { z } from "zod";

export const updateProfileSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "El nombre es obligatorio")
    .max(60, "El nombre no puede superar 60 caracteres"),
  lastName: z
    .string()
    .trim()
    .min(1, "El apellido es obligatorio")
    .max(80, "El apellido no puede superar 80 caracteres"),
});

export type UpdateProfileSchema = z.infer<typeof updateProfileSchema>;