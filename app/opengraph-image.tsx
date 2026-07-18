import { ImageResponse } from "next/og";

// Dynamic share card — bone paper, charcoal ink, a monumental sans headline over a
// serif italic line (system fonts stand in for PP; Satori can't embed woff2).
export const runtime = "edge";
export const alt = "Krystal Brook Coterie — editorial luxury web design, custom-coded";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

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
          backgroundColor: "#EBE5D8",
          backgroundImage:
            "radial-gradient(circle at 80% 18%, rgba(158,130,100,0.18), transparent 55%), radial-gradient(circle at 10% 95%, rgba(198,169,138,0.16), transparent 55%)",
          color: "#23201B",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 22,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: "#6E675B",
          }}
        >
          Digital identities for luxury brands
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div
            style={{
              fontSize: 128,
              fontWeight: 800,
              lineHeight: 0.9,
              letterSpacing: -3,
              textTransform: "uppercase",
              maxWidth: 1000,
            }}
          >
            Websites with presence.
          </div>
          <div style={{ fontSize: 30, fontStyle: "italic", fontFamily: "Georgia, serif", color: "#5C554A" }}>
            For founder-led beauty, wellness & luxury brands.
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <div style={{ width: 56, height: 2, backgroundColor: "#C6A98A" }} />
          <div style={{ fontSize: 30, letterSpacing: 1, fontFamily: "Georgia, serif" }}>
            Krystal Brook Coterie
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
