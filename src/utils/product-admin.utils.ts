// src/utils/product-admin.utils.ts
export interface ProductItem {
  id:      string;
  title:   string;
  price:   number;
  inStock: number;
  gender:  string;
  slug:    string;
  images:  string[];
}

export const getStockColor = (stock: number) => {
  if (stock === 0) return "var(--color-error)";
  if (stock <= 5)  return "var(--color-warning)";
  return "var(--color-success)";
};

export const getStockLabel = (stock: number) => {
  if (stock === 0) return "Sin stock";
  if (stock <= 5)  return `${stock} restantes`;
  return `${stock} unidades`;
};

export const getGenderLabel = (gender: string) => {
  if (gender === "men")   return "Hombres";
  if (gender === "women") return "Mujeres";
  if (gender === "kid")   return "Niños";
  return "Unisex";
};