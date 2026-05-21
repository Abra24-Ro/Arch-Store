"use client";

import { useCartStore } from "@/src/store";
import { formatCurrency } from "@/src/utils";
import { useEffect, useState } from "react";
import { useShallow } from "zustand/react/shallow";
import { CartSummarySkeleton } from "./skeletons/CartSummarySkeleton";

export const CartSummary = () => {
  const { subtotal, tax, total, itemsInCart } = useCartStore(
    useShallow((state) => state.getSummaryInformation())
  );

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true);
  }, []);

  if (!isMounted) return <CartSummarySkeleton />;

  const rows = [
    { label: `Productos (${itemsInCart})`, value: formatCurrency(subtotal) },
    { label: "Envío", value: "Gratis", accent: true },
    { label: "Impuestos (18%)", value: formatCurrency(tax) },
  ];

  return (
    <div>
      <p style={{ fontSize: "11px", fontWeight: 500, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--color-text-primary)", marginBottom: "24px" }}>
        Resumen
      </p>

      {rows.map(({ label, value, accent }) => (
        <div key={label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: "0.5px solid var(--color-border)", fontSize: "13px", color: "var(--color-text-secondary)" }}>
          <span>{label}</span>
          <span style={{ color: accent ? "var(--color-success)" : "inherit" }}>{value}</span>
        </div>
      ))}

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 0", fontSize: "15px", fontWeight: 500, color: "var(--color-text-primary)" }}>
        <span>Total</span>
        <span>{formatCurrency(total)}</span>
      </div>
    </div>
  );
};