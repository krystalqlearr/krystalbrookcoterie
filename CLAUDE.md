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

## Color — THE COTERIE SYSTEM: "clear water, deliberate K" (2026-08; supersedes wine/cherry). NEVER hardcode hex.
The direction derives from the founder's name: krystal = clear water (clarity →
Editorial), the hard K = the one deliberate owned edge (→ Owned), brook = the current
that carves (→ Precise). Milk-led luminous paper; elevation only goes DOWN from milk.
Muted text and hairlines are OPACITIES (ink/x on paper, bone/x on river), not tokens.
milk       #FDFBF6   the canvas — luminous near-white warm paper (default page)
bone       #EBE5D8   first recess — warm alt-sections; also the light ink on river
stone      #E0D8C7   deepest recess — quietest band; NEVER carries the neon flare
field      #F1ECE2   inset form fields on MILK only (a soft step down from the canvas)
ink        #23201B   warm faded charcoal-brown — primary text + filled-button surface
river      #0F2A2D   deep river — the dark inversion (water at depth); 1–2 per page
neon       #FF0080   THE FLARE (graphics + text ≥24px on milk/bone/river): arrow glyphs,
                     ticks, ONE heading word, drop-cap, selection. Never small text,
                     never on stone.
flare-deep #A8004F   flare TEXT <24px on paper (eyebrows, index) + primary-button hover
flare-lift #FF7ABF   the flare on river — the only stop safe for small text on the dark
The flare stop is chosen by SIZE + CANVAS, never by taste. ONE flare element per view
(arrow · index number · heading accent word · tick; at most once per page a full band);
if the heading carries it, the eyebrow stays muted. Muted floor = ink/70 (ink/65 fails
stone — below the floor use colour, not opacity) · bone/60 on river. Hairlines =
ink/12–15 · bone/15–20 (decorative exempt). Prices/tags/asterisks stay INK (ink-forward
reads expensive). Grain is `mix-blend: multiply`. RETIRED: cherry, maroon, blush, mocha,
charcoal #1E1418, camel, and the whole wine system.

## The dark is punctuation
River (`river` bg, bone text) is NOT the default — it's the inversion moment used for:
the footer, the closing-CTA showstoppers, proof bands, browser frames, and the
work-transition overlay. One or two per page. Water at depth, not woods — lighten it
and the magenta tips into Christmas.

## Typography — one typeface, two registers, one flare
PP Neue Montreal carries EVERYTHING; PP Editorial New is RETIRED entirely (no serif
italic sublines, pull-quotes, or serif accent word). The restraint is the luxury
signal — 400-weight at 108px outranks any bold cut.
DISPLAY — Regular 400, sentence case, short declarative sentences that END IN A
PERIOD, stacked two or three deep (`EditorialHeading`). Tracking + leading live in the
fluid size tokens (`fluid-xl … fluid-hero`, 36→108px max) — never hand-tune a heading.
Every display size floors at 24px on purpose (keeps headings inside WCAG "large text",
which is what sanctions the neon stop on a heading word). THE FLARE THREAD: exactly ONE
word per heading may lift into the flare — same face, no italic (neon on paper,
flare-lift on river; pass as `accent`); read down a page the flare words form a spine
(owned → follows → worth → presence) — the site's signature device.
META — Semibold 600, 13px, +0.13em, UPPERCASE (`text-meta`): the ONLY uppercase on the
site — eyebrows, tags, indices, captions, nav, form labels, CTAs. (No 700 in the
family, hence 600.) Index numbers take flare-deep; the total/tag stay muted.
WORDMARK — Medium 500, uppercase, lightly tracked — the one thing outside both
registers. CTAs are typography, not boxes: `ArrowLink` (meta label + flare arrow +
hairline wipe; ↗ leaves · → continues · ↓ scrolls); a FILLED button is reserved for
real form controls, at most one per view. Load via next/font/local from /public/fonts
as .woff2 (400/400i/500/600) — NEVER Google Fonts.

## Cursor — mix-blend inversion dot
A single ~14px dot, `bg-milk mix-blend-difference` (inverts whatever it crosses: dark
on milk, light over river/images). Grows to ~44px over interactive targets. No ring,
no label, no color. Fine-pointer only; reduced-motion damps the grow; `.kbc-cursor-none`
hides the native cursor. See components/CustomCursor.tsx.

## Motion — single source, luxury cadence
All easing/durations come from `lib/motion.ts` (JS) or `ease-editorial` / `duration-*`
(CSS/Tailwind) — NO inline magic numbers. Easing: `--ease-editorial`
cubic-bezier(0.16,1,0.3,1). Slow and weighted, never bouncy. Lenis smooth scroll,
`Reveal` for entrances, the work-transition (shared-layout FLIP) as the signature
moment. Respect prefers-reduced-motion EVERYWHERE (instant, no morph/parallax).

## Canvas rhythm
Sections read as one stock in recesses: milk (light, default) / bone (first recess —
the workhorse alt) / stone (deepest, quietest band) / river (the dark inversion event),
set via SectionShell `tone` (light | bone | stone | river). The move INTO river is a
designed inversion event; flow lives in MOTION — transitions read as a current.

## Layout principles
Left-alignment is DEFAULT — no centered template stacking. Asymmetric editorial
composition, generous whitespace. The flare (neon/flare-deep/flare-lift) is the one
accent — the K — used barely. Imagery placed with intentional offset/asymmetry. Sharp
corners (rounded-[1px]) are brand; only the cursor is round.

## Routes — canonical (see build-plan §4)
Primary CTA route is `/begin` (all "Begin" CTAs point there). Nav data is single-source
in components/nav.ts. Live: / · /work · /work/[slug] · /services · /process · /about ·
/journal · /begin · /styleguide (+ /privacy · /terms · token-gated /discovery). No route
may 404 at launch.

## Accessibility — WCAG 2.1 AA minimum
Every text/bg pair ≥ 4.5:1 (3:1 large); flag failing pairs, never ship them. Ink on
milk ~16:1 (AAA); the muted floor is ink/70 on paper (ink/65 fails stone), bone/60 on
river. The flare carries text only at its sanctioned stops: neon ≥24px (large-text
3:1 zone), flare-deep <24px on paper (~6:1 on milk), flare-lift on river (~6:1).
Focus rings stay ink/bone, NEVER the flare. Primary CTAs are INK-filled with milk text
(`primary`, filled = real form controls only); `onRiver` (bone outline) on river
sections. Focus rings are per-canvas: `outline-ink` on paper, `outline-bone` on river.
Every interactive element is a real, labeled, focusable control (work cards are
<button>s); skip-link + `#main` landmark present.

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
Display headings are monumental Regular-400 sans, sentence case, ending in a period;
the only uppercase is the meta register.
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
