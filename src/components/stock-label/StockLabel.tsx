"use client";

import { getStockBySlug } from "@/src/actions/products/get-stock-by-slug";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

interface Props {
  slug: string;
}

export const StockLabel = ({ slug }: Props) => {
  const [stock, setStock] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    const fetchStock = async () => {
      const inStock = await getStockBySlug(slug);
      if (mounted) {
        setStock(inStock);
        setIsLoading(false);
      }
    };
    fetchStock();
    return () => {
      mounted = false;
    };
  }, [slug]);

  if (isLoading) {
    return (
      <motion.div
        style={{
          padding: "8px 16px",
          borderTop: "0.5px solid var(--color-border)",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <motion.div
          style={{
            height: 11,
            width: 140,
            borderRadius: 4,
            background: "var(--color-border)",
          }}
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    );
  }

  if (stock > 5) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        style={{
          padding: "8px 16px",
          fontSize: "11px",
          fontWeight: 500,
          letterSpacing: "0.10em",
          textTransform: "uppercase",
          color: stock === 0 ? "var(--color-error)" : "var(--color-warning)",
          background: "var(--color-bg)",
          borderTop: "0.5px solid var(--color-border)",
        }}
      >
        {stock === 0 ? "Sin stock" : `Solo quedan ${stock} unidades`}
      </motion.div>
    </AnimatePresence>
  );
};
