import Link from "next/link";
import { ShoppingBag } from "lucide-react";

export const CartEmpty = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "calc(100vh - 96px)",
        gap: "16px",
        textAlign: "center",
      }}
    >
      <ShoppingBag
        size={32}
        strokeWidth={1}
        style={{ color: "var(--color-text-tertiary)" }}
      />

      <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "18px",
            fontWeight: 500,
            letterSpacing: "-0.01em",
            color: "var(--color-text-primary)",
          }}
        >
          Tu carrito está vacío
        </h1>
        <p style={{ fontSize: "13px", color: "var(--color-text-tertiary)" }}>
          Explora nuestra colección y encuentra algo que te guste.
        </p>
      </div>

      <Link
        href="/"
        className="btn btn-primary"
        style={{ marginTop: "8px", cursor: "pointer" }}
      >
        Ver colección
      </Link>
    </div>
  );
};
