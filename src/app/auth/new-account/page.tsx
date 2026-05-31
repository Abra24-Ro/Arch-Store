import Link from "next/link";
import { ArcLogomark } from "@/src/components/shared/LogoArc";
import { RegisterForm } from "./ui/RegisterForm";

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
         <RegisterForm />
      </div>
    </main>
  );
}
