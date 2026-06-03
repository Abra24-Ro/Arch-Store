"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { generatePaginationNumbers } from "@/src/utils";

interface Props {
  currentPage:  number;
  totalPages:   number;
  onPageChange: (page: number) => void;
}

export const OrderPagination = ({ currentPage, totalPages, onPageChange }: Props) => {
  const allPages = generatePaginationNumbers(currentPage, totalPages);

  const isFirst = currentPage === 1;
  const isLast  = currentPage === totalPages;

  const handlePage = (page: number | string) => {
    if (page === "...") return;
    const num = Number(page);
    if (num < 1 || num > totalPages) return;
    onPageChange(num);
  };

  return (
    <nav
      aria-label="Paginación de órdenes"
      style={{
        display:        "flex",
        alignItems:     "center",
        justifyContent: "center",
        gap:            "4px",
        padding:        "32px 0",
      }}
    >
      {/* Anterior */}
      <motion.button
        onClick={() => handlePage(currentPage - 1)}
        disabled={isFirst}
        whileHover={!isFirst ? { x: -2 } : {}}
        whileTap={!isFirst ? { scale: 0.9 } : {}}
        style={{
          display:         "flex",
          alignItems:      "center",
          justifyContent:  "center",
          width:           "32px",
          height:          "32px",
          borderRadius:    "var(--radius-md)",
          border:          "0.5px solid var(--color-border-medium)",
          background:      "transparent",
          color:           isFirst ? "var(--color-text-tertiary)" : "var(--color-text-primary)",
          opacity:         isFirst ? 0.4 : 1,
          cursor:          isFirst ? "not-allowed" : "pointer",
          transition:      "background 150ms ease",
        }}
      >
        <ChevronLeft size={14} strokeWidth={1.5} />
      </motion.button>

      {/* Páginas */}
      {allPages.map((page, index) => {
        const isActive = page === currentPage;
        const isDots   = page === "...";

        return (
          <motion.button
            key={`${page}-${index}`}
            onClick={() => handlePage(page)}
            disabled={isDots}
            whileHover={!isActive && !isDots ? { y: -1 } : {}}
            whileTap={!isActive && !isDots ? { scale: 0.9 } : {}}
            style={{
              display:        "flex",
              alignItems:     "center",
              justifyContent: "center",
              width:          "32px",
              height:         "32px",
              borderRadius:   "var(--radius-md)",
              fontSize:       "13px",
              fontWeight:     isActive ? 500 : 400,
              border:         isActive
                ? "1.5px solid var(--color-obsidian)"
                : "0.5px solid transparent",
              background:     isActive ? "var(--color-obsidian)" : "transparent",
              color:          isActive
                ? "var(--color-linen)"
                : isDots
                ? "var(--color-text-tertiary)"
                : "var(--color-text-secondary)",
              cursor:         isDots ? "default" : "pointer",
              transition:     "background 150ms ease, color 150ms ease",
            }}
          >
            {page}
          </motion.button>
        );
      })}

      {/* Siguiente */}
      <motion.button
        onClick={() => handlePage(currentPage + 1)}
        disabled={isLast}
        whileHover={!isLast ? { x: 2 } : {}}
        whileTap={!isLast ? { scale: 0.9 } : {}}
        style={{
          display:        "flex",
          alignItems:     "center",
          justifyContent: "center",
          width:          "32px",
          height:         "32px",
          borderRadius:   "var(--radius-md)",
          border:         "0.5px solid var(--color-border-medium)",
          background:     "transparent",
          color:          isLast ? "var(--color-text-tertiary)" : "var(--color-text-primary)",
          opacity:        isLast ? 0.4 : 1,
          cursor:         isLast ? "not-allowed" : "pointer",
          transition:     "background 150ms ease",
        }}
      >
        <ChevronRight size={14} strokeWidth={1.5} />
      </motion.button>
    </nav>
  );
};