
import { BackLink, OrderBadge } from "@/src/components";
import Link from "next/link";

// * Datos de muestra — reemplazar con data real
const ORDERS = [
  { id: "ABC-123", name: "Santiago Rodriguez", isPaid: true,  date: "12 ene 2025", total: "$477.90" },
  { id: "ABC-124", name: "Santiago Rodriguez", isPaid: false, date: "28 ene 2025", total: "$200.00" },
  { id: "ABC-125", name: "Santiago Rodriguez", isPaid: true,  date: "3 feb 2025",  total: "$130.00" },
];

export default function PageOrders() {
  return (
    <div className="page-container" style={{ paddingTop: "40px", paddingBottom: "80px" }}>

      <BackLink href="/" label="Volver" />

      {/* Header */}
      <div style={{ marginBottom: "32px" }}>
        <h1 style={{
          fontFamily: "var(--font-display)",
          fontSize: "22px",
          fontWeight: 500,
          letterSpacing: "-0.02em",
          color: "var(--color-text-primary)",
          marginBottom: "4px",
        }}>
          Mis pedidos
        </h1>
        <p style={{ fontSize: "13px", color: "var(--color-text-tertiary)" }}>
          Historial de tus pedidos
        </p>
      </div>

      {/* Tabla */}
      <div style={{ width: "100%", overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "0.5px solid var(--color-border-medium)" }}>
              {["#ID", "Nombre", "Estado", "Fecha", "Total", ""].map((h) => (
                <th
                  key={h}
                  style={{
                    padding: "10px 16px",
                    textAlign: "left",
                    fontSize: "10px",
                    fontWeight: 500,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "var(--color-text-tertiary)",
                    whiteSpace: "nowrap",
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {ORDERS.map(({ id, name, isPaid, date, total }) => (
              <tr
                key={id}
                style={{
                 borderBottom: "0.5px solid var(--color-border)", transition: "background 150ms ease" 

                }}
               
              >
                <td style={{ padding: "16px", fontSize: "12px", color: "var(--color-text-tertiary)", fontFamily: "var(--font-mono)", whiteSpace: "nowrap" }}>
                  {id}
                </td>
                <td style={{ padding: "16px", fontSize: "13px", color: "var(--color-text-primary)", whiteSpace: "nowrap" }}>
                  {name}
                </td>
                <td style={{ padding: "16px" }}>
                  <OrderBadge isPaid={isPaid} />
                </td>
                <td style={{ padding: "16px", fontSize: "13px", color: "var(--color-text-tertiary)", whiteSpace: "nowrap" }}>
                  {date}
                </td>
                <td style={{ padding: "16px", fontSize: "13px", fontWeight: 500, color: "var(--color-text-primary)", whiteSpace: "nowrap" }}>
                  {total}
                </td>
                <td style={{ padding: "16px", whiteSpace: "nowrap" }}>
                  <Link
                    href={`/orders/${id}`}
                    className="btn-arrow"
                  >
                    Ver orden
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}