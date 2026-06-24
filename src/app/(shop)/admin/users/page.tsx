import { BackLink } from "@/src/components";
import { redirect } from "next/navigation";
import { getSession } from "@/src/lib/get-session";
import { getPaginatedUsers } from "@/src/actions";
import { UsersTable } from "./ui/UsersTable";

type UserRoleFilter = "admin" | "user";

interface Props {
  searchParams: Promise<{
    page?: string;
    role?: string;
  }>;
}

export default async function PageUsersAdmin({ searchParams }: Props) {
  const { isLoggedIn, user } = await getSession();

  // ← verificar autenticación y rol
  if (!isLoggedIn) redirect("/auth/login?callbackUrl=/admin/users");
  if (user?.role !== "admin") redirect("/");

  const { page: pageParam, role: roleParam } = await searchParams;

  const page = Math.max(1, Number(pageParam) || 1);
  const role: UserRoleFilter | undefined =
    roleParam === "admin" || roleParam === "user" ? roleParam : undefined;

  const {
    status,
    users = [],
    totalCount = 0,
    totalPages = 1,
    currentPage = 1,
  } = await getPaginatedUsers({
    page,
    take: 5,
    role,
  });

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
          {totalCount === 0
            ? "No hay usuarios registrados"
            : `${totalCount} ${totalCount === 1 ? "usuario activo" : "usuarios activos"}`}
        </p>
      </div>

      <UsersTable
        users={users}
        currentPage={currentPage}
        totalPages={totalPages}
        selectedRole={role}
        totalCount={totalCount}
      />
    </div>
  );
}
