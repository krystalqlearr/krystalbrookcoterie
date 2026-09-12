import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ArrowLink from "@/components/ArrowLink";
import { BrowserChrome } from "@/components/BrowserFrame";
import Button from "@/components/Button";
import FAQAccordion from "@/components/FAQAccordion";
import IndexMeta from "@/components/IndexMeta";
import PageHero from "@/components/PageHero";
import Reveal, { RevealItem } from "@/components/motion/Reveal";
import ClosingCTA from "@/components/ClosingCTA";
import SectionShell from "@/components/SectionShell";
import { TRAVEL } from "@/lib/motion";
import { FLOOR_LINE, SERVICES, getService, serviceSlugs } from "@/lib/services";
import { getProject } from "@/lib/work";

/**
 * One service, one page — seven pages from one template and lib/services.ts.
 *
 * Deliberately a third the length of the studios it was measured against: hero
 * line → what it covers (a hairline list) → who it's for, with the engagement
 * sizes that carry it → the five phases in a single row → one frame of work →
 * two or three questions → the related services → Commission. No stats band,
 * no testimonial wall, no twelve sections: a great studio shouldn't need to be
 * thorough. FLARE — the hero accent word and the closing CTA's; the index
 * numbers are the functional carve-out.
 */

const SITE_URL = "https://krystalbrookcoterie.com";

// The same five phases /process runs — one row here, the argument there.
const PHASES = ["Position", "Direct", "Design", "Build", "Release"];

export function generateStaticParams() {
  return serviceSlugs().map((slug) => ({ slug }));
}

// Next 15: `params` is a Promise, so both entry points await it.
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) return {};
  const description = `${s.line} ${s.forWhom}`;
  return {
    title: s.eyebrow,
    description,
    alternates: { canonical: `/services/${s.slug}` },
    openGraph: {
      title: `${s.eyebrow} — Krystal Brook Coterie`,
      description,
      url: `${SITE_URL}/services/${s.slug}`,
    },
  };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) notFound();

  const index = SERVICES.findIndex((x) => x.slug === s.slug) + 1;
  const work = s.work ? getProject(s.work) : undefined;
  // Only renders if the named project actually publishes one — a service page
  // can never link a deliverable that doesn't exist.
  const deliverable = s.deliverable ? getProject(s.deliverable)?.deliverable : undefined;
  const related = s.related.map((slug) => getService(slug)).filter(Boolean) as typeof SERVICES;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: s.eyebrow,
    serviceType: s.eyebrow,
    description: s.line,
    url: `${SITE_URL}/services/${s.slug}`,
    provider: { "@type": "Organization", name: "Krystal Brook Coterie", url: SITE_URL },
    areaServed: "United States",
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <PageHero marker={s.name} eyebrow={s.eyebrow} title={s.line} accent={s.accent} />

      {/* What it covers — the list does the work. */}
      <SectionShell as="section" className="pt-0">
        <div className="grid gap-x-gutter gap-y-10 lg:grid-cols-[13rem_1fr]">
          <div className="flex flex-col gap-4">
            <IndexMeta index={index} total={SERVICES.length} />
            <h2 className="type-meta text-ink/70">What it covers</h2>
          </div>
          <Reveal as="ul" stagger={0.06} className="max-w-editorial border-t border-ink/12">
            {s.covers.map((item) => (
              <RevealItem
                as="li"
                variant="fade"
                key={item}
                className="flex items-baseline gap-4 border-b border-ink/12 py-4 font-sans text-fluid-lg text-ink"
              >
                <span aria-hidden className="h-px w-6 flex-shrink-0 translate-y-2 bg-ink/25" />
                {item}
              </RevealItem>
            ))}
          </Reveal>
        </div>

        {s.addOns ? (
          <div className="mt-14 grid gap-x-gutter gap-y-6 lg:grid-cols-[13rem_1fr]">
            <h2 className="type-meta text-ink/70">Add-ons</h2>
            <Reveal variant="fade">
              <p className="max-w-measure font-sans text-fluid-base text-ink/70">
                {s.addOns.join(" · ")}
              </p>
            </Reveal>
          </div>
        ) : null}
      </SectionShell>

      {/* Who it's for + the engagement sizes that carry it. */}
      <SectionShell tone="rule" eyebrow="Who it's for" headingSize="md">
        <div className="grid gap-x-gutter gap-y-10 lg:grid-cols-[1.4fr_0.6fr]">
          <Reveal variant="fade">
            <p className="max-w-measure font-sans text-fluid-lg leading-relaxed text-ink">{s.forWhom}</p>
          </Reveal>
          <Reveal from="right" distance={TRAVEL.aside} delay={0.1}>
            <dl className="lg:border-l lg:border-ink/12 lg:pl-10">
              <dt className="type-meta text-ink/70">Commissioned as</dt>
              <dd className="mt-3 font-sans text-fluid-base text-ink">{s.commissionedAs.join(" · ")}</dd>
              <dt className="mt-8 type-meta text-ink/70">Investment</dt>
              <dd className="mt-3 font-sans text-fluid-base text-ink">{FLOOR_LINE} Priced in the proposal.</dd>
              {s.builtWith ? (
                <>
                  {/* The stack, named where it belongs — a proof point in the meta
                      column, never the headline (docs/kbc-voice.md). */}
                  <dt className="mt-8 type-meta text-ink/70">Built with</dt>
                  <dd className="mt-3 font-sans text-fluid-base text-ink">{s.builtWith.join(" · ")}</dd>
                </>
              ) : null}
            </dl>
          </Reveal>
        </div>
      </SectionShell>

      {/* How it runs — one row; the argument lives on /process. */}
      <SectionShell tone="rule" eyebrow="How it runs" headingSize="md">
        <Reveal as="ol" stagger={0.08} className="flex flex-wrap gap-x-10 gap-y-4">
          {PHASES.map((phase, i) => (
            <RevealItem as="li" variant="soft" key={phase} className="flex items-baseline gap-3">
              {/* Muted, not flare-deep: five coloured ordinals on top of the hero and
                  closing accents read busier than the budget intends, and these are not
                  IndexMeta's live index (audit 2026-09-09, finding 5). */}
              <span className="type-meta text-ink/70 [font-variant-numeric:tabular-nums]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="type-display text-fluid-xl text-ink">{phase}</span>
            </RevealItem>
          ))}
        </Reveal>
        <div className="mt-10">
          <ArrowLink href="/process" direction="right">
            How the studio works
          </ArrowLink>
        </div>
      </SectionShell>

      {/* One frame of work, where there is work to show. */}
      {work ? (
        <SectionShell tone="rule" eyebrow="The work" headingSize="md">
          <Reveal from="up" distance={TRAVEL.frame}>
            <Link
              href={work.caseStudy ? `/work/${work.id}` : "/work"}
              data-cursor="hover"
              data-cursor-label="open"
              aria-label={`${work.client} — ${work.descriptor}`}
              className="group block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
            >
              <figure className="overflow-hidden border border-ink/12 bg-onyx">
                <BrowserChrome label={work.status ?? work.url} />
                <div className="relative aspect-[16/9] w-full">
                  {work.video?.poster || work.image ? (
                    <Image
                      src={work.video?.poster ?? work.image!}
                      alt={`${work.client} — ${work.descriptor}`}
                      fill
                      sizes="(min-width: 1024px) 80vw, 100vw"
                      className="object-cover transition-transform duration-700 ease-editorial group-hover:scale-[1.04] motion-reduce:transform-none"
                    />
                  ) : (
                    <div aria-hidden className={`absolute inset-0 bg-gradient-to-br ${work.field}`} />
                  )}
                </div>
              </figure>
            </Link>
          </Reveal>
          <Reveal variant="soft" className="mt-6">
            <IndexMeta index={1} total={1} tag={work.client} />
            <p className="mt-3 max-w-measure font-sans text-fluid-base text-ink/70">{work.descriptor}</p>
          </Reveal>
        </SectionShell>
      ) : null}

      {/* The deliverable itself, for a discipline whose output isn't a website.
          Same device as the case study's: the claim, then the thing that proves
          it. `tone="rule"` only when there was no work frame above, so two
          hairline sections never stack. */}
      {deliverable ? (
        <SectionShell
          tone={work ? "light" : "rule"}
          eyebrow="The proof"
          heading="A system, not a logo file."
          headingSize="md"
        >
          <Reveal variant="fade" className="max-w-measure">
            <p className="font-sans text-fluid-base leading-relaxed text-ink/70">{deliverable.note}</p>
            <div className="mt-7">
              <ArrowLink
                href={deliverable.href}
                target="_blank"
                rel="noopener noreferrer"
                prefetch={false}
              >
                {deliverable.label}
              </ArrowLink>
            </div>
          </Reveal>
        </SectionShell>
      ) : null}

      {/* Questions — two or three, answered plainly. */}
      <SectionShell tone="rule" eyebrow="Questions" headingSize="md">
        <Reveal variant="fade">
          <FAQAccordion items={s.questions} />
        </Reveal>
      </SectionShell>

      {/* Related — the services that usually travel with this one. */}
      <SectionShell tone="rule" eyebrow="Alongside" headingSize="md">
        <Reveal as="ul" stagger={0.08} className="max-w-editorial border-t border-ink/12">
          {related.map((r) => (
            <RevealItem as="li" variant="fade" key={r.slug} className="border-b border-ink/12">
              <Link
                href={`/services/${r.slug}`}
                className="group -mx-4 flex flex-wrap items-baseline justify-between gap-x-8 gap-y-1 px-4 py-5 transition-colors duration-600 ease-editorial hover:bg-flare focus-visible:bg-flare focus-visible:outline-none motion-reduce:transition-none"
              >
                <span className="type-display text-fluid-xl text-ink transition-colors duration-600 ease-editorial group-hover:text-milk group-focus-visible:text-milk">
                  {r.name}
                </span>
                <span className="type-meta text-ink/70 transition-colors duration-600 ease-editorial group-hover:text-ink group-focus-visible:text-ink">
                  {r.eyebrow}
                </span>
              </Link>
            </RevealItem>
          ))}
        </Reveal>
      </SectionShell>

      {/* CTA — the page's one dark moment. */}
      <ClosingCTA heading={`Commission ${s.name}.`} accent={s.name}>
        <Button href="/begin" variant="onDark">
          Begin your project
        </Button>
      </ClosingCTA>
    </>
  );
}
