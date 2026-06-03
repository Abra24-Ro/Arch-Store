import { getOrdersByUser } from "@/src/actions/order/get-orders-by-user";
import { BackLink, OrderList } from "@/src/components";
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
          {orders.length === 0
            ? "Aún no tienes pedidos"
            : `${orders.length} ${orders.length === 1 ? "pedido" : "pedidos"}`}
        </p>
      </div>

      {orders.length === 0 ? (
        <div style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "16px",
          paddingTop: "60px",
        }}>
          <p style={{ fontSize: "14px", color: "var(--color-text-tertiary)" }}>
            No has realizado ningún pedido aún.
          </p>
          <a href="/" className="btn btn-primary">Explorar productos</a>
        </div>
      ) : (
        <OrderList orders={orders} /> // ← pasa las órdenes
      )}
    </div>
  );
}