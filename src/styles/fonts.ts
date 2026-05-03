import { Sora, DM_Sans, JetBrains_Mono } from "next/font/google";

// * Fuente de titulares — geométrica y elegante
export const sora = Sora({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
  preload: true,
});

// * Fuente de cuerpo — legible y neutral para UI
// ? DM Sans es variable, por eso usamos weight: "variable" + axes para optical sizing
export const dmSans = DM_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: "variable",
  axes: ["opsz"],
  display: "swap",
  preload: true,
});

// * Fuente mono — para precios, SKUs y códigos de descuento
export const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
  preload: false,
});

// * Exporta las tres variables juntas para usar en layout.tsx
export const fontVariables = [
  sora.variable,
  dmSans.variable,
  jetbrainsMono.variable,
].join(" ");