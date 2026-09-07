import { ImageResponse } from "next/og";

/**
 * Dynamic share card — the first thing anyone sees when a link to this site is
 * posted anywhere, so it has to carry the current identity exactly.
 *
 * Milk canvas, DISPLAY register (regular weight, sentence case, hard negative
 * tracking), one flare word, one flare rule. Satori cannot embed .woff2, so the
 * system sans stands in for PP Neue Montreal — the WEIGHT and CASING still read
 * correctly, which is what carries the register.
 *
 * Hex is written literally here because Satori resolves no Tailwind classes; these
 * MUST be kept in step with tailwind.config by hand. Values below are milk / ink /
 * ink@70% / flare / flare, in that order.
 */
export const runtime = "edge";
export const alt = "Krystal Brook Coterie — editorial luxury web design, custom-coded";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const MILK = "#FAF7F0";
const INK = "#23201B";
const INK_MUTED = "#615C53"; // ink at ~70% over milk — clears AA on this canvas
const FLARE = "#FF1744"; // cherry trial (under review 2026-09-07 — keep in step with tailwind.config.ts)

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
        {/* META register — 13px caps at +0.13em, scaled for a 1200px canvas */}
        <div
          style={{
            fontSize: 22,
            fontWeight: 600,
            letterSpacing: 2.9,
            textTransform: "uppercase",
            color: INK_MUTED,
          }}
        >
          Digital identities for luxury brands
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          {/* DISPLAY register — weight 400, sentence case, −0.06em, leading 0.92.
              The flare falls on exactly one word, as everywhere else. */}
          <div
            style={{
              display: "flex",
              fontSize: 132,
              fontWeight: 400,
              lineHeight: 0.92,
              letterSpacing: -8,
              maxWidth: 1000,
            }}
          >
            <span>Websites with&nbsp;</span>
            <span style={{ color: FLARE }}>presence.</span>
          </div>
          <div style={{ fontSize: 30, color: INK_MUTED }}>
            For founder-led beauty, wellness &amp; luxury brands.
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <div style={{ width: 56, height: 1, backgroundColor: FLARE }} />
          <div style={{ fontSize: 24, fontWeight: 500, letterSpacing: 1.5, textTransform: "uppercase" }}>
            Krystal Brook Coterie
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
