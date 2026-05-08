"use client";

import { Size } from "@/src/types";
import { motion } from "framer-motion";
import clsx from "clsx";
import { useState } from "react";

interface Props {
  selectedSize: Size;
  availableSizes: Size[];
}

export const SizeSelector = ({ selectedSize, availableSizes }: Props) => {
  const [selected, setSelected] = useState<Size>(selectedSize);

  return (
    <div>
      <p className="text-label mb-3">Talla</p>

      <div className="flex gap-2 flex-wrap">
        {availableSizes.map((size) => (
          <motion.button
            key={size}
            onClick={() => setSelected(size)}
            whileTap={{ scale: 0.93 }}
            transition={{ duration: 0.1 }}
            className={clsx(
              "relative cursor-pointer flex items-center justify-center",
              "w-10 h-10 sm:w-11 sm:h-11 text-[11px] sm:text-[12px]",
              "rounded-md transition-colors duration-150 select-none",
              selected === size
                ? "border-[1.5px] border-[#1A1A1A] font-medium text-[#1A1A1A]"
                : "border border-black/15 text-[#5A5856] hover:border-black/30 hover:text-[#1A1A1A]"
            )}
          >
            {selected === size && (
              <motion.span
                layoutId="size-indicator"
                className="absolute inset-0 rounded-md bg-white"
                style={{ zIndex: 0 }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            <span className="relative z-10">{size}</span>
          </motion.button>
        ))}
      </div>
    </div>
  );
};