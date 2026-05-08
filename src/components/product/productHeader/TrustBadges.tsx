import { ShieldCheck, RefreshCcw } from "lucide-react";

const BADGES = [
  { icon: ShieldCheck, label: "Compra protegida · Pago seguro"    },
  { icon: RefreshCcw,  label: "Devoluciones gratuitas en 30 días" },
];

export const TrustBadges = () => {
  return (
    <div>
      <div style={{ height: "0.5px", background: "var(--color-border)", marginBottom: "20px" }} />
      <div className="flex flex-col gap-3">
        {BADGES.map(({ icon: Icon, label }) => (
          <div key={label} className="flex items-center gap-3">
            <Icon size={13} strokeWidth={1.5} style={{ color: "var(--color-text-tertiary)", flexShrink: 0 }} />
            <span style={{ fontSize: "12px", color: "var(--color-text-secondary)" }}>{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};