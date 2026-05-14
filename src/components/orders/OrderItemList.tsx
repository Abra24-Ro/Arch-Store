"use client";

import { CartProduct } from "@/src/types";
// import { Product } from "@/src/types";

import { AnimatePresence } from "framer-motion";
import { CartItem } from "../cart/CartItem";

interface Props {
  products: CartProduct[];
}

export const OrderItemList = ({ products }: Props) => {
  return (
    <div>
      <div
        style={{
          height: "0.5px",
          background: "var(--color-border)",
          marginBottom: "8px",
        }}
      />
      <AnimatePresence initial={false}>
        {products.map((product, i) => (
          <CartItem key={product.slug} product={product} index={i} />
        ))}
      </AnimatePresence>
    </div>
  );
};
