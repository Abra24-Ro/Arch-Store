import { getOrdersByUser } from "@/src/actions";
import { BackLink, OrderBadge } from "@/src/components";
import { formatCurrency } from "@/src/utils";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function PageOrders() {
  const { status, orders = [] } = await getOrdersByUser();

  if (status !== "success") redirect("/auth/login?callbackUrl=/orders");

  return (
    <div
      className="page-container"
      style={{ paddingTop: "40px", paddingBottom: "80px" }}
    >
      <BackLink href="/" label="Volver" />

      {/* Header */}
      <div style={{ marginBottom: "32px" }}>
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
          Mis pedidos
        </h1>
        <p style={{ fontSize: "13px", color: "var(--color-text-tertiary)" }}>
          {orders.length === 0
            ? "Aún no tienes pedidos"
            : `${orders.length} ${orders.length === 1 ? "pedido" : "pedidos"}`}
        </p>
      </div>

      {/* Empty state */}
      {orders.length === 0 ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "16px",
            paddingTop: "60px",
            color: "var(--color-text-tertiary)",
          }}
        >
          <p style={{ fontSize: "14px" }}>
            No has realizado ningún pedido aún.
          </p>
          <Link href="/" className="btn btn-primary">
            Explorar productos
          </Link>
        </div>
      ) : (
        <div style={{ width: "100%", overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr
                style={{
                  borderBottom: "0.5px solid var(--color-border-medium)",
                }}
              >
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
              {orders.map((order) => (
                <tr
                  key={order.id}
                  style={{
                    borderBottom: "0.5px solid var(--color-border)",
                    transition: "background 150ms ease",
                  }}
                >
                  {/* ID truncado — más legible */}
                  <td
                    style={{
                      padding: "16px",
                      fontSize: "12px",
                      color: "var(--color-text-tertiary)",
                      fontFamily: "var(--font-mono)",
                      whiteSpace: "nowrap",
                    }}
                  >
                    ...{order.id.slice(-8)} {/* ← solo los últimos 8 chars */}
                  </td>

                  {/* Nombre */}
                  <td
                    style={{
                      padding: "16px",
                      fontSize: "13px",
                      color: "var(--color-text-primary)",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {order.orderAddress?.firstName}{" "}
                    {order.orderAddress?.lastName}
                  </td>

                  {/* Estado */}
                  <td style={{ padding: "16px" }}>
                    <OrderBadge isPaid={order.isPaid} /> {/* ← correcto */}
                  </td>

                  {/* Fecha */}
                  <td
                    style={{
                      padding: "16px",
                      fontSize: "13px",
                      color: "var(--color-text-tertiary)",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {new Intl.DateTimeFormat("es-PE", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    }).format(order.createdAt)}{" "}
                    {/* ← correcto */}
                  </td>

                  {/* Total */}
                  <td
                    style={{
                      padding: "16px",
                      fontSize: "13px",
                      fontWeight: 500,
                      color: "var(--color-text-primary)",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {formatCurrency(order.total)} {/* ← correcto */}
                  </td>

                  {/* Acción */}
                  <td style={{ padding: "16px", whiteSpace: "nowrap" }}>
                    <Link href={`/orders/${order.id}`} className="btn-arrow">
                      {" "}
                      {/* ← correcto */}
                      Ver orden
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
