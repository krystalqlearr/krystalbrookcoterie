# KBC — Master Build Plan

> Source of truth for the Krystal Brook Coterie rebuild. This is the studio's own
> website: **the site is the portfolio.** Every decision optimizes for one outcome —
> a visitor knows, in the first three seconds and before reading a word, that this
> was built by a top-tier developer. Show, never tell.
>
> This file governs the build. `CLAUDE.md` is the always-loaded short form; when the
> two disagree, reconcile them — never let them drift. Update the status boxes as
> phases land.

---

## 1. Positioning & principle

- **Audience:** founder-led beauty, med-spa, wellness, bridal, luxury lifestyle brands
  that have outgrown a template and know it.
- **The one idea:** the medium is the proof. The site demonstrates craft a template
  physically cannot reproduce — cinematic motion, shared-element transitions, live
  work, instant loads. We stop *claiming* "custom-coded" and make it undeniable.
- **Kill the defensive copy:** never name Squarespace/Wix/page-builders. Confidence
  never names the cheap option. Lead with outcome and feeling, not method.
- **AI — never volunteer it (hard rule):** AI appears in site copy in exactly ONE place,
  the "Do you use AI?" FAQ on `/services`, because that is the only place a prospect
  asks. Never on Home, About, Process, Journal, case studies, or metadata. Announcing a
  tool signals it needs defending, and to a luxury founder "AI" pattern-matches to
  generic/mass — the thing KBC sells against. Sell the OUTCOME (senior judgment on
  everything, nothing handed to juniors, revisions in hours). Where it does appear, KBC
  is the grammatical subject ("I build / direct / decide"); AI is the tool, never the
  developer; and it is NEVER the reason the work is cheaper — speed is framed as
  responsiveness, not savings.
- **Three brand words:** Editorial · Owned · Precise. Sentence-case headings.

---

## 2. Design system

### 2.1 Color — THE COTERIE SYSTEM (2026-08; supersedes wine/cherry)

**"Clear water, deliberate K"** — the direction derives from the founder's name:
*krystal* = clear water that flows (clarity → Editorial), the hard **K** = the one
deliberate owned edge (→ Owned), *brook* = the current that carves by persistence
(→ Precise). Milk-led luminous paper, a deep-river inversion, and an electric-magenta
flare rationed to ONE element per view. Elevation only goes DOWN from milk.

| token | hex | role |
|---|---|---|
| `milk` | `#FDFBF6` | the canvas — luminous near-white warm paper (default page) |
| `bone` | `#EBE5D8` | first recess — warm alt-sections; also the light ink on river |
| `stone` | `#E0D8C7` | deepest recess — the quietest band; never carries the neon flare |
| `field` | `#F1ECE2` | inset form fields on MILK only (a soft step down from the canvas) |
| `ink` | `#23201B` | warm faded charcoal-brown — primary text + filled-button surface |
| `river` | `#0F2A2D` | deep river — the dark inversion (water at depth); 1–2 per page |
| `neon` | `#FF0080` | flare for GRAPHICS + text ≥24px on milk/bone/river; never small text, never on stone |
| `flare-deep` | `#A8004F` | flare TEXT <24px on paper (eyebrows, index) + primary-button hover |
| `flare-lift` | `#FF7ABF` | the flare on river — the only stop safe for small text on the dark |

The flare stop is chosen by SIZE and CANVAS — never by taste — and enforced in code.
**Muted floor = `ink/70`** on paper (ink/65 quietly fails stone; opacity is NOT a
hierarchy step below the floor — use colour) · `bone/60` on river. Hairlines/decorative
are exempt: `ink/12–15` · `bone/15–20`. Prices/tags/asterisks stay INK — ink-forward
reads expensive. One flare element per view (arrow · index number · heading accent word ·
section tick · at most once per page a full band); if the heading carries it, the eyebrow
stays muted. Grain is `mix-blend: multiply`. **RETIRED:** cherry, maroon, blush, mocha,
charcoal `#1E1418` (its blue channel read aubergine), camel, and the whole wine system.

### 2.2 The dark is punctuation

River (`river` bg, bone text) is NOT the default — it's the inversion moment: the
footer, closing-CTA showstoppers, proof bands, browser frames, the work-transition
overlay. One or two per page. Water at depth, not woods — lighten it and the magenta
tips into Christmas.

### 2.3 Typography — one typeface, two registers, one flare

**Approved 2026-08: PP Neue Montreal carries EVERYTHING. PP Editorial New is RETIRED
entirely — no serif italic sublines, pull-quotes, or serif accent word. The restraint
is the luxury signal: 400-weight at 108px outranks any bold cut.**

- **Display — Regular 400, sentence case, ends in a period.** Short declarative
  sentences stacked two or three deep. Tracking + leading live in the fluid size
  tokens (`fluid-xl … fluid-hero`, maxing 36→108px) — never hand-tune a heading. Every
  display size floors at 24px on purpose: that keeps them inside WCAG "large text,"
  which is the only reason neon can colour a heading word at any viewport. THE FLARE
  THREAD: exactly ONE word per heading may be lifted into the flare (same face — neon
  on paper, flare-lift on river), passed as `accent`.
- **Meta — Semibold 600, 13px, +0.13em, UPPERCASE** (`text-meta`) — the ONLY uppercase:
  eyebrows, tags, indices, captions, nav, form labels, CTAs. (The family has no 700,
  hence 600.) Index numbers take flare-deep; the total/tag stay muted.
- **Wordmark — Medium 500, uppercase, lightly tracked** — the one thing outside both
  registers; at 500 it holds beside 400-weight headlines without competing.

Loaded via next/font/local from /public/fonts (.woff2, weights 400/400i/500/600) —
NEVER Google Fonts. Hero atmosphere is clear water: a cool stone haze + one faint
neon bloom (the K), not warm glows.

### 2.4 Motion tokens (NEW — single source, never inline magic numbers)

- Easing: `--ease-editorial` `cubic-bezier(0.16, 1, 0.3, 1)` (primary, weighted
  ease-out); `--ease-inout` `cubic-bezier(0.83, 0, 0.17, 1)` (symmetric morphs).
- Durations: fast `0.4s` · base `0.6s` · slow `0.72s` · xslow `0.9s`.
- Exposed to CSS (custom props + Tailwind `ease-editorial`/`duration-*`) and to
  Framer via `lib/motion.ts`. **Luxury moves slowly and lands precisely — never bouncy.**

### 2.5 Layout & rhythm

Left-aligned by default, asymmetric editorial composition, generous whitespace.
Canvas rhythm reads as one stock in recesses: milk (default) → bone (first recess,
the workhorse alt) → stone (quietest band) → river (the inversion event), set via
SectionShell `tone`. Actions are typography, not boxes: `ArrowLink` (meta label +
flare arrow + hairline wipe; ↗ leaves · → continues · ↓ scrolls) is the CTA — a
FILLED button is reserved for real form controls, at most one per view. Container:
centered, wide gutters, `max-w-editorial` (90rem). Sharp corners (`rounded-[1px]`)
are brand; only the cursor is round. Focus rings are never the flare: ink on paper,
bone on river.

---

## 3. Motion system

Everything inherits from `lib/motion.ts` so the language is consistent site-wide.

- **Smooth scroll** — Lenis (`SmoothScroll`), reduced-motion aware, `data-lenis-prevent`
  on inner scroll containers (e.g. the case-study modal).
- **Reveal** — scroll-linked entrance primitive (`components/motion/Reveal.tsx`):
  mask/clip + subtle y + fade, staggerable, off under reduced-motion.
- **Signature: the work transition** — a browser-framed project card expands in place
  into a full-bleed, scrolling case study (Framer shared-layout FLIP). The credibility
  moment. Prototype lives in `WorkShowcase`; promoted to `/work` + real route
  transitions (View Transitions API) in Phase 4.
- **Cursor** — terracotta dot + teal ring (exists). Enhance: grows + labels "View"
  over work, shrinks over text.
- **Page transitions** — View Transitions API on route change (progressive
  enhancement; native where supported, instant fallback elsewhere).
- **Type choreography** — hero headline arrives per-line (mask reveal + blur-to-focus);
  accent word settles distinctly.
- Respect `prefers-reduced-motion` everywhere: instant, no morph, no parallax.

---

## 4. Information architecture (canonical route map)

**Canonical primary CTA route: `/begin`.** (Fixes the current `/contact` vs `/begin`
split — header linked `/contact`, homepage linked `/begin`.) All "Begin" CTAs → `/begin`.

| route | status | notes |
|---|---|---|
| `/` | rebuild | home — atmosphere → work → philosophy → services teaser → CTA |
| `/work` | rebuild | the signature transition index (from `WorkShowcase`) |
| `/work/[slug]` | build | real case-study routes w/ View Transitions; `glowtoure` first |
| `/services` | build | 4 tiers; pricing revealed after desire, not a lead grid |
| `/process` | build | how the studio works; senior-judgment narrative |
| `/about` | build | founder-led story; the person is the brand |
| `/journal` | build | editorial notes / SEO surface (optional MDX) |
| `/begin` | build | the enquiry experience (canonical CTA) — no financial fields |
| `/styleguide` | keep | internal token/system reference; keep in sync |
| `/prototype` | temp | delete once `/work` is promoted |

Nav data lives in `components/nav.ts` (shared server/client). Keep it the single source.

---

## 5. Component inventory

**Keep / refactor to system:** `Button`, `EditorialHeading`, `Eyebrow`, `Rule`,
`SectionShell`, `ImageFrame`, `BrowserFrame`, `ProjectCard`, `ProjectFeature`,
`ServiceCard`, `Testimonial`, `FAQAccordion`, `SiteHeader`, `SiteFooter`, `Logo`,
`CustomCursor`.

**New (foundation):** `lib/motion.ts`, `components/motion/SmoothScroll.tsx`,
`components/motion/Reveal.tsx`, `WorkShowcase` (done, prototype).

**New (later):** `WorkTransitionProvider` (route-based View Transitions), case-study
content blocks, `EnquiryForm` (`/begin`), live/scroll-through work preview.

Refactor rule: components consume tokens (`fluid-*`, `ease-editorial`, `surface-*`,
motion lib) — no inline easing arrays, no hardcoded hex, no static breakpoint type
where a fluid step exists.

---

## 6. Performance · SEO · future-optimization

- **Core Web Vitals green.** LCP is text (instant) then atmosphere animates in.
  `next/image` everywhere (AVIF/WebP), `priority` on LCP media, local fonts w/ swap,
  server components by default, motion budgeted, zero layout shift.
- **Future-optimized:** View Transitions API, Speculation Rules prefetch, container
  queries, CSS scroll-driven animations (progressive enhancement), `content-visibility`
  on long sections. Evaluate Next 15 upgrade for stable View Transitions + PPR.
- **SEO:** per-route metadata, Open Graph/Twitter cards, JSON-LD (Organization +
  per-case-study CreativeWork), sitemap + robots, semantic headings.
- **Analytics/consent:** privacy-first; any consent UI declines non-essential by default.

## 7. Accessibility — WCAG 2.1 AA minimum

Every text/bg token pair ≥ 4.5:1 (3:1 large). Canvas-aware eyebrow rule (terracotta on
rich-black, greige on petrol, ink on cream). CTAs cream-filled w/ rich-black text
(terracotta-fill fails). All interactive elements are real, focusable, labeled
controls (the work cards are `<button>`s). Visible teal focus ring. Full
reduced-motion path. Do not alter global token values to fix contrast — choose a
compliant token.

---

## 8. Phased execution roadmap

- [x] **Phase 0 — Signature prototype.** `WorkShowcase` + `/prototype`. Motion language proven.
- [x] **Phase 1 — Foundation & anti-drift.** Master plan (this file); `CLAUDE.md` rewrite;
      extended tokens (material surfaces, fluid type, motion/easing, z-layers) in
      `tailwind.config.ts`; material + motion CSS in `globals.css`; `lib/motion.ts`;
      `SmoothScroll` + `Reveal` primitives; Lenis wired in layout; `WorkShowcase`
      refactored to the motion lib; canonical `/begin` route decided + nav aligned.
- [x] **Phase 2 — Core components to system.** `EditorialHeading` on the fluid scale
      (first-occurrence accent); cursor "View" label (`data-cursor-label`);
      `Reveal`/`RevealItem`; `SectionShell` intro, `ProjectCard`, `ServiceCard`,
      `FAQAccordion`, `Button` (editorial easing) on fluid/motion tokens; `Testimonial`
      fixed to real Editorial New italic (was synthetic-italic Neue Montreal);
      `/styleguide` refreshed (correct fonts, fluid scale, material + motion tokens,
      competitor-free copy). `ImageFrame` already token-based — left as is.
- [x] **Phase 3 — Page builds.** DONE: `/` rebuilt (atmosphere `Hero` + choreographed
      reveals + competitor-free copy); `/services`, `/process`, `/about`, `/begin`
      (enquiry form → mailto today, Resend-ready), `/journal`, `/privacy`, `/terms` all
      built on the system via new `PageHero` + `EnquiryForm`. Verified: every route
      returns 200 — no 404s remain. TODO later: swap `/begin` submit to Resend + Notion.
- [x] **Phase 4 — Work system.** `WorkShowcase` promoted to `/work`; `/prototype`
      removed; real Glowtoure asset captured + wired into the card; work data
      centralized in `lib/work.ts` (single source for index + case studies);
      `/work/[slug]` case-study route built (server-rendered, per-page metadata,
      CreativeWork JSON-LD, results/scope/proof, sitemap entry) with the index overlay
      linking through; cross-document View Transitions enabled via CSS. TODO (needs
      you): real Glowtoure imagery + published Lighthouse numbers to replace the
      "To publish" result slots; soft-nav route transitions await a Next 15 upgrade.
- [~] **Phase 5 — Perf/SEO/future.** DONE: shared metadata base (title template, OG +
      Twitter cards), dynamic `opengraph-image`/`twitter-image` (edge), JSON-LD
      (Organization + WebSite), `sitemap.ts`, `robots.ts` (styleguide disallowed).
      TODO: per-case-study CreativeWork JSON-LD (with Phase 4), Speculation Rules,
      image pipeline once real photography lands, CWV/Lighthouse pass on a production
      build, Next 15 / PPR evaluation.
- [~] **Phase 6 — Launch hardening.** DONE: clean production `next build` (17 routes,
      `/work/glowtoure` prerendered SSG, ~147 kB first load); fixed build blockers
      (unused import, `twitter-image` runtime literal, header ref-cleanup); added a
      skip-to-content link + `#main` landmark; a11y audit across all routes — one h1
      each, all images alt'd, all form controls labeled, skip link reveal rule
      verified. TODO (needs deploy/you): Lighthouse run on a Vercel preview,
      cross-browser QA, Vercel deploy config, final content once real assets land.

---

## 9. Anti-drift protocol

1. This file + `CLAUDE.md` are canonical. Any change to tokens, motion, routes, or IA
   updates BOTH in the same change.
2. Token values are never remapped by name; the material/motion layer is additive and
   documented here — additions to it are recorded in §2.
3. No inline easing/duration magic numbers — import from `lib/motion.ts` (JS) or use
   `ease-editorial` / `duration-*` (CSS/Tailwind).
4. No hardcoded hex in components — token names only.
5. Every new interactive element is a real, labeled, focusable control with a
   reduced-motion path.
6. Update the Phase boxes in §8 as work lands so status never lies.
