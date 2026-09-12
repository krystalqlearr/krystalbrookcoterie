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

### 2.1 Color — TWO GROUNDS + ONE CHERRY FLARE (re-chosen 2026-09-07)

Third pivot (2026-09-07): from the milk/bone/stone recesses with a magenta flare on a
teal river to TWO GROUNDS — milk and the blackest black — with one CHERRY flare.
Krystal's words, in order: "I like the milk, I like the typography colours, I think
the forest or the dark teal colour and the magenta I'm not liking as much. I want the
flare to be more of a pretty neon for a real flare moment." → "Magenta is just too
purple leaning." → "Not pretty and bold enough. Needs to read feminine but bold enough
for a masculine luxury site to still choose me." → "I like the milk, I don't like the
stone. There needs to be more contrast." → "The blackest warm black with milk and
white white and then the lipstick and cherry. And when you scroll over a service card
the whole card turns the flare colour and the text changes to work with it." → cherry.
Muted text and hairlines are OPACITIES of the pair, not separate tokens.

| token | hex | role |
|---|---|---|
| `milk` | `#FAF7F0` | THE CANVAS — every paper surface, AND the light ink on onyx. Ink 16.2 (AAA) |
| `white` | `#FFFFFF` | THE LIFT — the one sheet above the canvas: cards, form fields (ink hairline). Never a section fill |
| `ink` | `#23201B` | warm faded charcoal-brown — primary ink + button fill |
| `onyx` | `#0E0C0B` | THE DARK — "the blackest warm black"; a black gemstone beside the crystal mark. Milk ≈18 · neon 5.07 |
| `mocha` | `#9A8264` | deep warm neutral — imagery / atmosphere haze only |

THE FLARE — CHERRY, TWO STOPS (hue 349°, the red side of pink; magenta at 330° leaned
purple, lipstick #FF1F52 at 346° was the runner-up). Neon and AA cannot be one swatch,
so the stop is chosen by SIZE, never by taste:

| token | hex | rule |
|---|---|---|
| `flare` | `#FF1744` | NEON. On milk/white: graphics + text ≥24px ONLY (3.60 / 3.85). On onyx: any size (5.07). Also the FLOOD |
| `flare-deep` | `#B3102E` | TEXT ON PAPER. Anything under 24px, plus the one full band (milk text) and the button hover. 6.48 on milk |

`flare-lift` is retired (the neon is its own text colour on onyx); so are `bone`
`#EBE5D8` and `stone` `#E0D8C7` (the beige recesses — a tint next to a hot red reads
cream-and-terracotta; a pale grey would be cleaner but no more contrasty, 1.1–1.3:1
against milk either way) and `river` `#0F2A2D` (the teal). `SectionShell` tones are now
`light | rule | dark` — `rule` is milk with an ink hairline above. THE FLOOD: a card or
row fills cherry on hover/focus-within; display line → milk (3.6), smaller → ink (4.2).
Also fixed on the way: Tailwind's opacity scale has no `12`, so every `ink/12` hairline
had rendered as preflight grey since the rule was written — `theme.extend.opacity.12`.

The physics that decided the shape (recorded so it's never re-litigated): a neon
GLOWS against dark. Lime / mint / cyan / coral sit at 1.1–1.4:1 on milk and cannot
carry a word or an arrow on paper. Magenta was only ever there because #FF0080 is the
one hue that reads neon AND clears 3:1 on milk; cherry keeps that property (3.60) with
the purple taken out. Two boards were made (`public/_tmp-flare-board.html`, gitignored):
five hue families first, then the red-pink band (lipstick → cherry → signal red) with a
global dark switcher; the decision was made on the live site with the flooded card as
the swatch, from headless-Chrome renders (the pane's screenshots are blank while it's
hidden).

ONE OR TWO flare touches PER PAGE — not per view, not per section (tightened in the
2026-09 quiet-luxury pivot; it was previously one per view). MOST SECTIONS CARRY NO
FLARE AT ALL. Spend the budget on the page's actual moments — typically the hero's
heading accent word and the closing CTA's — and leave everything between them plain
ink. An accent in every section stops reading as a decision and starts reading as a
habit. Carved out because they're functional rather than decorative: `IndexMeta`'s
live index numbers and `ArrowLink`'s glyph. A full-bleed flare band is at most once
per page and spends the entire budget.

The CONTRAST half of this is ENFORCED IN CODE: `SectionShell` derives the stop from
`tone` and passes it to `EditorialHeading`, so a heading cannot silently ship a
failing pair. Every display size floors at 24px precisely so the neon stop stays legal
on headings. The FREQUENCY half is a judgment call and cannot be enforced by a
component — count the flare touches on a page before shipping it.

MUTED TEXT FLOOR = `ink/70` on milk (5.72) and on white (≈6) · `milk/60` on onyx (≈7.8).
These are FLOORS — never below `ink/70` for text. Opacity is therefore NOT available as
a hierarchy step below the floor; use color instead. Hairlines and decorative
aria-hidden marks are exempt: `ink/12–15` · `milk/15–20`. Prices/tags/asterisks stay
INK. Focus rings are NEVER the flare (ink on milk/white, milk on onyx). Grain is
`mix-blend: multiply` (paper tooth).

**RETIRED (in order):** the wine cherry/maroon/blush of 2026-07 (a darker red — not
this cherry), camel, rich-black, cream, deep-petrol, teal, greige, surface-1/2; forest
green `#0F2018`; aubergine `#1E1418`; warm black `#13120F`; the electric magenta
`#FF0080 / #A8004F / #FF7ABF`; river `#0F2A2D`; bone `#EBE5D8`; stone `#E0D8C7`; the
interim oxblood `#24100F` and warm black `#161311`; lipstick `#FF1F52 / #B01A3F` (the
runner-up flare).

### 2.2 The dark is punctuation

Onyx (`onyx` bg, milk text) is NOT the default — it's the inversion moment: the
footer, closing-CTA showstoppers, the expanded case study, browser-frame chrome. One
or two dark moments per page for rhythm; the homepage has only its footer. OPEN: the
scrolled header over a dark band reads as a pale strip (milk/90 over black) — hers to
call.

### 2.3 Typography — ONE typeface, TWO registers (grotesk pivot 2026-08)

**PP Neue Montreal carries everything. There is no second typeface and no third voice.**

- **DISPLAY — weight 300 (LIGHT, Round 2 2026-09; was 400), sentence case**, hard
  negative tracking (−0.045 → −0.06em), sub-1 leading (0.92), capped ~108px. The
  weight is set in exactly one place (`.type-display`, globals.css); tracking and
  leading live in the `fluid-xl … fluid-hero` tokens — NEVER hand-tune a heading.
  Light is Studio Krista's airiness in KBC's own family (the Light cut was already
  loaded); no serif returns. On the homepage the register is used SMALL — the h1 is
  `fluid-xl`; the only large type there is the name, transiently, as it floats into
  the header.
- **META — 13px UPPERCASE Semibold (600) at +0.13em.** The ONLY uppercase on the site:
  eyebrows, tags, indices, captions, credits, nav, form labels, CTAs. (The family has
  no 700, hence 600.)

THE FLARE THREAD survives as COLOR, not as a second face: one word per heading passed
as `accent`, in the SAME face and weight — and spent against the one-or-two-per-PAGE
budget in §2.1, not per heading.

**TWO SIZE TIERS PER PAGE, not a different size per section** (2026-09 pivot). A page
has one or two MOMENTS — the hero, and usually a closing CTA — which carry `hero`/`lg`.
Every other section heading on that page takes the SAME smaller size (`md`). Varying
the scale section by section reads as a system being exercised; holding one secondary
size and letting whitespace do the pacing reads as confidence.

Scale: fluid clamp tokens (`fluid-sm … fluid-hero`). `fluid-xl` floors at 24px so every
display size stays inside WCAG "large text". The hero atmosphere is a faint warm paper
haze (mocha), not colored glows.

**RETIRED:** Neue Montreal Extrabold/Black (800/900 — loaded, never set), uppercase
display, and PP Editorial New entirely (serif italic sublines, pull-quotes, the serif
accent word). The .woff2 files remain in /public/fonts; the font is no longer loaded.
Only the wordmark sits outside the two registers, at Medium 500 — LOWERCASE since
Round 2 (one shared recipe in `components/Logo.tsx`; header, footer, styleguide): the
landing name floats into the header and becomes the logo, so the mark matches it.
The monogram "KBC" keeps uppercase.

### 2.3b Signature devices (2026-08)

| device | role |
|---|---|
| `ArrowLink` | THE CTA. Actions are TYPOGRAPHY, not boxes — meta label + flare arrow over a hairline that wipes in on hover/focus. `Button` (ink fill) is for real form controls, at most one per view |
| `IndexMeta` | `01 / 07 — Med-spa · Brand + Web`. Live number takes flare-deep (13px text); turns a grid into an edited sequence |
| `Rule` | 1px hairline. `flare`+`short` opens a section header; `hair` splits rows |
| `Marquee` | Pure-CSS band. Pauses on hover, STOPS under reduced motion. Presentational only |
| `StatStrip` | The proof band on onyx under the hero. 3–4 DEFENSIBLE figures — every one must already be a claim the site makes elsewhere |

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
  `soft` (blur-to-sharp, short text) · `fade` (opacity + 12px, blocks) · `rise`
  (legacy 24px) · `from` + `distance` (directional, for media), staggerable, off
  under reduced-motion. The site-wide register since 2026-09-06: words fade, media
  slides — see Phase 8.
- **Signature: the work transition** — a browser-framed project card expands in place
  into a full-bleed, scrolling case study (Framer shared-layout FLIP). The credibility
  moment. Prototype lives in `WorkShowcase`; promoted to `/work` + real route
  transitions (View Transitions API) in Phase 4.
- **Cursor** — the milk inversion dot (`mix-blend-difference`; mint over the cherry flood), 14px, growing to 44px
  over interactive targets and to 64px carrying a word over `data-cursor-label`
  targets (`open` on a work frame, `close` on the expanded close button). The label
  sits INSIDE the blended dot so it's always the dot's inverse. Done in Round 2.
- **Page transitions** — View Transitions API on route change (progressive
  enhancement; native where supported, instant fallback elsewhere).
- **Type choreography** — hero headline arrives per-line (mask reveal + blur-to-focus);
  accent word settles distinctly.
- **Dispersion** (`components/motion/Dispersion.tsx`) — the positioning claim
  demonstrated rather than stated: incidence angle separates three readings of one
  sentence. Live on `/` and on the `/for/[slug]` outreach pages.
- **CrystalMark** (`components/motion/CrystalMark.tsx`) — a 36px refractive glass gem;
  ordered hex-bipyramid geometry on a real `MeshPhysicalMaterial` (transmission + ior
  + PMREM environment). Three.js is dynamic-imported inside the effect so it never
  enters the first-load bundle; `preloadCrystalMark()` warms those imports on hover.
  Since Round 2 it is the work expand's BETWEEN-MOMENT: on click the gem holds alone
  on milk for `GEM_BEAT_MS` (400) at `z-[230]`, then the morph starts as it fades.
  Skipped under reduced motion.
- **Reveal `variant="soft"`** — blur-to-sharp (`revealSoft` in lib/motion.ts:
  `filter blur(6px)→0`, y 12→0, `DUR.xslow` on `EASE`) for short captions and
  one-liners only; `filter` isn't compositor-only. Existing `rise` reveals untouched.
- **Reveal `from` + the site-wide pass (DONE 2026-09-06, on her "go ahead")** —
  `revealFrom(direction, distance, soft)` and `revealFade` in lib/motion.ts;
  `TRAVEL = { text: 12, aside: 24, media: 48, frame: 64 }` so no page carries a
  magic number. Krystal's ask: "the words as you scroll on each page fade in, and
  certain pics or videos slide in from different places." The register: WORDS FADE
  (`soft` on headings/eyebrows/captions, `fade` on paragraphs/lists/forms/meta),
  MEDIA SLIDES (`from`, art-directed). Applied: `SectionShell` and `PageHero` stagger
  their headers (tick/eyebrow/heading soft, intro fade); `/` — the work frame drops
  from above (mirrors the name's ascent), tiers stagger in, every line soft/fade;
  `/work` — hero stagger, each frame enters from its grid side via
  `WorkProject.enter` (glowtoure left · maison right · étoile up), meta fades after;
  `/work/[slug]` — header stagger, hero frame rises 64, meta column from the right,
  results were a stagger with no items (animated nothing) → real `RevealItem`s;
  `/about` — portrait from the left, text stagger; `/begin` — form fades, aside from
  the right; `/services` `/process` `/journal` — rows fade, journal titles soft;
  `/privacy` `/terms` `/for/[slug]` — had no reveals at all; blocks fade.
  `/styleguide` deliberately untouched (a spec sheet, not a visitor page). The
  `WorkShowcase` entrance sits on the frame's own `motion.div` (variants +
  `whileInView`), NOT a wrapper: a transformed ancestor becomes the containing
  block for the frame's `fixed` expanded state and clips the morph — verified the
  open frame still measures 0,0 × viewport. `html { overflow-x: clip }` (not
  `hidden`, which would make a scroll container and break sticky/Lenis) absorbs
  the sideways travel; scrollWidth stayed ≤ innerWidth. Verified by DOM probe on
  her server: hidden states (`y ±64`, `x −48/+24`, `blur(6px)`) and settled states
  (`opacity 1`, `transform none`) on /, /work, /about, /begin, /services; zero
  console errors; `tsc` clean.
- **The palette re-chosen (DONE 2026-09-07)** — see §2 for the system and the
  physics. Sequence: magenta + teal rejected → five-family board (mint/cyan/coral/
  tangerine/two-colour) rejected as "not pretty and bold enough" → red-pink band
  board (lipstick / cherry / signal) with a dark switcher → lipstick on oxblood put
  live → "the board's warm black" → stone rejected, "more contrast" → beige recesses
  retired as fills, `white` added as the lift, `bone` repointed to milk → "the
  blackest warm black… milk and white… lipstick and cherry… the whole card turns the
  flare colour" → THE FLOOD built on `ServiceCard` + the home tier rows → cherry
  chosen from headless-Chrome renders of both. Confirmation pass: `river`→`onyx`,
  `bone`→`milk`, `stone` removed, `flare-lift` folded into `flare`, `SectionShell`
  tones `light | rule | dark`, `EditorialHeading` canvas `milk | dark`, the
  `opacity.12` fix, CLAUDE.md / styleguide / this doc rewritten. The four parked
  scenes keep their old hex constants (they document a retired era). OPEN: the
  scrolled header over a dark band reads as a pale strip; the cursor reads mint over
  the flood (accepted for now). Her own `:3000` server needs a restart to compile the
  new tokens.
- **Reveal retuned to Bionic Egg's clock (2026-09-07).** Her ask: "I want it to do
  what bionicegg does. It almost looks like a quick fade into visibility as you
  scroll." Measured by headless probe, not by eye: their `[data-reveal]` hidden
  state is `opacity 0 · translate3d(0,32px,0) · blur(10px)`; `.is-visible`
  transitions `opacity 0.65s, filter 0.75s, transform 0.7s cubic-bezier(0.2, 0.72,
  0.2, 1)`; sampled at 50ms, opacity hits 0.7 by ~220ms and the rise has covered
  two-thirds of its travel by ~100ms — a fast front and a soft tail, on ONE recipe
  for every text block; the reveal begins ~250ms after the block enters. Ours was
  0.9s on the expo-out `EASE`, 12px, blur 6, split into soft/fade. Now: `revealText`
  reproduces theirs property for property (`EASE_REVEAL`, `EASE_CSS` in
  lib/motion.ts); `soft`/`fade` alias it; `TRAVEL.text` 32; media slides moved onto
  the same 0.7s curve; `Reveal` fires at `amount 0.15` (was 0.3). Verified by
  sampling our own reveal on `/services` the same way.
- **The case study opens the deliverable (2026-09-10, her call).** The Glowtoure
  brand book — published as an artefact, credited on its own last line to
  "Identity, design system and art direction by Krystal Brook" — is linked from
  `/work/glowtoure`, directly under the Scope list. That placement is the whole
  argument: the list says "Art direction" and "Design system", and the next thing
  on the page opens them. `WorkProject.deliverable` ({ label, href, note }) keeps
  it in the data file, so the template carries the pattern for any project that
  earns one; a case study with no published artefact renders nothing.
  Verified in place: `target="_blank" rel="noopener noreferrer"`, ink label,
  neon glyph, no mobile overflow, and the page's flare census still reads exactly
  two decorative touches ("Nothing" at 44px, "worth" at 81px, both on onyx) plus
  the ArrowLink glyph, which the budget carves out as a CTA affordance.
  Cross-check that cost nothing: the book names PP Frama, Frama Text, Right Serif
  and Playground — the same four faces found by probing the live site's bundles
  for row 16.29, from two independent directions.
  ON OUR OWN DOMAIN, ALWAYS (same day, her call, emphatic: "I DON'T WANT AN AI
  URL VISIBLE"). It shipped for one commit pointing at the artifact host it was
  authored on. That was wrong on the site's own terms — the positioning is rented
  vs. owned, and the AI rule is never-volunteer; handing a prospect a URL on
  someone else's platform, one that names the tool in the domain, breaks both at
  the exact moment the case study is asking to be trusted. The document is now a
  static file under `/public/brand`, served at `/work/glowtoure/brand-system` by
  a rewrite in next.config.mjs, and `git grep claude.ai` over app/components/lib/
  public returns nothing.
  HOW IT MOVES, and why it is a script (`scripts/split-brand-book.mjs`) rather
  than a copy-paste: the authored document embeds all nine Pangram Pangram faces
  as base64 — 447 KB of 631 KB — which re-downloads every visit and gzips badly,
  woff2 being compressed already. Split out, the document is 35 KB and the faces
  cache. The script also refuses to write anything that still reaches an external
  host (a brand book that phones home defeats the whole point of moving it), and
  fixes the head: the authoring host wraps content in its own skeleton, so the
  `<title>` had landed inside `<body>` and the page carried no description and no
  canonical — on our domain it is a real indexable page and now has all three,
  plus a sitemap row derived from `deliverable.href`. Deterministic, so re-running
  it against an unchanged source is a no-op in git. Verified end to end: the
  rewrite serves 200 text/html, all nine faces resolve 200, `document.fonts`
  reports every face loaded, zero failed requests and zero console errors.
  TWO THINGS STILL HERS. (1) FONT LICENSING is the one open question and it is a
  real one: the book states the four faces are "licensed to Glowtoure", and
  Pangram Pangram webfont licences are ordinarily per-domain. Serving them from
  krystalbrookcoterie.com is a second domain. Worth confirming with the foundry;
  if it is not covered, the clean answer is to host the book at glowtoure.com and
  repoint `deliverable.href` — still not an AI URL, and arguably better, since a
  client's brand book on the client's own domain is the strongest possible proof.
  (2) The book's photography section discloses that AI-assisted illustration is
  permitted for hero and editorial imagery, never for before-and-after results.
  That is Glowtoure's own published rule, not KBC copy, so the never-volunteer-AI
  rule is not broken by linking it — but a prospect who clicks does read it.
  NIT, in the source document rather than here: on the type page the weight badge
  "400" butts straight against "Excluded from preload…" with no space. Fix it in
  the source and re-run the script.
- **The case study shows the phone (2026-09-09).** Five pages of glowtoure.com
  recorded at iPhone width and put on `/work/glowtoure` as an "On the phone"
  section — the mobile counterpart to the desktop frame at the top, and the
  page's one mid-scroll dark moment. Three are used (Home · Services · Booking —
  the journey); bridal and gallery are captured and swap in by editing
  `WorkProject.phones`. The recordings are driven rather than hand-captured
  (`scratchpad/gt-record.mjs`, kept): a constant 300 css px a second so every
  clip reads at one pace, TRIMMED to each page's best 12–15 seconds instead of
  sped up to cover all of it — which also took them from 5–6 MB to 1.1–1.4 MB,
  since a slower scroll compresses far better. Cookie banner declined before
  each capture and every lazy image woken first. mp4 only (H.264 plays
  everywhere and these are small enough that a second format buys nothing).
  `PhoneRow` attaches `src` only when the row is near the viewport, so the case
  study's initial load is byte-for-byte what it was — verified: zero video
  requests until the section is scrolled to, then all three play.
- **The work is one project (2026-09-09, her call).** Maison Dermé and Étoile
  Atelier deleted from `lib/work.ts` — both were invented concepts carried with
  gradient placeholders and a "Concept" / "In production" label to make the work
  look fuller, which is the invented-testimonial failure with a brand name instead
  of a quote. Ripples handled rather than left: the home concepts list and its now
  unused `IndexMeta` import are gone; `IndexMeta`'s total is suppressed at a count
  of one (`01 — Glowtoure`); a lone frame on `/work` takes the full 12-column track
  and enters rising instead of hugging a 7-column slot with a dead half-page beside
  it. All three reverse themselves the moment a second real project lands. OPEN:
  `/work`'s intro still says "Selected identities and digital experiences" (plural)
  — hers to reword at the copy review.
- **Phase 9 — Services by discipline (2026-09-07).** Her ask: services "laid out more
  like a page underneath each category", a services "dropdown in the menu bar", the
  seven disciplines she listed, and a process section tied to the name. Decisions:
  tiers → "check how Bionic Egg and the others do it" (they sell by discipline with
  NO price list; Bionic Egg's nine service pages are her list nearly verbatim; Clay
  names engagement models in its FAQ; Studio Krista has three services and a
  10-step process page) → option (a): services by discipline, tier names as sizes,
  exactly one public figure (`FLOOR`); Squarespace = the seventh page, framed as a
  stage; process keeps Position · Direct · Design · Build · Release and gains "the
  coterie". Built: `lib/services.ts` (one data file → hub, seven pages, panel
  column, home rows, sitemap); `/services/[slug]` template (hero → covers →
  for + commissioned-as → phases row → one frame → questions → alongside →
  Commission, JSON-LD `Service`); the hub rewritten (counted flooding rows → sizes
  without prices → Care Plans without prices → FAQ with "What does it cost?" and the
  template answer softened for Squarespace → dark CTA); the Menu panel's second
  column (folds under `+` below `lg`); home "Ways in" → the seven services;
  `/begin` carries the floor and the form asks for a RANGE (the mis-named tier
  prices are gone — deck inconsistency #2 settled); `/process` "The coterie"
  section; sitemap. Copy is all WORKING DEFAULT — deck §16. Retired from public:
  tier prices, Care Plan prices, the $2,800 founding figure (restore as a row if
  she wants it). OPEN: her copy for §16; the Founding Client program's fate.
  **Addendum (2026-09-07, "add all of those under the services they belong in and
  under the Glowtoure case study"):** `Service.builtWith` — a "Built with" row in
  the meta column of a service page (Websites: the full stack; Redesign; Development
  with Sanity; Search; Squarespace: the platform; Identity and Collateral none).
  Glowtoure's `stack` was re-verified by probing the live site's own bundles before
  widening it: Next.js, next/image, Lenis, Tailwind, next/font local fonts and a
  Vercel deployment id are all present; Framer Motion, Sanity and Three.js are NOT,
  so they are not claimed on the case study (the invented-testimonial rule applies
  to tools too). Her follow-up, "it should be using Pangram Pangram fonts": the
  foundry is now named — on Websites/Redesign ("Pangram Pangram type, self-hosted"),
  on Identity, and on Glowtoure, where a computed-font census found four PP faces
  (Frama, Frama Text, Right Serif, Playground) self-hosted through next/font.
- **The work frame** — `WorkShowcase variant="sequence" gem` (`components/WorkShowcase.tsx`):
  one project per screen in `BrowserChrome` (`components/BrowserFrame.tsx`, shared
  with the /work grid; all dots milk/25), 16:9, capped to the viewport; caption
  beneath via IndexMeta; the same `layout` morph as /work; focus to Close on open and
  back to the trigger on close. Video-ready: `WorkProject.video {mp4, webm, poster}`
  renders a looping muted `<video>` (poster under reduced motion). Non-live projects
  show `status` in the pill, never a URL; the homepage lists them, doesn't frame them.
- **The landing** (`components/motion/LandingWordmark.tsx`) — the homepage opens on
  the name alone: lowercase, small, wide-tracked, centred on an empty milk screen —
  no headline, no CTA, and no header or nav either. Scrolling doesn't cut to the
  site; the name GROWS toward you first (viewport-capped so a phone never clips it
  mid-word; no growth floor), then FLOATS into the header's wordmark slot and becomes
  the logo — one continuous element at Medium 500, lowercase, ending at the logo's
  measured size and tracking. Float, not snap (Round 2, "I do want the name to float
  into its position"): scroll progress over `LANDING.endVh` is fed through a spring
  (`LANDING.spring`, no overshoot) so the name trails the scroll by a beat; the path
  lifts by `LANDING.arcPx` mid-travel; `transformOrigin 0% 50%` anchors the LEFT edge
  so tightening tracking lands it exactly on the slot's left edge; arrival is the
  spring settling (≥0.985), not a threshold — the traveler fades over `DUR.base` as
  the header fades in over `duration-600`. The sticky box is pinned for `endVh` plus
  a hold (`HOLD_VH`) so a fast scroll never drags the still-fading name off the
  header. A ghost span measures the name at rest (a reload mid-scroll would otherwise
  measure a mid-morph element); the target is `[data-wordmark-slot]` (the header
  Link) and its `[role=img]` Logo. It sets `data-landing` on `<html>`; `SiteHeader`
  observes
  that (MutationObserver — the header mounts before the page, so a one-shot read
  would miss it) and stays out with `opacity-0` + `inert` until the same 0.6vh, so
  the nav is never on screen while the name is, and never in the tab order while
  invisible. Fade is driven from raw `scrollY` against viewport height, NOT
  `useScroll({ target })` — the section is sized in `svh`, which resolves after
  framer measures, so target-relative progress never advanced. Decorative by design:
  the real `<h1>` and every CTA sit in the hero directly beneath. Reduced motion
  renders a short static band, no pin, no fade, header visible from the start.
- Respect `prefers-reduced-motion` everywhere: instant, no morph, no parallax — as
  STYLE, never as STRUCTURE. Never branch returned markup on `useReducedMotion()`:
  the server renders the no-preference tree, a reduced-motion client renders a
  different one, and React throws #418 then #423 — #423 drops the whole root to
  client rendering. It was live on `/`, `/work` and `/work/glowtoure` until
  2026-09-12, visible only to a visitor who has reduced motion on. Use
  `motion-reduce:` variants or the `[data-reveal]` override in globals.css; for the
  values CSS cannot carry (`<video>` src, `autoPlay`) gate on `useHydrated()` so the
  first client render still matches the server. See CLAUDE.md, Motion.

**MOTION IS SMALL AND SPECIFIC, NEVER AMBIENT (2026-09 quiet-luxury pivot).** Nothing
runs full-screen or continuously behind content. Retired to parked status — real,
working, and deliberately unshipped, because each one announces itself and the site's
register is now restraint:

- `components/motion/CurrentScene.tsx` — the full-bleed "riding the current" engine
  (particle current, wave-morphing grid, caustics, bloom, scroll-driven content
  waypoints). The entire homepage was built on it before this pivot.
- `components/motion/CrystalShatterScene.tsx` — a rotating refractive crystal
  shattering into that current on scroll. Prototyped at `/prototype-shatter` (route
  since deleted); never shipped.
- `components/Hero.tsx` + `components/motion/HeroCrystal.tsx` — Nucleation, the
  pointer-seeded crystal-growth hero with a shareable seed.

All four stay in the tree, unimported, as raw material for the **crystal generator**:
a FUTURE, SEPARATE per-client product — a parametric brand visual (facets, symmetry,
edge sharpness, clarity, refraction) that each client generates, keeps, and alone
has. It is explicitly NOT part of the homepage or the site IA; where it lives is
unscoped.

---

## 4. Information architecture (canonical route map)

**Canonical primary CTA route: `/begin`.** (Fixes the current `/contact` vs `/begin`
split — header linked `/contact`, homepage linked `/begin`.) All "Begin" CTAs → `/begin`.

| route | status | notes |
|---|---|---|
| `/` | done | home (Round 2) — landing (name grows, floats into the header) → the work (one frame, expands in place after the gem beat) → the two concepts, listed → studio line (the h1, small, Light) → four tiers, one line each → marquee 90s → closing line → footer (the only dark surface) |
| `/work` | rebuild | the signature transition index (from `WorkShowcase`) |
| `/work/[slug]` | build | real case-study routes w/ View Transitions; `glowtoure` first |
| `/services` | build | 4 tiers; pricing revealed after desire, not a lead grid |
| `/process` | build | how the studio works; senior-judgment narrative |
| `/about` | build | founder-led story; the person is the brand |
| `/journal` | build | editorial notes / SEO surface (optional MDX) |
| `/begin` | build | the enquiry experience (canonical CTA) — no financial fields |
| `/styleguide` | keep | internal token/system reference (noindex); keep in sync |
| `/for/[slug]` | done | personalized outreach landing pages (noindex); data in `lib/prospects.ts` |

Prototype routes are temporary by definition — delete each one the moment its question
is answered, so the tree never accumulates dead exploration. `/prototype` (deleted once
`/work` was promoted) and `/prototype-shatter` (deleted when the crystal-shatter opener
was rejected in the 2026-09 pivot) are both gone; the components they exercised are
parked, not deleted (see §3).

Nav data lives in `components/nav.ts` (shared server/client). Keep it the single source.

---

## 5. Component inventory

**Keep / refactor to system:** `Button`, `EditorialHeading`, `Eyebrow`, `Rule`,
`SectionShell`, `ImageFrame`, `BrowserFrame`, `ProjectCard`, `ProjectFeature`,
`ServiceCard`, `Testimonial`, `FAQAccordion`, `SiteHeader`, `SiteFooter`, `Logo`,
`CustomCursor`.

**New (foundation):** `lib/motion.ts`, `components/motion/SmoothScroll.tsx`,
`components/motion/Reveal.tsx`, `WorkShowcase` (done, prototype).

**Live devices (2026-08 → 09):** `ArrowLink`, `IndexMeta`, `Marquee` (90s), `Rule`,
`StatStrip` (on /services and the styleguide; no longer on `/`), `Dispersion` (on
`/for/[slug]`; no longer on `/`), `CrystalMark` (the expand's between-moment),
`WorkShowcase` (`index` on /work, `sequence` + `gem` on `/`), `BrowserChrome`
(shared browser bar), `Reveal` `soft` variant, `LandingWordmark`, the cursor's labels.

**Parked / retired — in the tree, imported by nothing:** `Hero` (Nucleation),
`motion/HeroCrystal`, `motion/CurrentScene`, `motion/CrystalShatterScene`. Kept as
raw material for the future per-client crystal generator (§3). Do not re-import them
into a page without a deliberate decision to reverse the quiet-luxury pivot.

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
  on long sections. Next 15 landed 2026-09-12 (15.5.25, React 18 retained); PPR and
  stable View Transitions are still to evaluate on it.
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
      "To publish" result slots; soft-nav route transitions are unblocked by the Next 15 upgrade
      (2026-09-12) and remain unbuilt.
- [~] **Phase 5 — Perf/SEO/future.** DONE: shared metadata base (title template, OG +
      Twitter cards), dynamic `opengraph-image`/`twitter-image` (edge), JSON-LD
      (Organization + WebSite), `sitemap.ts`, `robots.ts` (styleguide disallowed).
      TODO: per-case-study CreativeWork JSON-LD (with Phase 4), Speculation Rules,
      image pipeline once real photography lands, CWV/Lighthouse pass on a production
      build, PPR evaluation on Next 15 (which landed 2026-09-12).
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
      in three stops; river dark. One typeface, two registers (§2.1–2.3). New devices:
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

- [x] **Phase 6 — River swap (2026-08).** `forest` (#0F2018) → `river` (#0F2A2D)
      site-wide: the token itself renamed, not just the hex, across 18 files. The
      rationale was rewritten honestly — river is NOT magenta's color-wheel
      complement the way forest green was, so that claim was dropped in favour of
      what the name literally means (Krystal = clear water; Brook = the current).
      Contrast recomputed, not guessed: bone-on-river 12.0:1 (AAA), flare-lift 6.3:1,
      neon-as-graphic 4.0:1.

- [x] **Phase 7 — Quiet-luxury pivot (2026-09).** A full-bleed Three.js homepage —
      particle current, wave grid, caustics, bloom, scroll waypoints, and a rotating
      refractive crystal that shattered into it — was built, made to work, and then
      **deliberately withdrawn**. The brief that killed it, in Krystal's words:
      *"restrained on purpose that reads this designer is brilliant and look how she
      doesn't even have to try"* and *"quiet luxury that holds authority — you feel it
      first and it makes you wonder who is this and how did they make something so
      minimal so high end."* A shattering crystal is effort made visible; authority
      comes from what's withheld. What changed:
      - `/` rebuilt as flat, real content (§4). `StatStrip` finally wired into Home as
        the first dark inversion — **three** figures, not four: the placeholder
        "< 24h reply window" matched no documented commitment (real reply times are
        tiered per care plan: 48h / next business day / same day), so it was dropped
        rather than invented.
      - **Flare budget tightened** from one element per VIEW to one or two per PAGE
        (§2.1). Home spends exactly two — "presence." and "worth" — and every heading
        between them is plain ink.
      - **Type scale tightened** to two tiers per page (§2.3): the moments carry
        hero/lg, every other section heading holds one shared `md`.
      - `CurrentScene`, `CrystalShatterScene`, `Hero`, `HeroCrystal` parked (§5);
        `/prototype-shatter` deleted.
      - `CrystalMark` added as the one surviving high-tech detail — a 36px refractive
        glass gem above the hero headline, Three.js dynamic-imported after mount so
        the homepage first-load JS is **146 kB, not the 292 kB** a static import cost.
      - **The landing.** Krystal then went one step further than the plan: the hero
        should open on *"literally just the brand name"* — no headline, no CTA, and
        no header either — with a transition into the site. `LandingWordmark` + the
        `SiteHeader` hide/observe mechanic (§3). The wordmark is lowercase there, a
        documented exception to the uppercase rule (§2.3). Marquee separators went
        from flare-deep to ink/25 in the same pass — thirteen magenta ticks in one
        decorative band was the exact "accent as habit" the new budget forbids.
      - The crystal generator survives as a future, separate per-client product,
        explicitly out of the site IA (§3).
      **Open:** whether the restraint should go further into the tokens themselves
      (different hexes, a different typeface). This phase deliberately changed
      FREQUENCY and DENSITY, not values — the palette and typeface were already
      minimal and contrast-verified, and density was the actual problem.

- [x] **Phase 8 — Round 2, "The Row's aesthetic, Bionic Egg's motion" (2026-09-06).**
      Krystal named four references and they were characterised by DOM probe, not
      memory: **The Row** (tiny caps wordmark, one photo, zero words), **Bionic Egg**
      (loud today: mockup collage, count-ups, no motion library — its whole vocabulary
      is CSS blur reveals, logo shrink, a 92s marquee), **Studio Krista** (a light 70px
      serif at 300, a 25px header, six looping videos in a hero collage, Lenis), and
      **Clay** (heavy 74px grotesk, 8.6k px of full-bleed video, hand-rolled reveals on
      `cubic-bezier(0.16,1,0.3,1)` — literally KBC's own `EASE`). What they agree on
      became the brief: warm ground, no colour, VIDEO as the medium of the work,
      expo-out reveals on every line, no cursor. Her decisions: moments 1–6 built
      (name floats into the header; the work expands in place; blur-to-sharp captions;
      cursor `open`/`close`; the gem as the 400ms between-moment; marquee 90s), 7–9
      parked; dark on home = footer only; **Neue Montreal Light 300** for display (the
      Light cut was already loaded — one line in `.type-display`), no serif; the
      wordmark goes **lowercase** everywhere so the floating name IS the logo; she
      will **record glowtoure.com** (1440×900, 14–20s slow scroll, MP4+WebM, no audio)
      and the frame is built video-ready. The big-type hero, proof band, Dispersion
      and the dark closing section left the homepage; the h1 is now the small studio
      line ("Websites for brands that don't need to explain themselves." — a working
      default until copy review). Calls made inside scope: only Glowtoure gets the
      expanding frame (concepts are a quiet list — a full-screen "Concept" gradient
      reads as padding); browser-chrome dots neutralised to bone/25 (flare budget);
      the mobile header uses the horizontal lowercase wordmark, not the monogram.
      **Verified:** typecheck clean; fresh tab, zero console errors; traveler and logo
      identical in case/weight/tracking, x landing to the pixel; a fast-scroll bug
      (the sticky box releasing before the spring settled) found and fixed with a
      pinned hold. **The video landed the same night, in two takes.** Take one was
      a 5:23 site tour at 2560×1392 with her Chrome tabs/bookmarks in shot; at that
      width the Glowtoure hero is left-aligned while its sections centre, so no 16:10
      crop could keep both — it shipped briefly as a left-favouring interim. Take
      two, on a regular screen with the browser full-screened (1896×998, 1:38, 99 MB):
      the first 31s are one unhurried hero-to-footer scroll, and a **16:9** side-trim
      (`crop=1774:998:61:0` → `scale=1440:810`) clears both the hero's headline
      flourish and the widest section. So the work frame is **16:9** (`paddingTop
      56.25%`, width capped at `(100svh − 14rem) × 16/9`) — the recording's own
      aspect, and the aspect Krista's and Clay's video tiles use — and
      `public/video/glowtoure.{mp4,webm}` are that 0–31s cut at natural pace: H.264
      2.77 MB, VP9 2.44 MB, poster from the video's own first frame (106 KB). Encoded
      with a static ffmpeg pulled into the session scratchpad — nothing installed on
      the machine or added to the repo. Verified playing in the frame (WebM chosen,
      1440×810, 31.0s, zero console errors).
      **Header, same night:** Krystal flagged that the header looked like Glowtoure's
      (same hand, same instincts: logo left, link row, outlined CTA). Rebuilt as "the
      name and one word": wordmark + `Menu`; a full-screen milk panel with the six
      links + Commission at `fluid-3xl` Light, one per line; the old desktop nav row,
      the outlined Commission box and the hamburger glyph are gone; the mobile-only
      panel became THE menu at every breakpoint (`SiteHeader.tsx`). **Copy rewrite
      started:** every user-facing line — 447 rows across 15 routes/sections, data
      files, metadata, JSON-LD, aria text — is in `docs/kbc-copy.md`, a deck with the
      verbatim current text, a register/length note, and a "new" column she writes
      into; it ends with a list of cross-page inconsistencies to settle while
      rewriting (tier durations, "inquiry/enquiry", "48 hours" vs "two business days",
      We/I voice, duplicated dark-CTA headings, long meta descriptions); `docs/kbc-voice.md`
      rule 5 (uppercase/serif) corrected to the current register and its canonical
      copy marked superseded. **Crystal generator — proposed, not built:** a
      parametric mark (symmetry, belt, cap, bevel, clarity, tint, glint, pace) on the
      existing hex-bipyramid + glass pipeline, collapsing to a seed string that is the
      client's; a private noindex `/atelier/crystal` used during commissions; exports
      = WebM/MP4 from the canvas + PNGs + the embeddable component; the homepage's
      CrystalMark is KBC's own seed. Phases: parameters + preview + seed URL; exports;
      per-client tokens + saved seeds. After copy and header. **Open:** the studio
      line and closing line at copy review; whether the Signature tier flag keeps
      its flare-deep.

- [x] **Phase 10 — The deliverable, the audit, and a verification system
      (2026-09-10 → 12).** *(Phase 9 — services by discipline, 2026-09-07 — is
      recorded in §3.)*
      **The deliverable.** The Glowtoure brand book became the first published
      artefact of an engagement: split out of one authored HTML file into
      `public/brand/glowtoure-brand-system.html` plus nine cacheable `.woff2`
      (`scripts/split-brand-book.mjs`, which refuses any document still reaching an
      external host), given a real URL by a rewrite — `/work/glowtoure/brand-system`
      — and linked from three places: under Scope on the case study, as a
      `Deliverable` row in that page's meta column, and as "The proof" on
      `/services/identity`. HER RULE, EMPHATIC: deliverables live on this domain,
      never someone else's (§4). The book was corrected twice on her word — no AI
      assisted any photography, and the footer is Charcoal with Caramel, Cacao only
      the legal strip — both times after I had inferred a colour from an averaged
      census instead of reading the pixels.
      **Navigation and naming.** One click from a work frame to its case study (the
      frame is a real link wherever it is not the homepage's expanding sequence);
      Glowtoure is a high-end spray-tanning service, never "self tan".
      **The hydration bug.** `Reveal`, `LandingWordmark`, `PhoneRow` and
      `WorkShowcase` each returned DIFFERENT MARKUP under `useReducedMotion()`. Live
      in production: 12, 14 and 16 console errors on `/`, `/work` and
      `/work/glowtoure` — React #418 then #423, the whole root falling back to client
      rendering — and invisible to anyone whose system animates normally. Fixed by
      making reduced motion a style difference only (§3, anti-drift rule 7):
      `motion-reduce:` variants, a `[data-reveal]` override in globals.css, and
      `lib/useHydrated.ts` for the values CSS cannot carry. Confirmed zero on
      production, 2026-09-12.
      **The verification system.** `npm run verify` (typecheck, lint, build) and
      `npm run verify -- --live` (every route: 200, one h1, no console errors, no
      failed requests, no mobile overflow, the flare budget, AA contrast resolved by
      geometry) — written after a session in which five separate claims of mine were
      checker artefacts or inferences rather than facts, and self-tested by breaking
      each check on purpose to watch it fire. `npm run dev` now binds 127.0.0.1 and
      builds write to `.next-build`, so a build can never break a running dev server.
      **Next 15.** 14.2.35 → 15.5.25, React 18 retained, `params` awaited in six
      places; typecheck, lint, build, the reduced/normal-motion behaviour suite and
      the full live verify all re-run green.

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
7. Reduced motion is a STYLE difference, never a STRUCTURAL one: no component returns
   different markup under `useReducedMotion()`. That mismatch is React #418/#423 and
   it is invisible to anyone whose system animates normally (§3; CLAUDE.md, Motion).
8. Run `npm run verify -- --live` before claiming the site is fine — and distrust an
   impossible number. A 1.00 contrast ratio or a page that passes while failing to
   load is the CHECKER being wrong; break the thing on purpose and watch the check
   fire before believing its all-clear.
