"use server";

import { revalidatePath } from "next/cache";
import { v2 as cloudinary } from "cloudinary";
import { prisma } from "@/src/lib/prisma";
import { requireAdmin } from "@/src/lib/auth-guards";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const deleteProductImage = async (imageId: number, imageUrl: string) => {
  const admin = await requireAdmin();

  if (!admin.ok) {
    return {
      ok: false,
      message: admin.message,
    };
  }

  if (!imageUrl.startsWith("http")) {
    return {
      ok: false,
      message: "No se pueden borrar imagenes de FS ",
    };
  }

  try {
    //* el nombre del archivo — Cloudinary no lo encuentra
    const imageName = imageUrl.split("/").pop()?.split(".")[0] ?? "";
    //* → "v6ilfeqhxkjj8vx79nev"

    //* con la carpeta — así está guardado en Cloudinary
    const urlParts = imageUrl.split("/");
    const folder = urlParts.at(-2); //* "teslo-shop"
    const fileName = urlParts.at(-1)?.split(".")[0]; //* "v6ilfeqhxkjj8vx79nev"
    const publicId = `${folder}/${fileName}`; //* "teslo-shop/v6ilfeqhxkjj8vx79nev"

    await cloudinary.uploader.destroy(publicId);
    const deletedImage = await prisma.productImage.delete({
      where: {
        id: imageId,
      },
      select: {
        product: {
          select: {
            slug: true,
          },
        },
      },
    });

    //*Revalidar paths,
    revalidatePath("/admin/products");
    revalidatePath(`/admin/product/${deletedImage.product.slug}`);
    revalidatePath(`/product/${deletedImage.product.slug}`);

    return { ok: true };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: "No se pudo eliminar la imagen ",
    };
  }
};
