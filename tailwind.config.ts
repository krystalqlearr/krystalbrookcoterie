import type { Config } from "tailwindcss";

/**
 * Krystal Brook Coterie — token system.
 * 7 tokens, dark-led canvas. NEVER hardcode hex in components; use these token names.
 * Hex values are pinned here as comments so value integrity is auditable:
 * when refactoring, preserve VALUES, never remap by name.
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
        // — Canvas —
        "rich-black": "#0A0A0A", //  primary canvas / ink on light
        "deep-petrol": "#052029", //  FOOTER ONLY — never a section background elsewhere
        // — Text / surfaces —
        cream: "#EFEEE8", //  light text on dark / light surfaces
        greige: "#B2ABA0", //  muted text; eyebrow on petrol (AA contrast)
        // — Accents —
        mocha: "#9E8062", //  warm neutral accent
        terracotta: "#BF6940", //  primary warm accent; the custom cursor dot
        teal: "#287B8B", //  STRUCTURAL accent only — rules, dividers, markers, cursor hover ring
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
