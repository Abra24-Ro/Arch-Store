import { CheckCircle, XCircle } from "lucide-react";

interface Props {
  isPaid: boolean;
}

export const OrderBadge = ({ isPaid }: Props) => {
  return (
    <div style={{
      display: "inline-flex",
      alignItems: "center",
      gap: "8px",
      padding: "8px 14px",
      borderRadius: "var(--radius-full)",
      border: `0.5px solid ${isPaid ? "var(--color-success)" : "var(--color-error)"}`,
      background: isPaid ? "rgba(61,122,90,0.08)" : "rgba(181,64,64,0.08)",
      width: "fit-content",
    }}>
      {isPaid
        ? <CheckCircle size={14} strokeWidth={1.5} style={{ color: "var(--color-success)", flexShrink: 0 }} />
        : <XCircle    size={14} strokeWidth={1.5} style={{ color: "var(--color-error)",   flexShrink: 0 }} />
      }
      <span style={{
        fontSize: "12px",
        fontWeight: 500,
        letterSpacing: "0.06em",
        color: isPaid ? "var(--color-success)" : "var(--color-error)",
      }}>
        {isPaid ? "Orden pagada" : "Pago pendiente"}
      </span>
    </div>
  );
};