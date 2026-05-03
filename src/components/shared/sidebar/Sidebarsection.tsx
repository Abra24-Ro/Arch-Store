import { SidebarLink } from "./Sidebarlink";

interface SidebarItem {
  href: string;
  label: string;
}

interface Props {
  title: string;
  items: SidebarItem[];
  variant?: "primary" | "secondary";
}

export const SidebarSection = ({ title, items, variant = "primary" }: Props) => {
  return (
    <div style={{ padding: "20px 24px 8px" }}>
      <p style={{
        fontSize: "10px",
        fontWeight: 500,
        letterSpacing: "0.16em",
        textTransform: "uppercase",
        color: "var(--color-text-tertiary)",
        marginBottom: "8px",
      }}>
        {title}  
      </p>

      {items.map(({ href, label }, i) => (
        <SidebarLink
          key={href}
          href={href}
          label={label}
          index={i}
          variant={variant}
        />
      ))}
    </div>
  );
};