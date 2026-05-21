"use client";

import { CartItem } from "./CartItem";
import { AnimatePresence } from "framer-motion";
import { BackLink, CartItemListSkeleton } from "..";
import { useCartStore } from "@/src/store";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export const CartItemList = () => {
  const productsInCart = useCartStore((state) => state.cart);
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true);
  }, []);
  
  useEffect(() => {
    if (isMounted && productsInCart.length === 0) {
      router.replace("/empty");
    }
  }, [isMounted, productsInCart.length,router]); // router fuera

  if (!isMounted) return <CartItemListSkeleton />;

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
        {productsInCart.length}{" "}
        {productsInCart.length === 1 ? "producto" : "productos"}
      </p>

      <AnimatePresence initial={false}>
        {productsInCart.map((product, i) => (
          <CartItem
            key={`${product.slug}-${product.sizes}`}
            product={product}
            index={i}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};