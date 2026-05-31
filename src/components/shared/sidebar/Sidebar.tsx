"use client";

import {
  SearchIcon,
  XIcon,
  ShoppingBag,
  Heart,
  User,
  Package,
  ClipboardList,
  Users,
  Layers,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useUIStore } from "@/src/store";
import { NAV_LINKS, ACCOUNT_LINKS, ADMIN_LINKS } from "@/src/types";
import { SidebarSection } from "./Sidebarsection";
import { LogoutButton } from "../../ui/LogoutButton";

const ICONS: Record<string, React.ReactNode> = {
  "/gender/all": <Layers size={14} strokeWidth={1.5} />,
  "/gender/women": <ShoppingBag size={14} strokeWidth={1.5} />,
  "/gender/men": <ShoppingBag size={14} strokeWidth={1.5} />,
  "/gender/kid": <ShoppingBag size={14} strokeWidth={1.5} />,
  "/profile": <User size={14} strokeWidth={1.5} />,
  "/orders": <ClipboardList size={14} strokeWidth={1.5} />,
  "/favorites": <Heart size={14} strokeWidth={1.5} />,
  "/admin/products": <Package size={14} strokeWidth={1.5} />,
  "/admin/orders": <ClipboardList size={14} strokeWidth={1.5} />,
  "/admin/users": <Users size={14} strokeWidth={1.5} />,
};

interface Props {
  isLoggedIn: boolean;
  userEmail?: string | null;
  isAdmin: boolean;
}

export const Sidebar = ({ isLoggedIn, userEmail, isAdmin }: Props) => {
  const isOpen = useUIStore((state) => state.isSideMenuOpen);
  const onClose = useUIStore((state) => state.closeSideMenu);

  const accountLinks = isLoggedIn
    ? ACCOUNT_LINKS
    : ACCOUNT_LINKS.filter((l) => l.href !== "/profile");

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0" style={{ zIndex: 300 }}>
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            style={{
              background: "rgba(26,26,26,0.35)",
              backdropFilter: "blur(2px)",
            }}
            onClick={onClose}
          />

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
            <div
              style={{
                padding: "24px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                borderBottom: "0.5px solid var(--color-border)",
                flexShrink: 0,
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "14px",
                  fontWeight: 600,
                  letterSpacing: "-0.01em",
                  color: "var(--color-text-primary)",
                }}
              >
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
            <div
              style={{
                padding: "16px 24px",
                borderBottom: "0.5px solid var(--color-border)",
                flexShrink: 0,
              }}
            >
              <div
                style={{
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <SearchIcon
                  size={14}
                  strokeWidth={1.5}
                  style={{
                    position: "absolute",
                    left: "12px",
                    color: "var(--color-text-tertiary)",
                  }}
                />
                <input
                  type="text"
                  placeholder="Buscar producto..."
                  className="input"
                  style={{
                    paddingLeft: "36px",
                    background: "var(--color-bg-surface)",
                  }}
                />
              </div>
            </div>

            {/* Contenido — scrolleable */}
            <div style={{ flex: 1, overflowY: "auto" }}>
              <SidebarSection
                title="Categorías"
                items={NAV_LINKS}
                variant="primary"
                icons={ICONS}
              />
              <SidebarSection
                title="Cuenta"
                items={accountLinks}
                variant="secondary"
                icons={ICONS}
              />
              {isAdmin && (
                <SidebarSection
                  title="Admin"
                  items={ADMIN_LINKS}
                  variant="admin"
                  icons={ICONS}
                />
              )}
            </div>

            {/* Footer — siempre visible */}
            <div
              style={{
                padding: "16px 24px",
                borderTop: "0.5px solid var(--color-border)",
                flexShrink: 0,
              }}
            >
              <LogoutButton
                isLoggedIn={isLoggedIn}
                userEmail={userEmail}
                onAfterLogout={onClose}
              />
            </div>
          </motion.nav>
        </div>
      )}
    </AnimatePresence>
  );
};
