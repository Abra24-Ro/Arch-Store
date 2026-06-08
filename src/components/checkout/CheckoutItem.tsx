"use client";

import { CartProduct } from "@/src/types";
import Image from "next/image";
import { motion } from "framer-motion";
import { formatCurrency } from "@/src/utils";
import Link from "next/link";
import { ProductImage } from "../product/product-image/ProductImage";

interface Props {
  product: CartProduct;
  index?: number;
  readOnly?: boolean;
}

export const CheckoutItem = ({
  product,
  index = 0,
  readOnly = false,
}: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, x: 0, height: "auto" }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3, delay: index * 0.06, ease: [0.25, 0, 0, 1] }}
      style={{
        display: "flex",
        gap: "16px",
        padding: "20px 0",
        borderBottom: "0.5px solid var(--color-border)",
        overflow: "hidden",
      }}
    >
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
          <ProductImage
            src={product.image}
            alt={product.title}
            width={80}
            height={100}
          />
        </motion.div>
      </Link>

      {/* Info */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: "6px",
        }}
      >
        {/* Título */}
        <motion.div whileHover="hover" initial="rest">
          <div
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
          </div>
        </motion.div>

        {/* Talla + cantidad */}
        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          <span
            style={{ fontSize: "12px", color: "var(--color-text-tertiary)" }}
          >
            Talla: {product.sizes}
          </span>
          <span
            style={{
              fontSize: "11px",
              fontWeight: 500,
              color: "var(--color-text-secondary)",
              background: "var(--color-bg-surface)",
              border: "0.5px solid var(--color-border)",
              borderRadius: "4px",
              padding: "1px 6px",
              letterSpacing: "0.02em",
            }}
          >
            ×{product.quantity}
          </span>
        </div>

        {/* Precio */}
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: "6px",
            marginTop: "auto",
            paddingTop: "6px",
          }}
        >
          <span
            style={{
              fontSize: "14px",
              fontWeight: 500,
              color: "var(--color-text-primary)",
            }}
          >
            {formatCurrency(product.price * product.quantity)}
          </span>
          {product.quantity > 1 && (
            <span
              style={{ fontSize: "11px", color: "var(--color-text-tertiary)" }}
            >
              {formatCurrency(product.price)} c/u
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
};
