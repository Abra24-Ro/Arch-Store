import type { Metadata, Viewport } from "next";

import { fontVariables } from "../styles/fonts";
import "./globals.css";
import { Providers } from "../providers";

// * SEO y metadatos de la tienda
export const metadata: Metadata = {
  icons: {
    icon: "/favicon.svg",
  },
  title: {
    default: "Arc Store — Moda que habla por ti",
    template: "%s · Arc Store",
  },
  description:
    "Ropa y accesorios de moda para mujer, hombre y niños. Diseño contemporáneo, calidad premium y estilo sin esfuerzo.",
  keywords: [
    "moda",
    "ropa mujer",
    "ropa hombre",
    "ropa niños",
    "accesorios",
    "tienda de moda",
    "moda premium",
    "estilo contemporáneo",
  ],
  authors: [{ name: "Arc Store" }],
  creator: "Arc Store",
  // ! Definir NEXT_PUBLIC_SITE_URL en producción
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  ),
  openGraph: {
    type: "website",
    locale: "es_ES",
    siteName: "Arc Store",
    title: "Arc Store — Moda que habla por ti",
    description:
      "Ropa y accesorios para mujer, hombre y niños. Estilo contemporáneo y calidad premium.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Arc Store — Moda que habla por ti",
    description:
      "Ropa y accesorios para mujer, hombre y niños. Estilo contemporáneo y calidad premium.",
  },
  robots: { index: true, follow: true },
};

// * themeColor adapta el chrome del navegador móvil al modo de color del sistema
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F5F4F2" },
    { media: "(prefers-color-scheme: dark)", color: "#111110" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // ? suppressHydrationWarning evita warnings de extensiones del navegador
    <html
      lang="es"
      className={`${fontVariables} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
