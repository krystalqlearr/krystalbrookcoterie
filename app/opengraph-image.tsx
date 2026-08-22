import { ImageResponse } from "next/og";

// Dynamic share card — milk paper, ink, one neon flare word. System sans stands
// in for PP Neue Montreal (Satori can't embed woff2). This file is the ONE
// sanctioned hardcoded-hex exception: Satori resolves no Tailwind.
export const runtime = "edge";
export const alt = "Krystal Brook Coterie — editorial luxury web design, custom-coded";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const MILK = "#FDFBF6";
const INK = "#23201B";
const NEON = "#FF0080";
const MUTED = "rgba(35,32,27,0.70)";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          backgroundColor: MILK,
          color: INK,
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 22,
            fontWeight: 600,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: MUTED,
          }}
        >
          Digital identities for luxury brands
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              fontSize: 124,
              fontWeight: 400,
              lineHeight: 0.94,
              letterSpacing: -6,
              maxWidth: 1040,
            }}
          >
            <span>Websites with&nbsp;</span>
            <span style={{ color: NEON }}>presence.</span>
          </div>
          <div style={{ fontSize: 30, color: MUTED }}>
            For founder-led beauty, wellness &amp; luxury brands.
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <div style={{ width: 48, height: 3, backgroundColor: NEON }} />
          <div
            style={{
              fontSize: 24,
              fontWeight: 500,
              letterSpacing: 3,
              textTransform: "uppercase",
            }}
          >
            Krystal Brook Coterie
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
