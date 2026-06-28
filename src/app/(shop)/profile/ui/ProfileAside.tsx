import {
  BadgeCheck,
  CheckCircle2,
  MailCheck,
  ShieldCheck,
  UserCog,
} from "lucide-react";
import Link from "next/link";

interface Props {
  isAdmin: boolean;
}

export const ProfileAside = ({ isAdmin }: Props) => {
  const securityItems = [
    {
      label: "Sesión activa",
      icon: CheckCircle2,
    },
    {
      label: "Correo protegido",
      icon: MailCheck,
    },
    {
      label: "Rol gestionado por el sistema",
      icon: UserCog,
    },
  ];
  return (
    <aside
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
          gap: "16px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <ShieldCheck
            size={17}
            strokeWidth={1.5}
            color="var(--color-text-tertiary)"
          />
          <h2 className="text-h3">Seguridad de cuenta</h2>
        </div>

        <p
          style={{
            color: "var(--color-text-secondary)",
            fontSize: "var(--text-sm)",
          }}
        >
          Tu sesión está protegida por autenticación. Los cambios de datos
          sensibles se implementarán en una etapa posterior.
        </p>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          {securityItems.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.label}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  color: "var(--color-text-secondary)",
                  fontSize: "var(--text-sm)",
                }}
              >
                <span
                  style={{
                    width: "24px",
                    height: "24px",
                    borderRadius: "var(--radius-full)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "rgba(61, 122, 90, 0.1)",
                    color: "var(--color-success)",
                    flexShrink: 0,
                  }}
                >
                  <Icon size={13} strokeWidth={1.8} />
                </span>
                {item.label}
              </div>
            );
          })}
        </div>
      </article>

      {isAdmin && (
        <Link
          href="/admin"
          className="btn btn-primary"
          style={{ width: "100%" }}
        >
          <BadgeCheck size={15} strokeWidth={1.5} />
          Ir al panel admin
        </Link>
      )}
    </aside>
  );
};
