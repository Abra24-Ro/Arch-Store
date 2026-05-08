"use client";

import Link from "next/link";
import { motion } from "framer-motion";

interface Props {
  href: string;
  label?: string;
}

export const BackLink = ({ href, label = "Continuar comprando" }: Props) => {
  return (
    <motion.div
      whileHover="hover"
      initial="rest"
      style={{ display: "inline-flex", marginBottom: "24px" }}
    >
      <Link
        href={href}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "6px",
          fontSize: "11px",
          fontWeight: 500,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: "var(--color-text-tertiary)",
        }}
      >
        {/* Flecha se mueve a la izquierda en hover */}
        <motion.span
          variants={{ rest: { x: 0 }, hover: { x: -4 } }}
          transition={{ duration: 0.2, ease: [0.25, 0, 0, 1] }}
        >
          ←
        </motion.span>

        {/* Texto gana color en hover */}
        <motion.span
          variants={{
            rest: { color: "var(--color-text-tertiary)" },
            hover: { color: "var(--color-text-primary)" },
          }}
          transition={{ duration: 0.2 }}
        >
          {label}
        </motion.span>
      </Link>
    </motion.div>
  );
};