import { BackLink, OrderList } from "@/src/components";
import { redirect } from "next/navigation";
import { getSession } from "@/src/lib/get-session";
import { getAllOrders } from "@/src/actions";

export default async function PageOrdersAdmin() {
  const { isLoggedIn, user } = await getSession();

  // ← verificar autenticación y rol
  if (!isLoggedIn) redirect("/auth/login?callbackUrl=/admin/orders");
  if (user?.role !== "admin") redirect("/");

  const { status, orders = [] } = await getAllOrders();

  if (status !== "success") redirect("/");

  return (
    <div
      className="page-container"
      style={{ paddingTop: "40px", paddingBottom: "80px" }}
    >
      <BackLink href="/admin" label="Panel admin" />

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
          Todos los pedidos
        </h1>
        <p style={{ fontSize: "13px", color: "var(--color-text-tertiary)" }}>
          {orders.length === 0
            ? "No hay pedidos aún"
            : `${orders.length} ${orders.length === 1 ? "pedido" : "pedidos"} en total`}
        </p>
      </div>

      {orders.length === 0 ? (
        <p
          style={{
            fontSize: "14px",
            color: "var(--color-text-tertiary)",
            paddingTop: "60px",
            textAlign: "center",
          }}
        >
          No hay pedidos registrados.
        </p>
      ) : (
        <OrderList orders={orders} />
      )}
    </div>
  );
}
