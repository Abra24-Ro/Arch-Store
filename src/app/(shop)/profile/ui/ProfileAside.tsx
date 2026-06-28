import {
  BadgeCheck,
  CheckCircle2,
  MailCheck,
  ShieldCheck,
  UserCog,
} from "lucide-react";
import Link from "next/link";

const securityItems = [
  {
    label: "Sesión activa",
    description: "Tu acceso se mantiene verificado.",
    icon: CheckCircle2,
  },
  {
    label: "Correo protegido",
    description: "No se modifica desde esta sección.",
    icon: MailCheck,
  },
  {
    label: "Rol gestionado por el sistema",
    description: "Los permisos están protegidos.",
    icon: UserCog,
  },
];

interface Props {
  isAdmin: boolean;
}

export const ProfileAside = ({ isAdmin }: Props) => {
  return (
    <aside
      aria-label="Seguridad y accesos de cuenta"
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
      }}
    >
      <article
        className="card-surface"
        style={{
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          gap: "18px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <ShieldCheck
            size={17}
            strokeWidth={1.5}
            style={{ color: "var(--color-text-tertiary)" }}
          />

          <h2 className="text-h3">Seguridad de cuenta</h2>
        </div>

        <p
          style={{
            color: "var(--color-text-secondary)",
            fontSize: "var(--text-sm)",
            lineHeight: 1.7,
          }}
        >
          Tu sesión está protegida por autenticación. Los cambios de datos
          sensibles se implementarán en una etapa posterior.
        </p>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "12px",
          }}
        >
          {securityItems.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.label}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "10px",
                }}
              >
                <span
                  aria-hidden="true"
                  style={{
                    width: "26px",
                    height: "26px",
                    borderRadius: "var(--radius-full)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "rgba(61, 122, 90, 0.1)",
                    color: "var(--color-success)",
                    flexShrink: 0,
                    marginTop: "1px",
                  }}
                >
                  <Icon size={13} strokeWidth={1.8} />
                </span>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "2px",
                    minWidth: 0,
                  }}
                >
                  <span
                    style={{
                      color: "var(--color-text-primary)",
                      fontSize: "var(--text-sm)",
                      fontWeight: 500,
                    }}
                  >
                    {item.label}
                  </span>

                  <span
                    style={{
                      color: "var(--color-text-tertiary)",
                      fontSize: "var(--text-xs)",
                      lineHeight: 1.5,
                    }}
                  >
                    {item.description}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </article>

      {isAdmin && (
        <article
          className="card-surface"
          style={{
            padding: "18px",
            display: "flex",
            flexDirection: "column",
            gap: "14px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "4px",
            }}
          >
            <h2 className="text-h3">Acceso administrativo</h2>

            <p
              style={{
                color: "var(--color-text-secondary)",
                fontSize: "var(--text-sm)",
                lineHeight: 1.6,
              }}
            >
              Gestiona productos, pedidos y usuarios desde el panel interno.
            </p>
          </div>

          <Link
            href="/admin"
            className="btn btn-primary"
            style={{ width: "100%" }}
          >
            <BadgeCheck size={15} strokeWidth={1.5} />
            Ir al panel de administración
          </Link>
        </article>
      )}
    </aside>
  );
};