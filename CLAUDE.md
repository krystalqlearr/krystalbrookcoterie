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

## Color — BONE-LED warm-neutral palette (redesigned 2026-07). NEVER hardcode hex.
The inversion pair is `bone` (light) + `ink` (warm charcoal). Muted text and hairlines
are OPACITIES of the pair (ink/x on bone, bone/x on charcoal), not separate tokens.
bone   #EBE5D8   primary canvas (warm ivory paper); ink-color on charcoal
ink    #23201B   warm faded charcoal — primary ink; bg for charcoal sections
stone  #E0D8C7   deeper paper — raised panels (form fields), subtle alt-section rhythm
camel  #C6A98A   champagne accent, used BARELY — the section rule (Rule), a thin tick,
                 one detail per view. FAILS AA as small text/price on bone → never there.
mocha  #9A8264   deep warm neutral — imagery / atmosphere haze only
Muted = ink/65 (bone) · bone/60 (charcoal). Hairlines = ink/12–15 · bone/15–20.
Prices/tags/asterisks are INK (ink-forward reads expensive; color is nearly absent).
Grain is `mix-blend: multiply` (paper tooth) — retuned for light. RETIRED: rich-black,
cream, deep-petrol, teal, greige, surface-1/2.

## Charcoal is punctuation
Charcoal (ink bg, bone text) is NOT the default — it's the dark inversion moment used
for: the footer, the closing-CTA showstoppers, the scrolled header, browser frames,
and the work-transition overlay. One or two dark moments per page for rhythm.

## Typography — big sans + serif italic (HAUS/VOL.ONE register)
Neue Montreal Extrabold (800), UPPERCASE, tight tracking: ALL display headlines,
tier names, section titles (`EditorialHeading` → font-display uppercase; the inline
accent word is RETIRED — the serif is a separate line). Editorial New ITALIC (400):
the supporting voice — hero sublines, SectionShell/PageHero intros, pull-quotes,
Testimonial, case-study + project descriptors (serif italic, lowercase). Neue Montreal
also carries body/UI/eyebrows/buttons/meta. Load via next/font/local from /public/fonts
as .woff2 — NEVER Google Fonts. Fluid clamp scale (`fluid-sm … fluid-hero`) sizes
everything. Register: bone paper, monumental caps, quiet serif — "so expensive you can
see and feel it" (refs: HAUS, VOL.ONE STUDIOS, STAY).

## Cursor — mix-blend inversion dot
A single ~14px dot, `bg-bone mix-blend-difference` (inverts whatever it crosses: dark
on bone, light over charcoal/images). Grows to ~44px over interactive targets. No ring,
no label, no color. Fine-pointer only; reduced-motion damps the grow; `.kbc-cursor-none`
hides the native cursor. See components/CustomCursor.tsx.

## Motion — single source, luxury cadence
All easing/durations come from `lib/motion.ts` (JS) or `ease-editorial` / `duration-*`
(CSS/Tailwind) — NO inline magic numbers. Easing: `--ease-editorial`
cubic-bezier(0.16,1,0.3,1). Slow and weighted, never bouncy. Lenis smooth scroll,
`Reveal` for entrances, the work-transition (shared-layout FLIP) as the signature
moment. Respect prefers-reduced-motion EVERYWHERE (instant, no morph/parallax).

## Canvas rhythm
Sections alternate bone (light, default) / stone (deeper paper alt) / charcoal
(dark inversion moment) so the page reads with editorial cadence, not one flat scroll.
Set via SectionShell `tone` (light | stone | charcoal). The move INTO charcoal is a
designed inversion event.

## Layout principles
Left-alignment is DEFAULT — no centered template stacking. Asymmetric editorial
composition, generous whitespace. Camel is the one warm structural accent, used barely.
Imagery placed with intentional offset/asymmetry. Sharp corners (rounded-[1px]) are
brand; only the cursor is round.

## Routes — canonical (see build-plan §4)
Primary CTA route is `/begin` (all "Begin" CTAs point there). Nav data is single-source
in components/nav.ts. Existing: / · /work · /styleguide · /prototype(temp). To build:
/work/[slug] · /services · /process · /about · /journal · /begin. No route may 404 at launch.

## Accessibility — WCAG 2.1 AA minimum
Every text/bg pair ≥ 4.5:1 (3:1 large); flag failing pairs, never ship them. ink-on-bone
is ~13:1 (AAA); muted ink/65 holds AA for body. Camel FAILS on bone (~1.6:1) → never
small text/price/focus-ring there; it's graphic-only. Primary CTAs are INK-filled with
bone text (`primary`); `onCharcoal` (bone outline) on charcoal sections. Focus rings are
per-canvas: `outline-ink` on bone/stone, `outline-bone` on charcoal. Every interactive
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
