import Link from "next/link";
import { ArcLogomark } from "@/src/components/shared/LogoArc";

export default function PageLogin() {
  return (
    <section
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
        {/* Header — logo + título en fila */}
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
              Bienvenido
            </h1>
            <p
              style={{ fontSize: "13px", color: "var(--color-text-tertiary)" }}
            >
              Ingresa a tu cuenta para continuar
            </p>
          </div>
        </div>

        {/* Formulario */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
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

          <button
            className="btn btn-primary w-full"
            style={{ marginTop: "8px" }}
          >
            Ingresar
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
            href="/auth/new-account"
            className="btn btn-secondary w-full"
            style={{ textAlign: "center" }}
          >
            Crear una nueva cuenta
          </Link>
        </div>
      </div>
    </section>
  );
}
