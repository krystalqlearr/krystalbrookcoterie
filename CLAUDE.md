# Project: Krystal Brook Coterie (krystalbrookcoterie.com)
This is the studio's OWN website. Editorial luxury web design for founder-led beauty,
med-spa, wellness, bridal, and luxury lifestyle brands. Reference docs live in /docs.

## Stack
Next.js 14 App Router, TypeScript, Tailwind CSS, deployed on Vercel.

## Color system — 7 tokens, dark-led canvas. NEVER hardcode hex; use token names.
rich-black   #0A0A0A   primary canvas (~60% of site) / ink on light
deep-petrol  #052029   alt-section backgrounds + footer (no longer footer-only)
cream        #EFEEE8   light text on dark; and full-section "showstopper" bg, 1–2 per page
greige       #B2ABA0   muted text; eyebrow text on petrol sections (AA contrast)
mocha        #9E8062   warm neutral accent
terracotta   #BF6940   primary warm accent; eyebrows on dark; italic accent word; cursor dot
teal         #287B8B   STRUCTURAL + limited accent — rules, dividers, markers, cursor ring,
                       category tags, subtle tints; never body text

## Canvas rhythm
Sections alternate rich-black / deep-petrol (alt-section) / cream (showstopper) so the
page reads with editorial cadence, not one flat dark scroll. Set via SectionShell `tone`.

## Token integrity rule (hard-won)
When renaming or refactoring tokens, preserve VALUES, never remap by name. A name-based
remap re-inverts the whole site. Always value-preserving.

## Typography — local fonts only
Display + body/UI: PP Neue Montreal (sans). Accent + wordmark: PP Editorial New (serif).
Headlines are heavy Neue Montreal (font-display → --font-sans, Extrabold 800); the single
italic ACCENT WORD inside a heading is Editorial New italic (font-editorial), often
terracotta. Load via next/font/local from /public/fonts as .woff2. NEVER import from Google
Fonts. Note: Neue Montreal display has no 700 — it goes Semibold 600 → Extrabold 800 →
Black 900.

## Layout principles
Left-alignment is the DEFAULT — no centered template stacking. Asymmetric, editorial
composition with generous whitespace. Teal is structural plus a limited accent (category
tags, subtle tints) — never body text. Imagery placed with intentional offset/asymmetry
for editorial contrast.

## Accessibility — WCAG 2.1 AA minimum
Every text/background token pair passes 4.5:1 (3:1 large text). Flag any failing pairing
instead of using it. Do NOT alter global token values to fix contrast — choose a compliant
token. Canvas-aware rules (all AA):
- Eyebrow color follows the canvas: terracotta on rich-black (5.01), greige on petrol
  (7.41) and the petrol footer, ink/rich-black on cream (17). Small terracotta text FAILS
  on petrol (4.26) and cream (3.40) — never use it there.
- Primary CTAs are CREAM-filled with rich-black text (terracotta-fill is cream-on-
  terracotta 3.40, fails); on cream showstoppers use the outlined onCream button.
- Large terracotta accent words (≥24px, e.g. the italic accent) pass 3:1 on all canvases.

## Performance — Core Web Vitals green
next/image everywhere, priority on LCP images, local fonts with font-display swap,
server components by default (client components only where interactivity requires).

## Voice
Editorial, confident, warm, restrained. Three brand words: Editorial, Owned, Precise.
Sentence case headings. Positioning: "rented vs. owned"; AI-augmented framed as senior
judgment at boutique scale, never "AI builds your site."
