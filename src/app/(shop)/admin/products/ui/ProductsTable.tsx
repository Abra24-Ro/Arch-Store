"use client";

import { OrderPagination, ProductImage } from "@/src/components";
import { FilterType, GENDER_FILTERS } from "@/src/types";
import {
  formatCurrency,
  getGenderLabel,
  getStockColor,
  getStockLabel,
  ProductItem,
} from "@/src/utils";
import { motion } from "framer-motion";

import Link from "next/link";
import { useRouter } from "next/navigation"; // ← añadir
import { useState } from "react";

const ITEMS_PER_PAGE = 8;

interface Props {
  products: ProductItem[];
}

export const ProductsTable = ({ products }: Props) => {
  const router = useRouter(); // ← añadir
  const [filter, setFilter] = useState<FilterType>("all");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredProducts = products.filter((p) =>
    filter === "all" ? true : p.gender === filter,
  );

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  const handleFilter = (value: FilterType) => {
    setFilter(value);
    setCurrentPage(1);
  };

  return (
    <div>
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "24px",
        }}
      >
        <div style={{ display: "flex", gap: "8px" }}>
          {GENDER_FILTERS.map(({ label, value }) => (
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
                  filter === value
                    ? "var(--color-text-primary)"
                    : "transparent",
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
        <Link
          href="/admin/product/new"
          className="btn btn-primary"
          style={{ fontSize: "12px" }}
        >
          + Nuevo producto
        </Link>
      </div>

      {filteredProducts.length === 0 ? (
        <p
          style={{
            fontSize: "13px",
            color: "var(--color-text-tertiary)",
            paddingTop: "24px",
          }}
        >
          No hay productos en esta categoría.
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
                  {["", "Nombre", "Género", "Precio", "Stock"].map(
                    (
                      h,
                      i, // ← eliminar columna vacía final
                    ) => (
                      <th
                        key={i}
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
                {paginatedProducts.map((product) => (
                  <motion.tr
                    key={product.id}
                    onClick={() =>
                      router.push(`/admin/product/${product.slug}`)
                    }
                    whileHover={{ backgroundColor: "var(--color-bg-surface)" }}
                    transition={{ duration: 0.15 }}
                    style={{
                      borderBottom: "0.5px solid var(--color-border)",
                      cursor: "pointer", // ← fila clickeable
                    }}
                  >
                    {/* Imagen */}
                    <td style={{ padding: "12px 16px", width: "60px" }}>
                      <div
                        style={{
                          width: "48px",
                          height: "60px",
                          borderRadius: "var(--radius-sm)",
                          overflow: "hidden",
                          background: "var(--color-bg-surface)",
                        }}
                      >
                        <ProductImage
                          src={product.images[0]}
                          alt={product.title}
                          width={52}
                          height={64}
                        />
                      </div>
                    </td>

                    {/* Nombre — texto simple, la fila ya es clickeable */}
                    <td
                      style={{
                        padding: "12px 16px",
                        fontSize: "13px",
                        color: "var(--color-text-primary)",
                        maxWidth: "280px",
                      }}
                    >
                      <span
                        style={{
                          display: "block",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {product.title}
                      </span>
                    </td>

                    {/* Género */}
                    <td
                      style={{
                        padding: "12px 16px",
                        fontSize: "12px",
                        color: "var(--color-text-tertiary)",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {getGenderLabel(product.gender)}
                    </td>

                    {/* Precio */}
                    <td
                      style={{
                        padding: "12px 16px",
                        fontSize: "13px",
                        fontWeight: 500,
                        color: "var(--color-text-primary)",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {formatCurrency(product.price)}
                    </td>

                    {/* Stock */}
                    <td style={{ padding: "12px 16px", whiteSpace: "nowrap" }}>
                      <span
                        style={{
                          fontSize: "12px",
                          fontWeight: 500,
                          color: getStockColor(product.inStock),
                        }}
                      >
                        {getStockLabel(product.inStock)}
                      </span>
                    </td>
                  </motion.tr>
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
