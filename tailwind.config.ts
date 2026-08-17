import type { Config } from "tailwindcss";

/**
 * Krystal Brook Coterie — token system.
 *
 * BONE-LED warm-neutral palette (2026-07) carried into the GROTESK register
 * (2026-08): a single sans, display set at REGULAR weight in sentence case at
 * large sizes with hard negative tracking and sub-1 leading. The wine flare
 * (cherry) survives as the one accent, used barely.
 *
 * NEVER hardcode hex in components; use these token names. The inversion pair is
 * `bone` (light) + `ink` (warm charcoal); muted/hairlines are opacities of the pair.
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
      colors: {
        // — The ink, and the light half of the inversion pair (see `bone` below) —
        ink: "#23201B", //  warm faded charcoal — primary ink; bg for charcoal sections
        /**
         * — Paper elevation: one stock, three sheets, lightest on top —
         *   milk  THE CANVAS (2026-08). The default page. Ink 16.2 (AAA); the neon
         *         flare reads 3.53 here vs 3.01 on bone, so the accent is safest on
         *         the canvas itself. Everything below it is a recess.
         *   bone  FIRST RECESS — the alt-section, and still the light INK on charcoal
         *         (the inversion pair is bone + ink, unchanged).
         *   stone DEEPEST RECESS — form fields, inset panels, the quietest band.
         * Nothing sits ABOVE milk: elevation only goes down from the canvas, which is
         * why an inset field is stone rather than something lighter.
         */
        milk: "#FAF7F0", //  THE CANVAS — the default page background
        bone: "#EBE5D8", //  first recess / the light ink on charcoal
        stone: "#E0D8C7", //  deepest recess. NEVER carries the neon flare (2.66)
        /**
         * — The dark inversion surface —
         *
         * Deep forest. Green is electric magenta's TRUE COMPLEMENT — opposite it on
         * the wheel — which is why the flare reads hotter here than on any neutral,
         * and why the pair looks like a scheme rather than an accent dropped onto a
         * black. Named for the pigment; the SectionShell tone that uses it is called
         * `dark`, because tones describe role and colours describe pigment.
         *
         * It survives being nearly black: bone text 13.49, flare-lift 7.09, and the
         * neon flare 4.49 as a graphic. Complementary pairs are loud by construction
         * — this one works because the green is almost black and the flare is
         * rationed. Lighten either and it tips into Christmas.
         *
         * Retired: #1E1418 (muddy aubergine — blue over green, an echo of the wine
         * flare) and #13120F (the neutral warm black that briefly replaced it).
         */
        forest: "#0F2018", //  deep forest — THE dark inversion surface
        mocha: "#9A8264", //  deep warm neutral — imagery / atmosphere only
        /**
         * THE FLARE — electric magenta (2026-08, replaces the wine `cherry`).
         *
         * Three stops, because neon and AA can't be the same swatch. Which stop you
         * reach for is decided by SIZE and CANVAS, never by taste:
         *
         *  DEFAULT #FF0080  NEON. Graphics and LARGE display only, on bone or
         *                   charcoal: arrow glyphs, hairline wipes, Rule ticks,
         *                   heading accent words (every display size is ≥24px, so
         *                   the 3:1 large-text bar applies — 3.01 on bone). Never
         *                   small text. Never on stone (2.66 — below the bar).
         *  deep    #A8004F  TEXT. Anything under 24px that must be flare-colored —
         *                   13px eyebrows, indices, tier flags — plus the one
         *                   full-bleed band, which carries bone text. 6.02 on bone,
         *                   5.33 on stone, so it is safe on both papers.
         *  lift    #FF7ABF  The flare ON charcoal — 7.52, safe at any size.
         */
        flare: {
          DEFAULT: "#FF0080",
          deep: "#A8004F",
          lift: "#FF7ABF",
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
        marquee: "marquee 42s linear infinite",
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
  plugins: [],
};
export default config;
