import Logo from "@/components/Logo";

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
      </div>
    </main>
  );
}
