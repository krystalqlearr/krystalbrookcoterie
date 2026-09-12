import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import ArrowLink from "@/components/ArrowLink";
import Button from "@/components/Button";
import Reveal, { RevealItem } from "@/components/motion/Reveal";
import ClosingCTA from "@/components/ClosingCTA";
import PhoneRow from "@/components/PhoneRow";
import SectionShell from "@/components/SectionShell";
import Testimonial from "@/components/Testimonial";
import { TRAVEL } from "@/lib/motion";
import { WORK, caseStudySlugs, getProject } from "@/lib/work";

const SITE_URL = "https://krystalbrookcoterie.com";

export function generateStaticParams() {
  return caseStudySlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const p = getProject(params.slug);
  if (!p || !p.caseStudy) return {};
  const description = p.seoDescription ?? p.intro;
  return {
    title: `${p.client} — ${p.descriptor}`,
    description,
    alternates: { canonical: `/work/${p.id}` },
    openGraph: {
      title: `${p.client} — Krystal Brook Coterie`,
      description,
      url: `${SITE_URL}/work/${p.id}`,
      images: p.image ? [{ url: p.image, width: 1200, height: 630 }] : undefined,
    },
  };
}

/** Renders a heading with a single italic accent word (first match) — same color, quiet. */
function accented(text: string, accent: string) {
  const at = text.toLowerCase().indexOf(accent.toLowerCase());
  if (at === -1) return text;
  return (
    <>
      {text.slice(0, at)}
      <em className="italic">{text.slice(at, at + accent.length)}</em>
      {text.slice(at + accent.length)}
    </>
  );
}

export default function CaseStudyPage({ params }: { params: { slug: string } }) {
  const p = getProject(params.slug);
  if (!p || !p.caseStudy) notFound();

  // Next published case study (if any), for the closing hand-off.
  const nextCase = WORK.find((w) => w.caseStudy && w.id !== p.id);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: `${p.client} — ${p.descriptor}`,
    headline: p.descriptor,
    about: p.category,
    url: `${SITE_URL}/work/${p.id}`,
    dateCreated: p.year,
    image: p.image ? `${SITE_URL}${p.image}` : undefined,
    creator: {
      "@type": "Organization",
      name: "Krystal Brook Coterie",
      url: SITE_URL,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Header */}
      <section className="pb-10 pt-32 md:pt-40">
        <div className="container">
          <Reveal stagger={0.1}>
            <RevealItem variant="soft">
              <Link
                href="/work"
                className="type-meta -my-2 inline-block py-2 text-ink/70 transition-colors hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
              >
                ← All work
              </Link>
            </RevealItem>
            <RevealItem variant="soft">
              <p className="mt-8 type-meta text-ink/70">{p.category}</p>
            </RevealItem>
            <RevealItem variant="soft">
              <h1 className="type-display mt-7 max-w-[20ch] text-fluid-display text-ink">
                {accented(p.descriptor, p.accent)}
              </h1>
            </RevealItem>
          </Reveal>
        </div>
      </section>

      {/* Hero — the real site inside a browser frame. Full-width, so it rises. */}
      <section className="pb-section">
        <div className="container">
          <Reveal from="up" distance={TRAVEL.frame}>
            <figure className="overflow-hidden border border-ink/15 bg-onyx">
              <div className="flex items-center gap-3 border-b border-milk/10 px-4 py-2.5">
                <span className="flex gap-1.5" aria-hidden>
                  <span className="h-2 w-2 rounded-full bg-milk/25" />
                  <span className="h-2 w-2 rounded-full bg-milk/25" />
                  <span className="h-2 w-2 rounded-full bg-milk/25" />
                </span>
                <span className="truncate rounded-sm bg-milk/5 px-3 py-1 font-sans text-[0.65rem] tracking-[0.06em] text-milk/60">
                  {p.url}
                </span>
              </div>
              {/* The site, not the logo card: `image` is the OG asset (a wordmark on a
                  field), while the video poster is the actual homepage — which is what
                  every other frame of this project shows (audit 2026-09-09, finding 8). */}
              <div className="relative aspect-[16/9] w-full">
                {p.video?.poster ?? p.image ? (
                  <Image
                    src={p.video?.poster ?? p.image!}
                    alt={`${p.client} — ${p.descriptor}`}
                    fill
                    priority
                    sizes="(min-width: 1024px) 80vw, 100vw"
                    className="object-cover"
                  />
                ) : (
                  <div aria-hidden className={`absolute inset-0 bg-gradient-to-br ${p.field}`} />
                )}
              </div>
            </figure>
          </Reveal>
        </div>
      </section>

      {/* Overview + meta */}
      <SectionShell as="section" className="pt-0">
        <div className="grid gap-x-gutter gap-y-12 lg:grid-cols-[1.4fr_0.6fr]">
          <Reveal variant="fade">
            <p className="type-display max-w-measure text-fluid-xl text-ink">
              {p.intro}
            </p>
            <div className="mt-10 max-w-measure space-y-5 font-sans text-fluid-base leading-relaxed text-ink/70">
              {p.body.map((para, i) => (
                <p key={i} className={i === 0 ? "dropcap" : undefined}>
                  {para}
                </p>
              ))}
            </div>
          </Reveal>

          {/* The meta column hangs off the right edge, so it slides in from the right. */}
          <Reveal from="right" distance={TRAVEL.aside} delay={0.1}>
            <dl className="space-y-6 lg:border-l lg:border-ink/12 lg:pl-10">
              {[
                ["Client", p.client],
                ["Role", p.role],
                ["Year", p.year],
                ["Stack", p.stack],
              ].map(([label, value]) => (
                <div key={label} className="border-t border-ink/12 pt-3 first:border-t-0 first:pt-0">
                  <dt className="type-meta text-ink/70">{label}</dt>
                  <dd className="mt-1 font-sans text-fluid-base text-ink">{value}</dd>
                </div>
              ))}

              {/* The deliverable as a FACT, beside Client / Role / Year — visible
                  without scrolling to Scope, where the same document gets its
                  invitation. A plain underlined link, not an ArrowLink: this is a
                  value in a definition list, and a second arrow CTA in the meta
                  column would be the duplicate-vocabulary problem the audit
                  removed from the work frames (finding 6). */}
              {p.deliverable ? (
                <div className="border-t border-ink/12 pt-3">
                  <dt className="type-meta text-ink/70">Deliverable</dt>
                  <dd className="mt-1">
                    <Link
                      href={p.deliverable.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      prefetch={false}
                      className="font-sans text-fluid-base text-ink underline decoration-ink/25 underline-offset-4 transition-colors hover:decoration-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
                    >
                      {p.deliverable.short}
                    </Link>
                  </dd>
                </div>
              ) : null}
            </dl>
          </Reveal>
        </div>
      </SectionShell>

      {/* The site on a phone — the page's one mid-scroll dark moment, and the
          mobile counterpart to the desktop frame at the top. The claim is one the
          clips themselves prove, so it needs no figure behind it. Rendered only
          for a project that has the recordings. */}
      {p.phones && p.phones.length > 0 ? (
        <SectionShell
          tone="dark"
          eyebrow="On the phone"
          heading="Nothing lost on the small screen."
          accent="Nothing"
          headingSize="md"
        >
          <Reveal from="up" distance={TRAVEL.media}>
            <PhoneRow phones={p.phones} />
          </Reveal>
        </SectionShell>
      ) : null}

      {/* Results — first-recess alt-section */}
      {p.results && p.results.length > 0 ? (
        <SectionShell tone="rule" eyebrow="Results" heading="Engineered to perform." headingSize="md">
          {/* Each figure is its own staggered item — a stagger container with plain
              children animates nothing. */}
          <Reveal stagger={0.08}>
            <dl className="grid gap-x-gutter gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
              {p.results.map((r) => (
                <RevealItem key={r.label} variant="fade" className="border-t border-ink/20 pt-5">
                  <dt className="type-meta text-ink/70">{r.label}</dt>
                  <dd className="type-display mt-3 text-fluid-xl text-ink">{r.value}</dd>
                </RevealItem>
              ))}
            </dl>
          </Reveal>
        </SectionShell>
      ) : null}

      {/* Scope */}
      <SectionShell eyebrow="Scope" heading="What the engagement covered." headingSize="md">
        <Reveal variant="fade">
          <ul className="grid max-w-editorial gap-x-gutter gap-y-4 font-sans text-fluid-lg text-ink sm:grid-cols-2">
            {p.scope.map((item) => (
              <li key={item} className="flex items-baseline gap-4 border-t border-ink/12 py-4">
                {/* Ink, not cherry: six coloured ticks spent the page budget six times over
                    (audit 2026-09-09, finding 1). Matches the service pages. */}
                <span aria-hidden className="h-px w-6 flex-shrink-0 translate-y-2 bg-ink/25" />
                {item}
              </li>
            ))}
          </ul>
        </Reveal>

        {/* The deliverable itself, directly under the list that claims it — the
            scope says "Design system", this opens it. ↗ and a new tab because it
            is a separate document with its own type system, not a page of this
            site; the flare it carries is the glyph, which is the CTA affordance
            and therefore outside the page's accent budget. `prefetch` off: the
            href is same-origin but rewritten onto a static file, so there is no
            RSC payload for Next to fetch. */}
        {p.deliverable ? (
          <Reveal variant="fade" delay={0.1} className="mt-14 max-w-measure">
            <p className="font-sans text-fluid-base leading-relaxed text-ink/70">
              {p.deliverable.note}
            </p>
            <div className="mt-7">
              <ArrowLink
                href={p.deliverable.href}
                target="_blank"
                rel="noopener noreferrer"
                prefetch={false}
              >
                {p.deliverable.label}
              </ArrowLink>
            </div>
          </Reveal>
        ) : null}
      </SectionShell>

      {/* Testimonial */}
      {p.testimonial ? (
        <SectionShell eyebrow="Proof">
          <Reveal variant="fade">
            <Testimonial
              quote={p.testimonial.quote}
              name={p.testimonial.name}
              role={p.testimonial.role}
            />
          </Reveal>
        </SectionShell>
      ) : null}

      {/* CTA — the case study's one dark moment. `marker` off: the heading has the flare. */}
      <ClosingCTA
        heading="Let’s build something worth owning."
        accent="worth"
      >
        <div className="flex flex-wrap items-center gap-4">
          <Button href="/begin" variant="onDark">
            Begin your project
          </Button>
          <Link
            href={nextCase ? `/work/${nextCase.id}` : "/work"}
            className="type-meta -my-2 inline-block py-2 text-milk underline decoration-milk/30 underline-offset-4 transition-colors hover:decoration-milk"
          >
            {nextCase ? `Next — ${nextCase.client}` : "See all work"}
          </Link>
        </div>
      </ClosingCTA>
    </>
  );
}
