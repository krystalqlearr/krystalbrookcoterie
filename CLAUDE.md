# Project: Krystal Brook Coterie (krystalbrookcoterie.com)
This is the studio's OWN website — and the site IS the portfolio. Editorial luxury web
design for founder-led beauty, med-spa, wellness, bridal, and luxury lifestyle brands.

**North star:** a visitor knows within three seconds, before reading a word, that a
top-tier developer built this. The medium is the proof — SHOW craft (motion,
shared-element transitions, live work, instant loads), never just claim it.

**Full build plan + roadmap: `docs/kbc-build-plan.md` — the source of truth. This
CLAUDE.md is the short form; keep the two in sync, never let them drift.**

## Stack
Next.js 15 App Router, TypeScript, Tailwind CSS, Framer Motion, Lenis. Deployed on Vercel.
Upgraded 14 → 15.5.25 on 2026-09-12; React stays 18. The one code consequence: in a
dynamic route `params` is a PROMISE, so `generateMetadata` and the page component are
both `async` and both `await params` — six call sites across `/work/[slug]`,
`/services/[slug]` and `/for/[slug]`. Next 15 also writes `"target": "ES2017"` into
tsconfig.json itself on first run; that line is its, not hand-set.

## Color — TWO GROUNDS + ONE CHERRY FLARE (2026-09-07). NEVER hardcode hex.
The site is milk and the blackest black, and nothing in between. The beige recesses
(bone, stone) are RETIRED — Krystal: "I like the milk, I don't like the stone… there
needs to be more contrast; the stone is not a good-looking colour with these bright
and vibrant colours." A tinted sheet next to a hot red reads cream-and-terracotta, and
a pale grey would have been cleaner but no more contrasty (1.1–1.3:1 against milk
either way), so rhythm on the milk comes from whitespace and ink hairlines, never tint.
milk     #FAF7F0   THE CANVAS — every paper surface, AND the light ink ON the dark.
                   Ink 16.2 (AAA). The inversion pair is milk + onyx.
white    #FFFFFF   THE LIFT — the one sheet ABOVE the canvas: cards and form fields
                   sit on it with an ink hairline. Never a section fill.
ink      #23201B   warm faded charcoal-brown — primary INK (text) + button fill.
onyx     #0E0C0B   THE DARK — "the blackest warm black" (her words); a black
                   gemstone, the right family beside the crystal mark. Milk ≈18:1
                   (AAA); the neon 5.07 on it, text-legal at any size. RETIRED darks:
                   river #0F2A2D (teal, "water at depth" — she: "not liking that
                   teal"), oxblood #24100F (tried live, lost to the board's black),
                   warm black #161311 (the interim), forest #0F2018, aubergine
                   #1E1418, #13120F.
mocha    #9A8264   deep warm neutral — imagery / atmosphere haze only.
Muted text and hairlines are OPACITIES of the pair (ink/x on milk and white, milk/x on
onyx), not separate tokens. `theme.extend.opacity.12` exists because Tailwind's scale
has no 12 — without it every `ink/12` hairline silently rendered as preflight grey
#E5E7EB (found 2026-09-07; it had been that way since the rule was written).

THE FLARE — CHERRY, TWO STOPS. Hue 349°, the red side of pink. Magenta #FF0080 (330°)
leaned purple; lipstick #FF1F52 (346°) was the runner-up, decided against cherry on
the live site with a flooded card as the swatch. The brief it meets: "read feminine but
bold enough for a masculine luxury site to still choose me." Neon and AA still cannot
be one swatch, so the stop is chosen by SIZE, never by taste:
flare       #FF1744  NEON. On milk and white: graphics + text ≥24px ONLY (3.60 / 3.85 —
                     the 3:1 large-text bar): arrow glyphs, hairline wipes, Rule ticks,
                     heading accent words, the drop-cap, ::selection bg (with INK
                     text, 4.2). On onyx: ANY size (5.07) — every accent on the dark.
                     NEVER small text on paper.
flare-deep  #B3102E  TEXT ON PAPER. Anything under 24px that must be flare-coloured —
                     13px eyebrows, IndexMeta numbers, tier flags — PLUS the one
                     full-bleed band (milk text, 6.5) and the primary-button hover.
                     6.48 on milk.
`flare-lift` is RETIRED: the neon is its own text colour on onyx.

THE FLOOD — the flare as a SURFACE, on hover/focus-within only. A card or row fills
with the neon and its type re-colours to stay legal: the display line goes MILK (3.6,
legal ≥24px), everything smaller goes INK (4.2), 600ms on `ease-editorial`; reduced
motion swaps the colours without the transition. Live on `ServiceCard` and the home
tier rows; the pattern for the coming service pages. Transient, so it spends nothing
from the flare budget. The cursor inverts over it (mint) — see Cursor.

ONE OR TWO flare touches PER PAGE — not per view, and emphatically not per section
(2026-09 quiet-luxury pivot). MOST SECTIONS CARRY NO FLARE AT ALL. The budget is
spent on the page's actual moments — typically the hero's heading accent word and
the closing CTA's — and everything between them is plain ink. An accent that shows
up in every section stops reading as a decision and starts reading as a habit; the
restraint IS the signal. Carved out of the budget because they're functional rather
than decorative — they carry information, they don't ornament: IndexMeta's live index
numbers (they turn a grid into a sequence), ArrowLink's glyph (it IS the CTA
affordance), and the tier flag (it marks which tier to pick). Everything else
decorative is INK. Marquee separators are ink/25 — thirteen coloured ticks in one
aria-hidden band was the exact failure mode this rule exists to prevent. A full-bleed
flare band is at most once per page and spends the whole budget.
Every display size floors at 24px precisely so the neon stop stays legal on headings.
MUTED TEXT FLOOR = ink/70 on milk (5.72) and on white (≈6) · milk/60 on onyx (≈7.8).
These are FLOORS, not suggestions — never go below ink/70 for text. Opacity is
therefore NOT available as a hierarchy step below the floor; use color (the flare)
instead. Hairlines and decorative aria-hidden marks are exempt: ink/12–15 · milk/15–20.
Prices/tags/asterisks stay INK (ink-forward reads expensive; the flare stays rare).
Focus rings are NEVER the flare — ink on milk/white, milk on onyx.
Grain is `mix-blend: multiply` (paper tooth). RETIRED: bone #EBE5D8 and stone #E0D8C7
(the beige recesses), the magenta flare #FF0080 / #A8004F / #FF7ABF, river, the WINE
cherry/maroon/blush of 2026-07 (a different, darker red — not this cherry), camel,
rich-black, cream, deep-petrol, teal, greige, surface-1/2.

## The dark is punctuation
Onyx (`onyx` bg, milk text) is NOT the default — it's the inversion moment: the footer,
the closing-CTA showstoppers, the expanded case study, the browser-frame chrome. One
or two dark moments per page.
THE DARK ENDING IS ONE OBJECT (2026-09-09). An inner page closes with `ClosingCTA`, not
a bare `SectionShell tone="dark"`: the section runs to zero bottom padding and draws a
single `milk/12` hairline 80px under its action, and the footer's own 80px sits below
it. Two stacked onyx blocks with different paddings read as a 900px slab with a gap in
the middle; one rule, symmetrically spaced, reads as an invitation followed by an index.
Home is the exception — it closes on milk, so its footer is its only dark surface and it
uses no `ClosingCTA`. OPEN: the scrolled header over a dark band reads as a pale strip
(milk/90 over onyx) — hers to call.

## Typography — ONE typeface, TWO registers (grotesk pivot, 2026-08)
PP Neue Montreal carries everything. There is no second typeface and no third voice.

DISPLAY — weight 300 (LIGHT, since the 2026-09 Round 2 pivot; was 400), sentence case,
with hard negative tracking (−0.045 → −0.06em) and sub-1 leading (0.92), capped ~108px.
The weight lives in ONE place — `.type-display` in globals.css — and the tracking and
leading in the `fluid-xl … fluid-hero` tokens; NEVER hand-tune a heading. Write
headlines as short declarative sentences that end in a period. Use `EditorialHeading`
or `.type-display`. The restraint IS the luxury signal: a 300-weight line outranks any
bold cut — the lightness is Studio Krista's, in KBC's own family, no serif needed. On
the homepage the display register is used SMALL: the h1 is `fluid-xl`, not `fluid-hero`;
the only large type on that page is the name, transiently, as it floats into the header.

META — 13px UPPERCASE Semibold (600) at +0.13em. The ONLY uppercase on the site:
eyebrows, tags, categories, indices, captions, credits, nav, form labels, CTAs.
Use `Eyebrow` or `.type-meta`. (The family has no 700, hence 600.)

TWO SIZE TIERS PER PAGE, not a different size per section (2026-09 quiet-luxury
pivot). A page has one or two MOMENTS — the hero, and usually a closing CTA — which
carry `hero`/`lg`. Every other section heading on that page takes the SAME smaller
size (`md`). Varying the scale section by section reads as a system being exercised;
holding one secondary size and letting whitespace do the pacing reads as confidence.

THE FLARE THREAD survives as COLOR, not as a second face: one word per heading passed
as `accent` renders the cherry neon (on milk and on onyx alike) in the SAME face and weight —
spent against the one-or-two-per-PAGE budget in the Color section, not per heading.

RETIRED: Neue Montreal Extrabold/Black (800/900 — loaded, never set), uppercase display,
and PP Editorial New entirely (serif italic sublines, pull-quotes, and the serif accent
word). The .woff2 files remain in /public/fonts; the font is no longer loaded. Only the
wordmark sits outside the two registers, at Medium 500 — and since Round 2 it is
LOWERCASE everywhere (`components/Logo.tsx`, one shared recipe: header, footer,
styleguide): the homepage opens on the name in lowercase and the name then floats into
the header and BECOMES the logo, one continuous element, so the mark matches it
everywhere. Uppercase announces; lowercase is simply present. The monogram "KBC" keeps
uppercase (it's an initialism), and metadata/JSON-LD keep natural case.

Load via next/font/local from /public/fonts as .woff2 — NEVER Google Fonts.
Register: milk paper, the blackest black, enormous quiet type, one cherry flare — "so
expensive you can see and feel it." Reference: bionicegg.com's typographic system in KBC's palette.

## Cursor — mix-blend inversion dot
A single ~14px dot, `bg-milk mix-blend-difference` (inverts whatever it crosses: ink
over milk, milk over onyx and images — and mint over the cherry flood, which is the
inversion doing its job; accepted, and one line to change if it ever grates). Grows to ~44px over interactive targets, and to
~64px carrying a word over a target with `data-cursor-label` — `open` on a work
frame, `close` on the expanded case study's close button — rendered INSIDE the blended
dot so it is always the dot's inverse. Nothing else gets a label (ArrowLink draws its
own arrow; nav gets the plain grow). No ring, no color. Fine-pointer only;
reduced-motion damps the grow; `.kbc-cursor-none` hides the native cursor. See
components/CustomCursor.tsx.

## Motion — single source, luxury cadence
All easing/durations come from `lib/motion.ts` (JS) or `ease-editorial` / `duration-*`
(CSS/Tailwind) — NO inline magic numbers. Easing: `--ease-editorial`
cubic-bezier(0.16,1,0.3,1). Slow and weighted, never bouncy. Lenis smooth scroll,
`Reveal` for entrances, the work-transition (shared-layout FLIP) as the signature
moment. Respect prefers-reduced-motion EVERYWHERE (instant, no morph/parallax).

REDUCED MOTION CHANGES STYLE, NEVER STRUCTURE (2026-09-12 — this shipped as a live
bug). NEVER branch returned markup on `useReducedMotion()`. The server has no media
query, so it renders the no-preference tree; a reduced-motion client renders a
different one; React throws #418 and then #423 — and #423 drops the ENTIRE root to
client rendering, discarding the server HTML. It was live on `/`, `/work` and
`/work/glowtoure` (12, 14 and 16 console errors) and was invisible to anyone whose
system animates normally, which is why it survived every previous audit. Say it in
CSS the server can render too: Tailwind `motion-reduce:` variants, or the
`[data-reveal]` override in globals.css that pins opacity/transform/filter inside
`@media (prefers-reduced-motion: reduce)`. For the few values CSS cannot carry — a
`<video>` src, `autoPlay` — gate on `useHydrated()` (`lib/useHydrated.ts`, a
`useSyncExternalStore` that is false on the server AND on the first client render)
so hydration still matches, then let the effect pass switch it on. React names only
the FIRST mismatch, so one such branch hides every other.

MOTION IS SMALL AND SPECIFIC, NEVER AMBIENT (2026-09 quiet-luxury pivot). Nothing
runs full-screen or continuously behind content. "The Row's aesthetic, Bionic Egg's
motion": the vocabulary is six moments plus the basics, each used once —
1. THE LANDING: the homepage opens on the name and nothing else (no headline, no CTA,
   no header, no nav). The name GROWS toward you first (viewport-capped, never clips),
   then FLOATS into the header's wordmark slot and BECOMES the logo — one continuous
   element, same glyphs, same weight, same case. Float, not snap: a spring
   (`LANDING.spring`) trails the scroll, the path lifts mid-travel (`LANDING.arcPx`),
   and the header fades in only as the spring settles; the sticky box stays pinned
   through a hold so a fast scroll never drags the name off the header mid-fade.
   `LandingWordmark` measures the real `[data-wordmark-slot]`; `SiteHeader` hides
   (`opacity-0` + `inert`) until `LANDING.endVh`. Reduced motion: static band.
2. THE WORK, expanding in place — `WorkShowcase variant="sequence"`: one real project
   in a browser frame, one screen, that morphs into its case study (the documented
   signature). Video-ready: a project with `video` plays a looping muted recording.
3. WORDS FADE, MEDIA SLIDES — the every-page register (live on every route). TEXT
   (retuned 2026-09-07 to Bionic Egg's measured recipe — Krystal: "a quick fade into
   visibility as you scroll"): ONE recipe on every text block, `revealText` — hidden
   `opacity 0 · 32px below · blur(10px)`; opacity 0.65s on CSS ease (0 → 0.7 in the
   first ~220ms), rise 0.7s and blur 0.75s on `EASE_REVEAL` (0.2, 0.72, 0.2, 1) —
   fast front, soft tail. `soft` and `fade` are aliases of it. Reveals fire at 15%
   in view, so a block is already arriving as you scroll to it. `SectionShell` and
   `PageHero` stagger their own headers this way, so section openings are uniform.
   Media: `Reveal from="up|down|left|right"` with `distance` from `TRAVEL` (text 32
   · aside 24 · media 48 · frame 64), once, on the same clock (0.7s `EASE_REVEAL`,
   fade 0.65s). Directions are ART-DIRECTED per placement, never random: the homepage
   frame DROPS (the name just rose); `/work` frames enter from the grid side they
   sit on (`WorkProject.enter`, set beside `span`); the /about portrait slides from
   the left; side columns (/begin aside, case-study meta) slide from the right; the
   case-study hero frame rises. The entrance lives ON `WorkShowcase`'s frame, never
   on a wrapper — a transformed ancestor would clip its `fixed` expanded state.
   `html { overflow-x: clip }` absorbs the sideways travel.
4. The cursor's word — `open` / `close` (see Cursor).
5. `CrystalMark` as the between-moment: on expand, the 36px glass gem holds alone on
   milk for `GEM_BEAT_MS` before the morph; preloaded on hover so it never waits on
   Three.js (which still never enters first-load JS). Skipped under reduced motion.
6. The Marquee at 90s — slower reads more expensive.
Plus: `Reveal` entrances, hover states, `Dispersion` (kept on `/for/[slug]` only).
Parked ideas, not built until she asks: an empty viewport, route crossfades, count-ups. `LandingWordmark` flags `data-landing` on <html>; `SiteHeader` stays
out (opacity 0 + `inert`, so it's out of the tab order too) until 0.6vh of scroll,
the same point the name has finished receding. Decorative by design — the real
<h1> and every CTA are in the hero directly beneath, so no-JS visitors, crawlers,
and screen readers lose nothing; reduced motion renders it as a short static band.
RETIRED, parked not deleted: `CurrentScene` (the full-bleed particle/wave "riding
the current" engine), `CrystalShatterScene` (rotating crystal shattering into an
underwater journey), and `Hero`/`HeroCrystal` (Nucleation, the pointer-seeded
crystal-growth hero). All four were real and worked; all four announced
themselves. The crystal generator lives on as a FUTURE, SEPARATE per-client
product — a parametric brand visual each client generates and keeps — explicitly
NOT part of the homepage. See docs/kbc-build-plan.md §3 and Phase 7.

## Canvas rhythm
Two grounds. Pages run on milk and are paced by whitespace and hairlines; `SectionShell
tone="rule"` is milk with an ink hairline above (the former bone alt-section), and
`tone="dark"` is the onyx inversion event. When a `SectionShell` has an eyebrow and no
display heading, the EYEBROW IS THE SECTION'S HEADING element (it renders as `headingAs`,
default h2) so the document outline matches what a reader sees — and an eyebrow-only
header drops 32px to its children, not 64 (audit 2026-09-09). There is no tinted recess: the tones are
`light | rule | dark`, nothing else. White lifts cards and fields off the milk; it never
fills a section. The move INTO onyx is a designed inversion event.

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
StatStrip   The proof band on onyx: 3–4 defensible figures in DISPLAY over META
            labels. Lives on /services and the styleguide — NOT on the homepage,
            which has no dark surface but its footer (Round 2).
ServiceCard A white sheet lifted off the milk with an ink hairline — and THE FLOOD on
            hover/focus-within: the card fills cherry, the name goes milk, the rest
            goes ink (Color section). The pattern for the coming service pages.
PhoneRow    The site ON A PHONE — a row of bare screens playing silent, looping
            ~15s scrolls of the real pages, on onyx, as a case study's one
            mid-scroll dark moment. Bare screens, never device mockups: phone
            bezels would be the only round corners on a site whose rule is
            `rounded-[1px]`. WEIGHT IS THE CONSTRAINT — `src` is attached only
            when an IntersectionObserver says the row is near, so a page that is
            never scrolled that far downloads nothing; reduced motion gets the
            poster and no `<video>` at all. Clips are DRIVEN, not hand-recorded
            (scratchpad/gt-record.mjs): a constant 300 css px a second, trimmed
            to the page's best 12–15s rather than sped up to fit all of it.
WorkFrame   `WorkShowcase variant="sequence"` — the homepage's work: one project in
            `BrowserChrome` (all three dots milk/25 — chrome is never an accent),
            caption beneath, expands in place after the gem beat. THE WORK IS REAL
            WORK ONLY (2026-09-09): the two concept projects were deleted rather
            than dressed up — invented clients beside a real one is the invented
            testimonial again. With one project the counted total is suppressed
            (`01 — Glowtoure`, not `01 / 01`) and the lone frame takes the full
            grid track and rises; both restore themselves at project two.

## Routes — canonical (see build-plan §4)
Primary CTA route is `/begin` (all "Begin" CTAs point there). Nav data is single-source
in components/nav.ts. THE HEADER IS THE NAME AND ONE WORD (Round 2, 2026-09-06): the
lowercase wordmark left, `Menu` right in meta caps — no link row, no outlined button
(that layout was Glowtoure's, and a studio's own header must not look like a client's).
`Menu` opens a full-screen milk panel with the six links + Commission set at
`fluid-3xl` Light, one per line; focus-trapped, Esc closes, body scroll locked. The bar
stays above the panel so the name and `Close` never move. The panel's second column is
the SERVICES index (2026-09-07): seven one-word names from `lib/services.ts`, folded
under a `+` on small screens — the "dropdown" done as an index, never a hover menu.
Existing: / · /work · /work/[slug] · /services · /services/[slug] (seven: identity ·
collateral · websites · redesign · development · search · squarespace) · /process ·
/about · /journal · /begin · /styleguide(noindex) · /for/[slug](noindex, outreach). No
route may 404 at launch.

SERVICES ARE SOLD BY DISCIPLINE, NOT BY PRICE (2026-09-07 — checked against Bionic
Egg, Clay and Studio Krista, none of whom publish a price). Seven services, each its
own page from one template and one data file (`lib/services.ts`): hero line → what it
covers → who it's for + "commissioned as" → the five phases in one row → one frame of
work → two or three questions → related → Commission. A third the length of the
studios it was measured against, on purpose. The four tier names survive as
ENGAGEMENT SIZES on the hub, without prices. EXACTLY ONE FIGURE IS PUBLIC — `FLOOR`,
"Engagements begin at $4,500." — on the hub, on every service page and on /begin; the
enquiry form asks for a range. Squarespace is the seventh service, framed as a stage
("When the business doesn't need custom code yet, it still deserves a designer"),
never with the word "template". Krystal's list was Bionic Egg's list nearly verbatim —
the NAMES and the ANATOMY are what keep the pages hers; never copy their sections. Each
page's meta column may carry a "Built with" row (`Service.builtWith`) — the stack as a
proof point beside "Commissioned as", never in the hero; a case study's `stack` names
only what its live site verifiably runs. A case study may also carry `deliverable` — ONE
published artefact from the engagement, linked directly under Scope so the list that
CLAIMS the work opens the work; ↗ and a new tab because it's a separate document with
its own type system, and the glyph's flare is the carved-out CTA affordance, not a spend
from the page budget. Glowtoure's is the brand book (nine locked colours, four PP faces,
governance), credited to Krystal on its own last line — nothing is claimed on the
client's behalf that the document doesn't say itself.
DELIVERABLES LIVE ON THIS DOMAIN, NEVER SOMEONE ELSE'S (2026-09-10, hers, emphatic).
The positioning is rented vs. owned and the AI rule is never-volunteer, so a deliverable
linked to the host it was authored on breaks both — worst of all in a domain that names
the tool. A brand book is a self-contained document with its own CSS, so it can't sit
inside the layout: it ships as a static file under `public/brand` via
`scripts/split-brand-book.mjs` (which lifts the base64 fonts out to cacheable .woff2,
refuses any document still reaching an external host, and fixes title/description/
canonical) and gets a real URL from a rewrite in next.config.mjs —
`/work/glowtoure/brand-system`. `deliverable.href` is that path, `prefetch={false}`
because it is not a Next route, and the sitemap derives its row from the same field.
OPEN: the faces are licensed to the CLIENT; per-domain webfont licensing is worth
confirming, and hosting the book on the client's own domain is the fallback.
Prototype routes are temporary by definition and must be deleted once
their question is answered — /prototype and /prototype-shatter both have been.

## Accessibility — WCAG 2.1 AA minimum
Every text/bg pair ≥ 4.5:1 (3:1 large); flag failing pairs, never ship them. ink-on-milk
is 16.2 (AAA). The flare is SIZE-GATED on paper: cherry #FF1744 is 3.60 on milk /
3.85 on white → graphics and text ≥24px ONLY; use flare-deep (6.48) under 24px. On
onyx the neon is 5.07 — any size. This is why fluid-xl floors at 24px. In the flood
(a cherry-filled card) the display line is milk (3.6, ≥24px only) and everything
smaller is ink (4.2). Focus rings stay ink/milk, NEVER the flare. Primary CTAs are
INK-filled with milk text (`primary`); `onDark` (milk outline) on onyx sections. Focus
rings are per-ground: `outline-ink` on milk/white, `outline-milk` on onyx. Every interactive
element is a real, labeled, focusable control (work cards are <button>s); skip-link +
`#main` landmark present.

## Performance — Core Web Vitals green, future-optimized
next/image everywhere (AVIF/WebP), priority on LCP media, local fonts w/ swap, server
components by default (client only where interactivity requires), motion budgeted, zero
layout shift. Future: View Transitions API, Speculation Rules prefetch, container
queries, CSS scroll-driven animation (progressive enhancement); PPR still to evaluate.

## Verification — run it, don't reason about it
`npm run verify` = typecheck + lint + production build. `npm run verify -- --live`
adds a headless pass over every route: 200s, exactly one h1, zero console errors, zero
failed requests, no mobile overflow, the flare budget (IndexMeta / ArrowLink / tier-flag
carve-outs excluded), and AA contrast. It runs under EMULATED REDUCED MOTION, because
that is where the hydration bug lived and no ordinary pass would have seen it, and it
zeroes transitions so a run is deterministic. Contrast grounds resolve by GEOMETRY — the element's own background,
then any positioned sibling covering it, then ancestors; an ancestor-only walk invents
1.00 ratios.
AN IMPOSSIBLE NUMBER IS THE CHECKER, NOT THE SITE. A 1.00 ratio, ten flares on a quiet
page, a page that passes while failing to load — break the thing on purpose and watch
the check FIRE before believing its all-clear. A page that never loaded is not audited:
"exactly one h1" once passed on Chrome's error page.
Documents under `public/brand` are CLIENT artefacts — their contrast is reported for
information only and is the client's palette to change, never KBC's to silently fix.
`npm run dev` binds 127.0.0.1 (this machine only) and builds write to `.next-build`, so
a build can never break a running dev server.

## Voice — a luxury creative house (not a dev shop)
Editorial, assured, fashion-conscious, commercially intelligent, selective, slightly
provocative. Core message: "digital identities for brands that expect to be noticed,
trusted, and chosen." SELL PERCEPTION FIRST — authority, trust, desirability, growth —
then let capability support it. Craft/tech ("hand-built in code," "the stack big tech
runs," "advanced architecture," "custom systems") is a PROOF POINT, never the headline;
keep it to the FAQ and case-study depth. Frame projects as the SHIFT created (e.g.
"a clinical brand, repositioned as a modern authority"), not the deliverable.
Nomenclature: services are an ENGAGEMENT/COMMISSION (nav CTA = "Commission"). The seven
SERVICES are one word each — Identity · Collateral · Websites · Redesign · Development ·
Search · Squarespace (full names as eyebrows). The four ENGAGEMENT SIZES are The Edit ·
Signature (flag: "Most commissioned") · Atelier · Private Commission — names and
timelines only; no prices on the site but the floor.
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
