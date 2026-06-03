"use client";

import { OrderPagination } from "@/src/components";
import { formatCurrency } from "@/src/utils";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type FilterType = "all" | "men" | "women" | "kid" | "unisex";

const ITEMS_PER_PAGE = 8;

interface ProductItem {
  id: string;
  title: string;
  price: number;
  inStock: number;
  gender: string;
  slug: string;
  images: string[];
}

interface Props {
  products: ProductItem[];
}

export const ProductsList = ({ products }: Props) => {
  const [filter, setFilter] = useState<FilterType>("all");
  const [currentPage, setCurrentPage] = useState(1);

  // 1. Filtrar por género
  const filteredProducts = products.filter((p) => {
    if (filter === "all") return true;
    return p.gender === filter;
  });

  // 2. Paginar
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  // 3. Resetear página al cambiar filtro
  const handleFilter = (value: FilterType) => {
    setFilter(value);
    setCurrentPage(1);
  };

  const filters: { label: string; value: FilterType }[] = [
    { label: "Todos", value: "all" },
    { label: "Hombres", value: "men" },
    { label: "Mujeres", value: "women" },
    { label: "Niños", value: "kid" },
    { label: "Unisex", value: "unisex" },
  ];

  // Stock color
  const getStockStyle = (stock: number) => {
    if (stock === 0) return "var(--color-error)";
    if (stock <= 5) return "var(--color-warning)";
    return "var(--color-success)";
  };

  return (
    <div>
      {/* Header con botón nuevo producto */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "24px",
        }}
      >
        {/* Filtros */}
        <div style={{ display: "flex", gap: "8px" }}>
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

        {/* Nuevo producto */}
        <Link
          href="/admin/products/new"
          className="btn btn-primary"
          style={{ fontSize: "12px" }}
        >
          + Nuevo producto
        </Link>
      </div>

      {/* Empty state */}
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
                  {["", "Nombre", "Género", "Precio", "Stock", ""].map(
                    (h, i) => (
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
                  <tr
                    key={product.id}
                    style={{
                      borderBottom: "0.5px solid var(--color-border)",
                      transition: "background 150ms ease",
                    }}
                  >
                    {/* Imagen */}
                    <td style={{ padding: "12px 16px", width: "60px" }}>
                      <Link href={`/product/${product.slug}`}>
                        <div
                          style={{
                            width: "48px",
                            height: "60px",
                            borderRadius: "var(--radius-sm)",
                            overflow: "hidden",
                            background: "var(--color-bg-surface)",
                            flexShrink: 0,
                          }}
                        >
                          <Image
                            src={`/products/${product.images[0]}`}
                            alt={product.title}
                            width={48}
                            height={60}
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                            }}
                          />
                        </div>
                      </Link>
                    </td>

                    {/* Nombre */}
                    <td
                      style={{
                        padding: "12px 16px",
                        fontSize: "13px",
                        color: "var(--color-text-primary)",
                        maxWidth: "280px",
                      }}
                    >
                      <motion.div whileHover="hover" initial="rest">
                        <Link
                          href={`/product/${product.slug}`}
                          style={{
                            display: "block",
                            position: "relative",
                            width: "100%",
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
                          <motion.span
                            variants={{
                              rest: { scaleX: 0 },
                              hover: { scaleX: 1 },
                            }}
                            style={{
                              position: "absolute",
                              bottom: 0,
                              left: 0,
                              right: 0,
                              height: "0.5px",
                              background: "var(--color-text-primary)",
                              originX: 0,
                            }}
                          />
                        </Link>
                      </motion.div>
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
                      {product.gender === "men"
                        ? "Hombres"
                        : product.gender === "women"
                          ? "Mujeres"
                          : product.gender === "kid"
                            ? "Niños"
                            : "Unisex"}
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
                          color: getStockStyle(product.inStock),
                        }}
                      >
                        {product.inStock === 0
                          ? "Sin stock"
                          : product.inStock <= 5
                            ? `${product.inStock} restantes`
                            : `${product.inStock} unidades`}
                      </span>
                    </td>

                    {/* Acción */}
                    <td style={{ padding: "12px 16px", whiteSpace: "nowrap" }}>
                      <Link
                        href={`/admin/products/${product.slug}`}
                        className="btn-arrow"
                      >
                        Editar
                      </Link>
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
