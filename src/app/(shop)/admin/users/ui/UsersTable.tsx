"use client";

import { changeUserRole } from "@/src/actions";
import { OrderPagination } from "@/src/components";
import { User } from "@/src/types";
import { motion } from "framer-motion";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type FilterType = "all" | "admin" | "user";

interface Props {
  users: User[];
  currentPage: number;
  totalPages: number;
  selectedRole?: "admin" | "user";
  totalCount: number;
}

export const UsersTable = ({
  users,
  currentPage,
  totalPages,
  selectedRole,
  totalCount,
}: Props) => {
  const router = useRouter();

  const [loadingId, setLoadingId] = useState<string | null>(null);

  // El filtro activo viene de la URL/server, no de estado local.
  // Así la tabla refleja exactamente los datos que pidió page.tsx.
  const activeFilter: FilterType = selectedRole ?? "all";

  // Al cambiar filtro reiniciamos a page=1 porque el total de páginas puede cambiar.
  // La URL queda como fuente de verdad para que Next vuelva a pedir datos al servidor.
  const handleFilter = (value: FilterType) => {
    const params = new URLSearchParams();

    params.set("page", "1");

    if (value !== "all") {
      params.set("role", value);
    }

    router.push(`/admin/users?${params.toString()}`);
  };

  const filters: { label: string; value: FilterType }[] = [
    { label: "Todos", value: "all" },
    { label: "Admin", value: "admin" },
    { label: "Usuarios", value: "user" },
  ];

  // Solo este estado sigue siendo local: sirve para bloquear el botón mientras
  // cambia el rol de un usuario, sin afectar la paginación server-side.
  const onChangeUserRole = async (userId: string, role: "admin" | "user") => {
    setLoadingId(userId);
    try {
      const result = await changeUserRole(userId, role);
      if (result.status !== "success") {
        toast.error("No se pudo cambiar el rol.");
        return;
      }
      toast.success("Rol actualizado.");
    } catch {
      toast.error("Ocurrió un error inesperado.");
    } finally {
      setLoadingId(null);
    }
  };

  // Conservamos el filtro actual al cambiar de página.
  // Esto permite navegar /admin/users?page=2&role=admin sin perder contexto.
  const handlePageChange = (page: number) => {
    const params = new URLSearchParams();

    params.set("page", String(page));

    if (selectedRole) {
      params.set("role", selectedRole);
    }

    router.push(`/admin/users?${params.toString()}`);
  };

  return (
    <div>
      {/* Filtros */}
      <div style={{ display: "flex", gap: "8px", marginBottom: "24px" }}>
        {filters.map(({ label, value }) => (
          <motion.button
            key={value}
            onClick={() => handleFilter(value)}
            whileHover={{
              borderColor: "var(--color-text-primary)",
              color:
                activeFilter === value
                  ? "var(--color-bg)"
                  : "var(--color-text-primary)",
            }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.15 }}
            style={{
              padding: "6px 14px",
              fontSize: "12px",
              fontWeight: 500,
              borderRadius: "var(--radius-full)",
              border: "0.5px solid",
              cursor: "pointer",
              borderColor:
                activeFilter === value
                  ? "var(--color-text-primary)"
                  : "var(--color-border)",
              background:
                activeFilter === value
                  ? "var(--color-text-primary)"
                  : "transparent",
              color:
                activeFilter === value
                  ? "var(--color-bg)"
                  : "var(--color-text-secondary)",
            }}
          >
            {label}
          </motion.button>
        ))}
      </div>

      {/* Empty state */}
      {totalCount === 0 ? (
        <p
          style={{
            fontSize: "13px",
            color: "var(--color-text-tertiary)",
            paddingTop: "24px",
          }}
        >
          No hay {activeFilter === "admin" ? "administradores" : "usuarios"}.
        </p>
      ) : (
        <>
          <div style={{ width: "100%", overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr
                  style={{
                    borderBottom: "0.5px solid var(--color-border-medium)",
                  }}
                >
                  {["#ID", "Nombre", "Email", "Rol", ""].map((h) => (
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
                {users.map((user) => (
                  <tr
                    key={user.id}
                    style={{
                      borderBottom: "0.5px solid var(--color-border)",
                      transition: "background 150ms ease",
                    }}
                  >
                    {/* ID */}
                    <td
                      style={{
                        padding: "16px",
                        fontSize: "12px",
                        color: "var(--color-text-tertiary)",
                        fontFamily: "var(--font-mono)",
                        whiteSpace: "nowrap",
                      }}
                    >
                      ...{user.id.slice(-8)}
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
                      {user.name} {user.lastName ?? ""}
                    </td>

                    {/* Email */}
                    <td
                      style={{
                        padding: "16px",
                        fontSize: "13px",
                        color: "var(--color-text-secondary)",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {user.email}
                    </td>

                    {/* Rol */}
                    <td style={{ padding: "16px" }}>
                      <span
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          padding: "3px 10px",
                          borderRadius: "var(--radius-full)",
                          fontSize: "11px",
                          fontWeight: 500,
                          letterSpacing: "0.06em",
                          border: "0.5px solid",
                          borderColor:
                            user.role === "admin"
                              ? "var(--color-text-primary)"
                              : "var(--color-border)",
                          color:
                            user.role === "admin"
                              ? "var(--color-text-primary)"
                              : "var(--color-text-tertiary)",
                        }}
                      >
                        {user.role === "admin" ? "Admin" : "Usuario"}
                      </span>
                    </td>

                    {/* Acción */}
                    <td style={{ padding: "16px", whiteSpace: "nowrap" }}>
                      <motion.button
                        onClick={() => onChangeUserRole(user.id, user.role)}
                        disabled={loadingId === user.id}
                        whileHover={
                          loadingId !== user.id
                            ? { color: "var(--color-text-primary)" }
                            : {}
                        }
                        whileTap={loadingId !== user.id ? { scale: 0.97 } : {}}
                        transition={{ duration: 0.15 }}
                        style={{
                          fontSize: "12px",
                          color: "var(--color-text-tertiary)",
                          background: "none",
                          border: "none",
                          cursor:
                            loadingId === user.id ? "not-allowed" : "pointer",
                          letterSpacing: "0.06em",
                          opacity: loadingId === user.id ? 0.4 : 1,
                          transition: "opacity 150ms ease",
                        }}
                      >
                        {loadingId === user.id
                          ? "Cambiando..."
                          : user.role === "admin"
                            ? "Quitar admin"
                            : "Hacer admin"}
                      </motion.button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <OrderPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </>
      )}
    </div>
  );
};
