"use client";

import { changeUserRole } from "@/src/actions";
import { OrderPagination } from "@/src/components";
import { User } from "@/src/types";
import { motion } from "framer-motion";
import { useState } from "react";
import { toast } from "sonner";

type FilterType = "all" | "admin" | "user";

const ITEMS_PER_PAGE = 5;

interface Props {
  users: User[];
}

export const UsersTable = ({ users }: Props) => {
  const [filter, setFilter] = useState<FilterType>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [loadingId, setLoadingId] = useState<string | null>(null);

  //* 1. Filtrar por rol
  const filteredUsers = users.filter((user) => {
    if (filter === "admin") return user.role === "admin";
    if (filter === "user") return user.role === "user";
    return true;
  });

  //* 2. Paginar
  const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  //* 3. Resetear página al cambiar filtro
  const handleFilter = (value: FilterType) => {
    setFilter(value);
    setCurrentPage(1);
  };

  const filters: { label: string; value: FilterType }[] = [
    { label: "Todos", value: "all" },
    { label: "Admin", value: "admin" },
    { label: "Usuarios", value: "user" },
  ];

  //* 4. Cambiar rol de usuario
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
      setLoadingId(null); // ← siempre se ejecuta, pase lo que pase
    }
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
                filter === value
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
                filter === value
                  ? "var(--color-text-primary)"
                  : "var(--color-border)",
              background:
                filter === value ? "var(--color-text-primary)" : "transparent",
              color:
                filter === value
                  ? "var(--color-bg)"
                  : "var(--color-text-secondary)",
            }}
          >
            {label}
          </motion.button>
        ))}
      </div>

      {/* Empty state */}
      {filteredUsers.length === 0 ? (
        <p
          style={{
            fontSize: "13px",
            color: "var(--color-text-tertiary)",
            paddingTop: "24px",
          }}
        >
          No hay {filter === "admin" ? "administradores" : "usuarios"}.
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
                {paginatedUsers.map((user) => (
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
              onPageChange={setCurrentPage}
            />
          )}
        </>
      )}
    </div>
  );
};
