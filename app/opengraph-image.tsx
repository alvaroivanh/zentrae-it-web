import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Zentrae IT — Construimos lo que tu negocio necesita para crecer.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Auto-generated Open Graph card for /. Uses the brand palette and the Z
 * mark — no external fonts so it renders deterministically.
 */
export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background:
            "radial-gradient(ellipse 60% 50% at 25% 35%, rgba(127,119,221,0.30), transparent 65%), radial-gradient(ellipse 45% 35% at 80% 80%, rgba(93,202,165,0.20), transparent 65%), #0F0F14",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          color: "#FFFFFF",
          fontFamily: "system-ui, -apple-system, Segoe UI, sans-serif",
        }}
      >
        {/* Top row — brand mark */}
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <svg width="56" height="56" viewBox="0 0 64 64">
            <line x1="10" y1="18" x2="54" y2="18" stroke="#7F77DD" strokeWidth="8" />
            <line x1="54" y1="18" x2="10" y2="46" stroke="#7F77DD" strokeWidth="8" />
            <line x1="10" y1="46" x2="54" y2="46" stroke="#7F77DD" strokeWidth="8" />
            <circle cx="56" cy="10" r="5" fill="#5DCAA5" />
          </svg>
          <div
            style={{
              fontSize: 24,
              letterSpacing: 8,
              fontWeight: 300,
              textTransform: "uppercase",
              color: "#FFFFFF",
            }}
          >
            Zentrae <span style={{ color: "#5DCAA5" }}>IT</span>
          </div>
        </div>

        {/* Headline */}
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              fontSize: 22,
              letterSpacing: 6,
              textTransform: "uppercase",
              color: "#5DCAA5",
              fontWeight: 300,
            }}
          >
            Bogotá · LATAM
          </div>
          <div
            style={{
              fontSize: 84,
              fontWeight: 300,
              lineHeight: 1.05,
              letterSpacing: -1,
              maxWidth: 1000,
            }}
          >
            Construimos lo que tu negocio necesita{" "}
            <span style={{ color: "#AFA9EC" }}>para crecer.</span>
          </div>
          <div
            style={{
              fontSize: 26,
              color: "#B8B8C5",
              maxWidth: 900,
              lineHeight: 1.4,
            }}
          >
            Diseño, desarrollo web y automatización con IA.
          </div>
        </div>

        {/* Bottom row — domain */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 22,
            color: "#8A8A99",
            letterSpacing: 3,
            textTransform: "uppercase",
            fontWeight: 300,
          }}
        >
          <div>zentrae.com</div>
          <div>Producto digital · End-to-end</div>
        </div>
      </div>
    ),
    size,
  );
}
