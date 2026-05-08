import { Product } from "@/src/types";

interface Props {
  products: Product[];
}

const TAX_RATE = 0.18;

export const CartSummary = ({ products }: Props) => {
  const subtotal = products.reduce((acc, p) => acc + p.price, 0);
  const taxes    = subtotal * TAX_RATE;
  const total    = subtotal + taxes;

  const rows = [
    { label: `Productos (${products.length})`, value: `$${subtotal.toFixed(2)}` },
    { label: "Envío",                           value: "Gratis", accent: true    },
    { label: "Impuestos (18%)",                 value: `$${taxes.toFixed(2)}`    },
  ];
  
  return (
    <div>
      <p style={{
        fontSize: "11px",
        fontWeight: 500,
        letterSpacing: "0.14em",
        textTransform: "uppercase",
        color: "var(--color-text-primary)",
        marginBottom: "24px",
      }}>
        Resumen
      </p>

      {rows.map(({ label, value, accent }) => (
        <div
          key={label}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "10px 0",
            borderBottom: "0.5px solid var(--color-border)",
            fontSize: "13px",
            color: "var(--color-text-secondary)",
          }}
        >
          <span>{label}</span>
          <span style={{ color: accent ? "var(--color-success)" : "inherit" }}>
            {value}
          </span>
        </div>
      ))}

      {/* Total */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "16px 0",
        fontSize: "15px",
        fontWeight: 500,
        color: "var(--color-text-primary)",
      }}>
        <span>Total</span>
        <span>${total.toFixed(2)}</span>
      </div>
    </div>
  );
};