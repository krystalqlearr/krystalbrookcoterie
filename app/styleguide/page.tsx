import type { Metadata } from "next";
import ArrowLink from "@/components/ArrowLink";
import Button from "@/components/Button";
import EditorialHeading from "@/components/EditorialHeading";
import Eyebrow from "@/components/Eyebrow";
import FAQAccordion from "@/components/FAQAccordion";
import ImageFrame from "@/components/ImageFrame";
import IndexMeta from "@/components/IndexMeta";
import Logo from "@/components/Logo";
import Marquee from "@/components/Marquee";
import ProjectCard from "@/components/ProjectCard";
import Rule from "@/components/Rule";
import SectionShell from "@/components/SectionShell";
import ServiceCard from "@/components/ServiceCard";
import StatStrip from "@/components/StatStrip";
import Testimonial from "@/components/Testimonial";

export const metadata: Metadata = {
  title: "System",
  robots: { index: false, follow: false },
};

/* ── Color ──────────────────────────────────────────────────────────────── */

type Token = { name: string; hex: string; swatch: string; note?: string };

const groups: { label: string; tokens: Token[] }[] = [
  {
    label: "Paper — one stock, three sheets, lightest on top",
    tokens: [
      {
        name: "milk",
        hex: "#FAF7F0",
        swatch: "bg-milk",
        note: "THE CANVAS — the default page. Ink 16.2 (AAA), and the neon flare reads 3.53 here versus 3.01 on bone, so the accent is safest on the canvas itself.",
      },
      {
        name: "bone",
        hex: "#EBE5D8",
        swatch: "bg-bone",
        note: "FIRST RECESS — the warm alt-section, and still the light ink on the forest dark. The inversion pair is bone + ink.",
      },
      {
        name: "stone",
        hex: "#E0D8C7",
        swatch: "bg-stone",
        note: "DEEPEST RECESS — inset form fields and the quietest band. Never carries the neon flare (2.66); accents drop to flare-deep automatically.",
      },
      {
        name: "ink",
        hex: "#23201B",
        swatch: "bg-ink",
        note: "warm faded charcoal-brown — primary ink and the filled-button surface",
      },
    ],
  },
  {
    label: "The flare — electric magenta, three stops",
    tokens: [
      {
        name: "flare",
        hex: "#FF0080",
        swatch: "bg-flare",
        note: "NEON. Graphics + large display only, on milk, bone or the forest dark: arrow glyphs, hairline wipes, Rule ticks, heading accent words. 3.01 on bone — never small text, never on stone (2.66).",
      },
      {
        name: "flare-deep",
        hex: "#A8004F",
        swatch: "bg-flare-deep",
        note: "TEXT. Anything under 24px that must be flare-coloured — eyebrows, indices, tier flags — plus the one full band and the filled-button hover. 6.02 on bone, 5.33 on stone.",
      },
      {
        name: "flare-lift",
        hex: "#FF7ABF",
        swatch: "bg-flare-lift",
        note: "The flare ON the forest dark — 7.09, safe at any size.",
      },
    ],
  },
  {
    label: "The dark + atmosphere",
    tokens: [
      {
        name: "forest",
        hex: "#0F2018",
        swatch: "bg-forest",
        note: "THE dark inversion surface. Green is electric magenta's true complement, which is why the flare reads hotter here than on any neutral. Bone 13.49 · flare-lift 7.09 · neon 4.49.",
      },
      { name: "mocha", hex: "#9A8264", swatch: "bg-mocha", note: "imagery and atmosphere only" },
    ],
  },
];

/* ── Type specimens ─────────────────────────────────────────────────────── */

type TypeSpec = { label: string; cls: string; meta: string; sample: string };

// DISPLAY — Neue Montreal Regular, sentence case. Each token bakes in its own
// negative tracking and sub-1 leading, so nothing here is hand-tuned.
const displayScale: TypeSpec[] = [
  {
    label: "fluid-hero — home headline",
    cls: "text-fluid-hero",
    meta: "→ 108px · −0.060em · 0.92",
    sample: "Websites with presence.",
  },
  {
    label: "fluid-display — page title",
    cls: "text-fluid-display",
    meta: "→ 84px · −0.058em · 0.92",
    sample: "Proof before promises.",
  },
  {
    label: "fluid-3xl — section title",
    cls: "text-fluid-3xl",
    meta: "→ 68px · −0.055em · 0.93",
    sample: "Rented is over.",
  },
  {
    label: "fluid-2xl — subsection",
    cls: "text-fluid-2xl",
    meta: "→ 44px · −0.050em · 0.96",
    sample: "Boutique scale, by design.",
  },
  {
    label: "fluid-xl — card + question",
    cls: "text-fluid-xl",
    meta: "→ 36px · −0.045em · 1.00",
    sample: "A clinical brand, repositioned.",
  },
];

const bodyScale: TypeSpec[] = [
  {
    label: "fluid-lg — intro / lede",
    cls: "text-fluid-lg",
    meta: "→ 24px · 1.45",
    sample:
      "For founder-led brands ready to look as established as they have become.",
  },
  {
    label: "fluid-base — body",
    cls: "text-fluid-base",
    meta: "→ 18px · 1.60",
    sample:
      "Strategy, art direction, and custom web design built to turn attention into trust — and trust into demand.",
  },
  {
    label: "fluid-sm — caption / note",
    cls: "text-fluid-sm",
    meta: "→ 15px · 1.50",
    sample: "Average delivery, Signature tier.",
  },
];

function GroupMarker({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-4">
      <span aria-hidden className="h-px w-10 shrink-0 bg-flare" />
      <h2 className="type-meta text-ink/70">{children}</h2>
    </div>
  );
}

function Note({ children }: { children: React.ReactNode }) {
  return <p className="max-w-measure font-sans text-fluid-sm text-ink/70">{children}</p>;
}

/* ── Page ───────────────────────────────────────────────────────────────── */

export default function StyleguidePage() {
  return (
    <main className="min-h-screen bg-milk text-ink">
      <div className="container py-section-lg">
        <header className="max-w-measure">
          <Eyebrow>Krystal Brook Coterie</Eyebrow>
          <h1 className="type-display mt-8 text-fluid-display">
            One typeface. Two registers.
          </h1>
          <p className="mt-8 max-w-measure font-sans text-fluid-lg text-ink/70">
            Milk-led warm-neutral paper, Neue Montreal set enormous at regular weight in
            sentence case, a meta register of 13px caps carrying everything else, and a
            single electric-magenta flare used barely. Pinned in{" "}
            <code className="text-ink">tailwind.config.ts</code> and{" "}
            <code className="text-ink">globals.css</code>.
          </p>
        </header>

        {/* ── Color ── */}
        <div className="mt-section space-y-26">
          {groups.map((group) => (
            <section key={group.label}>
              <GroupMarker>{group.label}</GroupMarker>
              <ul className="mt-10 grid grid-cols-1 gap-x-gutter gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
                {group.tokens.map((token) => (
                  <li key={token.name}>
                    <div
                      className={`${token.swatch} aspect-[4/3] w-full rounded-[1px] ring-1 ring-inset ring-ink/15`}
                    />
                    <div className="mt-5 flex items-baseline justify-between gap-4">
                      <span className="type-meta text-ink">{token.name}</span>
                      <span className="type-meta text-ink/70">{token.hex}</span>
                    </div>
                    {token.note ? (
                      <p className="mt-3 max-w-measure font-sans text-fluid-sm text-ink/70">
                        {token.note}
                      </p>
                    ) : null}
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        {/* ── Flare discipline ── */}
        <div className="mt-38">
          <section>
            <GroupMarker>Flare discipline — the one rule</GroupMarker>
            <div className="mt-10 grid gap-x-gutter gap-y-10 lg:grid-cols-2">
              <p className="type-display max-w-[16ch] text-fluid-2xl">
                One flare element per view. Not one per section.
              </p>
              <div className="space-y-5">
                <Note>
                  The flare may appear as: an arrow glyph, an index number, a{" "}
                  <span className="text-flare-deep">single accent word</span> in a heading, a
                  section tick, or — once per page at most — a full-bleed band. Pick
                  one. If the heading carries it, the eyebrow stays muted; that is why{" "}
                  <code className="text-ink">SectionShell</code> no longer tints its
                  eyebrow.
                </Note>
                <Note>
                  <strong className="font-normal text-ink">Which stop is not a taste call.</strong>{" "}
                  Neon <code className="text-ink">flare</code> is for graphics and text
                  ≥24px. Anything smaller — a 13px eyebrow, an index, a tier flag — takes{" "}
                  <code className="text-ink">flare-deep</code>, because #FF0080 measures
                  3.01 on bone and small text needs 4.5. On the dark, everything uses{" "}
                  <code className="text-ink">flare-lift</code>.
                </Note>
                <Note>
                  Prices, tags, and asterisks stay ink. Ink-forward reads expensive; the
                  flare stays rare. Focus rings are never the flare — they are ink on
                  bone/stone, bone on the forest dark.
                </Note>
              </div>
            </div>
          </section>
        </div>

        {/* ── Logo ── */}
        <div className="mt-38">
          <section>
            <GroupMarker>Wordmark — Medium 500, uppercase</GroupMarker>
            <div className="mt-10 grid gap-px overflow-hidden rounded-[1px] ring-1 ring-ink/15 sm:grid-cols-2">
              <div className="bg-forest p-10 sm:p-14">
                <p className="type-meta mb-12 text-bone/60">On the dark · bone</p>
                <div className="flex flex-col gap-14">
                  <Logo variant="stacked" color="bone" />
                  <Logo variant="horizontal" color="bone" />
                  <Logo variant="monogram" color="bone" />
                </div>
              </div>
              <div className="bg-stone p-10 sm:p-14">
                <p className="type-meta mb-12 text-ink/70">On paper · ink</p>
                <div className="flex flex-col gap-14">
                  <Logo variant="stacked" color="ink" />
                  <Logo variant="horizontal" color="ink" />
                  <Logo variant="monogram" color="ink" />
                </div>
              </div>
            </div>
            <div className="mt-8">
              <Note>
                The mark sits at Medium (500) — heavier than body, lighter than a slab.
                It is the one uppercase thing that is neither display nor meta, so it
                reads as a house mark instead of competing with the 400-weight
                headlines beside it.
              </Note>
            </div>
          </section>
        </div>

        {/* ── Typography ── */}
        <div className="mt-38 space-y-26">
          <section>
            <GroupMarker>Display — Regular 400, sentence case</GroupMarker>
            <div className="mt-8">
              <Note>
                Write headlines as short declarative sentences that end in a period,
                stacked two or three deep. The tracking and leading live in the size
                token — never hand-tune a heading.
              </Note>
            </div>
            <ul className="mt-12 space-y-16">
              {displayScale.map((t) => (
                <li key={t.label} className="grid gap-4 lg:grid-cols-[16rem_1fr] lg:gap-x-gutter">
                  <div className="pt-2">
                    <p className="font-sans text-fluid-sm text-ink">{t.label}</p>
                    <p className="type-meta mt-2 text-ink/70">{t.meta}</p>
                  </div>
                  <p className={`type-display text-ink ${t.cls}`}>{t.sample}</p>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <GroupMarker>Meta — Semibold 600, 13px, +0.13em</GroupMarker>
            <div className="mt-8">
              <Note>
                The only uppercase left on the site. It carries eyebrows, tags, indices,
                categories, captions, credits, nav, form labels, and CTAs — apply it with{" "}
                <code className="text-ink">.type-meta</code> or the{" "}
                <code className="text-ink">Eyebrow</code> component.
              </Note>
            </div>
            <div className="mt-12 flex flex-wrap items-center gap-x-14 gap-y-8">
              <Eyebrow>Muted on bone</Eyebrow>
              <Eyebrow tone="ink">Ink, forward</Eyebrow>
              <Eyebrow tone="flare">Flare cover-line</Eyebrow>
              <span className="bg-forest px-6 py-4">
                <Eyebrow tone="onDark">On the dark</Eyebrow>
              </span>
              <span className="bg-forest px-6 py-4">
                <Eyebrow tone="flareDark">Flare on the forest dark</Eyebrow>
              </span>
            </div>
          </section>

          <section>
            <GroupMarker>Body — Regular 400, sentence case</GroupMarker>
            <ul className="mt-12 space-y-12">
              {bodyScale.map((t) => (
                <li key={t.label} className="grid gap-4 lg:grid-cols-[16rem_1fr] lg:gap-x-gutter">
                  <div className="pt-1">
                    <p className="font-sans text-fluid-sm text-ink">{t.label}</p>
                    <p className="type-meta mt-2 text-ink/70">{t.meta}</p>
                  </div>
                  <p className={`max-w-measure font-sans text-ink/75 ${t.cls}`}>{t.sample}</p>
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* ── Devices ── */}
        <div className="mt-38 space-y-26">
          <section>
            <GroupMarker>ArrowLink — the signature action</GroupMarker>
            <div className="mt-8">
              <Note>
                A CTA is typography, not a box: meta-caps label, neon arrow, hairline
                beneath. Hover or focus wipes the hairline in from the left while the
                arrow travels in its own direction. Use this everywhere; reserve{" "}
                <code className="text-ink">Button</code> for real form controls.
              </Note>
            </div>
            <div className="mt-12 grid gap-x-gutter gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              <ArrowLink href="/work">Discover the studio</ArrowLink>
              <ArrowLink href="/work" direction="right">
                View all work
              </ArrowLink>
              <ArrowLink href="/styleguide" direction="down">
                Read the system
              </ArrowLink>
              <ArrowLink href="/begin" tone="flare">
                Begin a commission
              </ArrowLink>
              <div className="bg-forest p-8 sm:col-span-2">
                <ArrowLink href="/work" tone="onDark" block>
                  On the dark, full width
                </ArrowLink>
              </div>
            </div>
          </section>

          <section>
            <GroupMarker>IndexMeta — the counted sequence</GroupMarker>
            <div className="mt-8">
              <Note>
                Makes a list read as an edited sequence rather than a grid. The live
                number takes the flare; the total and tag stay muted. Zero-padded,
                tabular figures, so a column aligns.
              </Note>
            </div>
            <ul className="mt-12 max-w-editorial divide-y divide-ink/15 border-y border-ink/15">
              {[
                { i: 1, tag: "Luxury spray tan — Brand + Web" },
                { i: 2, tag: "Med-spa — Brand + Web + Photography" },
                { i: 3, tag: "Bridal — Identity + Web" },
              ].map((row) => (
                <li key={row.i} className="py-6">
                  <IndexMeta index={row.i} total={7} tag={row.tag} />
                </li>
              ))}
            </ul>
            <div className="mt-8 bg-forest p-8">
              <IndexMeta index={4} total={7} tag="On the dark" tone="onDark" />
            </div>
          </section>

          <section>
            <GroupMarker>Rule — hairline, two jobs</GroupMarker>
            <div className="mt-12 space-y-10">
              <div className="space-y-3">
                <Rule width="short" tone="flare" />
                <p className="type-meta text-ink/70">flare · short — opens a section header</p>
              </div>
              <div className="space-y-3">
                <Rule tone="hair" />
                <p className="type-meta text-ink/70">hair · full — separates list rows</p>
              </div>
              <div className="space-y-3 bg-forest p-8">
                <Rule tone="hairOnDark" />
                <p className="type-meta text-bone/60">hairOnDark · full</p>
              </div>
            </div>
          </section>

          <section>
            <GroupMarker>Marquee — the page&rsquo;s heartbeat</GroupMarker>
            <div className="mt-8">
              <Note>
                Pure CSS, seamless at any width, pauses on hover, stops dead under
                reduced motion. Presentational only — the same names must exist as real
                content elsewhere on the page.
              </Note>
            </div>
            <div className="mt-12 space-y-px overflow-hidden rounded-[1px] ring-1 ring-ink/15">
              <Marquee
                className="bg-stone py-8"
                items={[
                  "Beauty",
                  "Med-spa",
                  "Wellness",
                  "Bridal",
                  "Luxury lifestyle",
                  "Aesthetics",
                ]}
              />
              <Marquee
                className="bg-forest py-8"
                tone="onDark"
                duration={30}
                items={["Brand identity", "Art direction", "Web design", "Development", "SEO"]}
              />
            </div>
          </section>

          <section>
            <GroupMarker>StatStrip — the proof band</GroupMarker>
            <div className="mt-8">
              <Note>
                Sits directly under the hero as the page&rsquo;s first dark inversion.
                Three or four items, and every figure must be one you can defend — the
                sample below is placeholder.
              </Note>
            </div>
            <div className="mt-12 overflow-hidden rounded-[1px]">
              <StatStrip
                stats={[
                  { figure: "6–8 wks", label: "Signature build", note: "Brief to launch." },
                  { figure: "100%", label: "Owned outright", note: "Code, design system, deployment." },
                  { figure: "1", label: "Senior hand", note: "Nothing handed to juniors." },
                  { figure: "< 24h", label: "Reply window", note: "During an active commission." },
                ]}
              />
            </div>
          </section>
        </div>

        {/* ── Canvas rhythm ── */}
        <div className="mt-38">
          <section>
            <GroupMarker>Canvas rhythm — SectionShell tones</GroupMarker>
            <div className="mt-8">
              <Note>
                Sections alternate bone → stone → forest so a page reads with cadence
                instead of scrolling flat. Moving into the forest dark is a designed inversion
                event: one or two per page, no more.
              </Note>
            </div>
            <div className="mt-12 space-y-px overflow-hidden rounded-[1px] ring-1 ring-ink/15">
              <SectionShell
                container={false}
                marker
                eyebrow="Light"
                heading="Milk is the canvas."
                intro="The default. Paints nothing — it simply inherits the page."
                className="!py-12 px-8"
              />
              <SectionShell
                container={false}
                tone="bone"
                eyebrow="Bone"
                heading="The first recess."
                intro="The warm alt-section — the workhorse for rhythm between two milk bands."
                className="!py-12 px-8"
              />
              <SectionShell
                container={false}
                tone="stone"
                eyebrow="Stone"
                heading="The deepest recess."
                accent="quieter"
                intro="Recessed paper for rhythm. The accent word here is flare-deep, not neon — SectionShell swapped it automatically, because the neon fails on stone."
                className="!py-12 px-8"
              />
              <SectionShell
                container={false}
                tone="dark"
                eyebrow="Charcoal"
                heading="The dark inversion moment."
                intro="Bone text — proof bands, closing CTAs, the footer."
                className="!py-12 px-8"
              />
            </div>
          </section>
        </div>

        {/* ── Components ── */}
        <div className="mt-38 space-y-26">
          <section>
            <GroupMarker>EditorialHeading + Button</GroupMarker>
            <div className="mt-12 space-y-10">
              <EditorialHeading size="lg" accent="rented">
                Your competitors&rsquo; sites are rented.
              </EditorialHeading>
              <div className="flex flex-wrap items-center gap-6">
                <Button href="/styleguide" variant="primary">
                  Begin your project
                </Button>
                <Button href="/styleguide" variant="ghost">
                  See the work
                </Button>
              </div>
              <div className="bg-forest p-10">
                <Button href="/styleguide" variant="onDark">
                  On the dark
                </Button>
              </div>
            </div>
          </section>

          <section>
            <GroupMarker>Testimonial — three canvases</GroupMarker>
            <div className="mt-12 space-y-px overflow-hidden rounded-[1px] ring-1 ring-ink/15">
              <div className="bg-milk p-10 sm:p-14">
                <Testimonial
                  quote="Sample quote — the display register at fluid-xl, held to a 42-character measure."
                  name="Attributed name"
                  role="Role, Company"
                />
              </div>
              <div className="bg-forest p-10 sm:p-14">
                <Testimonial
                  tone="onDark"
                  quote="Sample quote — the display register at fluid-xl, held to a 42-character measure."
                  name="Attributed name"
                  role="Role, Company"
                />
              </div>
              {/* The flare holding a whole band — at most once per page. Uses the
                  `deep` stop so the 13px attribution clears AA alongside the quote. */}
              <div className="bg-flare-deep p-10 sm:p-14">
                <Testimonial
                  tone="onFlare"
                  quote="Sample quote — the display register at fluid-xl, held to a 42-character measure."
                  name="Attributed name"
                  role="Role, Company"
                />
              </div>
            </div>
          </section>

          <section>
            <GroupMarker>ServiceCard</GroupMarker>
            <div className="mt-12 grid gap-x-gutter gap-y-10 md:grid-cols-3">
              <ServiceCard
                name="The Edit"
                price="$4,500"
                duration="2–3 weeks"
                description="Go to market looking established."
              />
              <ServiceCard
                name="Signature"
                price="$9,800"
                duration="6–8 weeks"
                featured
                description="The flagship. Most brands start here."
              />
              <ServiceCard
                name="Atelier"
                price="$22,000+"
                duration="8–12 weeks"
                description="When the site is the flagship location."
              />
            </div>
          </section>

          <section>
            <GroupMarker>ProjectCard · ImageFrame</GroupMarker>
            <div className="mt-12 grid items-end gap-x-gutter gap-y-10 md:grid-cols-[1.4fr_1fr]">
              <ProjectCard
                size="feature"
                client="Glowtoure"
                tag="Luxury spray tan"
                descriptor="A luxury tan, given a luxury home."
                href="/styleguide"
              />
              <ImageFrame ratio="4/5" alt="Placeholder" caption="4 / 5" />
            </div>
          </section>

          <section>
            <GroupMarker>FAQAccordion</GroupMarker>
            <div className="mt-12 max-w-editorial">
              <FAQAccordion
                items={[
                  {
                    question: "How long does a commission take?",
                    answer: "The Edit 2–3 weeks, Signature 6–8, Atelier 8–12.",
                  },
                  {
                    question: "What do I own?",
                    answer:
                      "Everything — the code, the design system, the deployment. No lock-in.",
                  },
                ]}
              />
            </div>
          </section>
        </div>

        {/* ── Motion ── */}
        <div className="mt-38">
          <section>
            <GroupMarker>Motion — one language</GroupMarker>
            <ul className="mt-10 grid gap-6 font-sans text-fluid-sm text-ink/70 sm:grid-cols-2">
              <li>
                <span className="text-ink">ease-editorial</span> · cubic-bezier(0.16, 1, 0.3, 1)
              </li>
              <li>
                <span className="text-ink">ease-editorial-inout</span> · cubic-bezier(0.83, 0, 0.17, 1)
              </li>
              <li>
                <span className="text-ink">durations</span> · fast .4s · base .6s · slow .72s · xslow .9s
              </li>
              <li>
                <span className="text-ink">cursor</span> · mix-blend-difference inversion dot
              </li>
            </ul>
          </section>
        </div>
      </div>
    </main>
  );
}
