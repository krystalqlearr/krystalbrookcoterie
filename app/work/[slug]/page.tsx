import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Button from "@/components/Button";
import Reveal from "@/components/motion/Reveal";
import SectionShell from "@/components/SectionShell";
import Testimonial from "@/components/Testimonial";
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

/** Renders a heading with its single accent word lifted into the flare — same face. */
function accented(text: string, accent: string) {
  const at = text.toLowerCase().indexOf(accent.toLowerCase());
  if (at === -1) return text;
  return (
    <>
      {text.slice(0, at)}
      <span className="text-neon">{text.slice(at, at + accent.length)}</span>
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
            <Link
              href="/work"
              className="font-sans text-xs font-semibold uppercase tracking-[0.13em] text-ink/70 transition-colors hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
            >
              ← All work
            </Link>
            <p className="mt-8 font-sans text-meta font-semibold uppercase text-ink/70">
              {p.category}
            </p>
            <h1 className="mt-5 max-w-[20ch] font-display text-fluid-display font-normal text-ink text-balance">
              {accented(p.descriptor, p.accent)}
            </h1>
          </Reveal>
        </div>
      </section>

      {/* Hero — the real site inside a browser frame */}
      <section className="pb-section">
        <div className="container">
          <Reveal>
            <figure className="overflow-hidden border border-ink/15 bg-river">
              <div className="flex items-center gap-3 border-b border-bone/10 px-4 py-2.5">
                <span className="flex gap-1.5" aria-hidden>
                  <span className="h-2 w-2 rounded-full bg-bone/25" />
                  <span className="h-2 w-2 rounded-full bg-bone/25" />
                  <span className="h-2 w-2 rounded-full bg-bone/25" />
                </span>
                <span className="truncate rounded-sm bg-bone/5 px-3 py-1 font-sans text-[0.65rem] tracking-[0.06em] text-bone/60">
                  {p.url}
                </span>
              </div>
              <div className="relative aspect-[16/9] w-full">
                {p.image ? (
                  <Image
                    src={p.image}
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
          <Reveal>
            <p className="max-w-measure font-sans text-fluid-xl leading-snug text-ink">
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

          <Reveal delay={0.1}>
            <dl className="space-y-6 lg:border-l lg:border-ink/12 lg:pl-10">
              {[
                ["Client", p.client],
                ["Role", p.role],
                ["Year", p.year],
                ["Stack", p.stack],
              ].map(([label, value]) => (
                <div key={label} className="border-t border-ink/12 pt-3 first:border-t-0 first:pt-0">
                  <dt className="font-sans text-xs font-semibold uppercase tracking-[0.13em] text-ink/70">{label}</dt>
                  <dd className="mt-1 font-sans text-fluid-base text-ink">{value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </SectionShell>

      {/* Results — bone alt-section (the proof band) */}
      {p.results && p.results.length > 0 ? (
        <SectionShell tone="bone" eyebrow="Results" heading="Engineered to perform." headingSize="md">
          <Reveal stagger={0.08}>
            <dl className="grid gap-x-gutter gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
              {p.results.map((r) => (
                <div key={r.label} className="border-t border-ink/20 pt-5">
                  <dt className="font-sans text-xs font-semibold uppercase tracking-[0.13em] text-ink/70">{r.label}</dt>
                  <dd className="mt-3 font-display text-fluid-xl font-normal text-ink">{r.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </SectionShell>
      ) : null}

      {/* Scope */}
      <SectionShell eyebrow="Scope" heading="What the engagement covered." headingSize="md">
        <Reveal>
          <ul className="grid max-w-editorial gap-x-gutter gap-y-4 font-sans text-fluid-lg text-ink sm:grid-cols-2">
            {p.scope.map((item) => (
              <li key={item} className="flex items-baseline gap-4 border-t border-ink/12 py-4">
                <span aria-hidden className="h-px w-6 flex-shrink-0 translate-y-2 bg-neon" />
                {item}
              </li>
            ))}
          </ul>
        </Reveal>
      </SectionShell>

      {/* Testimonial */}
      {p.testimonial ? (
        <SectionShell eyebrow="Proof">
          <Reveal>
            <Testimonial
              quote={p.testimonial.quote}
              name={p.testimonial.name}
              role={p.testimonial.role}
            />
          </Reveal>
        </SectionShell>
      ) : null}

      {/* Next + CTA — the river inversion */}
      <SectionShell
        tone="river"
        marker
        heading="Let’s build something worth owning."
        accent="worth"
        headingSize="xl"
      >
        <div className="flex flex-wrap items-center gap-4">
          <Button href="/begin" variant="onRiver" size="lg">
            Begin your project
          </Button>
          <Link
            href={nextCase ? `/work/${nextCase.id}` : "/work"}
            className="font-sans text-xs font-semibold uppercase tracking-[0.13em] text-bone underline decoration-bone/30 underline-offset-4 transition-colors hover:decoration-bone"
          >
            {nextCase ? `Next — ${nextCase.client}` : "See all work"}
          </Link>
        </div>
      </SectionShell>
    </>
  );
}
