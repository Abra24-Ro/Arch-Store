import { formatDate } from "@/src/utils";
import { OrderBadge } from "./OrderBadge";

interface Props {
  id: string;
  isPaid: boolean;
  createdAt: Date;
  paidAt?: Date | null; // ← añadir
}

export const OrderHeader = ({ id, isPaid, createdAt, paidAt }: Props) => {


  return (
    <div style={{ marginBottom: "24px" }}>
      <p
        style={{
          fontSize: "10px",
          fontWeight: 500,
          letterSpacing: "0.16em",
          textTransform: "uppercase",
          color: "var(--color-text-tertiary)",
          marginBottom: "6px",
        }}
      >
        Pedido
      </p>

      <h1
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "22px",
          fontWeight: 500,
          letterSpacing: "-0.02em",
          color: "var(--color-text-primary)",
          marginBottom: "4px",
        }}
      >
        #{id}
      </h1>

      {/* Fecha de creación */}
      <p
        style={{
          fontSize: "12px",
          color: "var(--color-text-tertiary)",
          marginBottom: isPaid && paidAt ? "4px" : "16px",
        }}
      >
        {formatDate(createdAt)}
      </p>

      {/* Fecha de pago — solo si está pagado */}
      {isPaid && paidAt && (
        <p
          style={{
            fontSize: "12px",
            color: "var(--color-success)",
            marginBottom: "16px",
          }}
        >
          Pagado el {formatDate(paidAt)}
        </p>
      )}

      <OrderBadge isPaid={isPaid} />
    </div>
  );
};
