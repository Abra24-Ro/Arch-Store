"use client";

import { useCartStore } from "@/src/store/cart/cart-store";
import { useShallow } from "zustand/react/shallow";
import { AnimatePresence } from "framer-motion";
import { CheckoutItem, CheckoutItemSkeleton } from "@/src/components";
import { useHydration } from "@/src/hooks";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const CheckoutProductList = () => {
  const router = useRouter();
  const cartProducts = useCartStore(useShallow((state) => state.cart));

  const hydrated = useHydration();

  useEffect(() => {
    if (hydrated && cartProducts.length === 0) {
      router.replace("/empty");
    }
  }, [hydrated, cartProducts.length]);

  if (!hydrated) return <CheckoutItemSkeleton />;
  if (cartProducts.length === 0) return null;

  return (
    <>
      <p
        style={{
          fontSize: "11px",
          fontWeight: 500,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: "var(--color-text-tertiary)",
          marginBottom: "24px",
        }}
      >
        {cartProducts.length}{" "}
        {cartProducts.length === 1 ? "producto" : "productos"}
      </p>

      <AnimatePresence initial={false}>
        {cartProducts.map((product, i) => (
          <CheckoutItem
            key={`${product.slug}-${product.sizes}`}
            product={product}
            index={i}
          />
        ))}
      </AnimatePresence>
    </>
  );
};
