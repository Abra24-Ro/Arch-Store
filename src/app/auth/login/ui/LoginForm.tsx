"use client";

import { authenticate } from "@/src/actions/auth/login";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useActionState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle, Loader2 } from "lucide-react";

export const LoginForm = () => {
  const searchParams = useSearchParams();
  const rawCallback = searchParams.get("callbackUrl") || "/";
  const callbackUrl = rawCallback.startsWith("/") ? rawCallback : "/";
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined,
  );

  return (
    <form
      action={formAction}
      style={{ display: "flex", flexDirection: "column", gap: "16px" }}
    >
      <input type="hidden" name="redirectTo" value={callbackUrl} />

      {/* Email */}
      <div className="input-group">
        <label htmlFor="email" className="input-label">
          Correo electrónico
        </label>
        <input
          id="email"
          type="email"
          name="email"
          className="input"
          placeholder="tu@email.com"
          autoComplete="email"
          required
          disabled={isPending}
          style={{ opacity: isPending ? 0.6 : 1 }}
        />
      </div>

      {/* Contraseña */}
      <div className="input-group">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "6px",
          }}
        >
          <label
            htmlFor="password"
            className="input-label"
            style={{ margin: 0 }}
          >
            Contraseña
          </label>
          {/* /* ! Conectar cuando exista la página */}
          <span className="link-subtle">¿Olvidaste tu contraseña?</span>
        </div>
        <input
          id="password"
          type="password"
          name="password"
          className="input"
          placeholder="••••••••"
          autoComplete="current-password"
          required
          disabled={isPending}
          style={{ opacity: isPending ? 0.6 : 1 }}
        />
      </div>

      {/* Error */}
      <AnimatePresence>
        {errorMessage && (
          <motion.div
            initial={{ opacity: 0, y: -4, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -4, height: 0 }}
            transition={{ duration: 0.2 }}
            style={{
              padding: "10px 14px",
              borderRadius: "var(--radius-md)",
              background: "rgba(181,64,64,0.08)",
              border: "0.5px solid var(--color-error)",
              color: "var(--color-error)",
              fontSize: "13px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <AlertCircle
              size={14}
              strokeWidth={1.5}
              style={{ flexShrink: 0 }}
            />
            <span>{errorMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Botón submit */}
      <motion.button
        type="submit"
        className="btn btn-primary w-full"
        disabled={isPending}
        whileTap={!isPending ? { scale: 0.98 } : {}}
        style={{
          marginTop: "8px",
          opacity: isPending ? 0.7 : 1,
          cursor: isPending ? "not-allowed" : "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "8px",
        }}
      >
        {isPending && (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
          >
            <Loader2 size={14} strokeWidth={1.5} />
          </motion.div>
        )}
        {isPending ? "Ingresando..." : "Ingresar"}
      </motion.button>

      {/* Divisor */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <div
          style={{
            flex: 1,
            height: "0.5px",
            background: "var(--color-border)",
          }}
        />
        <span
          style={{
            fontSize: "11px",
            color: "var(--color-text-tertiary)",
            letterSpacing: "0.08em",
          }}
        >
          O
        </span>
        <div
          style={{
            flex: 1,
            height: "0.5px",
            background: "var(--color-border)",
          }}
        />
      </div>

      <Link
        href="/auth/new-account"
        className="btn btn-secondary w-full"
        style={{ textAlign: "center" }}
      >
        Crear una nueva cuenta
      </Link>
    </form>
  );
};
