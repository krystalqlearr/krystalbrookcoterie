# Project: Krystal Brook Coterie (krystalbrookcoterie.com)
This is the studio's OWN website. Editorial luxury web design for founder-led beauty,
med-spa, wellness, bridal, and luxury lifestyle brands. Reference docs live in /docs.

## Stack
Next.js 14 App Router, TypeScript, Tailwind CSS, deployed on Vercel.

## Color system — 7 tokens, dark-led canvas. NEVER hardcode hex; use token names.
rich-black   #0A0A0A   primary canvas / ink on light
deep-petrol  #052029   FOOTER ONLY — never a section background elsewhere
cream        #EFEEE8   light text on dark / light surfaces
greige       #B2ABA0   muted text; eyebrow text on petrol sections (AA contrast)
mocha        #9E8062   warm neutral accent
terracotta   #BF6940   primary warm accent; the custom cursor dot
teal         #287B8B   STRUCTURAL accent only — rules, dividers, section markers, cursor hover ring

## Token integrity rule (hard-won)
When renaming or refactoring tokens, preserve VALUES, never remap by name. A name-based
remap re-inverts the whole site. Always value-preserving.

## Typography — local fonts only
Display: PP Editorial New. Body/UI: PP Pangram Sans. Load via next/font/local from
/public/fonts as .woff2. NEVER import from Google Fonts. Display supports an italic
accent word inside headings.

## Layout principles
Left-alignment is the DEFAULT — no centered template stacking. Asymmetric, editorial
composition with generous whitespace. Teal is structural, not decorative. Imagery placed
with intentional offset/asymmetry for editorial contrast.

## Accessibility — WCAG 2.1 AA minimum
Every text/background token pair passes 4.5:1 (3:1 large text). On the petrol footer,
eyebrow/muted text uses greige, never terracotta. Flag any failing pairing instead of
using it. Do NOT alter global token values to fix contrast — choose a compliant token.

## Performance — Core Web Vitals green
next/image everywhere, priority on LCP images, local fonts with font-display swap,
server components by default (client components only where interactivity requires).

## Voice
Editorial, confident, warm, restrained. Three brand words: Editorial, Owned, Precise.
Sentence case headings. Positioning: "rented vs. owned"; AI-augmented framed as senior
judgment at boutique scale, never "AI builds your site."
