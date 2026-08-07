import type { Config } from "tailwindcss";

/**
 * Krystal Brook Coterie — token system.
 * BONE-LED warm-neutral palette (redesigned 2026-07; supersedes the dark-led atelier).
 * NEVER hardcode hex in components; use these token names. The inversion pair is
 * `bone` (light) + `ink` (warm charcoal); muted/hairlines are opacities of the pair.
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
        // — The inversion pair (canvas ↔ ink) —
        bone: "#EBE5D8", //  primary canvas (warm ivory paper); ink-color on charcoal
        ink: "#23201B", //  warm faded charcoal — primary ink; bg for charcoal sections
        // — Paper elevation —
        stone: "#E0D8C7", //  deeper paper — raised panels, subtle alt-section rhythm
        // — Warmed dark + the wine flare (the editorial accent) —
        charcoal: "#1E1418", //  warmed near-black — dark SECTION backgrounds (aubergine-tinted)
        cherry: "#8A1F52", //  the wine-fuchsia flare — one word/label per view; passes AA (~7:1) as text on bone
        maroon: "#4A1130", //  deep wine — gradient depth, button hover
        blush: "#E9A0C6", //  the flare on charcoal — light wine tint for dark sections
        mocha: "#9A8264", //  deep warm neutral — imagery / atmosphere only
      },
      // Fluid, clamp-based display scale — fashion-house large, no breakpoint jumps.
      // Tight leading + negative tracking baked in for the display steps.
      fontSize: {
        "fluid-sm": ["clamp(0.85rem, 0.82rem + 0.15vw, 0.95rem)", { lineHeight: "1.5" }],
        "fluid-base": ["clamp(1rem, 0.96rem + 0.2vw, 1.125rem)", { lineHeight: "1.6" }],
        "fluid-lg": ["clamp(1.15rem, 1.05rem + 0.5vw, 1.5rem)", { lineHeight: "1.5" }],
        "fluid-xl": [
          "clamp(1.6rem, 1.2rem + 1.6vw, 2.4rem)",
          { lineHeight: "1.12", letterSpacing: "-0.01em" },
        ],
        "fluid-2xl": [
          "clamp(2.2rem, 1.4rem + 3.2vw, 3.6rem)",
          { lineHeight: "1.02", letterSpacing: "-0.015em" },
        ],
        "fluid-3xl": [
          "clamp(2.8rem, 1.6rem + 5vw, 5.5rem)",
          { lineHeight: "0.98", letterSpacing: "-0.02em" },
        ],
        "fluid-display": [
          "clamp(3.4rem, 1.4rem + 8vw, 8.5rem)",
          { lineHeight: "0.94", letterSpacing: "-0.025em" },
        ],
        "fluid-hero": [
          "clamp(4rem, 1rem + 11vw, 12rem)",
          { lineHeight: "0.9", letterSpacing: "-0.03em" },
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
        // Neue Montreal carries both body and display (bold sans headlines);
        // Editorial New is the italic serif accent + wordmark.
        sans: ["var(--font-sans)"],
        display: ["var(--font-sans)"],
        editorial: ["var(--font-editorial)"],
      },
    },
  },
  plugins: [],
};
export default config;
