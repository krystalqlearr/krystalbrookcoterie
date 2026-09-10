import type { Metadata } from "next";
import Link from "next/link";
import ArrowLink from "@/components/ArrowLink";
import Button from "@/components/Button";
import FAQAccordion from "@/components/FAQAccordion";
import IndexMeta from "@/components/IndexMeta";
import PageHero from "@/components/PageHero";
import Reveal, { RevealItem } from "@/components/motion/Reveal";
import ClosingCTA from "@/components/ClosingCTA";
import SectionShell from "@/components/SectionShell";
import ServiceCard from "@/components/ServiceCard";
import { FLOOR_LINE, SERVICES, TIERS } from "@/lib/services";

/**
 * The services hub (2026-09-07). Services are sold BY DISCIPLINE — seven, each
 * with its own page — the way the studios Krystal measures against do it. The
 * four tier names survive as engagement SIZES beneath them, without prices:
 * exactly one figure is public (`FLOOR_LINE`), everything else is priced in the
 * proposal and the enquiry is the filter.
 *
 * Every row floods on hover (the flare as a surface — see CLAUDE.md, Color).
 * FLARE BUDGET — the hero's accent word and the closing CTA's; the index numbers
 * and the tier flag are the functional carve-outs. DARK — the closing CTA only.
 */

export const metadata: Metadata = {
  title: "Services",
  description:
    "Seven services, sold by discipline — identity, collateral, websites, redesign, development, search, Squarespace — and four sizes of engagement to commission them.",
};

// Care Plans — names and what they do. No prices on the site (2026-09-07).
const CARE = [
  {
    name: "Essential",
    description:
      "The site stays fast, secure, and online — platform oversight, security updates, monthly performance checks, and the booking path tested every month.",
  },
  {
    name: "Growth",
    description:
      "Everything in Essential, plus dedicated hours each month for content and design evolution — seasonal refreshes, new sections — with analytics reporting and SEO upkeep.",
  },
  {
    name: "Partner",
    description:
      "The retained studio: monthly design and development hours, same-day priority, strategy calls, and a proactive roadmap for the brand’s next move.",
  },
];

const FAQ = [
  {
    question: "Why custom code instead of a template or page builder?",
    answer:
      "A template is rented — you build your brand on ground you don’t own, constrained by someone else’s system and paying to keep it. Custom code is owned: faster, distinctive in ways a builder structurally can’t match, and an asset that compounds in value instead of aging into a liability. That is the default here. When a business doesn’t need that yet, a Squarespace commission is a real option — designed, not templated — and the design carries across the day you outgrow it.",
  },
  {
    question: "What does it cost?",
    answer: `${FLOOR_LINE} Every engagement is priced in the proposal, against its scope — never from a menu. The enquiry form asks for a range so the proposal lands in the right size the first time.`,
  },
  {
    question: "Do you use AI?",
    answer:
      "As a tool, the way I use a code editor — never as the designer. AI can’t decide what a brand should feel like; that judgment is the work, and the work is mine. What it removes is the layer where an agency hands your project down to a junior. Every design decision, every line of the system, and every word of strategy is mine — and revisions come back in hours instead of weeks.",
  },
  {
    question: "What do I actually own at the end?",
    answer:
      "Everything. The code, the design system, and the deployment are yours — no platform lock-in, no monthly ransom to keep your own website online. You can host it anywhere and extend it forever.",
  },
  {
    question: "How long does a project take?",
    answer:
      "The Edit runs two to three weeks, Signature six to eight, and Atelier eight to twelve — with revision cycles measured in hours, not weeks. A Private Commission is scoped to the work. Timelines are confirmed in your proposal and hold from the day content and assets are in hand.",
  },
  {
    question: "Do you offer ongoing support after launch?",
    answer:
      "Yes — Care Plans keep the site fast, current, and evolving, from light hosting oversight to a fully retained studio relationship. Most brands add one at handover.",
  },
];

// The flood on a row: the fill, then the type re-colours to stay legal —
// display line → milk (≥24px), everything smaller → ink.
const row =
  "group -mx-4 grid gap-x-gutter gap-y-4 px-4 py-10 transition-colors duration-600 ease-editorial hover:bg-flare focus-visible:bg-flare focus-visible:outline-none motion-reduce:transition-none lg:grid-cols-[13rem_1fr]";
const toMilk =
  "transition-colors duration-600 ease-editorial group-hover:text-milk group-focus-visible:text-milk";
const toInk =
  "transition-colors duration-600 ease-editorial group-hover:text-ink group-focus-visible:text-ink";

export default function ServicesPage() {
  return (
    <>
      <PageHero
        marker="Services"
        eyebrow="Services"
        title="A different level of presence."
        accent="presence"
        intro="Seven services, sold by discipline. Every engagement is strategically led, visually distinct, and built around where your brand is now — and where it intends to go next."
      />

      {/* The seven — a counted sequence; each row is the way in to its page. */}
      <SectionShell as="section" className="pt-0">
        <Reveal as="ol" stagger={0.06} className="border-b border-ink/12">
          {SERVICES.map((s, i) => (
            <RevealItem as="li" variant="fade" key={s.slug} className="border-t border-ink/12">
              <Link href={`/services/${s.slug}`} aria-label={`${s.name} — ${s.eyebrow}`} className={row}>
                <div className="flex flex-col gap-3">
                  <IndexMeta index={i + 1} total={SERVICES.length} />
                  <span className={`type-meta text-ink/70 ${toInk}`}>{s.eyebrow}</span>
                </div>
                <div className="max-w-measure">
                  <span className={`type-display block text-fluid-2xl text-ink ${toMilk}`}>{s.name}</span>
                  <span className={`mt-4 block font-sans text-fluid-base leading-relaxed text-ink/70 ${toInk}`}>
                    {s.line}
                  </span>
                </div>
              </Link>
            </RevealItem>
          ))}
        </Reveal>
      </SectionShell>

      {/* Four sizes of engagement — names and timelines. The one public figure sits
          in the intro; everything else is priced in the proposal. */}
      <SectionShell
        tone="rule"
        eyebrow="Ways to commission"
        heading="Four sizes of engagement."
        headingSize="md"
        intro={`${FLOOR_LINE} Every engagement is priced in the proposal, against its scope.`}
      >
        <ul className="border-b border-ink/12">
          {TIERS.map((tier) => (
            <li key={tier.name} className="border-t border-ink/12">
              <Reveal variant="fade">
                <div className="grid gap-x-gutter gap-y-4 py-10 lg:grid-cols-[13rem_1fr]">
                  <div className="flex flex-col gap-3">
                    <p className="type-meta text-ink/70">{tier.duration}</p>
                    {"flag" in tier && tier.flag ? (
                      <p className="type-meta text-flare-deep">{tier.flag}</p>
                    ) : null}
                  </div>
                  <div className="max-w-measure">
                    <h3 className="type-display text-fluid-2xl text-ink">{tier.name}</h3>
                    <p className="mt-4 font-sans text-fluid-base leading-relaxed text-ink/70">
                      {tier.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
        <Reveal variant="fade" className="mt-10">
          <ArrowLink href="/begin">Commission</ArrowLink>
        </Reveal>
      </SectionShell>

      {/* Care Plans — white sheets on the milk; they flood on hover. */}
      <SectionShell
        tone="rule"
        eyebrow="Care plans"
        heading="Built to compound, kept in condition."
        headingSize="md"
        intro="A website is an asset — it performs best when it’s maintained. Care Plans keep yours fast, current, and evolving after launch."
      >
        <Reveal stagger={0.08}>
          <div className="grid gap-x-gutter gap-y-6 sm:grid-cols-3">
            {CARE.map((c) => (
              <RevealItem key={c.name} variant="fade">
                <ServiceCard name={c.name} description={c.description} />
              </RevealItem>
            ))}
          </div>
        </Reveal>
      </SectionShell>

      <SectionShell tone="rule" eyebrow="Questions" heading="The honest answers." headingSize="md">
        <Reveal variant="fade">
          <FAQAccordion items={FAQ} />
        </Reveal>
      </SectionShell>

      {/* CTA — the page's ONE dark moment. */}
      <ClosingCTA
        heading="Let’s build something worth owning."
        accent="worth"
      >
        <Button href="/begin" variant="onDark">
          Begin your project
        </Button>
      </ClosingCTA>
    </>
  );
}
