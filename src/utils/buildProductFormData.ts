import { ProductFormInputs } from "@/src/hooks/useProductForm";

export const buildProductFormData = (
  id: string | undefined,
  data: ProductFormInputs,
   images: File[] = []
): FormData => {
  const formData = new FormData();



  if (id) formData.append("id", id);

  formData.append("title", data.title);
  formData.append("slug", data.slug);
  formData.append("description", data.description);
  formData.append("price", data.price.toString());
  formData.append("inStock", data.inStock.toString());
  formData.append("tags", data.tags);
  formData.append("sizes", data.sizes.join(","));
  formData.append("gender", data.gender);
  formData.append("categoryId", data.categoryId);

   images.forEach((file) => formData.append("images", file)); 

  return formData;
};
