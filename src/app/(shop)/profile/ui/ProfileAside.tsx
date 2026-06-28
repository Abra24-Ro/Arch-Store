import { BadgeCheck, ShieldCheck } from "lucide-react";
import Link from "next/link";

interface Props {
  isAdmin: boolean;
}

export const ProfileAside = ({ isAdmin }: Props) => {
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
          Tu sesion esta protegida por autenticacion. Los cambios de datos
          sensibles se implementaran en una etapa posterior.
        </p>
      </article>

      {isAdmin && (
        <Link href="/admin" className="btn btn-primary" style={{ width: "100%" }}>
          <BadgeCheck size={15} strokeWidth={1.5} />
          Ir al panel admin
        </Link>
      )}
    </aside>
  );
};