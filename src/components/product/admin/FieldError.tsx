"use client";

import { motion, AnimatePresence } from "framer-motion";

interface Props {
  message?: string;
}

//* Componente atómico reutilizable para mensajes de error de formulario.
//* Reemplaza el bloque AnimatePresence + motion.p que se repetía x7 en ProductForm.
export const FieldError = ({ message }: Props) => (
  <AnimatePresence>
    {message && (
      <motion.p
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: "auto" }}
        exit={{ opacity: 0, height: 0 }}
        style={{
          fontSize: "11px",
          color: "var(--color-error)",
          marginTop: "4px",
        }}
      >
        {message}
      </motion.p>
    )}
  </AnimatePresence>
);
