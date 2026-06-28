import { ArrowRight } from "lucide-react";
import Link from "next/link";
import type { ProfileQuickAction } from "./profile-quick-actions";

interface Props {
  actions: ProfileQuickAction[];
}

export const ProfileQuickActions = ({ actions }: Props) => {
  return (
    <section
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        gap: "16px",
      }}
    >
      {actions.map((action) => {
        const Icon = action.icon;

        return (
          <Link
            key={action.href}
            href={action.href}
            className="card card-hover"
            style={{
              padding: "18px",
              display: "grid",
              gridTemplateColumns: "34px 1fr auto",
              alignItems: "center",
              gap: "14px",
              cursor: "pointer",
            }}
          >
            <span
              style={{
                width: "34px",
                height: "34px",
                borderRadius: "var(--radius-md)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "var(--color-accent-light)",
                color: "var(--color-accent-dim)",
                flexShrink: 0,
              }}
            >
              <Icon size={16} strokeWidth={1.5} />
            </span>

            <span
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "4px",
              }}
            >
              <span
                style={{
                  fontSize: "var(--text-sm)",
                  fontWeight: 500,
                  color: "var(--color-text-primary)",
                }}
              >
                {action.label}
              </span>

              <span
                style={{
                  fontSize: "var(--text-xs)",
                  color: "var(--color-text-tertiary)",
                  lineHeight: 1.5,
                }}
              >
                {action.description}
              </span>
            </span>

            <ArrowRight
              size={14}
              strokeWidth={1.5}
              style={{
                color: "var(--color-text-tertiary)",
              }}
            />
          </Link>
        );
      })}
    </section>
  );
};
