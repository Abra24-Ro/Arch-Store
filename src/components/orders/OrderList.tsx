"use client";

import { OrderBadge, OrderPagination } from "@/src/components";
import { OrderSummary } from "@/src/types";
import { formatCurrency, formatDate } from "@/src/utils";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

type FilterType = "all" | "paid" | "pending";

const ITEMS_PER_PAGE = 5; // ← constante fuera del componente

interface Props {
  orders: OrderSummary[];
}

export const OrderList = ({ orders }: Props) => {
  const [filter, setFilter] = useState<FilterType>("all");
  const [currentPage, setCurrentPage] = useState(1);

  // 1. Filtrar
  const filteredOrders = orders.filter((order) => {
    if (filter === "paid") return order.isPaid;
    if (filter === "pending") return !order.isPaid;
    return true;
  });

  // 2. Paginar sobre el resultado filtrado
  const totalPages = Math.ceil(filteredOrders.length / ITEMS_PER_PAGE);
  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  // 3. Resetear página al cambiar filtro
  const handleFilter = (value: FilterType) => {
    setFilter(value);
    setCurrentPage(1); // ← evita quedar en página inexistente
  };

  const filters: { label: string; value: FilterType }[] = [
    { label: "Todos", value: "all" },
    { label: "Pagados", value: "paid" },
    { label: "Pendientes", value: "pending" },
  ];

  return (
    <div>
      {/* Filtros */}
      <div style={{ display: "flex", gap: "8px", marginBottom: "24px" }}>
        {filters.map(({ label, value }) => (
          <motion.button
            key={value}
            onClick={() => handleFilter(value)} // ← usar handleFilter
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
      {filteredOrders.length === 0 ? (
        <p
          style={{
            fontSize: "13px",
            color: "var(--color-text-tertiary)",
            paddingTop: "24px",
          }}
        >
          No hay pedidos {filter === "paid" ? "pagados" : "pendientes"}.
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
                  {["#ID", "Nombre", "Estado", "Fecha", "Total", ""].map(
                    (h) => (
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
                    ),
                  )}
                </tr>
              </thead>

              <tbody>
                {paginatedOrders.map(
                  (
                    order, // ← paginatedOrders
                  ) => (
                    <tr
                      key={order.id}
                      style={{
                        borderBottom: "0.5px solid var(--color-border)",
                        transition: "background 150ms ease",
                      }}
                    >
                      <td
                        style={{
                          padding: "16px",
                          fontSize: "12px",
                          color: "var(--color-text-tertiary)",
                          fontFamily: "var(--font-mono)",
                          whiteSpace: "nowrap",
                        }}
                      >
                        ...{order.id.slice(-8)}
                      </td>

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

                      <td style={{ padding: "16px" }}>
                        <OrderBadge isPaid={order.isPaid} />
                      </td>

                      <td
                        suppressHydrationWarning
                        style={{
                          padding: "16px",
                          fontSize: "13px",
                          color: "var(--color-text-tertiary)",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {formatDate(order.createdAt)}
                      </td>

                      <td
                        style={{
                          padding: "16px",
                          fontSize: "13px",
                          fontWeight: 500,
                          color: "var(--color-text-primary)",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {formatCurrency(order.total)}
                      </td>

                      <td style={{ padding: "16px", whiteSpace: "nowrap" }}>
                        <Link
                          href={`/orders/${order.id}`}
                          className="btn-arrow"
                        >
                          Ver orden
                        </Link>
                      </td>
                    </tr>
                  ),
                )}
              </tbody>
            </table>
          </div>

          {/* Paginación — solo si hay más de una página */}
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
