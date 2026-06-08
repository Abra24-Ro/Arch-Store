"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ProductImage } from "../product/product-image/ProductImage";

interface Props {
  src: string;
  alt: string;
  isOpen: boolean;
  onClose: () => void;
}

export const ImageLightbox = ({ src, alt, isOpen, onClose }: Props) => (
  <AnimatePresence>
    {isOpen && (
      <>
        {/* Backdrop */}
        <motion.div
          key="backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.85)",
            zIndex: 50,
            cursor: "zoom-out",
          }}
        />

        {/* Imagen ampliada */}
        <motion.div
          key="image"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.92 }}
          transition={{ duration: 0.25, ease: [0.25, 0, 0, 1] }}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: "100%", //* ← agregar
            height: "100%", //* ← agregar
            zIndex: 51,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            pointerEvents: "none",
          }}
        >
          <div
            style={{
              position: "relative",
              width: "min(90vw, 480px)",
              height: "min(80vh, 640px)", 
              borderRadius: "var(--radius-lg)",
              overflow: "hidden",
              pointerEvents: "all",
            }}
          >
            <ProductImage
              src={src}
              alt={alt}
              fill
              className="object-cover"
              sizes="min(90vw, 600px)"
            />

            {/* Botón cerrar */}
            <motion.button
              type="button"
              onClick={onClose}
              whileHover={{ background: "rgba(0,0,0,0.8)" }}
              transition={{ duration: 0.15 }}
              style={{
                position: "absolute",
                top: "12px",
                right: "12px",
                width: "28px",
                height: "28px",
                borderRadius: "50%",
                background: "rgba(0,0,0,0.6)",
                border: "none",
                color: "#fff",
                fontSize: "16px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              ×
            </motion.button>
          </div>
        </motion.div>
      </>
    )}
  </AnimatePresence>
);
