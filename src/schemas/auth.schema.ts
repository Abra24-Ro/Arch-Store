import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().trim().min(1, "El nombre es obligatorio"),
  lastName: z.string().trim().min(1, "El apellido es obligatorio"),
  email: z.string().trim().toLowerCase().email("Ingresa un correo válido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
});

export type RegisterSchema = z.infer<typeof registerSchema>;
