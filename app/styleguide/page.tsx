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

type Token = {
  name: string;
  hex: string;
  swatch: string; // token-driven Tailwind bg class — proves the token resolves
  note?: string;
};

const groups: { label: string; tokens: Token[] }[] = [
  {
    label: "Canvas",
    tokens: [
      { name: "rich-black", hex: "#0A0A0A", swatch: "bg-rich-black", note: "primary canvas / ink on light" },
      { name: "deep-petrol", hex: "#052029", swatch: "bg-deep-petrol", note: "FOOTER ONLY — never a section background elsewhere" },
    ],
  },
  {
    label: "Text",
    tokens: [
      { name: "cream", hex: "#EFEEE8", swatch: "bg-cream", note: "light text on dark / light surfaces" },
      { name: "greige", hex: "#B2ABA0", swatch: "bg-greige", note: "muted text; eyebrow on petrol (AA)" },
    ],
  },
  {
    label: "Accents",
    tokens: [
      { name: "mocha", hex: "#9E8062", swatch: "bg-mocha", note: "warm neutral accent" },
      { name: "terracotta", hex: "#BF6940", swatch: "bg-terracotta", note: "primary warm accent; the custom cursor dot" },
      { name: "teal", hex: "#287B8B", swatch: "bg-teal", note: "structural accent — rules, dividers, markers" },
    ],
  },
];

type TypeSpec = {
  label: string; // use / role
  cls: string; // size + weight classes
  meta: string; // spec, e.g. "72px · Heavy"
  sample: string;
};

// Display — PP Editorial New (font-display)
const displayScale: TypeSpec[] = [
  { label: "Display XL — hero headline", cls: "text-6xl md:text-7xl font-normal tracking-tight", meta: "72px · Regular", sample: "Editorial systems for owned brands" },
  { label: "Display L — section title", cls: "text-5xl font-normal tracking-tight", meta: "48px · Regular", sample: "Rented is over" },
  { label: "Display M — subsection", cls: "text-4xl font-light tracking-tight", meta: "36px · Light", sample: "Founder-led, boutique scale" },
  { label: "Display S — feature / card title", cls: "text-2xl font-normal", meta: "24px · Regular", sample: "Precise by default" },
];

// Body / UI — PP Pangram Sans (font-sans)
const bodyScale: TypeSpec[] = [
  { label: "Lead — intro paragraph", cls: "text-xl font-light leading-relaxed", meta: "20px · Light", sample: "Senior judgment at boutique scale — not a template you rent." },
  { label: "Body — default paragraph", cls: "text-base font-normal leading-relaxed", meta: "16px · Regular", sample: "Editorial luxury web design for founder-led beauty, wellness, and bridal brands." },
  { label: "Body strong — emphasis", cls: "text-base font-semibold leading-relaxed", meta: "16px · Semibold", sample: "Editorial. Owned. Precise." },
  { label: "Small — captions / meta", cls: "text-sm font-normal", meta: "14px · Regular", sample: "Case study — GlowToure, 2026" },
  { label: "Eyebrow / UI label", cls: "text-xs font-medium uppercase tracking-[0.25em]", meta: "12px · Medium · tracked", sample: "Krystal Brook Coterie" },
];

function GroupMarker({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-baseline gap-4">
      {/* teal is structural: the group marker rule */}
      <span aria-hidden className="h-px w-10 bg-teal" />
      <h2 className="font-sans text-xs font-medium uppercase tracking-[0.25em] text-greige">
        {children}
      </h2>
    </div>
  );
}

export default function StyleguidePage() {
  return (
    <main className="min-h-screen bg-rich-black text-cream">
      <div className="container py-section-lg">
        <header className="max-w-measure">
          <p className="font-sans text-xs font-medium uppercase tracking-[0.25em] text-greige">
            Krystal Brook Coterie
          </p>
          <h1 className="mt-4 font-display text-5xl tracking-tight md:text-6xl">
            KBC System
          </h1>
          <p className="mt-6 font-sans text-greige">
            Seven tokens, dark-led canvas, local type. Every value pinned in{" "}
            <code className="text-cream">tailwind.config.ts</code>.
          </p>
        </header>

        {/* ── Color ────────────────────────────────────────────── */}
        <div className="mt-section space-y-26">
          {groups.map((group) => (
            <section key={group.label}>
              <GroupMarker>{group.label}</GroupMarker>
              <ul className="mt-10 grid grid-cols-1 gap-x-gutter gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
                {group.tokens.map((token) => (
                  <li key={token.name}>
                    <div className={`${token.swatch} aspect-[4/3] w-full rounded-sm ring-1 ring-inset ring-greige/25`} />
                    <div className="mt-4 flex items-baseline justify-between gap-4">
                      <span className="font-mono text-sm text-cream">{token.name}</span>
                      <span className="font-mono text-sm uppercase text-greige">{token.hex}</span>
                    </div>
                    {token.note ? (
                      <p className="mt-2 max-w-measure font-sans text-sm text-greige">{token.note}</p>
                    ) : null}
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        {/* ── Logo ─────────────────────────────────────────────── */}
        <div className="mt-38">
          <section>
            <GroupMarker>Logo — lockups</GroupMarker>
            <div className="mt-12 grid gap-px overflow-hidden rounded-sm ring-1 ring-greige/15 sm:grid-cols-2">
              {/* On dark → cream */}
              <div className="bg-rich-black p-10 sm:p-14">
                <p className="mb-12 font-mono text-xs uppercase tracking-[0.25em] text-greige">
                  On dark · cream
                </p>
                <div className="flex flex-col gap-14">
                  <div>
                    <Logo variant="stacked" color="cream" />
                    <p className="mt-5 font-sans text-xs text-greige">stacked · primary</p>
                  </div>
                  <div>
                    <Logo variant="horizontal" color="cream" />
                    <p className="mt-5 font-sans text-xs text-greige">horizontal · inline</p>
                  </div>
                  <div>
                    <Logo variant="monogram" color="cream" />
                    <p className="mt-5 font-sans text-xs text-greige">monogram</p>
                  </div>
                </div>
              </div>
              {/* On light → rich-black */}
              <div className="bg-cream p-10 sm:p-14">
                <p className="mb-12 font-mono text-xs uppercase tracking-[0.25em] text-mocha">
                  On light · rich-black
                </p>
                <div className="flex flex-col gap-14">
                  <div>
                    <Logo variant="stacked" color="rich-black" />
                    <p className="mt-5 font-sans text-xs text-mocha">stacked · primary</p>
                  </div>
                  <div>
                    <Logo variant="horizontal" color="rich-black" />
                    <p className="mt-5 font-sans text-xs text-mocha">horizontal · inline</p>
                  </div>
                  <div>
                    <Logo variant="monogram" color="rich-black" />
                    <p className="mt-5 font-sans text-xs text-mocha">monogram</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* ── Typography ───────────────────────────────────────── */}
        <div className="mt-38 space-y-26">
          <section>
            <GroupMarker>Display — PP Editorial New</GroupMarker>
            <ul className="mt-12 space-y-14">
              {displayScale.map((t) => (
                <li key={t.label} className="grid gap-4 lg:grid-cols-[16rem_1fr] lg:gap-x-gutter">
                  <div className="pt-2">
                    <p className="font-sans text-sm text-cream">{t.label}</p>
                    <p className="mt-1 font-mono text-xs uppercase tracking-wide text-greige">{t.meta}</p>
                  </div>
                  <p className={`font-display text-cream ${t.cls}`}>{t.sample}</p>
                </li>
              ))}

              {/* Italic accent word inside a heading */}
              <li className="grid gap-4 lg:grid-cols-[16rem_1fr] lg:gap-x-gutter">
                <div className="pt-2">
                  <p className="font-sans text-sm text-cream">Display — italic accent word</p>
                  <p className="mt-1 font-mono text-xs uppercase tracking-wide text-greige">48px · Regular + Italic</p>
                </div>
                <p className="font-display text-5xl tracking-tight text-cream">
                  Design that&rsquo;s <em className="italic">owned</em>, never rented
                </p>
              </li>
            </ul>
          </section>

          <section>
            <GroupMarker>Body / UI — PP Pangram Sans</GroupMarker>
            <ul className="mt-12 space-y-12">
              {bodyScale.map((t) => (
                <li key={t.label} className="grid gap-4 lg:grid-cols-[16rem_1fr] lg:gap-x-gutter">
                  <div className="pt-1">
                    <p className="font-sans text-sm text-cream">{t.label}</p>
                    <p className="mt-1 font-mono text-xs uppercase tracking-wide text-greige">{t.meta}</p>
                  </div>
                  <p className={`max-w-measure font-sans text-cream ${t.cls}`}>{t.sample}</p>
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* ── Interactive (cursor hover test) ──────────────────── */}
        <div className="mt-38">
          <section>
            <GroupMarker>Interactive — cursor hover test</GroupMarker>
            <p className="mt-6 max-w-measure font-sans text-sm text-greige">
              Move a mouse over the controls below: the terracotta dot tracks the pointer,
              the teal ring lags and expands over anything interactive. Tab through to confirm
              native focus rings and keyboard behavior are untouched.
            </p>

            <div className="mt-12 grid gap-14 lg:grid-cols-[16rem_1fr] lg:gap-x-gutter">
              <p className="font-sans text-sm text-cream">Buttons</p>
              <div className="flex flex-wrap items-center gap-5">
                <button
                  type="button"
                  className="rounded-sm bg-terracotta px-7 py-3.5 font-sans text-xs font-medium uppercase tracking-[0.14em] text-cream transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal"
                >
                  Begin your project
                </button>
                <button
                  type="button"
                  className="rounded-sm border border-greige px-7 py-3.5 font-sans text-xs font-medium uppercase tracking-[0.14em] text-cream transition-colors hover:border-cream focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal"
                >
                  See the work
                </button>
              </div>
            </div>

            <div className="mt-14 grid gap-14 lg:grid-cols-[16rem_1fr] lg:gap-x-gutter">
              <p className="font-sans text-sm text-cream">Links</p>
              <div className="flex flex-col gap-4">
                <p className="max-w-measure font-sans text-base text-cream">
                  Read the{" "}
                  <a
                    href="/styleguide"
                    className="text-cream underline decoration-teal decoration-1 underline-offset-4 transition-colors hover:decoration-terracotta focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal"
                  >
                    GlowToure case study
                  </a>{" "}
                  or explore the{" "}
                  <a
                    href="/styleguide"
                    className="text-cream underline decoration-teal decoration-1 underline-offset-4 transition-colors hover:decoration-terracotta focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal"
                  >
                    full services
                  </a>
                  .
                </p>
                <nav className="flex flex-wrap gap-x-8 gap-y-2 font-sans text-xs uppercase tracking-[0.14em] text-greige">
                  {["Work", "Services", "Process", "About", "Journal"].map((item) => (
                    <a
                      key={item}
                      href="/styleguide"
                      className="transition-colors hover:text-cream focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal"
                    >
                      {item}
                    </a>
                  ))}
                </nav>
              </div>
            </div>
          </section>
        </div>

        {/* ── Component library ────────────────────────────────── */}
        <div className="mt-38 space-y-26">
          {/* SectionShell */}
          <section>
            <GroupMarker>SectionShell</GroupMarker>
            <div className="mt-8 rounded-sm ring-1 ring-greige/15">
              <SectionShell
                container={false}
                marker
                eyebrow="The studio"
                heading="Senior judgment on everything"
                accent="everything"
                accentColor="terracotta"
                intro="Vertical rhythm, a teal marker rule, a greige eyebrow, a display heading with an italic accent, and an intro — assembled left-aligned, every part optional."
                className="!py-14 px-8"
              >
                <p className="max-w-measure font-sans text-sm text-greige">
                  Children render below the header block with editorial spacing.
                </p>
              </SectionShell>
            </div>
          </section>

          {/* EditorialHeading */}
          <section>
            <GroupMarker>EditorialHeading</GroupMarker>
            <div className="mt-10 space-y-8">
              <EditorialHeading size="xl" accent="felt">
                Websites that are felt before they&rsquo;re read
              </EditorialHeading>
              <EditorialHeading size="lg" accent="owned" accentColor="terracotta">
                Your competitors&rsquo; sites are rented. Yours will be owned
              </EditorialHeading>
              <EditorialHeading size="md">Selected work</EditorialHeading>
            </div>
          </section>

          {/* Button */}
          <section>
            <GroupMarker>Button</GroupMarker>
            <div className="mt-10 flex flex-wrap items-center gap-5">
              <Button href="/styleguide" variant="primary">
                Begin your project
              </Button>
              <Button href="/styleguide" variant="ghost">
                See the work
              </Button>
              <Button variant="primary">Submit (button)</Button>
            </div>
          </section>

          {/* Rule */}
          <section>
            <GroupMarker>Rule</GroupMarker>
            <div className="mt-10 space-y-8">
              <div>
                <p className="mb-3 font-sans text-xs text-greige">short · section marker</p>
                <Rule width="short" />
              </div>
              <div>
                <p className="mb-3 font-sans text-xs text-greige">full · divider</p>
                <Rule width="full" />
              </div>
            </div>
          </section>

          {/* Eyebrow */}
          <section>
            <GroupMarker>Eyebrow</GroupMarker>
            <div className="mt-10 grid gap-8 sm:grid-cols-3">
              <div>
                <Eyebrow>Founder-led beauty</Eyebrow>
                <p className="mt-3 font-sans text-xs text-greige">default · greige</p>
              </div>
              <div>
                <Eyebrow tone="terracotta">On rich-black</Eyebrow>
                <p className="mt-3 font-sans text-xs text-greige">tone=&quot;terracotta&quot; (5.01:1)</p>
              </div>
              <div className="rounded-sm bg-deep-petrol p-6">
                <Eyebrow tone="terracotta" onPetrol>
                  On petrol
                </Eyebrow>
                <p className="mt-3 font-sans text-xs text-greige">
                  onPetrol forces greige (terracotta would be 4.26:1)
                </p>
              </div>
            </div>
          </section>

          {/* ImageFrame */}
          <section>
            <GroupMarker>ImageFrame</GroupMarker>
            <div className="mt-10 grid gap-x-gutter gap-y-8 sm:grid-cols-3">
              <ImageFrame ratio="4/5" alt="Brand imagery placeholder" caption="4 / 5" />
              <ImageFrame ratio="16/11" alt="Brand imagery placeholder" caption="16 / 11" />
              <ImageFrame ratio="3/4" alt="Brand imagery placeholder" caption="3 / 4 · offset" offset="down" />
            </div>
          </section>

          {/* Testimonial */}
          <section>
            <GroupMarker>Testimonial</GroupMarker>
            <div className="mt-10">
              <Testimonial
                quote="She built us something that finally feels as considered as the work we do."
                name="Founder"
                role="GlowToure"
              />
            </div>
          </section>

          {/* ServiceCard */}
          <section>
            <GroupMarker>ServiceCard</GroupMarker>
            <div className="mt-10 grid gap-x-gutter gap-y-10 md:grid-cols-3">
              <ServiceCard
                name="Launch"
                price="$4,500"
                duration="3–4 weeks"
                description="For the founder going to market who needs to look established from day one. Up to 3 pages, one confident design, custom-coded."
                href="/styleguide"
              />
              <ServiceCard
                name="Signature"
                price="$9,800"
                duration="6–8 weeks"
                featured
                description="The flagship. For the established brand whose website has fallen behind. Up to 6 pages, full strategy, CMS, editorial motion."
                href="/styleguide"
              />
              <ServiceCard
                name="Atelier"
                price="$22,000+"
                duration="10–14 weeks"
                description="For the brand where the website is the flagship location. Up to 12 pages, per-treatment pages, copywriting, art direction."
                href="/styleguide"
              />
            </div>
          </section>

          {/* ProjectCard */}
          <section>
            <GroupMarker>ProjectCard</GroupMarker>
            <div className="mt-10 grid items-end gap-x-gutter gap-y-10 md:grid-cols-[1.4fr_1fr]">
              <ProjectCard
                size="feature"
                client="GlowToure"
                tag="Luxury spray tan"
                descriptor="A luxury tan, given a luxury home"
                href="/styleguide"
              />
              <ProjectCard
                size="side"
                client="Coming soon"
                tag="Case study"
                descriptor="More, soon"
                href="/styleguide"
              />
            </div>
          </section>

          {/* FAQAccordion */}
          <section>
            <GroupMarker>FAQAccordion</GroupMarker>
            <div className="mt-10 max-w-editorial">
              <FAQAccordion
                items={[
                  {
                    question: "How long does a project take?",
                    answer:
                      "Launch runs 3–4 weeks, Signature 6–8, Atelier 10–14. Timelines are held from the day assets and content are in hand.",
                  },
                  {
                    question: "Do you work with established brands only?",
                    answer:
                      "Both — established brands whose site has fallen behind, and founders going to market who need to look established from day one.",
                  },
                  {
                    question: "What do you build on?",
                    answer:
                      "Hand-coded Next.js and Tailwind, deployed on Vercel — no page builders, no Squarespace, no Showit.",
                  },
                ]}
              />
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
