"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useUIStore } from "@/src/store";

interface Props {
  href: string;
  label: string;
  index: number;
  variant?: "primary" | "secondary";
}

export const SidebarLink = ({ href, label, index, variant = "primary" }: Props) => {
  const onClose = useUIStore((state) => state.closeSideMenu);
  const isPrimary = variant === "primary";

  return (
    <motion.div
      initial={{ opacity: 0, x: 12 }}
      animate={{ opacity: 1, x: 0 }}
      whileHover="hover"
      transition={{ delay: 0.1 + index * 0.05, duration: 0.25 }}
      style={{ borderBottom: "0.5px solid var(--color-border)" }}
    >
      <Link
        href={href}
        onClick={onClose}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: isPrimary ? "space-between" : "flex-start",
          padding: isPrimary ? "10px 0" : "8px 0",
          fontSize: isPrimary ? "14px" : "13px",
          color: isPrimary ? "var(--color-text-primary)" : "var(--color-text-secondary)",
        }}
      >
        {/* Label se desplaza levemente a la derecha */}
        <motion.span
          variants={{ hover: { x: 4 } }}
          transition={{ duration: 0.2, ease: [0.25, 0, 0, 1] }}
        >
          {label}
        </motion.span>

        {/* Flecha se desplaza y gana color en hover */}
        {isPrimary && (
          <motion.span
            variants={{
              hover: { x: 4, color: "var(--color-text-primary)" },
            }}
            transition={{ duration: 0.2, ease: [0.25, 0, 0, 1] }}
            style={{ color: "var(--color-text-tertiary)", fontSize: "14px" }}
          >
            →
          </motion.span>
        )}
      </Link>
    </motion.div>
  );
};