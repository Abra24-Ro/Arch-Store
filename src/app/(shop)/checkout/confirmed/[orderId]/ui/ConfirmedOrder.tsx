"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/src/store";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

interface Props {
  orderId: string;
}

export const ConfirmedOrder = ({ orderId }: Props) => {
  const [seconds, setSeconds] = useState(5);
  const router    = useRouter();
  const clearCart = useCartStore((state) => state.clearCart);

  useEffect(() => {
    clearCart(); // ← limpiar aquí, lejos del checkout
  }, []);

  useEffect(() => {
    if (seconds === 0) {
      router.replace(`/orders/${orderId}`);
      return;
    }
    const timer = setTimeout(() => setSeconds((s) => s - 1), 1000);
    return () => clearTimeout(timer);
  }, [seconds, orderId, router]);

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: "24px",
      backgroundColor: "var(--color-bg)",
      padding: "40px",
      textAlign: "center",
    }}>
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4, ease: [0.25, 0, 0, 1] }}
      >
        <CheckCircle
          size={56}
          strokeWidth={1}
          style={{ color: "var(--color-success)" }}
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        style={{ display: "flex", flexDirection: "column", gap: "8px" }}
      >
        <h1 style={{
          fontFamily: "var(--font-display)",
          fontSize: "24px",
          fontWeight: 500,
          letterSpacing: "-0.02em",
          color: "var(--color-text-primary)",
        }}>
          ¡Gracias por tu pedido!
        </h1>
        <p style={{ fontSize: "14px", color: "var(--color-text-secondary)" }}>
          Tu orden ha sido confirmada y está lista para procesar el pago.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        style={{ display: "flex", flexDirection: "column", gap: "4px" }}
      >
        <p style={{ fontSize: "13px", color: "var(--color-text-tertiary)" }}>
          Redirigiendo a tu pedido en
        </p>
        <motion.span
          key={seconds}
          initial={{ scale: 1.3, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          style={{
            fontSize: "32px",
            fontWeight: 500,
            color: "var(--color-text-primary)",
            fontFamily: "var(--font-display)",
          }}
        >
          {seconds}
        </motion.span>
      </motion.div>

      {/* Skip — no esperar el countdown */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        onClick={() => router.replace(`/orders/${orderId}`)}
        style={{
          fontSize: "13px",
          color: "var(--color-text-tertiary)",
          background: "none",
          border: "none",
          cursor: "pointer",
          textDecoration: "underline",
          textUnderlineOffset: "3px",
        }}
      >
        Ver pedido ahora
      </motion.button>
    </div>
  );
};