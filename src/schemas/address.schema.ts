// src/schemas/address.schema.ts
import { z } from "zod";

export const addressSchema = z.object({
  firstName:   z.string().min(1),
  lastName:    z.string().min(1),
  address:     z.string().min(1),
  address2:    z.string().optional(),
  postalCode:  z.string().min(1),
  city:        z.string().min(1),
  country:     z.string().min(1),
  phone:       z.string().min(1),
});

export const addressFormSchema = addressSchema.extend({
  saveAddress: z.boolean(),
});

export type AddressFormInputs = z.infer<typeof addressFormSchema>;