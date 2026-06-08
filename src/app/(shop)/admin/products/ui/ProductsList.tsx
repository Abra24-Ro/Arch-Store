"use client";

import { useWindowSize } from "@/src/hooks";
import { ProductsTable } from "./ProductsTable";
import { ProductsCards } from "./ProductsCards";
import { ProductItem } from "@/src/utils";



interface Props {
  products: ProductItem[];
}

export const ProductsList = ({ products }: Props) => {
  const { width } = useWindowSize();

  if (width === null) return null; // ← evita hydration mismatch

  return width >= 750
    ? <ProductsTable products={products} />
    : <ProductsCards products={products} />;
};