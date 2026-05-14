"use client";

import { CartProduct } from "@/src/types";

// import { Product } from "@/src/types";
import { QuantitySelector } from "@/src/components";
import Image from "next/image";
import Link from "next/link";
import { Trash2 } from "lucide-react";
import { motion } from "framer-motion";

interface Props {
  product: CartProduct;
  index?: number;
}

export const CartItem = ({ product, index = 0 }: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{
        duration: 0.25,
        delay: index * 0.06,
        ease: [0.25, 0, 0, 1],
      }}
      style={{
        display: "flex",
        gap: "16px",
        padding: "20px 0",
        borderBottom: "0.5px solid var(--color-border)",
      }}
    >
      {/* Imagen — zoom sutil en hover */}
      <Link href={`/product/${product.slug}`} style={{ flexShrink: 0 }}>
        <motion.div
          whileHover={{ scale: 1.03 }}
          transition={{ duration: 0.3, ease: [0.25, 0, 0, 1] }}
          style={{
            width: "80px",
            height: "100px",
            borderRadius: "var(--radius-sm)",
            overflow: "hidden",
            background: "var(--color-bg-surface)",
          }}
        >
          <Image
            src={`/products/${product.images[0]}`}
            alt={product.title}
            width={80}
            height={100}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </motion.div>
      </Link>

      {/* Info */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: "3px",
        }}
      >
        <p
          style={{
            fontSize: "10px",
            fontWeight: 500,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "var(--color-text-tertiary)",
          }}
        >
          {product.gender}
        </p>

        {/* Título — subrayado animado en hover */}
        <motion.div whileHover="hover" initial="rest">
          <Link
            href={`/product/${product.slug}`}
            style={{
              fontSize: "13px",
              fontWeight: 500,
              letterSpacing: "-0.01em",
              color: "var(--color-text-primary)",
              fontFamily: "var(--font-display)",
              position: "relative",
              display: "inline-block",
            }}
          >
            {product.title}
            <motion.span
              variants={{
                rest: { scaleX: 0, originX: 0 },
                hover: { scaleX: 1, originX: 0 },
              }}
              transition={{ duration: 0.25, ease: [0.25, 0, 0, 1] }}
              style={{
                position: "absolute",
                bottom: -1,
                left: 0,
                right: 0,
                height: "0.5px",
                background: "var(--color-text-primary)",
                display: "block",
              }}
            />
          </Link>
        </motion.div>

        <p style={{ fontSize: "12px", color: "var(--color-text-tertiary)" }}>
          Talla: {product.sizes[0]}
        </p>

        <p
          style={{
            fontSize: "14px",
            fontWeight: 500,
            color: "var(--color-text-primary)",
            marginTop: "auto",
            paddingTop: "8px",
          }}
        >
          ${product.price}
        </p>
      </div>

      {/* Acciones */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          justifyContent: "space-between",
        }}
      >
        {/* Botón eliminar — hover en rojo */}
        <motion.button
          aria-label="Eliminar producto"
          whileHover={{ color: "var(--color-error)", scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          transition={{ duration: 0.15 }}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "var(--color-text-tertiary)",
            padding: "4px",
            display: "flex",
          }}
        >
          <Trash2 size={14} strokeWidth={1.5} />
        </motion.button>

        <QuantitySelector quantity={1} />
      </div>
    </motion.div>
  );
};
