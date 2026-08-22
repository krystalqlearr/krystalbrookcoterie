import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Button from "@/components/Button";
import Reveal from "@/components/motion/Reveal";
import TextReveal from "@/components/motion/TextReveal";
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

      {/* Header — breadcrumb and category are meta, so they keep the simple fade-up;
          the headline now self-animates via TextReveal (its own whileInView), pulled
          out of that Reveal so the two don't fire a competing double entrance on the
          same text. The italic accent word survives as a highlightClassName on the
          same per-character mechanism, rather than a separate <em> wrapper. */}
      <section className="pb-10 pt-32 md:pt-40">
        <div className="container">
          <Reveal stagger={0.1}>
            <Link
              href="/work"
              className="type-meta text-ink/70 transition-colors hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
            >
              ← All work
            </Link>
            <p className="mt-8 type-meta text-ink/70">
              {p.category}
            </p>
          </Reveal>
          <h1 className="type-display mt-7 max-w-[20ch] text-fluid-display text-ink">
            <TextReveal highlight={p.accent} highlightClassName="italic">
              {p.descriptor}
            </TextReveal>
          </h1>
        </div>
      </section>

      {/* Hero — the real site inside a browser frame */}
      <section className="pb-section">
        <div className="container">
          <Reveal>
            <figure className="overflow-hidden border border-ink/15 bg-forest">
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

      {/* Overview + meta — intro and body now self-animate via TextReveal, so this
          column loses its own Reveal wrapper (the sidebar dl keeps its, since it
          isn't sharing a row with any self-animating text). */}
      <SectionShell as="section" className="pt-0">
        <div className="grid gap-x-gutter gap-y-12 lg:grid-cols-[1.4fr_0.6fr]">
          <div>
            <p className="type-display max-w-measure text-fluid-xl text-ink">
              <TextReveal>{p.intro}</TextReveal>
            </p>
            <div className="mt-10 max-w-measure space-y-5 font-sans text-fluid-base leading-relaxed text-ink/70">
              {p.body.map((para, i) =>
                // The first paragraph carries the flare drop-cap (.dropcap::first-letter
                // in globals.css), which needs its own first character as plain text to
                // target — splitting it into per-character spans would fight that pseudo-
                // element, so it keeps the simple block-level fade instead of TextReveal.
                i === 0 ? (
                  <Reveal key={i}>
                    <p className="dropcap">{para}</p>
                  </Reveal>
                ) : (
                  <p key={i}>
                    <TextReveal delay={0.04 * i}>{para}</TextReveal>
                  </p>
                ),
              )}
            </div>
          </div>

          <Reveal delay={0.1}>
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
            </dl>
          </Reveal>
        </div>
      </SectionShell>

      {/* Results — first-recess alt-section */}
      {p.results && p.results.length > 0 ? (
        <SectionShell tone="bone" eyebrow="Results" heading="Engineered to perform." headingSize="md">
          <Reveal stagger={0.08}>
            <dl className="grid gap-x-gutter gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
              {p.results.map((r) => (
                <div key={r.label} className="border-t border-ink/20 pt-5">
                  <dt className="type-meta text-ink/70">{r.label}</dt>
                  <dd className="type-display mt-3 text-fluid-xl text-ink">{r.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </SectionShell>
      ) : null}

      {/* Scope — each item now self-animates via TextReveal, so the list loses its
          outer Reveal, same rule as the /services tier `includes` bullets. */}
      <SectionShell eyebrow="Scope" heading="What the engagement covered." headingSize="md">
        <ul className="grid max-w-editorial gap-x-gutter gap-y-4 font-sans text-fluid-lg text-ink sm:grid-cols-2">
          {p.scope.map((item, idx) => (
            <li key={item} className="flex items-baseline gap-4 border-t border-ink/12 py-4">
              <span aria-hidden className="h-px w-6 flex-shrink-0 translate-y-2 bg-flare" />
              <TextReveal delay={0.03 * idx}>{item}</TextReveal>
            </li>
          ))}
        </ul>
      </SectionShell>

      {/* Testimonial — the quote self-animates via TextReveal inside the component,
          so no outer Reveal here either. */}
      {p.testimonial ? (
        <SectionShell eyebrow="Proof">
          <Testimonial
            quote={p.testimonial.quote}
            name={p.testimonial.name}
            role={p.testimonial.role}
          />
        </SectionShell>
      ) : null}

      {/* CTA — the case study's one dark moment. `marker` off: the heading has the flare. */}
      <SectionShell
        tone="dark"
        heading="Let’s build something worth owning."
        accent="worth"
        headingSize="xl"
        className="!pb-14"
      >
        <div className="flex flex-wrap items-center gap-4">
          <Button href="/begin" variant="onDark">
            Begin your project
          </Button>
          <Link
            href={nextCase ? `/work/${nextCase.id}` : "/work"}
            className="type-meta text-bone underline decoration-bone/30 underline-offset-4 transition-colors hover:decoration-bone"
          >
            {nextCase ? `Next — ${nextCase.client}` : "See all work"}
          </Link>
        </div>
      </SectionShell>
    </>
  );
}
