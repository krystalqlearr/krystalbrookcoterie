import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

/**
 * THE VALUES, in one place. Every colour below is exposed to Tailwind as a CSS
 * variable (`--c-milk`, …) rather than a literal, so `bg-milk`, `text-ink/70`
 * and every opacity variant keep working exactly as before — same hex, same
 * output — while a single element can re-point the variables for its subtree.
 * That is how the homepage previews itself on onyx (app/page.tsx,
 * `data-ground="onyx"`; the mapping lives in globals.css): milk ⇄ onyx swap
 * roles, the deep flare stop becomes the neon (the deep stop is 2.8 on onyx and
 * illegal there; the neon is 5.07), and `charcoal` — the retired warm black —
 * comes back with one job, the lift sheet on the dark, because on a black
 * canvas there is nothing lighter than milk to lift a card with.
 *
 * A `-base` copy of each variable is also emitted and never overridden, so an
 * inversion can say "milk becomes onyx" without a circular reference.
 */
const TOKENS = {
  milk: "#FAF7F0",
  white: "#FFFFFF",
  ink: "#23201B",
  onyx: "#0E0C0B",
  charcoal: "#161311",
  flare: "#FF1744",
  "flare-deep": "#B3102E",
} as const;
const rgb = (hex: string) => (hex.match(/\w\w/g) ?? []).map((h) => parseInt(h, 16)).join(" ");
const token = (name: keyof typeof TOKENS) => `rgb(var(--c-${name}) / <alpha-value>)`;

/**
 * Krystal Brook Coterie — token system.
 *
 * BONE-LED warm-neutral palette (2026-07) carried into the GROTESK register
 * (2026-08): a single sans, display set at REGULAR weight in sentence case at
 * large sizes with hard negative tracking and sub-1 leading. The wine flare
 * (cherry) survives as the one accent, used barely.
 *
 * NEVER hardcode hex in components; use these token names. The inversion pair is
 * `milk` (the canvas) + `onyx` (the dark), ink text; muted/hairlines are opacities of the pair.
 */
const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    // `lib/` HOLDS CLASS STRINGS — lib/work.ts carries each project's grid span
    // (`lg:col-span-7`, `lg:col-start-9`…) and gradient field. Without this glob
    // Tailwind never scans them, so those classes are never generated and the
    // asymmetric work grid silently collapses to single columns. Any file that
    // stores a class name as data must be listed here.
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
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
      /**
       * Tailwind's opacity scale is 0, 5, 10, 15, 20 … — 12 is NOT on it, so every
       * `border-ink/12` / `divide-ink/12` hairline (the CLAUDE.md "ink/12–15" rule)
       * was silently ignored and fell back to preflight's grey #E5E7EB. Found
       * 2026-09-07 while re-judging hairlines next to the lipstick flare. Adding
       * the step makes the site's own rule true.
       */
      opacity: { 12: "0.12" },
      colors: {
        /**
         * — THE TWO GROUNDS (2026-09-07 palette) —
         * The site is milk and the blackest black, and nothing in between. The beige
         * recesses (bone #EBE5D8, stone #E0D8C7) are RETIRED: Krystal — "I like the
         * milk, I don't like the stone… there needs to be more contrast; the stone is
         * not a good-looking colour with these bright and vibrant colours." A tint
         * next to a hot red reads cream-and-terracotta; a pale grey would have been
         * cleaner but no more contrasty (1.1–1.3:1 against milk either way). Rhythm on
         * the milk is whitespace and ink hairlines, never tint.
         *
         *   milk   THE CANVAS — every paper surface, and the light ink ON the dark.
         *          Ink 16.2 (AAA); the neon 3.60 (clears the 3:1 large-text bar).
         *   white  THE LIFT — the one sheet ABOVE the canvas: cards and form fields
         *          sit on it with an ink hairline. Never a section fill.
         *   ink    primary text and the filled-button surface. Prices/tags stay ink.
         */
        milk: token("milk"),
        white: token("white"),
        ink: token("ink"),
        /**
         * — THE DARK: onyx —
         * "The blackest warm black" (her words) — a black gemstone, which is the
         * right family for a studio whose living mark is a crystal. Milk text ≈18:1
         * (AAA); the neon 5.07 on it, text-legal at ANY size, so the flare needs no
         * pale "lift" stop on the dark any more. The inversion pair is milk + onyx.
         *
         * Retired darks, in order: forest #0F2018 (colour-wheel complement of
         * magenta), aubergine #1E1418, warm black #13120F, RIVER #0F2A2D (teal —
         * "water at depth", the name story; she: "not liking that teal"), oxblood
         * #24100F (tried live on 2026-09-07, lost to the board's black), warm black
         * #161311 (the interim). Lighten onyx and it stops being the ground the
         * cherry glows against.
         */
        onyx: token("onyx"),
        // The lift sheet ON THE DARK — only ever the value `white` maps to inside an
        // onyx inversion; never a section fill, never used by name on milk pages.
        charcoal: token("charcoal"),
        mocha: "#9A8264", //  deep warm neutral — imagery / atmosphere haze only
        /**
         * THE FLARE — CHERRY (2026-09-07, replaces the electric magenta).
         *
         * Hue 349°, the red side of pink. Magenta #FF0080 sat at 330° and leaned
         * purple; lipstick #FF1F52 (346°) was the runner-up, chosen against cherry
         * on the live site with the flooded card as the swatch. The brief it had to
         * meet: "read feminine but bold enough for a masculine luxury site to still
         * choose me." Neon and AA still can't be one swatch, so the stop is chosen
         * by SIZE, never by taste:
         *
         *  DEFAULT #FF1744  NEON. On milk and white: graphics and text ≥24px only
         *                   (3.60 / 3.85 — the 3:1 large-text bar): arrow glyphs,
         *                   hairline wipes, Rule ticks, heading accent words, the
         *                   drop-cap, ::selection (with ink text, 4.2). On onyx:
         *                   ANY size (5.07). Also the FLOOD — a card/row fills with
         *                   it on hover; display line → milk (3.6), smaller → ink.
         *  deep    #B3102E  TEXT ON PAPER. Anything under 24px that must be
         *                   flare-coloured — 13px eyebrows, indices, tier flags —
         *                   plus the one full-bleed band (milk text) and the
         *                   primary-button hover. 6.48 on milk.
         *
         * `lift` is retired: the neon is its own text colour on onyx.
         */
        flare: {
          DEFAULT: token("flare"),
          deep: token("flare-deep"),
        },
      },
      /**
       * Two registers, one typeface.
       *
       * DISPLAY — sentence case, weight 400, hard negative tracking (−0.045 →
       * −0.06em) and sub-1 leading (0.92). Tracking and leading are baked into the
       * tokens so a heading is never hand-tuned. Sizes are deliberately capped
       * around 108px: the restraint is the point — enormous but quiet.
       *
       * META — 13px uppercase Semibold at +0.13em. Carries eyebrows, tags, indices,
       * CTAs, and every piece of meta on the site. It is the only uppercase left.
       */
      fontSize: {
        // — Meta register (micro-caps) —
        meta: ["0.8125rem", { lineHeight: "1.3", letterSpacing: "0.13em" }], // 13px
        "meta-lg": ["0.875rem", { lineHeight: "1.3", letterSpacing: "0.11em" }], // 14px — CTAs

        // — Body —
        "fluid-sm": ["clamp(0.85rem, 0.82rem + 0.15vw, 0.95rem)", { lineHeight: "1.5" }],
        "fluid-base": ["clamp(1rem, 0.95rem + 0.25vw, 1.125rem)", { lineHeight: "1.6" }],
        "fluid-lg": ["clamp(1.15rem, 1.05rem + 0.5vw, 1.5rem)", { lineHeight: "1.45" }],

        // — Display (sentence case, weight 400) —
        // Floor is 1.5rem/24px on purpose: it keeps EVERY display size inside
        // WCAG's "large text" definition, which is what lets the neon flare colour
        // a heading word at any viewport without dropping below its 3:1 bar.
        "fluid-xl": [
          "clamp(1.5rem, 1.1rem + 1.6vw, 2.25rem)", // → 36px
          { lineHeight: "1", letterSpacing: "-0.045em" },
        ],
        "fluid-2xl": [
          "clamp(1.75rem, 1.2rem + 2.4vw, 2.75rem)", // → 44px
          { lineHeight: "0.96", letterSpacing: "-0.05em" },
        ],
        "fluid-3xl": [
          "clamp(2rem, 1rem + 3.9vw, 4.25rem)", // → 68px
          { lineHeight: "0.93", letterSpacing: "-0.055em" },
        ],
        "fluid-display": [
          "clamp(2.5rem, 1rem + 5.2vw, 5.25rem)", // → 84px
          { lineHeight: "0.92", letterSpacing: "-0.058em" },
        ],
        "fluid-hero": [
          "clamp(3rem, 1.2rem + 6.8vw, 6.75rem)", // → 108px
          { lineHeight: "0.92", letterSpacing: "-0.06em" },
        ],
      },
      // Escape hatches for the two registers when a token size isn't right.
      letterSpacing: {
        display: "-0.055em",
        meta: "0.13em",
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
        section: "7.5rem", //  120px — default vertical section rhythm
        "section-lg": "11rem", //  176px — hero / feature vertical rhythm
        gutter: "4rem", //  64px  — wide editorial horizontal gutter
      },
      maxWidth: {
        measure: "68ch", //  comfortable reading measure
        editorial: "90rem", //  1440px — editorial content cap
      },
      keyframes: {
        // Client/logo marquee — translate a duplicated track by exactly half its width.
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
      },
      animation: {
        marquee: "marquee 90s linear infinite",
      },
      fontFamily: {
        // ONE typeface carries the whole site: Neue Montreal for display, body, and
        // meta. `display` is an alias, kept so headline call sites read intentionally.
        // The `editorial` (PP Editorial New) serif token is RETIRED — see app/layout.tsx.
        sans: ["var(--font-sans)"],
        display: ["var(--font-sans)"],
      },
    },
  },
  plugins: [
    // Emits the token values as `--c-*` (and a never-overridden `--c-*-base`
    // copy) on :root, so the colour utilities above have something to read.
    plugin(({ addBase }) => {
      const vars: Record<string, string> = {};
      for (const [name, hex] of Object.entries(TOKENS)) {
        vars[`--c-${name}`] = rgb(hex);
        vars[`--c-${name}-base`] = rgb(hex);
      }
      addBase({ ":root": vars });
    }),
  ],
};
export default config;
