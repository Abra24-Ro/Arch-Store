"use client";

import Link from "next/link";
import { ShoppingBagIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCartStore } from "@/src/store";
import { useEffect, useState } from "react";

export const CartButton = () => {
  const totalItemsInCart = useCartStore((state) => state.getTotalItems());
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true);
  }, []);

  return (
    <Link href={
      ( (totalItemsInCart === 0) &&  isMounted) ? "/empty" : "/cart"
    } aria-label="Carrito" className="nav-icon-btn relative">
      <ShoppingBagIcon size={17} strokeWidth={1.5} />

      <AnimatePresence>
        {isMounted && totalItemsInCart > 0 && (
          <motion.span
            key={totalItemsInCart}
            className="cart-badge"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 500, damping: 20 }}
          >
            {/* Pulse ring — llamada a la acción */}
            <motion.span
              className="absolute inset-0 rounded-full"
              style={{ background: "var(--color-obsidian)" }}
              animate={{ scale: [1, 1.4], opacity: [0.25, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
            />
            {totalItemsInCart}
          </motion.span>
        )}
      </AnimatePresence>
    </Link>
  );
};
