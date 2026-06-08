"use client";

import { Size } from "@/src/generated/prisma";
import { motion } from "framer-motion";

//* Fuente de verdad para las tallas — derivado del enum de Prisma.
//* Si el enum cambia, este array se actualiza automáticamente.
const SIZES = Object.values(Size);

interface Props {
  selected: string[];
  onChange: (size: string) => void;
}

//* Selector visual de tallas. Recibe el array de tallas seleccionadas
//* y un callback onChange — sin estado interno, 100% controlado.
export const ProductSizePicker = ({ selected, onChange }: Props) => (
  <div className="input-group">
    <label className="input-label">Tallas</label>
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "8px",
        marginTop: "8px",
      }}
    >
      {SIZES.map((size) => {
        const isSelected = selected?.includes(size);
        return (
          <motion.button
            key={size}
            type="button"
            onClick={() => onChange(size)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.15 }}
            style={{
              width: "44px",
              height: "44px",
              borderRadius: "var(--radius-md)",
              border: "0.5px solid",
              fontSize: "12px",
              fontWeight: 500,
              cursor: "pointer",
              transition: "all 150ms ease",
              borderColor: isSelected
                ? "var(--color-text-primary)"
                : "var(--color-border)",
              background: isSelected
                ? "var(--color-text-primary)"
                : "transparent",
              color: isSelected
                ? "var(--color-bg)"
                : "var(--color-text-secondary)",
            }}
          >
            {size}
          </motion.button>
        );
      })}
    </div>
  </div>
);
