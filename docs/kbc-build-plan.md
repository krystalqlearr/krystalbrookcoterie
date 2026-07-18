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

### 2.1 Color — BONE-LED warm-neutral palette (redesigned 2026-07)

Full pivot from the dark atelier to a warm bone-paper studio (refs: HAUS, VOL.ONE
STUDIOS, STAY). The inversion pair is `bone` (light) + `ink` (warm charcoal); muted
text and hairlines are OPACITIES of the pair, not separate tokens.

| token | hex | role |
|---|---|---|
| `bone` | `#EBE5D8` | primary canvas (warm ivory paper); ink-color on charcoal |
| `ink` | `#23201B` | warm faded charcoal — primary ink; bg for charcoal sections |
| `stone` | `#E0D8C7` | deeper paper — raised panels (form fields), subtle alt-section |
| `camel` | `#C6A98A` | champagne accent, used barely — the section Rule, a thin tick |
| `mocha` | `#9A8264` | deep warm neutral — imagery / atmosphere haze only |

Muted = `ink/65` (bone, 4.62:1 AA) · `bone/60` (charcoal). Hairlines = `ink/12–15` ·
`bone/15–20`. Prices/tags/asterisks are INK — ink-forward reads expensive; color is
nearly absent (camel FAILS as small text/price on bone, ~1.6:1). Grain is
`mix-blend: multiply` (paper tooth). **RETIRED:** rich-black, cream, deep-petrol, teal,
greige, surface-1/2. (The old "preserve values, never remap" rule applied to the dark
system; this pivot is the sanctioned, documented exception.)

### 2.2 Charcoal is punctuation

Charcoal (ink bg, bone text) is NOT the default — it's the dark inversion moment:
footer, closing-CTA showstoppers, scrolled header, browser frames, work-transition
overlay. One or two dark moments per page for rhythm.

### 2.3 Typography — big sans + serif italic (HAUS register)

**Approved 2026-07: monumental UPPERCASE sans + a quiet serif italic voice — "so
expensive you can see and feel it."**

Families (locally loaded, no Google Fonts):
- **Neue Montreal Extrabold (800), UPPERCASE** (`--font-sans` / `font-display`) — ALL
  display headlines, tier names, section titles (`EditorialHeading`, uppercase, tight
  tracking). The inline accent word is RETIRED.
- **Editorial New Italic (400)** (`--font-editorial`) — the supporting voice: hero
  sublines, SectionShell/PageHero intros, pull-quotes, Testimonial, project + case-study
  descriptors (serif italic, lowercase).

Scale: fluid clamp tokens (`fluid-sm … fluid-hero`) size everything; the tokens' tight
leading suits caps. The hero atmosphere is a faint warm paper haze (mocha/camel), not
colored glows.

### 2.4 Motion tokens (NEW — single source, never inline magic numbers)

- Easing: `--ease-editorial` `cubic-bezier(0.16, 1, 0.3, 1)` (primary, weighted
  ease-out); `--ease-inout` `cubic-bezier(0.83, 0, 0.17, 1)` (symmetric morphs).
- Durations: fast `0.4s` · base `0.6s` · slow `0.72s` · xslow `0.9s`.
- Exposed to CSS (custom props + Tailwind `ease-editorial`/`duration-*`) and to
  Framer via `lib/motion.ts`. **Luxury moves slowly and lands precisely — never bouncy.**

### 2.5 Layout & rhythm

Left-aligned by default, asymmetric editorial composition, generous whitespace.
Canvas rhythm alternates rich-black → petrol (alt) → cream (showstopper) per page.
Container: centered, wide gutters, `max-w-editorial` (90rem). Sharp corners
(`rounded-[1px]`) are brand; only pills/cursor are round.

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
