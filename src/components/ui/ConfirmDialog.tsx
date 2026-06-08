"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ReactNode } from "react";

interface Props {
  isOpen: boolean;
  title: string;
  description: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmLabel?: string;
  cancelLabel?: string;
  preview?: ReactNode; //* slot opcional — imagen, texto, lo que sea
}

export const ConfirmDialog = ({
  isOpen,
  title,
  description,
  onConfirm,
  onCancel,
  confirmLabel = "Eliminar",
  cancelLabel = "Cancelar",
  preview,
}: Props) => (
  <AnimatePresence>
    {isOpen && (
      <>
        {/* Backdrop */}
        <motion.div
          key="backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onCancel}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.4)",
            zIndex: 50,
          }}
        />

        {/* Dialog */}
      
        <motion.div
          key="dialog"
          initial={{ opacity: 0, scale: 0.95, y: 8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 8 }}
          transition={{ duration: 0.2, ease: [0.25, 0, 0, 1] }}
          style={{
            position: "fixed",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 51,
            pointerEvents: "none",
          }}
        >
          <div
            style={{
              background: "var(--color-bg)",
              border: "0.5px solid var(--color-border)",
              borderRadius: "var(--radius-lg)",
              padding: "28px 32px",
              width: "min(320px, 90vw)", //* respeta mobile
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              pointerEvents: "all",
            }}
          >
            {/* Preview slot + texto */}
            <div style={{ display: "flex", gap: "14px", alignItems: "center" }}>
              {preview && <div style={{ flexShrink: 0 }}>{preview}</div>}
              <div>
                <p
                  style={{
                    fontSize: "13px",
                    fontWeight: 500,
                    color: "var(--color-text-primary)",
                    marginBottom: "4px",
                  }}
                >
                  {title}
                </p>
                <p
                  style={{
                    fontSize: "12px",
                    color: "var(--color-text-tertiary)",
                    lineHeight: 1.4,
                  }}
                >
                  {description}
                </p>
              </div>
            </div>

            {/* Acciones */}
            <div style={{ display: "flex", gap: "8px" }}>
              <motion.button
                type="button"
                onClick={onCancel}
                whileTap={{ scale: 0.97 }}
                className="btn"
                style={{ flex: 1, fontSize: "13px" }}
              >
                {cancelLabel}
              </motion.button>
              <motion.button
                type="button"
                onClick={onConfirm}
                whileTap={{ scale: 0.97 }}
                className="btn"
                style={{
                  flex: 1,
                  fontSize: "13px",
                  background: "var(--color-error)",
                  color: "#fff",
                  border: "none",
                }}
              >
                {confirmLabel}
              </motion.button>
            </div>
          </div>
        </motion.div>
      </>
    )}
  </AnimatePresence>
);
