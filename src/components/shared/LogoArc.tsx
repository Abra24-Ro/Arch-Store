// * Logomark y logo completo de Arc Store
// ? El divisor vertical separa el símbolo del wordmark — inspirado en Tesla Shop

type LogoVariant = "dark" | "light" | "copper";
type LogoSize = "xs" | "sm" | "md" | "lg" | "xl";

interface ArcLogomarkProps {
  variant?: LogoVariant;
  size?: LogoSize | number;
  className?: string;
}

const sizes: Record<LogoSize, number> = {
  xs: 18,
  sm: 24,
  md: 32,
  lg: 48,
  xl: 64,
};

const colors: Record<LogoVariant, string> = {
  dark:   "#1A1A1A",
  light:  "#F5F4F2",
  copper: "#C8A882",
};

// * Solo el símbolo — para favicon embebido, iconos y versión mobile
export function ArcLogomark({
  variant = "dark",
  size = "md",
  className,
}: ArcLogomarkProps) {
  const px = typeof size === "number" ? size : sizes[size];
  const color = colors[variant];

  return (
    <svg
      width={px}
      height={px}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Arc Store"
      role="img"
      className={className}
    >
      <circle cx="50" cy="50" r="44" stroke={color} strokeWidth="4.5" />
      <circle cx="50" cy="50" r="32" stroke={color} strokeWidth="2.5" />
      <path
        d="M50 24 L35 70 L50 57 L65 70 Z"
        fill="none"
        stroke={color}
        strokeWidth="3.5"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
}

// ——————————————————————————————————————————
// * Logo completo — símbolo + divisor + wordmark
// ——————————————————————————————————————————

interface ArcLogoProps {
  variant?: LogoVariant;
  size?: LogoSize | number;
  className?: string;
  // * Solo el símbolo sin wordmark — útil en mobile
  iconOnly?: boolean;
  // * Texto del wordmark — por defecto "Arc Store"
  wordmark?: string;
}

export function ArcLogo({
  variant = "dark",
  size = "sm",
  className,
  iconOnly = false,
  wordmark = "Arc Store",
}: ArcLogoProps) {
  const px    = typeof size === "number" ? size : sizes[size];
  const color = colors[variant];

  // Proporciones relativas al tamaño del ícono
  const dividerHeight  = px * 0.70;
  const wordmarkSize   = px * 0.50;
  const dividerSpacing = px * 0.42;

  if (iconOnly) {
    return <ArcLogomark variant={variant} size={size} className={className} />;
  }

  return (
    <div
      className={className}
      style={{
        display:    "inline-flex",
        alignItems: "center",
        userSelect: "none",
      }}
    >
      {/* Símbolo */}
      <ArcLogomark variant={variant} size={size} />

     
      <span
        aria-hidden="true"
        style={{
          display:         "inline-block",
          width:           "0.5px",
          height:          dividerHeight,
          background:      color,
          opacity:         0.30,
          marginInline:    dividerSpacing,
          flexShrink:      0,
        }}
      />

      {/* Wordmark */}
      <span
        style={{
          fontFamily:    "var(--font-display)",
          fontSize:      wordmarkSize,
          fontWeight:    300,
          letterSpacing: "0.24em",
          textTransform: "uppercase",
          color:         color,
          lineHeight:    1,
        }}
      >
        {wordmark}
      </span>
    </div>
  );
}