import { BackLink, OrderList } from "@/src/components";
import { redirect } from "next/navigation";
import { getSession } from "@/src/lib/get-session";
import {  getPaginatedUsers } from "@/src/actions";
import { UsersTable } from "./ui/UsersTable";

export default async function PageUsersAdmin() {
  const { isLoggedIn, user } = await getSession();

  // ← verificar autenticación y rol
  if (!isLoggedIn) redirect("/auth/login?callbackUrl=/admin/users");
  if (user?.role !== "admin") redirect("/");

  const { status, users = [] } = await getPaginatedUsers();

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
          Mantenimiento de Usuarios
        </h1>
        <p style={{ fontSize: "13px", color: "var(--color-text-tertiary)" }}>
          {users.length === 0
            ? "No hay usuarios registrados"
            : `${users.length} ${users.length === 1 ? "usuario activo" : "usuarios activos"}`}
        </p>
      </div>

      <UsersTable users={users} />
    </div>
  );
}
