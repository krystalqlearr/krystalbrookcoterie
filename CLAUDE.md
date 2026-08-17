# Project: Krystal Brook Coterie (krystalbrookcoterie.com)
This is the studio's OWN website — and the site IS the portfolio. Editorial luxury web
design for founder-led beauty, med-spa, wellness, bridal, and luxury lifestyle brands.

**North star:** a visitor knows within three seconds, before reading a word, that a
top-tier developer built this. The medium is the proof — SHOW craft (motion,
shared-element transitions, live work, instant loads), never just claim it.

**Full build plan + roadmap: `docs/kbc-build-plan.md` — the source of truth. This
CLAUDE.md is the short form; keep the two in sync, never let them drift.**

## Stack
Next.js 14 App Router, TypeScript, Tailwind CSS, Framer Motion, Lenis. Deployed on Vercel.

## Color — MILK-LED warm-neutral + an ELECTRIC FLARE (2026-08). NEVER hardcode hex.
PAPER — one stock, three sheets, lightest on top. Nothing sits ABOVE the canvas:
elevation only goes DOWN from it, so an inset field is `stone`, not something lighter.
milk     #FAF7F0   THE CANVAS — the default page. Ink 16.2 (AAA). The neon flare
                   reads 3.53 here vs 3.01 on bone, so the accent is safest on the
                   canvas itself.
bone     #EBE5D8   FIRST RECESS — the warm alt-section (the workhorse for rhythm),
                   AND still the light INK on forest. The inversion pair is
                   `bone` + `ink`, unchanged.
stone    #E0D8C7   DEEPEST RECESS — inset form fields, the quietest band. NEVER
                   carries the neon flare (2.66, below the 3:1 bar);
                   SectionShell/EditorialHeading drop accents to flare-deep here
                   automatically.
ink      #23201B   warm faded charcoal-brown — primary INK (text) + button fill
forest   #0F2018   THE DARK INVERSION SURFACE — deep forest green. Green is
                   electric magenta's TRUE COMPLEMENT (opposite on the wheel), so
                   the flare reads hotter here than on any neutral and the pair
                   looks like a scheme, not an accent on a black. Bone 13.49 ·
                   flare-lift 7.09 · neon-as-graphic 4.49. It works because the
                   green is nearly black and the flare is rationed — lighten
                   either and it tips into Christmas. RETIRED: #1E1418 (muddy
                   aubergine) and #13120F (neutral warm black).
mocha    #9A8264   deep warm neutral — imagery / atmosphere haze only
Muted text and hairlines are OPACITIES of the pair (ink/x on paper, bone/x on
the forest dark), not separate tokens.

THE FLARE — electric magenta, THREE STOPS. Neon and AA cannot be one swatch, so the
stop is chosen by SIZE and CANVAS, never by taste:
flare       #FF0080  NEON. Graphics + text ≥24px ONLY, on milk/bone or forest: arrow
                     glyphs, hairline wipes, Rule ticks, heading accent words, the
                     drop-cap, ::selection bg (with INK text). 3.01 on bone — clears
                     the 3:1 graphic/large-text bar (3.53 on milk). NEVER small
                     text. NEVER on stone (2.66 — below the bar).
flare-deep  #A8004F  TEXT. Anything under 24px that must be flare-colored — 13px
                     eyebrows, IndexMeta numbers, tier flags, Marquee separators —
                     PLUS the one full-bleed band (bone text) and the primary-button
                     hover. 6.02 on bone, 5.33 on stone: safe on both papers.
flare-lift  #FF7ABF  The flare ON the forest dark — 7.09, safe at any size.

ONE flare element PER VIEW, not per section — pick exactly one of: arrow glyph ·
index number · heading accent word · Rule tick · (max once per page) a full band.
Every display size floors at 24px precisely so the neon stop stays legal on headings.
MUTED TEXT FLOOR = ink/70 on milk, bone AND stone (5.72 / 5.37 / 5.05) · bone/60 on forest
(5.82). These are FLOORS, not suggestions: ink/65 clears bone at 4.62 but FAILS stone
at 4.38, and ink/60 fails both — never go below ink/70 for text. Opacity is therefore
NOT available as a hierarchy step below the floor; use color (the flare) instead.
Hairlines and decorative aria-hidden marks are exempt: ink/12–15 · bone/15–20.
Prices/tags/asterisks stay INK (ink-forward reads expensive; the flare stays rare).
Focus rings are NEVER the flare — ink on bone/stone, bone on forest.
Grain is `mix-blend: multiply` (paper tooth). RETIRED: cherry/maroon/blush (the wine
flare), camel, rich-black, cream, deep-petrol, teal, greige, surface-1/2.

## The dark is punctuation
The forest dark (`forest` bg, bone text) is NOT the default — it's the dark inversion moment
used for: the footer, the closing-CTA showstoppers, the scrolled header, browser frames,
and the work-transition overlay. One or two dark moments per page for rhythm.

## Typography — ONE typeface, TWO registers (grotesk pivot, 2026-08)
PP Neue Montreal carries everything. There is no second typeface and no third voice.

DISPLAY — weight 400 (REGULAR), sentence case, enormous, with hard negative tracking
(−0.045 → −0.06em) and sub-1 leading (0.92), capped ~108px. The tracking and leading
live in the `fluid-xl … fluid-hero` tokens — NEVER hand-tune a heading. Write headlines
as short declarative sentences that end in a period, stacked two or three deep
("Websites with presence." / "Rented is over."). Use `EditorialHeading` or `.type-display`.
The restraint IS the luxury signal: 400-weight at 108px outranks any bold cut.

META — 13px UPPERCASE Semibold (600) at +0.13em. The ONLY uppercase on the site:
eyebrows, tags, categories, indices, captions, credits, nav, form labels, CTAs.
Use `Eyebrow` or `.type-meta`. (The family has no 700, hence 600.)

THE FLARE THREAD survives as COLOR, not as a second face: one word per heading passed
as `accent` renders the neon flare (flare-lift on forest) in the SAME face and weight.

RETIRED: Neue Montreal Extrabold/Black (800/900 — loaded, never set), uppercase display,
and PP Editorial New entirely (serif italic sublines, pull-quotes, and the serif accent
word). The .woff2 files remain in /public/fonts; the font is no longer loaded. Only the
wordmark sits outside the two registers, at Medium 500 uppercase.

Load via next/font/local from /public/fonts as .woff2 — NEVER Google Fonts.
Register: bone paper, enormous quiet type, one electric flare — "so expensive you can see
and feel it." Reference: bionicegg.com's typographic system in KBC's palette.

## Cursor — mix-blend inversion dot
A single ~14px dot, `bg-bone mix-blend-difference` (inverts whatever it crosses: dark
on bone, light over forest/images). Grows to ~44px over interactive targets. No ring,
no label, no color. Fine-pointer only; reduced-motion damps the grow; `.kbc-cursor-none`
hides the native cursor. See components/CustomCursor.tsx.

## Motion — single source, luxury cadence
All easing/durations come from `lib/motion.ts` (JS) or `ease-editorial` / `duration-*`
(CSS/Tailwind) — NO inline magic numbers. Easing: `--ease-editorial`
cubic-bezier(0.16,1,0.3,1). Slow and weighted, never bouncy. Lenis smooth scroll,
`Reveal` for entrances, the work-transition (shared-layout FLIP) as the signature
moment. Respect prefers-reduced-motion EVERYWHERE (instant, no morph/parallax).

## Canvas rhythm
Sections descend from the canvas: light (milk, the default — paints nothing) / bone
(first recess, the workhorse alt) / stone (deepest recess) / forest (dark inversion),
so the page reads with editorial cadence, not one flat scroll. Set via SectionShell
`tone` (light | bone | stone | dark). The move INTO the forest dark is a designed
inversion event.

## Layout principles
Left-alignment is DEFAULT — no centered template stacking. Asymmetric editorial
composition, generous whitespace. The electric flare is the one accent, used barely.
Imagery placed with intentional offset/asymmetry. Sharp corners (rounded-[1px]) are
brand; only the cursor is round.

## Signature devices — the grotesk system's vocabulary
ArrowLink   THE CTA. Actions are TYPOGRAPHY, not boxes: meta-caps label + neon arrow
            (↗ leaves / → continues / ↓ scrolls) over a hairline that wipes in flare on
            hover-or-focus. Use everywhere. `Button` (ink fill) is reserved for real
            form controls and AT MOST ONE per view.
IndexMeta   `01 / 07 — Med-spa · Brand + Web`. Live number takes flare-deep (it is 13px
            text), total and tag stay muted; zero-padded, tabular. Turns a grid into an
            edited sequence.
Rule        1px hairline. `flare`+`short` opens a section header; `hair` splits rows.
Marquee     Pure-CSS continuous band (client names, disciplines). Pauses on hover,
            STOPS under reduced motion. Presentational — names must exist as real
            content elsewhere.
StatStrip   The proof band on forest directly under the hero: 3–4 defensible figures
            in DISPLAY over META labels. The page's first inversion.

## Routes — canonical (see build-plan §4)
Primary CTA route is `/begin` (all "Begin" CTAs point there). Nav data is single-source
in components/nav.ts. Existing: / · /work · /styleguide · /prototype(temp). To build:
/work/[slug] · /services · /process · /about · /journal · /begin. No route may 404 at launch.

## Accessibility — WCAG 2.1 AA minimum
Every text/bg pair ≥ 4.5:1 (3:1 large); flag failing pairs, never ship them. ink-on-bone
is ~13:1 (AAA). The flare is SIZE-GATED: neon #FF0080 is 3.53 on milk / 3.01 on bone
→ graphics and text ≥24px ONLY; use flare-deep (6.02) under 24px, and
flare-lift (7.09) on forest. This is why fluid-xl floors at 24px. Focus rings stay
ink/bone, NEVER the flare. Primary CTAs are INK-filled with
bone text (`primary`); `onDark` (bone outline) on forest sections. Focus rings are
per-canvas: `outline-ink` on bone/stone, `outline-bone` on forest. Every interactive
element is a real, labeled, focusable control (work cards are <button>s); skip-link +
`#main` landmark present.

## Performance — Core Web Vitals green, future-optimized
next/image everywhere (AVIF/WebP), priority on LCP media, local fonts w/ swap, server
components by default (client only where interactivity requires), motion budgeted, zero
layout shift. Future: View Transitions API, Speculation Rules prefetch, container
queries, CSS scroll-driven animation (progressive enhancement); evaluate Next 15 + PPR.

## Voice — a luxury creative house (not a dev shop)
Editorial, assured, fashion-conscious, commercially intelligent, selective, slightly
provocative. Core message: "digital identities for brands that expect to be noticed,
trusted, and chosen." SELL PERCEPTION FIRST — authority, trust, desirability, growth —
then let capability support it. Craft/tech ("hand-built in code," "the stack big tech
runs," "advanced architecture," "custom systems") is a PROOF POINT, never the headline;
keep it to the FAQ and case-study depth. Frame projects as the SHIFT created (e.g.
"a clinical brand, repositioned as a modern authority"), not the deliverable.
Nomenclature: services are an ENGAGEMENT/COMMISSION (nav CTA = "Commission"); tiers are
The Edit · Signature (flag: "Most commissioned") · Atelier · Private Commission.
Display headings are UPPERCASE monumental sans; body and serif sublines sentence case.
NEVER name competitors. AVOID empty luxury filler — "elevated," "bespoke," "intentional,"
"curated," "timeless" — unless it says something specific. Positioning: rented vs. owned.
Three brand words: Editorial · Owned · Precise. Full copy system: docs/kbc-voice.md.

## AI — never volunteer it (hard rule)
NEVER mention AI in site copy except where a prospect literally asks: the single
"Do you use AI?" FAQ on /services. Do not add it to Home, About, Process, Journal,
case studies, or metadata. Rationale: announcing a tool signals it needs defending,
and to a luxury founder "AI" pattern-matches to generic/mass — the exact thing KBC
sells against. Sell the OUTCOME instead (senior judgment on everything, nothing handed
to juniors, revisions in hours). When it must appear: KBC is always the grammatical
subject ("I build / direct / decide"); AI is the tool, never the developer. Never
frame it as why the work is cheaper — frame speed as responsiveness, not savings.
