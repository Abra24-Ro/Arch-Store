"use client";

import { generatePaginationNumbers } from "@/src/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";

interface Props {
  totalPages: number;
}

export const Pagination = ({ totalPages }: Props) => {
  const pathname     = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Math.max(1, Number(searchParams.get("page")) || 1);
  const allPages     = generatePaginationNumbers(currentPage, totalPages);

  const createPageUrl = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    if (pageNumber === "...")          return `${pathname}?${params.toString()}`;
    if (+pageNumber <= 0)              return pathname;
    if (+pageNumber > totalPages)      return `${pathname}?${params.toString()}`;
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  const isFirst = currentPage === 1;
  const isLast  = currentPage === totalPages;

  return (
    <nav
      aria-label="Paginación"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "4px",
        padding: "32px 0",
      }}
    >
      {/* Anterior */}
      <motion.div whileHover={!isFirst ? { x: -2 } : {}} whileTap={!isFirst ? { scale: 0.9 } : {}}>
        <Link
          href={createPageUrl(currentPage - 1)}
          aria-disabled={isFirst}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "32px",
            height: "32px",
            borderRadius: "var(--radius-md)",
            border: "0.5px solid var(--color-border-medium)",
            color: isFirst ? "var(--color-text-tertiary)" : "var(--color-text-primary)",
            pointerEvents: isFirst ? "none" : "auto",
            opacity: isFirst ? 0.4 : 1,
            transition: "background 150ms ease, border-color 150ms ease",
          }}
          className="pagination-btn"
        >
          <ChevronLeft size={14} strokeWidth={1.5} />
        </Link>
      </motion.div>

      {/* Páginas */}
      {allPages.map((page, index) => {
        const isActive  = page === currentPage;
        const isDots    = page === "...";

        return (
          <motion.div
            key={`${page}-${index}`}
            whileHover={!isActive && !isDots ? { y: -1 } : {}}
            whileTap={!isActive && !isDots ? { scale: 0.9 } : {}}
            animate={isActive ? { scale: 1 } : { scale: 1 }}
          >
            <Link
              href={createPageUrl(page)}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "32px",
                height: "32px",
                borderRadius: "var(--radius-md)",
                fontSize: "13px",
                fontWeight: isActive ? 500 : 400,
                border: isActive
                  ? "1.5px solid var(--color-obsidian)"
                  : "0.5px solid transparent",
                background: isActive ? "var(--color-obsidian)" : "transparent",
                color: isActive
                  ? "var(--color-linen)"
                  : isDots
                  ? "var(--color-text-tertiary)"
                  : "var(--color-text-secondary)",
                pointerEvents: isDots ? "none" : "auto",
                cursor: isDots ? "default" : "pointer",
                transition: "background 150ms ease, color 150ms ease",
              }}
              className={isActive || isDots ? "" : "pagination-btn"}
            >
              {page}
            </Link>
          </motion.div>
        );
      })}

      {/** Siguiente */}
      <motion.div whileHover={!isLast ? { x: 2 } : {}} whileTap={!isLast ? { scale: 0.9 } : {}}>
        <Link
          href={createPageUrl(currentPage + 1)}
          aria-disabled={isLast}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "32px",
            height: "32px",
            borderRadius: "var(--radius-md)",
            border: "0.5px solid var(--color-border-medium)",
            color: isLast ? "var(--color-text-tertiary)" : "var(--color-text-primary)",
            pointerEvents: isLast ? "none" : "auto",
            opacity: isLast ? 0.4 : 1,
            transition: "background 150ms ease, border-color 150ms ease",
          }}
          className="pagination-btn"
        >
          <ChevronRight size={14} strokeWidth={1.5} />
        </Link>
      </motion.div>
    </nav>
  );
};