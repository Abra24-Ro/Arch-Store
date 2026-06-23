// src/schemas/address.schema.ts
import { z } from "zod";

export const addressSchema = z.object({
  firstName:  z.string().min(1, "El nombre es obligatorio"),
  lastName:   z.string().min(1, "El apellido es obligatorio"),
  address:    z.string().min(1, "La dirección es obligatoria"),
  address2:   z.string().optional(),
  postalCode: z.string().min(1, "El código postal es obligatorio"),
  city:       z.string().min(1, "La ciudad es obligatoria"),
  country:    z.string().min(1, "El país es obligatorio"),
  phone:      z.string().min(1, "El teléfono es obligatorio"),
});

export const addressFormSchema = addressSchema.extend({
  saveAddress: z.boolean(),
});

export type AddressFormInputs = z.infer<typeof addressFormSchema>;