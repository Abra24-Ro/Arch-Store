"use client";

import { SearchIcon, XIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useUIStore } from "@/src/store";
import { NAV_LINKS, ACCOUNT_LINKS } from "@/src/types";
import { SidebarSection } from "./Sidebarsection";


export const Sidebar = () => {
  const isOpen  = useUIStore((state) => state.isSideMenuOpen);
  const onClose = useUIStore((state) => state.closeSideMenu);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0" style={{ zIndex: 300 }}>

          {/* Overlay */}
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            style={{ background: "rgba(26,26,26,0.35)", backdropFilter: "blur(2px)" }}
            onClick={onClose}
          />

          {/* Panel */}
          <motion.nav
            className="absolute right-0 top-0 bottom-0 flex flex-col"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.35, ease: [0.25, 0, 0, 1] }}
            style={{
              width: "300px",
              background: "var(--color-bg)",
              borderLeft: "0.5px solid var(--color-border)",
            }}
          >
            {/* Header */}
            <div style={{
              padding: "24px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderBottom: "0.5px solid var(--color-border)",
            }}>
              <span style={{
                fontFamily: "var(--font-display)",
                fontSize: "14px",
                fontWeight: 600,
                letterSpacing: "-0.01em",
                color: "var(--color-text-primary)",
              }}>
                arc
              </span>

              <button
                onClick={onClose}
                aria-label="Cerrar menú"
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "var(--radius-md)",
                  border: "0.5px solid var(--color-border-medium)",
                  background: "transparent",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  color: "var(--color-text-tertiary)",
                }}
              >
                <XIcon size={14} strokeWidth={1.5} />
              </button>
            </div>

            {/* Search */}
            <div style={{ padding: "16px 24px", borderBottom: "0.5px solid var(--color-border)" }}>
              <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
                <SearchIcon
                  size={14}
                  strokeWidth={1.5}
                  style={{ position: "absolute", left: "12px", color: "var(--color-text-tertiary)" }}
                />
                <input
                  type="text"
                  placeholder="Buscar producto..."
                  className="input"
                  style={{ paddingLeft: "36px", background: "var(--color-bg-surface)" }}
                />
              </div>
            </div>

            <SidebarSection title="Categorías" items={NAV_LINKS} variant="primary" />
            <SidebarSection title="Cuenta" items={ACCOUNT_LINKS} variant="secondary" />

          </motion.nav>
        </div>
      )}
    </AnimatePresence>
  );
};