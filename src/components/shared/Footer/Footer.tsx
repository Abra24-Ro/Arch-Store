import Link from "next/link";

const LINKS = [
  { href: "/privacy",  label: "Privacidad" },
  { href: "/terms",    label: "Términos"   },
  { href: "/contact",  label: "Contacto"   },
];

export const Footer = () => {
  return (
    <footer
      className="page-container"
      style={{
        paddingTop: "28px",
        paddingBottom: "28px",
        borderTop: "0.5px solid var(--color-border)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: "16px",
      }}
    >
      <span style={{
        fontFamily: "var(--font-display)",
        fontSize: "13px",
        fontWeight: 600,
        letterSpacing: "-0.01em",
        color: "var(--color-text-primary)",
      }}>
        arc
      </span>

      <nav style={{ display: "flex", gap: "24px" }}>
        {LINKS.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            style={{
              fontSize: "11px",
              fontWeight: 500,
              
              letterSpacing: "0.10em",
              textTransform: "uppercase",
              color: "var(--color-text-tertiary)",
              transition: "color 150ms ease",
            }}
            className="footer-link"
          >
            {label}
          </Link>
        ))}
      </nav>

      <span style={{
        fontSize: "11px",
        color: "var(--color-text-tertiary)",
      }}>
        © {new Date().getFullYear()} Arc Store
      </span>
    </footer>
  );
};