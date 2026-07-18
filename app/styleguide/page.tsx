import Logo from "@/components/Logo";
import Button from "@/components/Button";
import EditorialHeading from "@/components/EditorialHeading";
import Eyebrow from "@/components/Eyebrow";
import FAQAccordion from "@/components/FAQAccordion";
import ImageFrame from "@/components/ImageFrame";
import ProjectCard from "@/components/ProjectCard";
import Rule from "@/components/Rule";
import SectionShell from "@/components/SectionShell";
import ServiceCard from "@/components/ServiceCard";
import Testimonial from "@/components/Testimonial";

type Token = { name: string; hex: string; swatch: string; note?: string };

const groups: { label: string; tokens: Token[] }[] = [
  {
    label: "The inversion pair",
    tokens: [
      { name: "bone", hex: "#EBE5D8", swatch: "bg-bone", note: "primary canvas (warm ivory paper); ink-color on charcoal" },
      { name: "ink", hex: "#23201B", swatch: "bg-ink", note: "warm faded charcoal — primary ink; bg for charcoal sections" },
    ],
  },
  {
    label: "Paper elevation",
    tokens: [
      { name: "stone", hex: "#E0D8C7", swatch: "bg-stone", note: "deeper paper — raised panels, subtle alt-section rhythm" },
    ],
  },
  {
    label: "Warm accents (used barely)",
    tokens: [
      { name: "camel", hex: "#C6A98A", swatch: "bg-camel", note: "champagne accent — the section rule; never small text/price on bone" },
      { name: "mocha", hex: "#9A8264", swatch: "bg-mocha", note: "deep warm neutral — imagery / atmosphere only" },
    ],
  },
];

type TypeSpec = { label: string; cls: string; meta: string; sample: string };

// Display — UPPERCASE Neue Montreal Extrabold (font-display), fluid scale.
const displayScale: TypeSpec[] = [
  { label: "fluid-hero — home headline", cls: "text-fluid-hero", meta: "clamp → up to 12rem", sample: "Websites felt" },
  { label: "fluid-display — page title", cls: "text-fluid-display", meta: "clamp → up to 8.5rem", sample: "Proof before promises" },
  { label: "fluid-3xl — section title", cls: "text-fluid-3xl", meta: "clamp → up to 5.5rem", sample: "Rented is over" },
  { label: "fluid-2xl — subsection", cls: "text-fluid-2xl", meta: "clamp → up to 3.6rem", sample: "Boutique scale" },
];

// Serif italic — Editorial New (font-editorial), the supporting voice.
const serifScale: TypeSpec[] = [
  { label: "Lede / subline", cls: "text-fluid-lg", sample: "For founder-led beauty, wellness, med-spa, and luxury brands.", meta: "Editorial New Italic" },
  { label: "Pull quote", cls: "text-fluid-xl", sample: "Something you own, not something you rent.", meta: "Editorial New Italic" },
];

function GroupMarker({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-baseline gap-4">
      <span aria-hidden className="h-px w-10 bg-camel" />
      <h2 className="font-sans text-xs font-medium uppercase tracking-[0.25em] text-ink/60">{children}</h2>
    </div>
  );
}

export default function StyleguidePage() {
  return (
    <main className="min-h-screen bg-bone text-ink">
      <div className="container py-section-lg">
        <header className="max-w-measure">
          <p className="font-sans text-xs font-medium uppercase tracking-[0.25em] text-ink/60">
            Krystal Brook Coterie
          </p>
          <h1 className="mt-4 font-display text-5xl font-extrabold uppercase tracking-[-0.01em] md:text-6xl">
            KBC System
          </h1>
          <p className="mt-6 max-w-measure font-editorial text-fluid-base italic text-ink/75">
            Bone-led warm-neutral palette, monumental uppercase sans over serif italic, a
            single champagne-camel accent, and a mix-blend inversion-dot cursor — pinned in{" "}
            <code className="not-italic text-ink">tailwind.config.ts</code>.
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
                      <span className="font-mono text-sm uppercase text-ink/60">{token.hex}</span>
                    </div>
                    {token.note ? (
                      <p className="mt-2 max-w-measure font-sans text-sm text-ink/65">{token.note}</p>
                    ) : null}
                  </li>
                ))}
              </ul>
            </section>
          ))}
          <p className="max-w-measure font-sans text-sm text-ink/65">
            Muted text is ink/65 on bone, bone/60 on charcoal. Hairlines are ink/12–15 (light)
            / bone/15–20 (charcoal). Camel never sets small text or prices on bone (fails AA) —
            prices are ink. Charcoal (ink bg) is punctuation: footer, closing CTAs, work overlay.
          </p>
        </div>

        {/* Logo */}
        <div className="mt-38">
          <section>
            <GroupMarker>Logo — lockups</GroupMarker>
            <div className="mt-12 grid gap-px overflow-hidden rounded-sm ring-1 ring-ink/15 sm:grid-cols-2">
              <div className="bg-ink p-10 sm:p-14">
                <p className="mb-12 font-mono text-xs uppercase tracking-[0.25em] text-bone/60">On charcoal · bone</p>
                <div className="flex flex-col gap-14">
                  <Logo variant="stacked" color="bone" />
                  <Logo variant="horizontal" color="bone" />
                  <Logo variant="monogram" color="bone" />
                </div>
              </div>
              <div className="bg-stone p-10 sm:p-14">
                <p className="mb-12 font-mono text-xs uppercase tracking-[0.25em] text-ink/60">On paper · ink</p>
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
            <GroupMarker>Display — Neue Montreal Extrabold, UPPERCASE</GroupMarker>
            <ul className="mt-12 space-y-14">
              {displayScale.map((t) => (
                <li key={t.label} className="grid gap-4 lg:grid-cols-[16rem_1fr] lg:gap-x-gutter">
                  <div className="pt-2">
                    <p className="font-sans text-sm text-ink">{t.label}</p>
                    <p className="mt-1 font-mono text-xs uppercase tracking-wide text-ink/60">{t.meta}</p>
                  </div>
                  <p className={`font-display font-extrabold uppercase tracking-[-0.01em] text-ink ${t.cls}`}>
                    {t.sample}
                  </p>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <GroupMarker>Voice — Editorial New Italic</GroupMarker>
            <ul className="mt-12 space-y-12">
              {serifScale.map((t) => (
                <li key={t.label} className="grid gap-4 lg:grid-cols-[16rem_1fr] lg:gap-x-gutter">
                  <div className="pt-1">
                    <p className="font-sans text-sm text-ink">{t.label}</p>
                    <p className="mt-1 font-mono text-xs uppercase tracking-wide text-ink/60">{t.meta}</p>
                  </div>
                  <p className={`max-w-measure font-editorial italic text-ink/80 ${t.cls}`}>{t.sample}</p>
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* Motion */}
        <div className="mt-38">
          <section>
            <GroupMarker>Motion — one language</GroupMarker>
            <ul className="mt-10 grid gap-6 font-mono text-sm text-ink/65 sm:grid-cols-2">
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
            <GroupMarker>SectionShell tones</GroupMarker>
            <div className="mt-8 space-y-px overflow-hidden rounded-sm ring-1 ring-ink/15">
              <SectionShell container={false} eyebrow="Light" heading="Bone, the default canvas" intro="Ink text, muted eyebrow." className="!py-10 px-8" />
              <SectionShell container={false} tone="stone" eyebrow="Stone" heading="A quiet alt-section" intro="Deeper paper for rhythm." className="!py-10 px-8" />
              <SectionShell container={false} tone="charcoal" eyebrow="Charcoal" heading="The dark inversion moment" intro="Bone text — footer and closing CTAs." className="!py-10 px-8" />
            </div>
          </section>

          <section>
            <GroupMarker>EditorialHeading + Button</GroupMarker>
            <div className="mt-10 space-y-8">
              <EditorialHeading size="lg">Your competitors&rsquo; sites are rented</EditorialHeading>
              <div className="flex flex-wrap items-center gap-5">
                <Button href="/styleguide" variant="primary">Begin your project</Button>
                <Button href="/styleguide" variant="ghost">See the work</Button>
              </div>
            </div>
          </section>

          <section>
            <GroupMarker>Rule · Eyebrow</GroupMarker>
            <div className="mt-10 space-y-8">
              <Rule width="short" />
              <div className="flex flex-wrap gap-10">
                <Eyebrow>Muted on bone</Eyebrow>
                <span className="bg-ink px-4 py-2"><Eyebrow tone="onDark">On charcoal</Eyebrow></span>
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
              <ServiceCard name="Launch" price="$4,500" duration="2–3 weeks" description="Go to market looking established." />
              <ServiceCard name="Signature" price="$9,800" duration="6–8 weeks" featured description="The flagship. Most brands start here." />
              <ServiceCard name="Atelier" price="$22,000+" duration="8–12 weeks" description="When the site is the flagship location." />
            </div>
          </section>

          <section>
            <GroupMarker>ProjectCard</GroupMarker>
            <div className="mt-10 grid items-end gap-x-gutter gap-y-10 md:grid-cols-[1.4fr_1fr]">
              <ProjectCard size="feature" client="Glowtoure" tag="Luxury spray tan" descriptor="A luxury tan, given a luxury home" href="/styleguide" />
              <ProjectCard size="side" client="Coming soon" tag="Case study" descriptor="More, soon" href="/styleguide" />
            </div>
          </section>

          <section>
            <GroupMarker>FAQAccordion</GroupMarker>
            <div className="mt-10 max-w-editorial">
              <FAQAccordion
                items={[
                  { question: "How long does a project take?", answer: "Launch 2–3 weeks, Signature 6–8, Atelier 8–12." },
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
