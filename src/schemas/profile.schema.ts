import { z } from "zod";

export const updateProfileSchema = z.object({
  name: z.string().trim().min(1, "El nombre es obligatorio"),
  lastName: z.string().trim().min(1, "El apellido es obligatorio"),
});

export type UpdateProfileSchema = z.infer<typeof updateProfileSchema>;