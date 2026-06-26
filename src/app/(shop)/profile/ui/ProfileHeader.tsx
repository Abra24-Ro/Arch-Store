interface Props {
  title: string;
  subtitle: string;
}

export const ProfileHeader = ({ title, subtitle }: Props) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      <p className="text-label">Cuenta</p>
      <h1 className="text-h1">{title}</h1>
      <p
        style={{
          maxWidth: "560px",
          color: "var(--color-text-secondary)",
          fontSize: "var(--text-sm)",
        }}
      >
        {subtitle}
      </p>
    </div>
  );
};