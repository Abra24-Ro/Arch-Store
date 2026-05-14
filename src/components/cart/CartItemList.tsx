"use client";

import { CartProduct } from "@/src/types";

// import { Product } from "@/src/types";
import { CartItem } from "./CartItem";
import { AnimatePresence } from "framer-motion";
import { BackLink } from "..";

interface Props {
  products: CartProduct[];
}

export const CartItemList = ({ products }: Props) => {
  return (
    <div
      className="page-container"
      style={{
        paddingTop: "40px",
        paddingBottom: "40px",
        backgroundColor: "var(--color-bg)",
      }}
    >
      <BackLink href="/" label="Continuar comprando" />

      <h1
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "22px",
          fontWeight: 500,
          letterSpacing: "-0.02em",
          color: "var(--color-text-primary)",
          marginBottom: "4px",
        }}
      >
        Carrito
      </h1>

      <p
        style={{
          fontSize: "13px",
          color: "var(--color-text-tertiary)",
          marginBottom: "32px",
        }}
      >
        {products.length} {products.length === 1 ? "producto" : "productos"}
      </p>

      {/* AnimatePresence permite animar la salida cuando se elimina un item */}
      <AnimatePresence initial={false}>
        {products.map((product, i) => (
          <CartItem key={product.slug} product={product} index={i} />
        ))}
      </AnimatePresence>
    </div>
  );
};
