import ArrowLink from "@/components/ArrowLink";
import Logo from "@/components/Logo";
import Button from "@/components/Button";
import Field from "@/components/Field";
import EditorialHeading from "@/components/EditorialHeading";
import Eyebrow from "@/components/Eyebrow";
import FAQAccordion from "@/components/FAQAccordion";
import ImageFrame from "@/components/ImageFrame";
import ProjectCard from "@/components/ProjectCard";
import Rule from "@/components/Rule";
import SectionShell from "@/components/SectionShell";
import ServiceCard from "@/components/ServiceCard";
import Testimonial from "@/components/Testimonial";

type Token = { name: string; hex: string; swatch: string; dark?: boolean; note?: string };

const groups: { label: string; tokens: Token[] }[] = [
  {
    label: "The paper — one stock, three sheets",
    tokens: [
      { name: "milk", hex: "#FDFBF6", swatch: "bg-milk", note: "the canvas — luminous near-white warm paper; elevation only goes DOWN from here" },
      { name: "bone", hex: "#EBE5D8", swatch: "bg-bone", note: "first recess — the warm alt-section; also the light ink on river" },
      { name: "stone", hex: "#E0D8C7", swatch: "bg-stone", note: "deepest recess — the quietest band; never carries the neon flare" },
      { name: "field", hex: "#F1ECE2", swatch: "bg-field", note: "inset form fields on milk — a soft step down from the canvas" },
      { name: "ink", hex: "#23201B", swatch: "bg-ink", dark: true, note: "primary text + the filled-button surface; prices and tags stay ink" },
    ],
  },
  {
    label: "The dark is punctuation",
    tokens: [
      { name: "river", hex: "#0F2A2D", swatch: "bg-river", dark: true, note: "deep river — water at depth. The inversion moment: proof bands, closing CTAs, the footer. One or two per page." },
    ],
  },
  {
    label: "The flare, in three stops — by size and canvas, never by taste",
    tokens: [
      { name: "neon", hex: "#FF0080", swatch: "bg-neon", dark: true, note: "graphics + text ≥24px on milk, bone or river: arrow glyphs, ticks, one heading word. Never small text. Never on stone." },
      { name: "flare-deep", hex: "#A8004F", swatch: "bg-flare-deep", dark: true, note: "flare TEXT under 24px on paper — eyebrows, index numbers — plus the primary-button hover" },
      { name: "flare-lift", hex: "#FF7ABF", swatch: "bg-flare-lift", note: "the flare on river — the only stop that carries small text on the dark" },
    ],
  },
];

type TypeSpec = { label: string; cls: string; meta: string; sample: string };

// Display — Neue Montreal REGULAR 400, sentence case, ends in a period.
const displayScale: TypeSpec[] = [
  { label: "fluid-hero — home headline", cls: "text-fluid-hero", meta: "→ 108px · −0.060em · 0.92", sample: "Websites with presence." },
  { label: "fluid-display — page title", cls: "text-fluid-display", meta: "→ 84px · −0.058em · 0.92", sample: "Rented is over." },
  { label: "fluid-3xl — section title", cls: "text-fluid-3xl", meta: "→ 68px · −0.055em · 0.93", sample: "Proof before promises." },
  { label: "fluid-2xl — subsection", cls: "text-fluid-2xl", meta: "→ 44px · −0.050em · 0.96", sample: "Boutique scale, by design." },
  { label: "fluid-xl — card / list title", cls: "text-fluid-xl", meta: "→ 36px · −0.045em · 1.00", sample: "A clinical brand, repositioned." },
];

function GroupMarker({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-baseline gap-4">
      <span aria-hidden className="h-[2px] w-10 bg-neon" />
      <h2 className="font-sans text-meta font-semibold uppercase text-ink/70">{children}</h2>
    </div>
  );
}

export default function StyleguidePage() {
  return (
    <main className="min-h-screen bg-milk text-ink">
      <div className="container py-section-lg">
        <header className="max-w-measure">
          <p className="font-sans text-meta font-semibold uppercase text-ink/70">
            Krystal Brook Coterie · The Coterie System
          </p>
          <h1 className="mt-4 font-display text-5xl font-normal tracking-[-0.04em] md:text-6xl">
            One typeface. Two registers. One <span className="text-neon">flare.</span>
          </h1>
          <p className="mt-6 max-w-measure font-sans text-fluid-base leading-normal text-ink/70">
            Milk-led warm paper, a single grotesk set enormous at Regular 400 in sentence
            case, a deep-river inversion, and an electric magenta used so sparingly it
            stays an event — pinned in{" "}
            <code className="text-ink">tailwind.config.ts</code>. The restraint is the
            luxury signal.
          </p>
        </header>

        {/* Color */}
        <div className="mt-section space-y-26">
          {groups.map((group) => (
            <section key={group.label}>
              <GroupMarker>{group.label}</GroupMarker>
              <ul className="mt-10 grid grid-cols-1 gap-x-gutter gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
                {group.tokens.map((token) => (
                  <li key={token.name}>
                    <div className={`${token.swatch} aspect-[4/3] w-full rounded-sm ring-1 ring-inset ring-ink/15`} />
                    <div className="mt-4 flex items-baseline justify-between gap-4">
                      <span className="font-mono text-sm text-ink">{token.name}</span>
                      <span className="font-mono text-sm uppercase text-ink/70">{token.hex}</span>
                    </div>
                    {token.note ? (
                      <p className="mt-2 max-w-measure font-sans text-sm text-ink/70">{token.note}</p>
                    ) : null}
                  </li>
                ))}
              </ul>
            </section>
          ))}
          <p className="max-w-measure font-sans text-sm text-ink/70">
            The muted floor is ink/70 on paper — ink/65 quietly fails on stone, so opacity
            is not a hierarchy step below that line; use colour instead. On river the floor
            is bone/60. Hairlines and decorative marks are exempt: ink/12–15, bone/15–20.
            One flare element per view — an arrow, an index number, a heading word, a tick —
            not one per section. If the heading carries it, the eyebrow stays muted. Focus
            rings are never the flare: ink on paper, bone on river.
          </p>
        </div>

        {/* Logo */}
        <div className="mt-38">
          <section>
            <GroupMarker>Wordmark — Medium 500, the one thing outside both registers</GroupMarker>
            <div className="mt-12 grid gap-px overflow-hidden rounded-sm ring-1 ring-ink/15 sm:grid-cols-2">
              <div className="bg-river p-10 sm:p-14">
                <p className="mb-12 font-mono text-xs uppercase tracking-[0.13em] text-bone/60">On river · bone</p>
                <div className="flex flex-col gap-14">
                  <Logo variant="stacked" color="bone" />
                  <Logo variant="horizontal" color="bone" />
                  <Logo variant="monogram" color="bone" />
                </div>
              </div>
              <div className="bg-bone p-10 sm:p-14">
                <p className="mb-12 font-mono text-xs uppercase tracking-[0.13em] text-ink/70">On paper · ink</p>
                <div className="flex flex-col gap-14">
                  <Logo variant="stacked" color="ink" />
                  <Logo variant="horizontal" color="ink" />
                  <Logo variant="monogram" color="ink" />
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Typography */}
        <div className="mt-38 space-y-26">
          <section>
            <GroupMarker>Display — Regular 400, sentence case, ends in a period</GroupMarker>
            <ul className="mt-12 space-y-14">
              {displayScale.map((t) => (
                <li key={t.label} className="grid gap-4 lg:grid-cols-[16rem_1fr] lg:gap-x-gutter">
                  <div className="pt-2">
                    <p className="font-sans text-sm text-ink">{t.label}</p>
                    <p className="mt-1 font-mono text-xs uppercase tracking-wide text-ink/70">{t.meta}</p>
                  </div>
                  <p className={`font-display font-normal text-ink ${t.cls}`}>{t.sample}</p>
                </li>
              ))}
            </ul>
            <p className="mt-12 max-w-measure font-sans text-sm text-ink/70">
              Tracking and leading live in the size tokens — never hand-tune a heading.
              Every display size floors at 24px on purpose: that keeps all of them inside
              WCAG&rsquo;s &ldquo;large text&rdquo; definition, which is the only reason the
              neon flare can colour a heading word at any viewport.
            </p>
          </section>

          <section>
            <GroupMarker>Meta — Semibold 600 · 13px · +0.13em · the only uppercase</GroupMarker>
            <div className="mt-10 space-y-4">
              <p className="font-sans text-meta font-semibold uppercase text-ink">
                Eyebrows · tags · indices · captions · nav · form labels · CTAs
              </p>
              <p className="font-sans text-meta font-semibold uppercase text-flare-deep">
                01 / 07 — Med-spa · Brand + Web
              </p>
              <p className="max-w-measure font-sans text-sm text-ink/70">
                Everything that isn&rsquo;t a headline or body copy. The family has no 700,
                hence 600. Index numbers take flare-deep; the total and the tag stay muted.
              </p>
            </div>
          </section>
        </div>

        {/* Motion */}
        <div className="mt-38">
          <section>
            <GroupMarker>Motion — one language, the current</GroupMarker>
            <ul className="mt-10 grid gap-6 font-mono text-sm text-ink/70 sm:grid-cols-2">
              <li><span className="text-ink">ease-editorial</span> · cubic-bezier(0.16, 1, 0.3, 1)</li>
              <li><span className="text-ink">ease-editorial-inout</span> · cubic-bezier(0.83, 0, 0.17, 1)</li>
              <li><span className="text-ink">durations</span> · fast .4s · base .6s · slow .72s · xslow .9s</li>
              <li><span className="text-ink">cursor</span> · mix-blend-difference inversion dot</li>
            </ul>
          </section>
        </div>

        {/* Components */}
        <div className="mt-38 space-y-26">
          <section>
            <GroupMarker>SectionShell tones — elevation only goes down</GroupMarker>
            <div className="mt-8 space-y-px overflow-hidden rounded-sm ring-1 ring-ink/15">
              <SectionShell container={false} eyebrow="Light" heading="Milk, the default canvas." intro="Ink text; the page&rsquo;s flare lives in the heading accent." className="!py-10 px-8" />
              <SectionShell container={false} tone="bone" eyebrow="Bone" heading="The first recess." intro="The warm alt-section — the workhorse for rhythm." className="!py-10 px-8" />
              <SectionShell container={false} tone="stone" eyebrow="Stone" heading="The deepest recess." intro="The quietest band. It never carries the neon flare." className="!py-10 px-8" />
              <SectionShell container={false} tone="river" eyebrow="River" heading="The dark inversion moment." accent="inversion" intro="Bone text — proof bands, closing CTAs, the footer." className="!py-10 px-8" />
            </div>
          </section>

          <section>
            <GroupMarker>EditorialHeading · Button · ArrowLink</GroupMarker>
            <div className="mt-10 space-y-10">
              <EditorialHeading size="lg" accent="owned.">
                Rented runs dry. Owned has a current — so build owned.
              </EditorialHeading>
              <div className="space-y-6">
                <p className="font-mono text-xs uppercase tracking-[0.13em] text-ink/70">
                  Filled buttons — real form controls only, at most one per view
                </p>
                <div className="flex flex-wrap items-center gap-5">
                  <Button href="/styleguide" variant="primary">Begin your project</Button>
                  <Button href="/styleguide" variant="ghost">Secondary control</Button>
                  <Button href="/styleguide" variant="primary" size="lg">Accept proposal</Button>
                </div>
                <p className="font-mono text-xs uppercase tracking-[0.13em] text-ink/70">
                  ArrowLink — every other action is typography, not a box
                </p>
                <div className="flex flex-wrap items-center gap-10">
                  <ArrowLink href="/styleguide" glyph="→">Continues here</ArrowLink>
                  <ArrowLink href="/styleguide" glyph="↗">Leaves the page</ArrowLink>
                  <ArrowLink href="/styleguide" glyph="↓">Scrolls down</ArrowLink>
                </div>
                <div className="flex flex-wrap items-center gap-10 bg-river p-8">
                  <Button href="/styleguide" variant="onRiver">On river</Button>
                  <ArrowLink href="/styleguide" glyph="→" tone="onRiver">ArrowLink on river</ArrowLink>
                </div>
              </div>
            </div>
          </section>

          <section>
            <GroupMarker>Field — form primitive (inset = field, a step down)</GroupMarker>
            <div className="mt-10 grid max-w-2xl gap-6 sm:grid-cols-2">
              <Field label="Your name" name="sg-name" required autoComplete="off" />
              <Field
                label="Email"
                name="sg-email"
                type="email"
                required
                autoComplete="off"
                error="Enter a valid email address."
              />
              <Field label="Website" name="sg-link" hint="Or your Instagram handle." />
              <Field as="select" label="Industry" name="sg-industry" options={["Beauty", "Med-spa", "Wellness"]} />
              <Field
                as="radio"
                label="What are you after?"
                name="sg-after"
                className="sm:col-span-2"
                options={[
                  { label: "Brand identity", value: "brand" },
                  { label: "Website", value: "website" },
                  { label: "Both", value: "both" },
                ]}
              />
              <Field
                as="textarea"
                label="The vision"
                name="sg-vision"
                rows={4}
                placeholder="A sentence or two…"
                className="sm:col-span-2"
              />
            </div>
          </section>

          <section>
            <GroupMarker>Rule · Eyebrow</GroupMarker>
            <div className="mt-10 space-y-8">
              <Rule width="short" />
              <Rule />
              <div className="flex flex-wrap items-center gap-10">
                <Eyebrow>Muted on paper — ink/70</Eyebrow>
                <Eyebrow tone="flare">Flare-deep, when nothing else flares</Eyebrow>
                <span className="bg-river px-4 py-2"><Eyebrow tone="onDark">On river</Eyebrow></span>
              </div>
            </div>
          </section>

          <section>
            <GroupMarker>ImageFrame · Testimonial</GroupMarker>
            <div className="mt-10 grid gap-x-gutter gap-y-10 md:grid-cols-2">
              <ImageFrame ratio="4/5" alt="Placeholder" caption="4 / 5" />
              <Testimonial quote="She built us something that finally feels as considered as the work we do." name="Founder" role="Glowtoure" />
            </div>
          </section>

          <section>
            <GroupMarker>ServiceCard</GroupMarker>
            <div className="mt-10 grid gap-x-gutter gap-y-10 md:grid-cols-3">
              <ServiceCard name="The Edit" price="$4,500" duration="2–3 weeks" description="Go to market looking established." />
              <ServiceCard name="Signature" price="$9,800" duration="6–8 weeks" featured description="The flagship. Most brands start here." />
              <ServiceCard name="Atelier" price="$22,000+" duration="8–12 weeks" description="When the site is the flagship location." />
            </div>
          </section>

          <section>
            <GroupMarker>ProjectCard</GroupMarker>
            <div className="mt-10 grid items-end gap-x-gutter gap-y-10 md:grid-cols-[1.4fr_1fr]">
              <ProjectCard size="feature" client="Glowtoure" tag="Luxury spray tan" descriptor="A luxury tan, given a luxury home." href="/styleguide" />
              <ProjectCard size="side" client="Coming soon" tag="Case study" descriptor="More, soon." href="/styleguide" />
            </div>
          </section>

          <section>
            <GroupMarker>FAQAccordion</GroupMarker>
            <div className="mt-10 max-w-editorial">
              <FAQAccordion
                items={[
                  { question: "How long does a project take?", answer: "The Edit 2–3 weeks, Signature 6–8, Atelier 8–12." },
                  { question: "What do I own?", answer: "Everything — the code, the design system, the deployment. No lock-in." },
                ]}
              />
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
