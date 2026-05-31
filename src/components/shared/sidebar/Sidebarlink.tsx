"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useUIStore } from "@/src/store";
import { usePathname } from "next/navigation";

interface Props {
  href: string;
  label: string;
  index: number;
  variant?: "primary" | "secondary" | "admin";
  icon?: React.ReactNode;
}

export const SidebarLink = ({ href, label, index, variant = "primary", icon }: Props) => {
  const onClose = useUIStore((state) => state.closeSideMenu);
  const pathname = usePathname(); 
  const isPrimary = variant === "primary";
  const isAdmin = variant === "admin";
  const isActive = pathname === href; 

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
          gap: "10px",
          // ← active cambia el color
          color: isActive
            ? "var(--color-text-primary)"
            : isAdmin
            ? "var(--color-text-tertiary)"
            : isPrimary
            ? "var(--color-text-primary)"
            : "var(--color-text-secondary)",
          fontWeight: isActive ? 500 : 400, 
        }}
      >
        {/* ← íconos para todos los variants */}
        {icon && (
          <motion.span
            variants={{
              hover: {
                color: isAdmin
                  ? "var(--color-accent)"
                  : "var(--color-text-primary)",
              },
            }}
            transition={{ duration: 0.2 }}
            style={{
              display: "flex",
              flexShrink: 0,
              // ← ícono activo más prominente
              color: isActive
                ? "var(--color-text-primary)"
                : "var(--color-text-tertiary)",
            }}
          >
            {icon}
          </motion.span>
        )}

        <motion.span
          variants={{ hover: { x: 4 } }}
          transition={{ duration: 0.2, ease: [0.25, 0, 0, 1] }}
          style={{ flex: 1 }}
        >
          {label}
        </motion.span>

        {/* Flecha solo en primary — punto si está activo */}
        {isPrimary && (
          <motion.span
            variants={{ hover: { x: 4, color: "var(--color-text-primary)" } }}
            transition={{ duration: 0.2, ease: [0.25, 0, 0, 1] }}
            style={{
              color: isActive
                ? "var(--color-text-primary)"
                : "var(--color-text-tertiary)",
              fontSize: "14px",
            }}
          >
            {isActive ? "●" : "→"} {/* ← punto si es la ruta activa */}
          </motion.span>
        )}
      </Link>
    </motion.div>
  );
};