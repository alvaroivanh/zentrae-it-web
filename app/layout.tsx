import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://zentrae.com"),
  title: {
    default: "Zentrae IT — Construimos lo que tu negocio necesita para crecer",
    template: "%s · Zentrae IT",
  },
  description:
    "Agencia colombiana de automatización con IA. Construimos páginas web, e-commerce, integraciones y agentes conversacionales para PYMES de LATAM.",
  keywords: [
    "desarrollo web",
    "automatización IA",
    "Bogotá",
    "Colombia",
    "Next.js",
    "WhatsApp Business",
    "e-commerce",
    "Zentrae",
  ],
  authors: [{ name: "Zentrae IT" }],
  openGraph: {
    type: "website",
    locale: "es_CO",
    url: "https://zentrae.com",
    siteName: "Zentrae IT",
    title: "Zentrae IT — Diseño, desarrollo y automatización con IA",
    description:
      "Construimos producto digital con visión de negocio. Web, e-commerce, integraciones y agentes con IA para LATAM.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Zentrae IT",
    description: "Diseño, desarrollo y automatización con IA para LATAM.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0F0F14",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={inter.variable}>
      <body className="min-h-screen bg-ink text-fg antialiased">
        <a
          href="#hero"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:text-fg focus:shadow-lg"
        >
          Saltar al contenido principal
        </a>
        {children}
      </body>
    </html>
  );
}
