"use client";

import Link from "next/link";
import { ShoppingBagIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCartStore } from "@/src/store";
import { useEffect, useState } from "react";

export const CartButton = () => {
  const totalItemsInCart = useCartStore((state) => state.getTotalItems());
  const [isMounted, setIsMounted] = useState(false);
  const [bump, setBump] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted || totalItemsInCart === 0) return;
    setBump(true);
    const t = setTimeout(() => setBump(false), 400);
    return () => clearTimeout(t);
  }, [totalItemsInCart]);

  return (
    <Link
      href={isMounted && totalItemsInCart === 0 ? "/empty" : "/cart"}
      aria-label="Carrito"
      className="nav-icon-btn relative"
    >
      <motion.div
        animate={bump ? { scale: [1, 1.25, 0.9, 1.05, 1] } : {}}
        transition={{ duration: 0.4, ease: "easeInOut" }}
      >
        <ShoppingBagIcon size={17} strokeWidth={1.5} />
      </motion.div>

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
