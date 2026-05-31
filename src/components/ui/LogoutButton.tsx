"use client";

import { logout } from "@/src/actions/auth/logout";
import { LogOut, LogIn } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

interface Props {
  isLoggedIn: boolean;
  userEmail?: string | null;
  onAfterLogout?: () => void;
}

export const LogoutButton = ({
  isLoggedIn,
  userEmail,
  onAfterLogout,
}: Props) => {
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.refresh(); // Refresca la página para actualizar el estado de autenticación
    onAfterLogout?.();
  };

  if (!isLoggedIn) {
    return (
      <Link
        href="/auth/login"
        onClick={onAfterLogout}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          padding: "10px 0",
          fontSize: "13px",
          color: "var(--color-text-secondary)",
          transition: "color 150ms ease",
        }}
        className="footer-link"
      >
        <LogIn size={15} strokeWidth={1.5} />
        Ingresar
      </Link>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
      <p
        style={{
          fontSize: "11px",
          color: "var(--color-text-tertiary)",
          letterSpacing: "0.06em",
          paddingBottom: "8px",
          borderBottom: "0.5px solid var(--color-border)",
          marginBottom: "4px",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        {userEmail}
      </p>

      <motion.button
        onClick={handleLogout}
        whileHover={{ x: -2 }}
        whileTap={{ scale: 0.97 }}
        transition={{ duration: 0.15 }}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          padding: "10px 0",
          background: "none",
          border: "none",
          cursor: "pointer",
          fontSize: "13px",
          color: "var(--color-text-tertiary)",
          transition: "color 150ms ease",
          width: "100%",
        }}
        className="footer-link"
      >
        <LogOut size={15} strokeWidth={1.5} />
        Cerrar sesión
      </motion.button>
    </div>
  );
};
