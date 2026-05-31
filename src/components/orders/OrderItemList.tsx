"use client";

import { CartProduct } from "@/src/types";
import { AnimatePresence } from "framer-motion";
import { CheckoutItem } from "../checkout/CheckoutItem"; // ← cambiar import

interface Props {
  products: CartProduct[];
}

export const OrderItemList = ({ products }: Props) => {
  return (
    <div>
      <div style={{ height: "0.5px", background: "var(--color-border)", marginBottom: "8px" }} />
      <AnimatePresence initial={false}>
        {products.map((product, i) => (
          <CheckoutItem
            key={`${product.slug}-${product.sizes}`} // ← key más específica
            product={product}
            index={i}
            readOnly // ← sin acciones
          />
        ))}
      </AnimatePresence>
    </div>
  );
};