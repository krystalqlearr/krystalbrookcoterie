import type { Config } from "tailwindcss";

/**
 * Krystal Brook Coterie — THE COTERIE SYSTEM (2026-08; supersedes wine/cherry).
 * "Clear water, deliberate K": milk-led luminous paper, a deep-river inversion,
 * and an electric-magenta flare rationed to ONE element per view.
 * NEVER hardcode hex in components; use these token names. Elevation only goes
 * DOWN from milk (bone → stone recesses); muted text/hairlines are opacities of
 * ink (paper) or bone (river). Flare stop is chosen by SIZE and CANVAS, not taste.
 */
const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    // Editorial container: wide gutters, capped measure, centered track.
    container: {
      center: true,
      padding: {
        DEFAULT: "1.5rem", // 24px  — mobile gutter
        sm: "2rem", // 32px
        lg: "4rem", // 64px  — wide editorial gutter
        xl: "6rem", // 96px
        "2xl": "8rem", // 128px — generous desktop gutter
      },
      screens: {
        sm: "40rem", // 640px
        md: "48rem", // 768px
        lg: "64rem", // 1024px
        xl: "80rem", // 1280px
        "2xl": "90rem", // 1440px — editorial max canvas
      },
    },
    extend: {
      colors: {
        // — The paper (one stock, three sheets; elevation only goes DOWN) —
        milk: "#FDFBF6", //  the canvas — luminous near-white warm paper (default page)
        bone: "#EBE5D8", //  first recess — warm alt-sections; also the light ink on river
        stone: "#E0D8C7", //  deepest recess — the quietest band; never carries the neon flare
        field: "#F1ECE2", //  inset form fields on MILK only (a soft step down from the canvas)
        ink: "#23201B", //  warm faded charcoal-brown — primary text + the filled-button surface
        // — The dark is punctuation —
        river: "#0F2A2D", //  deep river — the inversion moment (water at depth); 1–2 per page
        // — The flare, in three stops (by size + canvas, never by taste) —
        neon: "#FF0080", //  graphics + text ≥24px on milk/bone/river; never small text, never on stone
        "flare-deep": "#A8004F", //  flare TEXT <24px on paper (eyebrows, index) + primary-button hover
        "flare-lift": "#FF7ABF", //  the flare on river — safe for small text on the dark
      },
      // Fluid, clamp-based display scale — Regular 400, sentence case, short
      // declarative sentences that end in a period. Tracking + leading live HERE
      // (never hand-tune a heading). Every display step floors ≥24px on purpose:
      // that keeps all of them inside WCAG "large text", which is the only reason
      // the neon flare can colour a heading word at any viewport.
      fontSize: {
        // Meta register — Semibold 600, UPPERCASE, the only uppercase on the site.
        meta: ["0.8125rem", { lineHeight: "1.4", letterSpacing: "0.13em" }],
        "fluid-sm": ["clamp(0.85rem, 0.82rem + 0.15vw, 0.95rem)", { lineHeight: "1.5" }],
        "fluid-base": ["clamp(1rem, 0.96rem + 0.2vw, 1.125rem)", { lineHeight: "1.6" }],
        "fluid-lg": ["clamp(1.15rem, 1.05rem + 0.5vw, 1.5rem)", { lineHeight: "1.5" }],
        "fluid-xl": [
          "clamp(1.6rem, 1.3rem + 1.5vw, 2.25rem)", //  → 36px
          { lineHeight: "1.0", letterSpacing: "-0.045em" },
        ],
        "fluid-2xl": [
          "clamp(1.9rem, 1.35rem + 2.6vw, 2.75rem)", //  → 44px
          { lineHeight: "0.96", letterSpacing: "-0.05em" },
        ],
        "fluid-3xl": [
          "clamp(2.4rem, 1.55rem + 4vw, 4.25rem)", //  → 68px
          { lineHeight: "0.93", letterSpacing: "-0.055em" },
        ],
        "fluid-display": [
          "clamp(2.75rem, 1.6rem + 5.4vw, 5.25rem)", //  → 84px
          { lineHeight: "0.92", letterSpacing: "-0.058em" },
        ],
        "fluid-hero": [
          "clamp(3.25rem, 1.9rem + 6.4vw, 6.75rem)", //  → 108px
          { lineHeight: "0.92", letterSpacing: "-0.06em" },
        ],
      },
      // Motion tokens — the ONLY sanctioned easing/durations (mirror lib/motion.ts).
      transitionTimingFunction: {
        editorial: "cubic-bezier(0.16, 1, 0.3, 1)", //  primary weighted ease-out
        "editorial-inout": "cubic-bezier(0.83, 0, 0.17, 1)", //  symmetric morphs
      },
      transitionDuration: {
        "400": "400ms",
        "600": "600ms",
        "700": "700ms",
        "900": "900ms",
      },
      zIndex: {
        header: "50",
        overlay: "200",
        "overlay-top": "220",
        cursor: "9999",
      },
      // Editorial vertical rhythm — generous, spacious section spacing.
      spacing: {
        18: "4.5rem", //  72px
        22: "5.5rem", //  88px
        26: "6.5rem", //  104px
        30: "7.5rem", //  120px
        38: "9.5rem", //  152px
        46: "11.5rem", //  184px
        section: "8rem", //  128px — default vertical section rhythm
        "section-lg": "12rem", //  192px — hero / feature vertical rhythm
        gutter: "4rem", //  64px  — wide editorial horizontal gutter
      },
      maxWidth: {
        measure: "68ch", //  comfortable reading measure
        editorial: "90rem", //  1440px — editorial content cap
      },
      fontFamily: {
        // ONE typeface: PP Neue Montreal carries everything (display, body, UI,
        // meta, wordmark). PP Editorial New is RETIRED — no second voice.
        sans: ["var(--font-sans)"],
        display: ["var(--font-sans)"],
      },
    },
  },
  plugins: [],
};
export default config;
