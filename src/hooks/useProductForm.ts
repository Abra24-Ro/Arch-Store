"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Product, ProductImage } from "@/src/types";
import { Gender } from "@/src/generated/prisma";
import { createOrUpdateProduct, deleteProductImage } from "@/src/actions";
import { buildProductFormData } from "../utils";
import { useState } from "react";

export interface ProductFormInputs {
  title: string;
  slug: string;
  description: string;
  price: number;
  inStock: number;
  tags: string;
  sizes: string[];
  gender: Gender;
  categoryId: string;
}

//* Hook que encapsula toda la lógica del formulario de producto.
//* ProductForm queda como orquestador puro de UI.
export const useProductForm = (
  product: Partial<Product> & { productImages?: ProductImage[] },
) => {
  const router = useRouter();
  const [formKey, setFormKey] = useState(0);
  const [pendingImages, setPendingImages] = useState<File[]>([]);
  const [isDeleting, setIsDeleting] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  const form = useForm<ProductFormInputs>({
    mode: "onChange",
    defaultValues: {
      ...product,
      tags: product.tags?.join(", ") ?? "",
      sizes: product.sizes ?? [],
    },
  });

  //** Manejo del toggle de tallas con Set para evitar duplicados
  const onSizeChange = (size: string) => {
    const current = new Set(form.getValues("sizes"));
    current.has(size) ? current.delete(size) : current.add(size);
    form.setValue("sizes", Array.from(current), { shouldValidate: true });
    setHasChanges(true);
  };

  const onFilesChange = (files: File[]) => {
    setPendingImages(files);
    setHasChanges(files.length > 0);
  };

  const onSubmit = async (data: ProductFormInputs) => {
    const toastId = toast.loading("Guardando producto...");
    setPendingImages([]);
    const formData = buildProductFormData(product.id, data, pendingImages);
    const result = await createOrUpdateProduct(formData);

    if (!result.ok) {
      toast.error(result.message ?? "Error al guardar el producto", {
        id: toastId,
      });
      return;
    }
    toast.success("Producto guardado correctamente", { id: toastId });
    setPendingImages([]);
    setHasChanges(false)
    setFormKey((k) => k + 1); //* ← fuerza re-mount de la galería
    form.reset(data);
    router.replace(`/admin/product/${result?.product?.slug}`);
  };

  const onDeleteImage = async (imageId: number, imageUrl: string) => {
    setIsDeleting(true);
    const toastId = toast.loading("Eliminando imagen...");
    const result = await deleteProductImage(imageId, imageUrl);
    setIsDeleting(false);

    if (!result.ok) {
      toast.error(result.message ?? "Error al eliminar la imagen", {
        id: toastId,
      });
      return;
    }
    toast.success("Imagen eliminada", { id: toastId });
  };

  return {
    form,
    onSizeChange,
    onSubmit,
    onFilesChange,
    onDeleteImage,
    formKey,
    isDeleting,
    hasChanges 
  };
};
