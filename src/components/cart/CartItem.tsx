"use client";

import { CartProduct } from "@/src/types";
import { ProductImage, QuantitySelector } from "@/src/components";
import { useCartStore } from "@/src/store";
import Link from "next/link";
import { Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { useState } from "react";

interface Props {
  product: CartProduct;
  index?: number;
}

export const CartItem = ({ product, index = 0 }: Props) => {
  const updateQuantity = useCartStore((state) => state.updateProductQuantity);
  const removeFromCart = useCartStore((state) => state.removeProduct);
  const [isRemoving, setIsRemoving] = useState(false);

  const handleRemove = () => {
    setIsRemoving(true);
    setTimeout(() => {
      removeFromCart(product);
      toast.success(`${product.title} eliminado del carrito`);
    }, 350);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{
        opacity: isRemoving ? 0 : 1,
        x: isRemoving ? -16 : 0,
        height: isRemoving ? 0 : "auto",
      }}
      exit={{ opacity: 0, x: -20 }}
      transition={{
        duration: 0.3,
        delay: isRemoving ? 0 : index * 0.06,
        ease: [0.25, 0, 0, 1],
      }}
      style={{
        display: "flex",
        gap: "16px",
        padding: "20px 0",
        borderBottom: "0.5px solid var(--color-border)",
        overflow: "hidden",
      }}
    >
      {/* Imagen */}
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
          gap: "3px",
        }}
      >
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
          Talla: {product.sizes}
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
          S/ {(product.price * product.quantity).toFixed(2)}
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
        {/* Botón eliminar con spinner */}
        <motion.button
          aria-label="Eliminar producto"
          onClick={handleRemove}
          disabled={isRemoving}
          whileHover={
            !isRemoving ? { color: "var(--color-error)", scale: 1.1 } : {}
          }
          whileTap={!isRemoving ? { scale: 0.9 } : {}}
          transition={{ duration: 0.15 }}
          style={{
            background: "none",
            border: "none",
            cursor: isRemoving ? "not-allowed" : "pointer",
            color: "var(--color-text-tertiary)",
            padding: "4px",
            display: "flex",
          }}
        >
          {isRemoving ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 0.6, repeat: Infinity, ease: "linear" }}
              style={{
                width: 14,
                height: 14,
                border: "1.5px solid currentColor",
                borderTopColor: "transparent",
                borderRadius: "50%",
              }}
            />
          ) : (
            <Trash2 size={14} strokeWidth={1.5} />
          )}
        </motion.button>

        <QuantitySelector
          quantity={product.quantity}
          onQuantityChange={(quantity) => updateQuantity(product, quantity)}
        />
      </div>
    </motion.div>
  );
};
