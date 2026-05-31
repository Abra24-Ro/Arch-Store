import { OrderBadge } from "./OrderBadge";

interface Props {
  id:        string;
  isPaid:    boolean;
  createdAt: Date;  // ← añadir
}

export const OrderHeader = ({ id, isPaid, createdAt }: Props) => {
  const formattedDate = new Intl.DateTimeFormat("es-PE", {
    day:   "numeric",
    month: "long",
    year:  "numeric",
    hour:  "2-digit",
    minute:"2-digit",
  }).format(createdAt);

  return (
    <div style={{ marginBottom: "24px" }}>
      <p style={{
        fontSize: "10px",
        fontWeight: 500,
        letterSpacing: "0.16em",
        textTransform: "uppercase",
        color: "var(--color-text-tertiary)",
        marginBottom: "6px",
      }}>
        Pedido
      </p>

      <h1 style={{
        fontFamily: "var(--font-display)",
        fontSize: "22px",
        fontWeight: 500,
        letterSpacing: "-0.02em",
        color: "var(--color-text-primary)",
        marginBottom: "4px", // ← reducir para dar espacio a la fecha
      }}>
        #{id}
      </h1>

      {/* Fecha del pedido */}
      <p style={{
        fontSize: "12px",
        color: "var(--color-text-tertiary)",
        marginBottom: "16px",
      }}>
        {formattedDate}
      </p>

      <OrderBadge isPaid={isPaid} />
    </div>
  );
};