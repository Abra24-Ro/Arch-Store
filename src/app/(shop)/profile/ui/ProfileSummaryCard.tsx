import { ProfileEditPanel } from "./ProfileEditPanel";
interface Props {
  fullName: string;
  initials: string;
  email: string;
  name?: string | null;
  lastName?: string | null;
  roleLabel: string;
}

export const ProfileSummaryCard = ({
  fullName,
  initials,
  email,
  name,
  lastName,
  roleLabel,
}: Props) => {
  return (
    <article
      className="card"
      style={{
        padding: "24px",
        display: "flex",
        flexDirection: "column",
        gap: "24px",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <div
          aria-hidden="true"
          style={{
            width: "64px",
            height: "64px",
            borderRadius: "var(--radius-full)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "var(--color-obsidian)",
            color: "var(--color-linen)",
            fontFamily: "var(--font-display)",
            fontSize: "20px",
            fontWeight: 500,
            letterSpacing: "var(--tracking-wide)",
            flexShrink: 0,
          }}
        >
          {initials}
        </div>

        <div style={{ minWidth: 0 }}>
          <h2
            className="text-h2"
            style={{
              fontSize: "24px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {fullName}
          </h2>
          <p
            style={{
              color: "var(--color-text-tertiary)",
              fontSize: "var(--text-sm)",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {email}
          </p>
        </div>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
        <span className="badge badge-dark">{roleLabel}</span>
        <span className="badge badge-success">Cuenta activa</span>
      </div>

      <div className="divider" />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: "16px",
        }}
      >
        <ProfileField label="Correo" value={email} />
        <ProfileField label="Rol" value={roleLabel} />
        <ProfileField label="Estado" value="Cuenta activa" />
      </div>

      <div className="divider" />

      <ProfileEditPanel name={name} lastName={lastName} />
    </article>
  );
};

interface ProfileFieldProps {
  label: string;
  value?: string | null;
}

const ProfileField = ({ label, value }: ProfileFieldProps) => (
  <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
    <span className="text-label">{label}</span>
    <span
      style={{
        color: value
          ? "var(--color-text-primary)"
          : "var(--color-text-tertiary)",
        fontSize: "var(--text-sm)",
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
      }}
      title={value || "No disponible"}
    >
      {value || "No disponible"}
    </span>
  </div>
);
