import type { Metadata } from "next";
import Button from "@/components/Button";
import FAQAccordion from "@/components/FAQAccordion";
import PageHero from "@/components/PageHero";
import Reveal, { RevealItem } from "@/components/motion/Reveal";
import SectionShell from "@/components/SectionShell";
import ServiceCard from "@/components/ServiceCard";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Four custom-coded tiers — Launch, Signature, Atelier, Atelier Custom — plus ongoing Care Plans. Agency-grade engineering at boutique scale.",
};

const TIERS = [
  {
    name: "Launch",
    price: "$4,500",
    duration: "2–3 weeks",
    description:
      "A custom-coded launch presence for the brand going to market. Focused, fast, and unmistakably established from day one.",
  },
  {
    name: "Signature",
    price: "$9,800",
    duration: "6–8 weeks",
    featured: true,
    description:
      "The flagship. A full bespoke site and design system, multi-page, with a CMS where it earns its place and motion that carries the brand. Most brands start here.",
  },
  {
    name: "Atelier",
    price: "$22,000+",
    duration: "8–12 weeks",
    description:
      "When the site is the flagship location. Advanced interaction, deeper architecture, and art direction built around a singular point of view.",
  },
  {
    name: "Atelier Custom",
    price: "$32,000+",
    duration: "Bespoke",
    description:
      "A digital flagship with no ceiling — bespoke experiences, custom systems, and engineering scoped entirely to the ambition of the brand.",
  },
];

const CARE = [
  {
    name: "Essential",
    price: "$175 / mo",
    description:
      "The site stays fast, secure, and online — platform oversight, security updates, monthly performance checks, and the booking path tested every month.",
  },
  {
    name: "Growth",
    price: "$450 / mo",
    description:
      "Everything in Essential, plus dedicated hours each month for content and design evolution — seasonal refreshes, new sections — with analytics reporting and SEO upkeep.",
  },
  {
    name: "Partner",
    price: "$950 / mo",
    description:
      "The retained studio: monthly design and development hours, same-day priority, strategy calls, and a proactive roadmap for the brand’s next move.",
  },
];

const FAQ = [
  {
    question: "Why custom code instead of a template or page builder?",
    answer:
      "A template is rented — you build your brand on ground you don’t own, constrained by someone else’s system and paying to keep it. Custom code is owned: faster, distinctive in ways a builder structurally can’t match, and an asset that compounds in value instead of aging into a liability.",
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
      "Launch runs two to three weeks, Signature six to eight, and Atelier eight to twelve — with revision cycles measured in hours, not weeks. Atelier Custom is scoped to the work. Timelines are confirmed in your proposal and hold from the day content and assets are in hand.",
  },
  {
    question: "Do you offer ongoing support after launch?",
    answer:
      "Yes — Care Plans keep the site fast, current, and evolving, from light hosting oversight to a fully retained studio relationship. Most brands add one at handover.",
  },
];

export default function ServicesPage() {
  return (
    <>
      <PageHero
        marker="Services"
        eyebrow="Services"
        title="Four ways to work together, every one custom-coded."
        accent="custom-coded"
        intro="Each tier is hand-built in code on the same stack the largest technology companies run — scoped to where a brand is now, and to where it intends to go."
      />

      {/* Tiers */}
      <SectionShell as="section" className="pt-0">
        <Reveal stagger={0.08}>
          <div className="grid gap-x-gutter gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {TIERS.map((t) => (
              <RevealItem key={t.name}>
                <ServiceCard
                  name={t.name}
                  price={t.price}
                  duration={t.duration}
                  description={t.description}
                  featured={t.featured}
                />
              </RevealItem>
            ))}
          </div>
        </Reveal>
      </SectionShell>

      {/* Founding Client — petrol alt-section */}
      <SectionShell
        tone="stone"
        eyebrow="Founding client program"
        heading="Signature scope at $2,800 — for the right first few."
        accent="$2,800"        headingSize="md"
        intro="A limited program for a small number of founding clients: full Signature-tier scope in exchange for case-study rights. Real work, deeply discounted, while the studio builds its published proof."
      >
        <Reveal delay={0.1}>
          <Button href="/begin" variant="primary">
            Apply as a founding client
          </Button>
        </Reveal>
      </SectionShell>

      {/* Care Plans */}
      <SectionShell
        eyebrow="Care plans"
        heading="Built to compound, kept in condition."
        headingSize="md"
        intro="A website is an asset — it performs best when it’s maintained. Care Plans keep yours fast, current, and evolving after launch."
      >
        <Reveal stagger={0.08}>
          <div className="grid gap-x-gutter gap-y-10 sm:grid-cols-3">
            {CARE.map((c) => (
              <RevealItem key={c.name}>
                <ServiceCard name={c.name} price={c.price} description={c.description} />
              </RevealItem>
            ))}
          </div>
        </Reveal>
      </SectionShell>

      {/* FAQ */}
      <SectionShell eyebrow="Questions" heading="The honest answers." headingSize="md">
        <Reveal>
          <FAQAccordion items={FAQ} />
        </Reveal>
      </SectionShell>

      {/* CTA — cream showstopper */}
      <SectionShell
        tone="charcoal"
        marker
        heading="Let’s build something worth owning."
        accent="worth"        headingSize="xl"
      >
        <Button href="/begin" variant="onCharcoal">
          Begin your project
        </Button>
      </SectionShell>
    </>
  );
}
