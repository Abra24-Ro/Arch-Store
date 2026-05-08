import Link from "next/link";
import { ArcLogomark } from "@/src/components/shared/LogoArc";

export default function PageNewAccount() {
  return (
    <main
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "calc(100vh - 96px)",
        padding: "40px 20px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "460px",
          background: "var(--color-bg)",
          border: "0.5px solid var(--color-border)",
          borderRadius: "var(--radius-lg)",
          padding: "48px 48px",
          boxShadow: "var(--shadow-md)",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "14px",
            marginBottom: "36px",
          }}
        >
          <ArcLogomark size="lg" variant="dark" />
          <div>
            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "22px",
                fontWeight: 500,
                letterSpacing: "-0.02em",
                color: "var(--color-text-primary)",
                lineHeight: 1.1,
                marginBottom: "3px",
              }}
            >
              Crear cuenta
            </h1>
            <p
              style={{ fontSize: "13px", color: "var(--color-text-tertiary)" }}
            >
              Únete a Arc Store
            </p>
          </div>
        </div>

        {/* Formulario */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {/* Nombre y Apellido */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "12px",
            }}
          >
            <div className="input-group">
              <label htmlFor="firstName" className="input-label">
                Nombre
              </label>
              <input id="firstName" type="text" className="input" />
            </div>
            <div className="input-group">
              <label htmlFor="lastName" className="input-label">
                Apellido
              </label>
              <input id="lastName" type="text" className="input" />
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="email" className="input-label">
              Correo electrónico
            </label>
            <input
              id="email"
              type="email"
              className="input"
              placeholder="tu@email.com"
            />
          </div>

          <div className="input-group">
            <label htmlFor="password" className="input-label">
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              className="input"
              placeholder="••••••••"
            />
          </div>

          <div className="input-group">
            <label htmlFor="confirmPassword" className="input-label">
              Confirmar contraseña
            </label>
            <input
              id="confirmPassword"
              type="password"
              className="input"
              placeholder="••••••••"
            />
          </div>

          <button
            className="btn btn-primary w-full"
            style={{ marginTop: "8px" }}
          >
            Crear cuenta
          </button>

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
            href="/auth/login"
            className="btn btn-secondary w-full"
            style={{ textAlign: "center" }}
          >
            Ya tengo una cuenta
          </Link>
        </div>
      </div>
    </main>
  );
}
