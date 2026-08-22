import Button from "@/components/Button";
import ArrowLink from "@/components/ArrowLink";
import EditorialHeading from "@/components/EditorialHeading";
import TextReveal from "@/components/motion/TextReveal";
import Hero from "@/components/Hero";
import IndexMeta from "@/components/IndexMeta";
import Marquee from "@/components/Marquee";
import ProjectCard from "@/components/ProjectCard";
import Reveal from "@/components/motion/Reveal";
import SectionShell from "@/components/SectionShell";
import ServiceCard from "@/components/ServiceCard";
import StatStrip from "@/components/StatStrip";
import { WORK } from "@/lib/work";

/**
 * Home — the section rhythm the whole system was built for:
 *
 *   hero → proof band (DARK) → positioning → indexed work → point of view
 *        → the studio → marquee → proof → closing CTA (DARK)
 *
 * Two rules govern the composition and both are deliberate:
 *
 *  CHARCOAL IS PUNCTUATION — exactly two dark moments, the proof band under the
 *  hero and the closing CTA. Everything between them alternates milk (canvas) and
 *  bone (first recess) so the page reads with cadence, never one flat scroll.
 *
 *  ONE FLARE PER VIEW — the accent words form a spine read top to bottom:
 *  presence → owned → follows → worth. The indexed work section spends its flare
 *  on the IndexMeta numbers instead of a heading accent, which is why that
 *  heading has none.
 */

// Every figure here is a claim the site already makes in the /services FAQ —
// nothing is estimated. If a claim changes there, change it here too.
const PROOF = [
  { figure: "6–8 wks", label: "Signature build", note: "Brief to launch, once content is in hand." },
  { figure: "100%", label: "Yours to own", note: "Code, design system, deployment. No lock-in." },
  { figure: "One", label: "Senior hand", note: "Every decision mine. Nothing handed to a junior." },
  { figure: "Hours", label: "Revision turnaround", note: "Not the weeks an agency queue takes." },
];

const SECTORS = [
  "Beauty",
  "Med-spa",
  "Wellness",
  "Bridal",
  "Luxury lifestyle",
  "Aesthetics",
  "Founder-led",
];

export default function HomePage() {
  const [feature, ...rest] = WORK;

  return (
    <>
      {/* 1 · Hero — atmosphere + choreographed headline */}
      <Hero />

      {/* 2 · Proof band — the first dark inversion, directly under the hero. It
             converts the headline's claim into something checkable before the
             visitor has scrolled past one screen. */}
      <StatStrip stats={PROOF} />

      {/* 3 · Positioning — the argument, stated once, in the display register */}
      <SectionShell
        heading="Your competitors’ sites are rented. Yours will be owned."
        accent="owned"
        headingSize="lg"
        intro="The difference is presence. Strategy, art direction, and custom design that make a founder-led brand look as established as it has become — and turn attention into trust, and trust into demand."
      />

      {/* 4 · Selected work — an EDITED SEQUENCE, not a grid. IndexMeta carries the
             count so the reader always knows where they are and how much is left. */}
      <SectionShell tone="bone" eyebrow="Selected work" heading="The work speaks first.">
        <Reveal>
          <IndexMeta index={1} total={WORK.length} tag={feature.category} />
          <ProjectCard
            className="mt-5"
            size="feature"
            client={feature.client}
            tag={feature.capabilities}
            descriptor={feature.descriptor}
            browserUrl={feature.url}
            href={`/work/${feature.id}`}
          />
        </Reveal>

        <div className="mt-26 grid gap-x-gutter gap-y-18 md:grid-cols-2">
          {rest.map((project, i) => (
            <Reveal key={project.id} delay={0.08 * (i + 1)}>
              <IndexMeta index={i + 2} total={WORK.length} tag={project.category} />
              <ProjectCard
                className="mt-5"
                size="side"
                client={project.client}
                tag={project.status ?? project.capabilities}
                descriptor={project.descriptor}
                href="/work"
              />
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <div className="mt-22">
            <ArrowLink href="/work">View all work</ArrowLink>
          </div>
        </Reveal>
      </SectionShell>

      {/* 5 · Point of view — the studio's argument for why strategy comes first. Both
             the heading and the body copy now self-animate via TextReveal (their own
             whileInView), so the outer Reveal/RevealItem stagger this section used to
             coordinate them with is gone — it was already down to one real item once
             the heading moved off it. */}
      <SectionShell eyebrow="The difference">
        <div className="grid gap-x-gutter gap-y-10 lg:grid-cols-2 lg:items-start">
          <EditorialHeading as="h2" size="lg" accent="follows" className="max-w-[16ch]">
            Strategy leads. Everything else follows.
          </EditorialHeading>
          <div className="max-w-measure space-y-5 font-sans text-fluid-base leading-relaxed text-ink/70">
            <p>
              <TextReveal>
                Every brand I take on is shaped from its positioning up — who it must
                move, what it must be trusted for, and where it intends to go. The
                design serves that strategy; it never chases a trend.
              </TextReveal>
            </p>
            <p>
              <TextReveal delay={0.1}>
                The result is a digital identity that reads established, distinctive,
                and impossible to confuse with anyone else — one senior mind on every
                decision, from strategy to the last interaction on screen.
              </TextReveal>
            </p>
          </div>
        </div>
      </SectionShell>

      {/* 6 · The studio — four ways in, Signature flagged */}
      <SectionShell
        tone="bone"
        eyebrow="The studio"
        heading="Four ways to enter the studio."
        headingSize="md"
      >
        {/* Each card's own name/description now self-animates via TextReveal, so the
            grid is no longer wrapped in a stagger Reveal — that fired a second,
            competing entrance on the same text. Price and duration ride in
            unanimated: meta/data, not lines of copy. */}
        <div className="grid gap-x-gutter gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          <ServiceCard
            name="The Edit"
            price="$4,500"
            duration="2–3 weeks"
            description="A refined debut that stops a brand looking new."
          />
          <ServiceCard
            name="Signature"
            price="$9,800"
            duration="6–8 weeks"
            featured
            description="The complete brand website."
          />
          <ServiceCard
            name="Atelier"
            price="$22,000+"
            duration="8–12 weeks"
            description="For brands whose site must carry real authority."
          />
          <ServiceCard
            name="Private Commission"
            price="$32,000+"
            description="A digital experience built from the ground up."
          />
        </div>
        <Reveal delay={0.1}>
          <div className="mt-18">
            <ArrowLink href="/services">View all services</ArrowLink>
          </div>
        </Reveal>
      </SectionShell>

      {/* 7 · Sectors — the page's heartbeat between two still sections. Presentational
             only: every sector here is named as real content on /services and /work. */}
      <section aria-hidden className="border-y border-ink/12 py-10">
        <Marquee items={SECTORS} duration={48} />
      </section>

      {/* 8 · Proof — a live, verifiable site rather than a quote. This section used to
             carry an invented testimonial credited to a real client; a link the visitor
             can actually click and check is stronger evidence than words nobody said.
             When a real approved quote exists, a Testimonial belongs here too. */}
      <SectionShell
        eyebrow="Proof"
        heading="The work is live."
        headingSize="md"
        intro="Glowtoure — a founder-led luxury tanning house serving the greater Sacramento region. Designed, built, and running in production."
      >
        <Reveal>
          <ArrowLink href="https://glowtoure.com" target="_blank" rel="noopener noreferrer">
            Visit glowtoure.com
          </ArrowLink>
        </Reveal>
      </SectionShell>

      {/* 9 · Closing CTA — the second and final dark moment. It runs INTO the forest
             footer, so the two read as one closing movement; the section's normal
             120px bottom rhythm would leave 200px of dead dark before the footer's
             first line, so it is deliberately trimmed here. */}
      <SectionShell
        tone="dark"
        heading="Let’s build something worth owning."
        accent="worth"
        headingSize="xl"
        className="!pb-14"
      >
        {/* The one filled control on the page besides the hero: ArrowLink is for
            navigation, Button for conversion, and this is the conversion moment. */}
        <Button href="/begin" variant="onDark">
          Begin your project
        </Button>
      </SectionShell>
    </>
  );
}
