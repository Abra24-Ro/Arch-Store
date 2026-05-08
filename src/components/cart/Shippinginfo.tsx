import Link from "next/link";
import { Pencil } from "lucide-react";
import { Address } from "@/src/types";

interface Props {
  address: Address;
}

export const ShippingInfo = ({ address }: Props) => {
  return (
    <div>
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "16px",
        }}
      >
        <p
          style={{
            fontSize: "11px",
            fontWeight: 500,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "var(--color-text-primary)",
          }}
        >
          Datos de envío
        </p>

        <Link
          href="/checkout/address"
          className="link-edit"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "4px",
            fontSize: "11px",
            color: "var(--color-text-tertiary)",
            letterSpacing: "0.08em",
            transition: "color 150ms ease",
          }}
        >
          <Pencil size={11} strokeWidth={1.5} />
          Editar
        </Link>
      </div>

      {/* Filas */}
      <div style={{ display: "flex", flexDirection: "column" }}>
        {Object.entries(address).map(([key, value]) => (
          <div
            key={key}
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "8px 0",
              borderBottom: "0.5px solid var(--color-border)",
              fontSize: "13px",
            }}
          >
            <span style={{ color: "var(--color-text-tertiary)" }}>{key}</span>
            <span
              style={{ color: "var(--color-text-primary)", fontWeight: 400 }}
            >
              {value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
