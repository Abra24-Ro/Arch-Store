"use client";

import { Product } from "@/src/types";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

interface Props {
  product: Product;
}

export const ProductGridItem = ({ product }: Props) => {
  return (
    <motion.div
      className="group cursor-pointer overflow-hidden"
      whileHover="hover"
      initial="rest"
      animate="rest"
    >
      <Link href={`/product/${product.slug}`}>
        {/* Imagen — ratio 3:4 formato moda */}
        <div className="relative w-full overflow-hidden" style={{ aspectRatio: "3/4" }}>

          {/* Imagen base */}
          <motion.div
            className="absolute inset-0"
            variants={{ rest: { opacity: 1 }, hover: { opacity: 0 } }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <Image
              src={`/products/${product.images[0]}`}
              alt={product.title}
              fill
              className="object-cover"
            />
          </motion.div>

          {/* Imagen hover */}
          <motion.div
            className="absolute inset-0"
            variants={{ rest: { opacity: 0 }, hover: { opacity: 1 } }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <Image
              src={`/products/${product.images[1]}`}
              alt={product.title}
              fill
              className="object-cover"
            />
          </motion.div>

        </div>
      </Link>

      {/* Info */}
      <div style={{ padding: "12px 14px 20px" }}>
        <p style={{
          fontSize: "10px",
          fontWeight: 500,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: "var(--color-text-tertiary)",
          marginBottom: "4px",
        }}>
          {product.gender}
        </p>

        <Link
          href={`/product/${product.slug}`}
          style={{
            display: "block",
            fontSize: "13px",
            fontWeight: 500,
            letterSpacing: "-0.01em",
            color: "var(--color-text-primary)",
            marginBottom: "4px",
            fontFamily: "var(--font-display)",
          }}
        >
          {product.title}
        </Link>

        <p style={{
          fontSize: "13px",
          fontWeight: 400,
          color: "var(--color-text-secondary)",
        }}>
          ${product.price}
        </p>
      </div>
    </motion.div>
  );
};