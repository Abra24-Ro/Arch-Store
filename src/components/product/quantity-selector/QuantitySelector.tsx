"use client";

import { Minus, Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface QuantitySelectorProps {
  quantity: number;
}

export const QuantitySelector = ({ quantity }: QuantitySelectorProps) => {
  const [count, setCount] = useState(quantity);
  const [direction, setDirection] = useState(1);

  const onQuantityChange = (value: number) => {
    if (count + value < 1) return;
    setDirection(value);
    setCount(count + value);
  };

  return (
    <div>
      <p className="text-label mb-3">Cantidad</p>

      <div className="flex items-center w-fit border border-black/15 rounded-md overflow-hidden">

        <motion.button
          onClick={() => onQuantityChange(-1)}
          whileTap={{ scale: 0.88 }}
          transition={{ duration: 0.1 }}
          disabled={count === 1}
          className="cursor-pointer w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center text-[#1a1a1a] hover:bg-black/4 disabled:opacity-25 disabled:cursor-not-allowed transition-colors duration-150"
        >
          <Minus size={12} strokeWidth={1.5} />
        </motion.button>

        <div className="w-px h-4 bg-black/8" />

        <div className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center overflow-hidden">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span
              key={count}
              initial={{ y: direction > 0 ? 8 : -8, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: direction > 0 ? -8 : 8, opacity: 0 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              className="text-[12px] sm:text-[13px] text-[#1a1a1a] select-none"
            >
              {count}
            </motion.span>
          </AnimatePresence>
        </div>

        <div className="w-px h-4 bg-black/8" />

        <motion.button
          onClick={() => onQuantityChange(1)}
          whileTap={{ scale: 0.88 }}
          transition={{ duration: 0.1 }}
          className="cursor-pointer w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center text-[#1a1a1a] hover:bg-black/4 transition-colors duration-150"
        >
          <Plus size={12} strokeWidth={1.5} />
        </motion.button>

      </div>
    </div>
  );
};