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

const ITEMS_PER_PAGE = 6;

interface Props {
  products: ProductItem[];
}

export const ProductsCards = ({ products }: Props) => {
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
      {/* Filtros con scroll horizontal */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "16px",
          gap: "12px",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "8px",
            overflowX: "auto",
            scrollbarWidth: "none",
            paddingBottom: "4px",
            flex: 1,
          }}
        >
          {GENDER_FILTERS.map(({ label, value }) => (
            <motion.button
              key={value}
              onClick={() => handleFilter(value)}
              whileTap={{ scale: 0.97 }}
              style={{
                padding: "5px 12px",
                fontSize: "11px",
                fontWeight: 500,
                borderRadius: "var(--radius-full)",
                border: "0.5px solid",
                cursor: "pointer",
                flexShrink: 0,
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
          style={{ fontSize: "11px", whiteSpace: "nowrap", flexShrink: 0 }}
        >
          + Nuevo
        </Link>
      </div>

      {/* Cards */}
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
          <div style={{ display: "flex", flexDirection: "column" }}>
            {paginatedProducts.map((product) => (
              <motion.div
                key={product.id}
                onClick={() => router.push(`/admin/product/${product.slug}`)}
                className="product-card-row" //* ← clase CSS
                transition={{ duration: 0.15 }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "14px 8px",
                  borderBottom: "0.5px solid var(--color-border)",
                  cursor: "pointer",
                  borderRadius: "var(--radius-sm)",
                  backgroundColor: "transparent", //* ← permite que el CSS hover funcione
                }}
              >
                {/* Imagen */}
                <div
                  style={{
                    width: "52px",
                    height: "64px",
                    borderRadius: "var(--radius-sm)",
                    overflow: "hidden",
                    background: "var(--color-bg-surface)",
                    flexShrink: 0,
                  }}
                >
                  <ProductImage
                    src={product.images[0]}
                    alt={product.title}
                    width={52}
                    height={64}
                  />
                </div>

                {/* Info */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p
                    style={{
                      fontSize: "13px",
                      fontWeight: 500,
                      color: "var(--color-text-primary)",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      marginBottom: "4px",
                    }}
                  >
                    {product.title}
                  </p>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "11px",
                        color: "var(--color-text-tertiary)",
                      }}
                    >
                      {getGenderLabel(product.gender)}
                    </span>
                    <span
                      style={{
                        fontSize: "11px",
                        color: "var(--color-text-tertiary)",
                      }}
                    >
                      ·
                    </span>
                    <span
                      style={{
                        fontSize: "12px",
                        fontWeight: 500,
                        color: "var(--color-text-primary)",
                      }}
                    >
                      {formatCurrency(product.price)}
                    </span>
                    <span
                      style={{
                        fontSize: "11px",
                        color: "var(--color-text-tertiary)",
                      }}
                    >
                      ·
                    </span>
                    <span
                      style={{
                        fontSize: "11px",
                        fontWeight: 500,
                        color: getStockColor(product.inStock),
                      }}
                    >
                      {getStockLabel(product.inStock)}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
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
