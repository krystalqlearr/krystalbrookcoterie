import type { Metadata } from "next";
import ArrowLink from "@/components/ArrowLink";
import Button from "@/components/Button";
import ClosingCTA from "@/components/ClosingCTA";
import PageHero from "@/components/PageHero";
import SectionShell, { LINES, ON_LEFT, ON_MIDDLE } from "@/components/SectionShell";
import Reveal, { RevealItem } from "@/components/motion/Reveal";
import { DUR, EASE, EASE_INOUT, EASE_REVEAL, TRAVEL } from "@/lib/motion";
import config from "@/tailwind.config";

/**
 * /brand-system — the studio's own brand system, published.
 *
 * Rebuilt 2026-11-24 from Krystal's brand-system PDF, whose export had lost its
 * cover, swatches and dark panels (background graphics were off at print). The
 * page is the better home anyway: deliverables live on this domain (CLAUDE.md,
 * "Deliverables live on this domain"), and here nothing is re-typed. The swatch
 * hexes are read from tailwind.config.ts, the contrast table is COMPUTED from
 * them with the WCAG 2.1 formula at build time, and the motion figures come from
 * lib/motion.ts — so the page cannot drift from the system it documents.
 *
 * Budget: two flare touches — the hero's accent word and the closing CTA's. Every
 * section heading is `md` (two size tiers). The one dark moment is the ending.
 * Left out of the PDF on purpose: its AI rule (the site never volunteers AI —
 * publishing the rule would break it) and the internal note on what dropping the
 * price floor cost, which is a business decision, not a brand rule.
 */

export const metadata: Metadata = {
  title: "Brand system",
  description:
    "How Krystal Brook Coterie looks, moves and speaks — the colour, type, motion, layout and voice rules the studio's own site is built on, with every contrast ratio computed from the live tokens.",
};

/* ── Tokens, read from the config the site is built with ─────────────────── */

const C = config.theme!.extend!.colors as unknown as Record<string, string | Record<string, string>>;
const flare = C.flare as Record<string, string>;
const HEX = {
  milk: C.milk as string,
  white: C.white as string,
  ink: C.ink as string,
  onyx: C.onyx as string,
  flare: flare.DEFAULT,
  flareDeep: flare.deep,
  mocha: C.mocha as string,
};

const SWATCHES = [
  { name: "Milk", hex: HEX.milk, swatch: "bg-milk", note: "The canvas. Every paper surface — and the light ink on the dark." },
  { name: "White", hex: HEX.white, swatch: "bg-white", note: "The lift. The one sheet above the canvas: cards and form fields, with an ink hairline. Never a section fill." },
  { name: "Ink", hex: HEX.ink, swatch: "bg-ink", note: "Warm faded charcoal-brown. Primary text, and the filled-button surface." },
  { name: "Onyx", hex: HEX.onyx, swatch: "bg-onyx", note: "The dark. A black gemstone — the right family beside the crystal mark. The inversion pair is milk and onyx." },
  { name: "Flare — neon", hex: HEX.flare, swatch: "bg-flare", note: "Cherry, hue 349°. Graphics and text of 24px and above on paper; any size on onyx." },
  { name: "Flare — deep", hex: HEX.flareDeep, swatch: "bg-flare-deep", note: "Text on paper under 24px: eyebrows, index numbers, tier flags. Also the primary-button hover." },
  { name: "Mocha", hex: HEX.mocha, swatch: "bg-mocha", note: "Deep warm neutral. Imagery and atmosphere only — never type, never a surface." },
];

/* WCAG 2.1 relative luminance and contrast ratio — the same formula the
   verification script applies to every rendered page. */
const channel = (v: number) => {
  const c = v / 255;
  return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
};
const luminance = (hex: string) => {
  const n = parseInt(hex.replace("#", ""), 16);
  return 0.2126 * channel((n >> 16) & 255) + 0.7152 * channel((n >> 8) & 255) + 0.0722 * channel(n & 255);
};
const contrast = (a: string, b: string) => {
  const [x, y] = [luminance(a), luminance(b)];
  return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05);
};
const verdict = (r: number) => (r >= 7 ? "AAA" : r >= 4.5 ? "AA" : r >= 3 ? "AA large only" : "Fails");

const PAIRS = [
  { pair: "Ink on milk", fg: HEX.ink, bg: HEX.milk, where: "All body text on paper" },
  { pair: "Ink on white", fg: HEX.ink, bg: HEX.white, where: "Text on a lifted card or field" },
  { pair: "Milk on onyx", fg: HEX.milk, bg: HEX.onyx, where: "All text on the dark" },
  { pair: "Flare-deep on milk", fg: HEX.flareDeep, bg: HEX.milk, where: "Flare-coloured text under 24px" },
  { pair: "Flare on onyx", fg: HEX.flare, bg: HEX.onyx, where: "Every accent on the dark, at any size" },
  { pair: "Flare on white", fg: HEX.flare, bg: HEX.white, where: "Graphics, and text of 24px and above" },
  { pair: "Flare on milk", fg: HEX.flare, bg: HEX.milk, where: "Graphics, and text of 24px and above" },
  { pair: "Onyx on flare", fg: HEX.onyx, bg: HEX.flare, where: "Small type inside a flooded card" },
  { pair: "Milk on flare", fg: HEX.milk, bg: HEX.flare, where: "The display line inside a flooded card" },
].map((p) => {
  const ratio = contrast(p.fg, p.bg);
  return { ...p, ratio: ratio.toFixed(2), verdict: verdict(ratio) };
});

const RETIRED = [
  "bone #EBE5D8",
  "stone #E0D8C7",
  "magenta #FF0080",
  "river #0F2A2D",
  "oxblood #24100F",
  "warm black #161311",
  "forest #0F2018",
  "aubergine #1E1418",
];

/* ── Type scale — mirrors the fontSize tokens in tailwind.config.ts ─────── */

const SCALE = [
  ["meta", "13px", "1.3", "+0.13em", "Every label on the site"],
  ["meta-lg", "14px", "1.3", "+0.11em", "Calls to action"],
  ["fluid-base", "16 → 18px", "1.6", "—", "Body"],
  ["fluid-lg", "18 → 24px", "1.45", "—", "Page intros"],
  ["fluid-xl", "24 → 36px", "1.0", "−0.045em", "Secondary headings"],
  ["fluid-2xl", "28 → 44px", "0.96", "−0.05em", "Section headings"],
  ["fluid-3xl", "32 → 68px", "0.93", "−0.055em", "Page heroes"],
  ["fluid-display", "40 → 84px", "0.92", "−0.058em", "Moments"],
  ["fluid-hero", "48 → 108px", "0.92", "−0.06em", "The largest line, capped here"],
];

/* ── Motion — read from lib/motion.ts ─────────────────────────────────────── */

const ms = (s: number) => `${Math.round(s * 1000)}ms`;
const curve = (c: readonly number[]) => `cubic-bezier(${c.join(", ")})`;

const LADDER = [
  ["Fast", ms(DUR.fast), "A glyph, a hairline, a colour — anything under about 100px. Link underlines, arrows, the accordion."],
  ["Base", ms(DUR.base), "A component: a row's flood, a card, the header bar."],
  ["Slow", ms(DUR.slow), "Media inside a frame: the hover zoom, and the frame's recede."],
  ["Extra slow", ms(DUR.xslow), "The largest things: a full-bleed frame, a portrait."],
];

const EASINGS = [
  ["ease-editorial", curve(EASE), "Everything. Slow and weighted, never bouncy."],
  ["ease-editorial-inout", curve(EASE_INOUT), "Symmetric morphs only."],
  ["reveal", curve(EASE_REVEAL), "The entrance: fast front, soft tail."],
];

const DEVICES = [
  ["Arrow link", "The call to action. A meta-caps label and an arrow over a hairline that wipes in on hover.", "Actions are typography, not boxes. Used everywhere."],
  ["Button", "Ink fill, milk text.", "Reserved for real form controls. At most one per view."],
  ["Index meta", "01 / 07 — Med-spa · Brand + Web", "Turns a grid into an edited sequence. Zero-padded, tabular."],
  ["Rule", "A 1px hairline.", "Opens a section header, or splits rows. Never decorative."],
  ["Marquee", "A continuous band of names, 90 seconds a pass.", "Pauses on hover, stops under reduced motion. The names must exist as real content elsewhere."],
  ["The flood", "A card fills with the neon on hover; the display line goes milk, everything smaller goes onyx.", "Transient, so it spends nothing from the flare budget."],
  ["Work frame", "One real project in browser chrome, which opens into its case study.", "Real work only. An invented client beside a real one is an invented testimonial."],
  ["The recede", "Every framed image: the frame scales to 0.985 while the media inside goes to 1.04, on one 700ms clock.", "Two opposed transforms read as depth; a lone zoom reads as a hover effect."],
  ["Cursor", "A 14px dot that inverts whatever it crosses. Grows over targets, and to 64px carrying a word.", "Two words exist: open and close. Nothing else gets a label."],
];

/* ── Shared presentation ──────────────────────────────────────────────────── */

const BODY = "max-w-measure space-y-5 font-sans text-fluid-base leading-relaxed text-ink/70";
const SUB = "type-meta text-ink";
const TABLE_WRAP = "overflow-x-auto";
const TABLE = "w-full min-w-[36rem] border-collapse text-left font-sans text-fluid-base text-ink";
const TH = "type-meta pb-3 pr-6 font-semibold text-ink/70";
const TD = "border-t border-ink/12 py-4 pr-6 align-top";

function List({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3 font-sans text-fluid-base leading-relaxed text-ink/70">
      {items.map((item) => (
        <li key={item} className="flex items-baseline gap-4">
          <span aria-hidden className="h-px w-6 flex-shrink-0 translate-y-[-0.3em] bg-ink/25" />
          {item}
        </li>
      ))}
    </ul>
  );
}

export default function BrandSystemPage() {
  return (
    <>
      <PageHero
        marker="Brand system"
        eyebrow="Brand system"
        title="The system, written down."
        accent="written"
        intro="How the studio looks, moves and speaks, and the rules that keep it that way. Every colour and ratio on this page is read from the same tokens the site is built with."
      />

      {/* 01 — The brand */}
      <SectionShell tone="rule" layout="split" eyebrow="01 — The brand" heading="Editorial. Owned. Precise." headingSize="md">
        <Reveal variant="fade">
          <div className={BODY}>
            <p>
              Krystal Brook Coterie makes digital identities for brands that expect to be noticed, trusted and
              chosen: founder-led beauty, med-spa, wellness, bridal and luxury lifestyle businesses.
            </p>
            <p>
              The site is the portfolio. A visitor should know within three seconds, before reading a word, that a
              serious studio built it. The medium is the proof, so the system shows its craft rather than claiming
              it.
            </p>
            <p>
              The positioning is owned, not rented: a website built and held by the business, never a borrowed
              template on someone else&rsquo;s platform.
            </p>
          </div>
        </Reveal>
      </SectionShell>

      {/* 02 — Colour */}
      <SectionShell
        tone="rule"
        eyebrow="02 — Colour"
        heading="Two grounds and one flare."
        headingSize="md"
        intro="Milk and the blackest black, and nothing in between. Rhythm on the milk comes from whitespace and ink hairlines, never from a tint."
      >
        <Reveal as="ul" stagger={0.06} className="grid gap-x-gutter gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {SWATCHES.map((s) => (
            <RevealItem as="li" variant="fade" key={s.name}>
              <div aria-hidden className={`h-28 rounded-[1px] border border-ink/12 ${s.swatch}`} />
              <p className="mt-4 font-sans text-fluid-base text-ink">{s.name}</p>
              <p className="mt-1 font-sans text-fluid-base tabular-nums text-ink/70">{s.hex}</p>
              <p className="mt-3 font-sans text-fluid-base leading-relaxed text-ink/70">{s.note}</p>
            </RevealItem>
          ))}
        </Reveal>

        <div className={`${LINES} mt-24`}>
          <Reveal variant="fade" className={ON_LEFT}>
            <h3 className={SUB}>The flare budget</h3>
            <div className={`${BODY} mt-5`}>
              <p>
                One or two flare touches per page — not per view, and emphatically not per section. Most sections
                carry none at all. The budget is spent on the page&rsquo;s actual moments, typically the hero&rsquo;s
                accent word and the closing call to action; everything between them is plain ink.
              </p>
              <p>An accent that appears in every section stops reading as a decision and starts reading as a habit. The restraint is the signal.</p>
            </div>
          </Reveal>
          <Reveal variant="fade" delay={0.1} className={ON_MIDDLE}>
            <h3 className={SUB}>Carved out of the budget</h3>
            <div className={`${BODY} mt-5`}>
              <p>
                Three things carry information rather than ornament, so they don&rsquo;t count against it: the live
                index numbers that turn a grid into a sequence, the arrow glyph that is the call-to-action affordance,
                and the tier flag that marks which engagement to pick.
              </p>
            </div>
          </Reveal>
        </div>

        <Reveal variant="fade" className="mt-24">
          <h3 className={SUB}>Contrast — computed, not claimed</h3>
          <div className={`${TABLE_WRAP} mt-6`}>
            <table className={TABLE}>
              <thead>
                <tr>
                  <th scope="col" className={TH}>Pair</th>
                  <th scope="col" className={TH}>Ratio</th>
                  <th scope="col" className={TH}>Verdict</th>
                  <th scope="col" className={TH}>Where</th>
                </tr>
              </thead>
              <tbody>
                {PAIRS.map((p) => (
                  <tr key={p.pair}>
                    <th scope="row" className={`${TD} font-normal`}>{p.pair}</th>
                    <td className={`${TD} tabular-nums`}>{p.ratio}</td>
                    <td className={TD}>{p.verdict}</td>
                    <td className={`${TD} text-ink/70`}>{p.where}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className={`${BODY} mt-6`}>
            Computed from the token values with the WCAG 2.1 relative-luminance formula when this page is built. The
            neon is size-gated on paper, which is why every display size floors at 24px: that floor is what makes a
            flare-coloured heading word legal at any viewport.
          </p>
        </Reveal>

        <div className={`${LINES} mt-24`}>
          <Reveal variant="fade" className={ON_LEFT}>
            <h3 className={SUB}>Muted floors</h3>
            <div className={`${BODY} mt-5`}>
              <p>
                Muted text is an opacity of the pair, never a separate colour, and it has a floor: ink at 70% on milk
                and on white, milk at 60% on onyx. Below the floor, opacity is not available as a hierarchy step;
                colour is used instead. Hairlines and decorative marks are exempt.
              </p>
              <p>The move into the dark is a designed event, not a background choice: the footer, the closing call to action, the expanded case study, the browser-frame chrome. One or two dark moments per page, no more.</p>
            </div>
          </Reveal>
          <Reveal variant="fade" delay={0.1} className={ON_MIDDLE}>
            <h3 className={SUB}>Retired, and not to be reproposed</h3>
            <ul className="mt-5 flex flex-wrap gap-3 font-sans text-fluid-base text-ink/70">
              {RETIRED.map((r) => (
                <li key={r} className="rounded-[1px] border border-ink/12 px-3 py-1.5 tabular-nums">{r}</li>
              ))}
            </ul>
            <p className={`${BODY} mt-5`}>
              The beiges went because a tinted sheet beside a hot red reads cream-and-terracotta. Each dark was tried
              and lost to onyx on the live site.
            </p>
          </Reveal>
        </div>
      </SectionShell>

      {/* 03 — Typography */}
      <SectionShell
        tone="rule"
        eyebrow="03 — Typography"
        heading="One typeface, two registers."
        headingSize="md"
        intro="PP Neue Montreal carries everything. There is no second typeface and no third voice. It is loaded locally as .woff2, never from a font host."
      >
        <Reveal as="ul" stagger={0.08} className="border-b border-ink/12">
          <RevealItem as="li" variant="fade" className="grid gap-x-gutter gap-y-4 border-t border-ink/12 py-10 lg:grid-cols-4">
            <p className="type-meta text-ink/70 lg:col-span-2">Display — weight 300, sentence case, ends in a period</p>
            <p className="type-display text-fluid-2xl text-ink lg:col-span-2">For brands that expect to be noticed.</p>
          </RevealItem>
          <RevealItem as="li" variant="fade" className="grid gap-x-gutter gap-y-4 border-t border-ink/12 py-10 lg:grid-cols-4">
            <p className="type-meta text-ink/70 lg:col-span-2">Meta — 13px, semibold 600, uppercase, +0.13em</p>
            <p className="type-meta text-ink lg:col-span-2">Selected work · Commission · 01 / 07 — Med-spa</p>
          </RevealItem>
          <RevealItem as="li" variant="fade" className="grid gap-x-gutter gap-y-4 border-t border-ink/12 py-10 lg:grid-cols-4">
            <p className="type-meta text-ink/70 lg:col-span-2">Body — weight 400, fluid 16 → 18px</p>
            <p className="max-w-measure font-sans text-fluid-base leading-relaxed text-ink lg:col-span-2">
              Luxury is not created by adding more. It is created through restraint, precision, consistency, and a
              clear point of view.
            </p>
          </RevealItem>
        </Reveal>

        <Reveal variant="fade" className="mt-24">
          <h3 className={SUB}>The scale</h3>
          <div className={`${TABLE_WRAP} mt-6`}>
            <table className={TABLE}>
              <thead>
                <tr>
                  {["Token", "Size", "Leading", "Tracking", "Use"].map((h) => (
                    <th key={h} scope="col" className={TH}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {SCALE.map(([token, size, leading, tracking, use]) => (
                  <tr key={token}>
                    <th scope="row" className={`${TD} font-normal`}>{token}</th>
                    <td className={`${TD} tabular-nums`}>{size}</td>
                    <td className={`${TD} tabular-nums`}>{leading}</td>
                    <td className={`${TD} tabular-nums`}>{tracking}</td>
                    <td className={`${TD} text-ink/70`}>{use}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>

        <div className={`${LINES} mt-24`}>
          <Reveal variant="fade" className={ON_LEFT}>
            <h3 className={`${SUB} mb-5`}>Always</h3>
            <List
              items={[
                "Two size tiers per page — one or two moments, and one secondary size for every other heading.",
                "Headlines as short declarative sentences that end in a period.",
                "Tracking and leading from the token. A heading is never hand-tuned.",
                "Uppercase only in the meta register.",
              ]}
            />
          </Reveal>
          <Reveal variant="fade" delay={0.1} className={ON_MIDDLE}>
            <h3 className={`${SUB} mb-5`}>Never</h3>
            <List
              items={[
                "A different heading size in every section — that reads as a system being exercised.",
                "Bold display type. A 300-weight line outranks any bold cut.",
                "A second typeface. The serif is retired, including its italic sublines and pull-quotes.",
                "A remote font host.",
              ]}
            />
          </Reveal>
        </div>

        <Reveal variant="fade" className="mt-24">
          <h3 className={SUB}>The wordmark</h3>
          <div className={`${BODY} mt-5`}>
            <p>
              The only element outside the two registers: Medium 500, and lowercase everywhere. The homepage opens on
              the name, and the name then floats into the header and becomes the logo — one continuous element, so the
              mark must match it in every position. Uppercase announces; lowercase is simply present. The monogram
              &ldquo;KBC&rdquo; keeps uppercase, because an initialism is read as letters.
            </p>
          </div>
        </Reveal>
      </SectionShell>

      {/* 04 — Motion */}
      <SectionShell
        tone="rule"
        eyebrow="04 — Motion"
        heading="Chosen by size, never by taste."
        headingSize="md"
        intro="The bigger the thing that moves, the longer and softer the move. That is the whole rule, and it removes the per-component argument entirely."
      >
        <Reveal as="ol" stagger={0.08} className="border-b border-ink/12">
          {LADDER.map(([name, dur, use]) => (
            <RevealItem as="li" variant="fade" key={name} className="grid gap-x-gutter gap-y-3 border-t border-ink/12 py-8 lg:grid-cols-4">
              <p className="type-meta text-ink lg:col-span-2">
                {name} <span className="ml-3 tabular-nums text-ink/70">{dur}</span>
              </p>
              <p className="max-w-measure font-sans text-fluid-base leading-relaxed text-ink/70 lg:col-span-2">{use}</p>
            </RevealItem>
          ))}
        </Reveal>
        <p className={`${BODY} mt-6`}>
          Nothing is faster than {ms(DUR.fast)}. Nothing sits between {ms(DUR.xslow)} and an ambient loop, and the
          marquee&rsquo;s 90-second pass is the only ambient loop on the site.
        </p>

        <Reveal variant="fade" className="mt-24">
          <h3 className={SUB}>Easing</h3>
          <div className={`${TABLE_WRAP} mt-6`}>
            <table className={TABLE}>
              <thead>
                <tr>
                  {["Token", "Curve", "Use"].map((h) => (
                    <th key={h} scope="col" className={TH}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {EASINGS.map(([token, c, use]) => (
                  <tr key={token}>
                    <th scope="row" className={`${TD} font-normal`}>{token}</th>
                    <td className={`${TD} tabular-nums`}>{c}</td>
                    <td className={`${TD} text-ink/70`}>{use}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>

        <div className={`${LINES} mt-24`}>
          <Reveal variant="fade" className={ON_LEFT}>
            <h3 className={SUB}>The one entrance</h3>
            <div className={`${BODY} mt-5`}>
              <p>
                Every text block on every page uses the same recipe: hidden at opacity 0, {TRAVEL.text}px below, with a
                10px blur; it fades over 0.65s, rises over 0.7s and sharpens over 0.75s, and fires at 15% in view, so
                a block is already arriving as you scroll to it. Media slides instead, with distance set by weight —
                text {TRAVEL.text}, aside {TRAVEL.aside}, media {TRAVEL.media}, frame {TRAVEL.frame} — and direction
                art-directed per placement, never random.
              </p>
            </div>
          </Reveal>
          <Reveal variant="fade" delay={0.1} className={ON_MIDDLE}>
            <h3 className={SUB}>Reduced motion changes style, never structure</h3>
            <div className={`${BODY} mt-5`}>
              <p>
                The markup sent to the browser is identical for everyone. The server has no media query, so a component
                that returns a different tree for reduced motion causes a hydration mismatch that drops the whole page
                to client rendering. It is said in CSS the server can render too, or gated on a value that is false on
                the server and on the first client render — never on a branch at render time.
              </p>
            </div>
          </Reveal>
        </div>

        <Reveal variant="fade" className="mt-24">
          <h3 className={SUB}>Small and specific, never ambient</h3>
          <div className={`${BODY} mt-5`}>
            <p>
              Nothing runs full-screen or continuously behind content. The vocabulary is a short list of moments, each
              used once: the name that floats into the header and becomes the logo; one real project in a browser
              frame that opens into its case study; words that fade and media that slides; a cursor that carries a
              single word; the gem that holds alone for a beat before a morph; the marquee at 90 seconds; and an accent
              word with the cherry washing through it left to right.
            </p>
            <p>If you notice the animation, it is wrong. You should notice only that the page feels calm.</p>
          </div>
        </Reveal>
      </SectionShell>

      {/* 05 — Layout */}
      <SectionShell
        tone="rule"
        layout="split"
        eyebrow="05 — Layout"
        heading="The three lines."
        headingSize="md"
        intro="Left-and-right composition reads expensive only when it is the same left and the same right on every page."
      >
        <Reveal variant="fade">
          <div className={BODY}>
            <p>
              The site is set on a four-track grid with an editorial gutter. Text may start on three of those lines —
              left (the page edge), middle (the half) and right (the last track). Never a fourth.
            </p>
            <p>
              Before the rule, content started at seven different distances from the page edge. Every new one was a
              reasonable decision on its own, and a page of new decisions reads as clutter however reasonable each
              was. Halves, thirds and quarters happen inside a column, never against the page edge.
            </p>
          </div>
          <h3 className={`${SUB} mb-5 mt-14`}>The other two</h3>
          <List
            items={[
              "One voice per section — one display line, one label, one body. Never a stranded third size.",
              "Equal air — every section takes the same vertical padding, and one label-to-content drop.",
            ]}
          />
          <h3 className={`${SUB} mb-5 mt-14`}>Standing rules</h3>
          <List
            items={[
              "Left-alignment is the default. No centred template stacking.",
              "Sharp corners — a 1px radius — are brand. Only the cursor is round.",
              "Imagery placed with intentional offset and asymmetry.",
              "Generous whitespace does the pacing, not dividers.",
            ]}
          />
        </Reveal>
      </SectionShell>

      {/* 06 — Devices */}
      <SectionShell
        tone="rule"
        eyebrow="06 — Devices"
        heading="The system's vocabulary."
        headingSize="md"
        intro="Each has one job. Reaching for a different one is how a system erodes."
      >
        <Reveal variant="fade">
          <div className={TABLE_WRAP}>
            <table className={TABLE}>
              <thead>
                <tr>
                  {["Device", "What it is", "Rule"].map((h) => (
                    <th key={h} scope="col" className={TH}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {DEVICES.map(([device, what, rule]) => (
                  <tr key={device}>
                    <th scope="row" className={`${TD} whitespace-nowrap font-normal`}>{device}</th>
                    <td className={`${TD} text-ink/70`}>{what}</td>
                    <td className={TD}>{rule}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
      </SectionShell>

      {/* 07 — Voice */}
      <SectionShell
        tone="rule"
        eyebrow="07 — Voice"
        heading="A luxury creative house, not a dev shop."
        headingSize="md"
        intro="Editorial, assured, fashion-conscious, commercially intelligent, selective, slightly provocative."
      >
        <Reveal variant="fade">
          <div className={BODY}>
            <p>
              Sell perception first — authority, trust, desirability, growth — then let capability support it. Craft
              and technology are a proof point, never the headline: they belong in a FAQ answer or at case-study depth.
              Frame a project as the shift created, not the deliverable.
            </p>
          </div>
        </Reveal>
        <div className={`${LINES} mt-14`}>
          <Reveal variant="fade" className={ON_LEFT}>
            <h3 className={`${SUB} mb-5`}>Nomenclature</h3>
            <List
              items={[
                "An engagement or a commission — never a “package”.",
                "Seven services, one word each: Identity · Collateral · Websites · Redesign · Development · Search · Squarespace.",
                "Four engagement sizes: The Edit · Signature · Atelier · Private Commission. Names and timelines only.",
                "Every engagement is quoted to its scope. The one published figure is the Squarespace entry, because that platform bounds the scope in a way custom work does not.",
              ]}
            />
          </Reveal>
          <Reveal variant="fade" delay={0.1} className={ON_MIDDLE}>
            <h3 className={`${SUB} mb-5`}>Forbidden</h3>
            <List
              items={[
                "Empty luxury filler: elevated, bespoke, intentional, curated, timeless — unless it says something specific.",
                "Naming a competitor. Confidence doesn't name the cheap option.",
                "Claiming anything about a real client that can't be verified.",
              ]}
            />
          </Reveal>
        </div>
      </SectionShell>

      {/* 08 — Governance */}
      <SectionShell
        tone="rule"
        layout="split"
        eyebrow="08 — Governance"
        heading="Where the truth lives."
        headingSize="md"
        intro="A system only holds if there is one place to look."
      >
        <Reveal variant="fade">
          <div className={BODY}>
            <p>
              Every value is defined once, in code — the colour, type and duration tokens, and the motion curves — and
              every component reads from them. A hex code is never typed into a component. This page reads from the
              same source, which is why its swatches and ratios cannot disagree with the site.
            </p>
            <p>
              Before anything is released, every page is checked automatically: it must load, carry exactly one main
              heading, log no errors with motion on or off, fit a phone screen without sideways scroll, stay within the
              flare budget, and pass AA contrast on every line of text.
            </p>
            <p>
              Changes are decided on the live site, not in the abstract, and each one is dated. What is retired stays
              on the record with the reason it lost, so it is not proposed again.
            </p>
          </div>
          <div className="mt-12">
            <ArrowLink href="/services/identity">How a brand system is commissioned</ArrowLink>
          </div>
        </Reveal>
      </SectionShell>

      <ClosingCTA heading="Your brand, held to this." accent="this">
        <Button href="/begin" variant="onDark">
          Begin your project
        </Button>
      </ClosingCTA>
    </>
  );
}
