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

### 2.1 Color — MILK-LED warm-neutral + an ELECTRIC FLARE (redesigned 2026-08)

Second pivot: from the bone-paper studio to a milk-led canvas carrying an electric
magenta flare against a forest dark. Reference for the SYSTEM (not the palette):
bionicegg.com. Muted text and hairlines are OPACITIES of the pair, not separate tokens.

PAPER — one stock, three sheets, lightest on top. Nothing sits ABOVE the canvas:
elevation only goes DOWN from it, so an inset field is `stone`, not something lighter.

| token | hex | role |
|---|---|---|
| `milk` | `#FAF7F0` | THE CANVAS — the default page. Ink 16.2 (AAA) |
| `bone` | `#EBE5D8` | FIRST RECESS — the warm alt-section, AND the light ink on forest |
| `stone` | `#E0D8C7` | DEEPEST RECESS — inset form fields, the quietest band |
| `ink` | `#23201B` | warm faded charcoal-brown — primary ink + button fill |
| `forest` | `#0F2018` | THE dark inversion surface |
| `mocha` | `#9A8264` | deep warm neutral — imagery / atmosphere haze only |

THE FLARE — electric magenta, THREE STOPS. Neon and AA cannot be one swatch, so the
stop is chosen by SIZE and CANVAS, never by taste:

| token | hex | rule |
|---|---|---|
| `flare` | `#FF0080` | NEON. Graphics + text ≥24px ONLY, on milk/bone/forest. NEVER on stone (2.66) |
| `flare-deep` | `#A8004F` | TEXT. Anything under 24px, plus the one full band. 6.02 on bone, 5.33 on stone |
| `flare-lift` | `#FF7ABF` | The flare ON forest — 7.09, safe at any size |

Green is electric magenta's TRUE COMPLEMENT, which is why the flare reads hotter on
forest than on any neutral. It works because the green is nearly black and the flare is
rationed — lighten either and it tips into Christmas.

ONE flare element PER VIEW, not per section. This is ENFORCED IN CODE: `SectionShell`
derives the stop from `tone` and passes it to `EditorialHeading`, so a heading cannot
silently ship a failing pair. Every display size floors at 24px precisely so the neon
stop stays legal on headings.

MUTED TEXT FLOOR = `ink/70` on milk, bone AND stone (5.72 / 5.37 / 5.05) · `bone/60` on
forest (5.82). These are FLOORS: `ink/65` clears bone at 4.62 but FAILS stone at 4.38,
and `ink/60` fails both. Opacity is therefore NOT available as a hierarchy step below
the floor; use color instead. Prices/tags/asterisks stay INK. Focus rings are NEVER the
flare. Grain is `mix-blend: multiply` (paper tooth).

**RETIRED:** cherry/maroon/blush (the wine flare), charcoal `#1E1418` (its blue channel
sat above green, which made every dark band read aubergine), camel, rich-black, cream,
deep-petrol, teal, greige, surface-1/2.

### 2.2 The dark is punctuation

Forest (`forest` bg, bone text) is NOT the default — it's the dark inversion moment:
footer, closing-CTA showstoppers, scrolled header, browser frames, work-transition
overlay. One or two dark moments per page for rhythm — home and /services each run
exactly two.

### 2.3 Typography — ONE typeface, TWO registers (grotesk pivot 2026-08)

**PP Neue Montreal carries everything. There is no second typeface and no third voice.**

- **DISPLAY — weight 400 (REGULAR), sentence case**, enormous, hard negative tracking
  (−0.045 → −0.06em), sub-1 leading (0.92), capped ~108px. Tracking and leading live in
  the `fluid-xl … fluid-hero` tokens — NEVER hand-tune a heading. Write headlines as
  short declarative sentences ending in a period, stacked two or three deep. The
  restraint IS the luxury signal: 400-weight at 108px outranks any bold cut.
- **META — 13px UPPERCASE Semibold (600) at +0.13em.** The ONLY uppercase on the site:
  eyebrows, tags, indices, captions, credits, nav, form labels, CTAs. (The family has
  no 700, hence 600.)

THE FLARE THREAD survives as COLOR, not as a second face: one word per heading passed
as `accent`, in the SAME face and weight.

Scale: fluid clamp tokens (`fluid-sm … fluid-hero`). `fluid-xl` floors at 24px so every
display size stays inside WCAG "large text". The hero atmosphere is a faint warm paper
haze (mocha), not colored glows.

**RETIRED:** Neue Montreal Extrabold/Black (800/900 — loaded, never set), uppercase
display, and PP Editorial New entirely (serif italic sublines, pull-quotes, the serif
accent word). The .woff2 files remain in /public/fonts; the font is no longer loaded.
Only the wordmark sits outside the two registers, at Medium 500 uppercase.

### 2.3b Signature devices (2026-08)

| device | role |
|---|---|
| `ArrowLink` | THE CTA. Actions are TYPOGRAPHY, not boxes — meta label + flare arrow over a hairline that wipes in on hover/focus. `Button` (ink fill) is for real form controls, at most one per view |
| `IndexMeta` | `01 / 07 — Med-spa · Brand + Web`. Live number takes flare-deep (13px text); turns a grid into an edited sequence |
| `Rule` | 1px hairline. `flare`+`short` opens a section header; `hair` splits rows |
| `Marquee` | Pure-CSS band. Pauses on hover, STOPS under reduced motion. Presentational only |
| `StatStrip` | The proof band on forest under the hero. 3–4 DEFENSIBLE figures — every one must already be a claim the site makes elsewhere |

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

- [x] **Phase 5 — Grotesk pivot (2026-08).** Identity rebuilt around bionicegg.com's
      typographic SYSTEM in KBC's own palette. Milk-led canvas; electric magenta flare
      in three stops; forest dark. One typeface, two registers (§2.1–2.3). New devices:
      `ArrowLink`, `IndexMeta`, `Marquee`, `StatStrip`. Home, `/services`, `/process`,
      `/journal` recomposed into the section rhythm; `/work`, `/about`, `/begin` brought
      onto the register. PP Editorial New retired and unloaded.
      **Bugs fixed:** `lib/` was missing from Tailwind's `content` globs, so the
      class-strings in `lib/work.ts` were never generated and `/work`'s asymmetric grid
      had NEVER rendered; `gap-x-gutter` on a 12-col grid consumed 704px of an 896px
      track; 139 pre-existing contrast failures (muted floor `ink/65` fails on stone);
      19 ad-hoc meta declarations across 5 files; `/services` metadata + FAQ advertised
      retired tier names; the OG share card still rendered the entire old brand.
      **Verified:** 1,498 text nodes across 11 routes at 1440/390 — zero contrast
      failures, zero horizontal overflow, every route has an `h1`.

## 9. Anti-drift protocol

1. This file + `CLAUDE.md` are canonical. Any change to tokens, motion, routes, or IA
   updates BOTH in the same change. (Broken three times during the 2026-08 pivot:
   `CLAUDE.md` was rewritten while this file kept describing the retired wine/bone/
   uppercase system. If you are editing one, grep the other for the token names you
   are retiring BEFORE committing.)
2. Token values are never remapped by name; the material/motion layer is additive and
   documented here — additions to it are recorded in §2.
3. No inline easing/duration magic numbers — import from `lib/motion.ts` (JS) or use
   `ease-editorial` / `duration-*` (CSS/Tailwind).
4. No hardcoded hex in components — token names only. ONE sanctioned exception:
   `app/opengraph-image.tsx`, because Satori resolves no Tailwind classes. Those
   literals are milk / ink / ink@70% / flare and MUST be updated by hand whenever the
   corresponding tokens change — the share card is the most public surface on the site
   and nothing in the app will surface its drift.
5. Every new interactive element is a real, labeled, focusable control with a
   reduced-motion path.
6. Update the Phase boxes in §8 as work lands so status never lies.
