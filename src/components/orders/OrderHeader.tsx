import { OrderBadge } from "./OrderBadge";

interface Props {
  id:     string;
  isPaid: boolean;
}

export const OrderHeader = ({ id, isPaid }: Props) => {
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
        marginBottom: "16px",
      }}>
        #{id}
      </h1>

      <OrderBadge isPaid={isPaid} />
    </div>
  );
};