import { Gender, Size } from "@/src/generated/prisma";
import { z } from "zod";

const VALID_SIZES = Object.values(Size); //* ["XS", "S", "M", "L", "XL", "XXL"]

export const productSchema = z.object({
  id: z.string().uuid().optional().nullable(),
  title: z.string().min(3).max(255),
  slug: z.string().min(3).max(255),
  description: z.string(),
  price: z.coerce
    .number()
    .min(0)
    .transform((val) => Number(val.toFixed(2))),
  inStock: z.coerce
    .number()
    .min(0)
    .transform((val) => Number(val.toFixed(0))),
  categoryId: z.string().uuid(),
  sizes: z
    .string()
    .transform((val) =>
      val
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
    ) //* ← filter(Boolean)
    .pipe(
      z
        .array(z.enum(VALID_SIZES as [Size, ...Size[]]))
        .min(1, "Selecciona al menos una talla"),
    ),
  tags: z.string(),
  gender: z.nativeEnum(Gender),
});

export type ProductSchema = z.infer<typeof productSchema>;
