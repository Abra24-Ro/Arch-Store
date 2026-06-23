"use server";

import { Product, Size } from "@/src/generated/prisma";
import { requireAdmin } from "@/src/lib/auth-guards";
import { prisma } from "@/src/lib/prisma";
import { productSchema } from "@/src/schemas";
import { revalidatePath } from "next/cache";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const createOrUpdateProduct = async (data: FormData) => {
  const admin = await requireAdmin();

  if (!admin.ok) {
    return {
      ok: false,
      message: admin.message,
    };
  }

  const parsed = productSchema.safeParse(Object.fromEntries(data.entries()));

  if (!parsed.success) {
    return {
      ok: false,
      message: parsed.error.errors[0].message,
    };
  }

  const product = parsed.data;
  product.slug = product.slug.toLowerCase().replace(/\s+/g, "-").trim();

  const { id, ...rest } = product;
  const tagsArray = rest.tags.split(",").map((tag) => tag.trim());

  try {
    const prismaTx = await prisma.$transaction(async (tx) => {
      let productTx: Product;

      if (id) {
        // ← actualizar producto existente
        productTx = await tx.product.update({
          where: { id },
          data: {
            ...rest,
            sizes: { set: rest.sizes as Size[] },
            tags: { set: tagsArray },
          },
        });
      } else {
        // ← crear producto nuevo
        productTx = await tx.product.create({
          data: {
            ...rest,
            sizes: { set: rest.sizes as Size[] },
            tags: { set: tagsArray },
          },
        });
      }

      //*images
      const files = data.getAll("images") as File[];
      const validFiles = files.filter((f) => f.size > 0); //* excluye inputs vacíos

      if (validFiles.length > 0) {
        const images = await uploadImages(validFiles);

        if (!images) throw new Error("No se pudo subir las imágenes, rollback");

        await tx.productImage.createMany({
          //* tx no prisma — dentro de la transacción
          data: images.map((url) => ({
            url,
            productId: productTx.id, //* productTx.id garantizado
          })),
        });
      }

      return productTx; // ← retornar desde la transacción
    });

    revalidatePath("/admin/products");
    revalidatePath(`/admin/product/${prismaTx.slug}`);
    revalidatePath(`/product/${prismaTx.slug}`);

    return {
      ok: true,
      product: prismaTx,
    };
  } catch (error: any) {
    console.log("ERROR:", error);
    if (error?.code === "P2002") {
      return {
        ok: false,
        message: "Ya existe un producto con ese slug.",
      };
    }
    return {
      ok: false,
      message: "Error al guardar el producto.",
    };
  }
};

const uploadImages = async (files: File[]): Promise<string[]> => {
  const uploads = files.map(async (file) => {
    const buffer = await file.arrayBuffer();
    const base64 = Buffer.from(buffer).toString("base64");
    const dataUri = `data:${file.type};base64,${base64}`; //* type dinámico

    const result = await cloudinary.uploader.upload(dataUri, {
      folder: "teslo-shop",
    });

    return result.secure_url;
  });

  return Promise.all(uploads); //* espera todos y retorna el array de URLs
};
