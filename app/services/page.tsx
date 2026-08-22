import type { Metadata } from "next";
import ArrowLink from "@/components/ArrowLink";
import Button from "@/components/Button";
import Eyebrow from "@/components/Eyebrow";
import FAQAccordion from "@/components/FAQAccordion";
import IndexMeta from "@/components/IndexMeta";
import PageHero from "@/components/PageHero";
import Reveal, { RevealItem } from "@/components/motion/Reveal";
import SectionShell from "@/components/SectionShell";
import ServiceCard from "@/components/ServiceCard";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Four custom-coded tiers — The Edit, Signature, Atelier, Private Commission — plus ongoing Care Plans. Agency-grade engineering at boutique scale.",
};

// SCOPE IS CONTRACTUAL. Signature's list is taken from the documented scope in
// docs/kbc-founding-client-offer.md — those are confirmed terms. The Edit and
// Atelier are described QUALITATIVELY where no page count or revision count is
// documented anywhere: a number invented here would become a commitment the moment
// a prospect read it. Add the figures once they are decided.
const TIERS = [
  {
    name: "The Edit",
    price: "$4,500",
    duration: "2–3 weeks",
    description:
      "A focused digital debut for brands ready to stop looking new. Strategic direction, custom design, and a polished online presence built to establish credibility from the first click.",
    bestFor:
      "Best for emerging brands, focused offers, and founders who need a refined foundation without an expansive build.",
    includes: [
      "Art direction and a design system bespoke to the brand — no theme, no template",
      "A focused set of pages: the essential path from first impression to enquiry",
      "Privacy, Terms and a custom 404, which never count against the page count",
      "Hand-built in code — Next.js, Tailwind, deployed to Vercel",
      "Foundational SEO: metadata, Open Graph, structured data, sitemap",
      "Core Web Vitals and WCAG 2.1 AA held as build standards, not afterthoughts",
      "Launch and full handover — you own the code, the design system and the deployment",
    ],
    excludes: ["A CMS", "Booking integration", "Editorial motion beyond the standard reveals"],
  },
  {
    name: "Signature",
    price: "$9,800",
    duration: "6–8 weeks",
    featured: true,
    description:
      "The complete brand website. Strategy, creative direction, custom design, and an intuitive CMS come together in a digital identity that feels unmistakably yours — and guides visitors toward action.",
    bestFor:
      "Designed for established founders ready for a website that carries the full weight of the brand.",
    includes: [
      "Art direction and design system bespoke to the brand — no theme, no template",
      "Up to six custom-designed pages or templates, hand-built in code",
      "A CMS-driven template counts as one design and can power unlimited entries",
      "Privacy, Terms and a custom 404 — they don’t count against the six",
      "A CMS where it earns its place: self-serve updates where genuinely useful",
      "Editorial motion and interaction — the reveals, transitions and pacing of the studio standard",
      "Embedded booking: integration of your existing scheduler (Square, Acuity, Vagaro)",
      "Foundational SEO — metadata, Open Graph, structured data, sitemap",
      "Core Web Vitals engineered, WCAG 2.1 AA held",
      "An art-directed shot list for your photographer, so imagery matches design intent",
      "Two consolidated revision rounds — one at design, one at build",
      "Launch and full handover to your own infrastructure",
    ],
    excludes: ["E-commerce — that’s an Atelier conversation", "Brand identity design", "Rush delivery"],
  },
  {
    name: "Atelier",
    price: "$22,000+",
    duration: "8–12 weeks",
    description:
      "For brands whose website must do more than look beautiful. A deeper strategic and creative engagement — immersive art direction, advanced interactions, custom user journeys, and a digital experience designed for authority and scale.",
    bestFor: "Built for flagship brands, expanding businesses, and high-consideration offers.",
    includes: [
      "Everything in Signature, at a larger page and template count",
      "Immersive art direction — the site treated as a flagship location, not a brochure",
      "Advanced interaction and signature motion moments built for this brand alone",
      "Custom user journeys designed around how this business actually converts",
      "Deeper content modelling so the CMS holds a real editorial operation",
      "E-commerce where the model calls for it",
      "Analytics and conversion instrumentation configured at launch",
    ],
    excludes: ["Brand identity design", "Rush delivery"],
  },
  {
    name: "Private Commission",
    price: "$32,000+",
    duration: "Custom timeline",
    description:
      "No standard scope. No predetermined ceiling. A fully commissioned digital experience shaped around the complexity, ambition, and operating model of the brand.",
    bestFor:
      "Custom platforms, original interactions, integrated systems, and creative direction developed entirely from the ground up.",
    includes: [
      "Scoped entirely to the work — there is no fixed inclusion list, by design",
      "Custom platforms, original interactions and integrated systems",
      "Creative direction developed from the ground up rather than adapted",
      "Scope, timeline and investment are defined together before anything is committed",
    ],
    excludes: [],
  },
];

// Available on any engagement, quoted with the proposal. Rates are deliberately
// NOT published: the figures in docs/kbc-founding-client-offer.md are marked
// "suggested" and are not confirmed commercial terms.
const ADD_ONS = [
  "Additional pages or templates",
  "Full site copywriting, rather than a polish of your drafts",
  "Journal or blog — CMS templates plus the index",
  "Email marketing setup: capture and welcome flow",
  "A custom booking or enquiry flow beyond an embed",
  "An additional revision round",
  "Photography sourcing and stock curation",
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
      "The Edit runs two to three weeks, Signature six to eight, and Atelier eight to twelve — with revision cycles measured in hours, not weeks. A Private Commission is scoped to the work. Timelines are confirmed in your proposal and hold from the day content and assets are in hand.",
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
        title="A different level of presence."
        accent="presence"
        intro="Four ways to enter the studio. Every engagement is strategically led, visually distinct, and built around where your brand is now — and where it intends to go next."
      />

      {/* Tiers — a counted SEQUENCE of full-width rows, not a four-up card grid.
          At this price point each tier has to be able to argue for itself, which a
          quarter-width card cannot do; the row gives it a headline, the reasoning,
          and its own way in. Price and duration stay INK — ink-forward reads
          expensive, and the flare is spent on the index. */}
      <SectionShell as="section" className="pt-0">
        <ul className="border-b border-ink/15">
          {TIERS.map((tier, i) => (
            <li key={tier.name} className="border-t border-ink/15">
              <Reveal>
                <div className="grid gap-x-gutter gap-y-6 py-14 lg:grid-cols-[13rem_1fr]">
                  {/* Left rail — position, price, timeline */}
                  <div className="flex flex-col gap-4">
                    <IndexMeta index={i + 1} total={TIERS.length} />
                    <p className="font-sans text-fluid-lg text-ink">{tier.price}</p>
                    <p className="type-meta text-ink/70">{tier.duration}</p>
                  </div>

                  {/* The argument */}
                  <div className="max-w-measure">
                    {tier.featured ? (
                      <Eyebrow tone="flare" className="mb-4">
                        Most commissioned
                      </Eyebrow>
                    ) : null}
                    <h3 className="type-display text-fluid-2xl text-ink">{tier.name}</h3>
                    <p className="mt-6 font-sans text-fluid-base leading-relaxed text-ink/70">
                      {tier.description}
                    </p>
                    <p className="mt-4 font-sans text-fluid-sm leading-relaxed text-ink/70">
                      {tier.bestFor}
                    </p>

                    {/* Scope. A tier at this price has to say exactly what it is —
                        a paragraph of adjectives is not an answer to "what do I get". */}
                    <div className="mt-8">
                      <p className="type-meta text-ink/70">What&rsquo;s included</p>
                      <ul className="mt-4 space-y-2.5">
                        {tier.includes.map((item) => (
                          <li key={item} className="flex gap-3.5">
                            <span
                              aria-hidden
                              className="mt-[0.6em] h-px w-3 shrink-0 bg-flare-deep"
                            />
                            <span className="font-sans text-fluid-sm leading-relaxed text-ink/70">
                              {item}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {tier.excludes.length ? (
                      <div className="mt-7">
                        <p className="type-meta text-ink/70">Not at this tier</p>
                        <p className="mt-3 font-sans text-fluid-sm leading-relaxed text-ink/70">
                          {tier.excludes.join(" · ")}
                        </p>
                      </div>
                    ) : null}

                    <ArrowLink href="/begin" className="mt-8">
                      Commission {tier.name}
                    </ArrowLink>
                  </div>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </SectionShell>

      {/* Add-ons — what is deliberately extra, so the tier scope stays honest.
          Rates are NOT published: the figures on file are marked "suggested". */}
      <SectionShell
        tone="bone"
        marker
        eyebrow="Add-ons"
        heading="Anything outside a tier is quoted, never assumed."
        headingSize="md"
        intro="Each engagement holds a defined scope so the timeline and the quality both hold. Everything below is available on any tier and priced with your proposal — never added silently to an invoice."
      >
        <Reveal>
          <ul className="grid max-w-editorial gap-x-gutter gap-y-3 sm:grid-cols-2">
            {ADD_ONS.map((item) => (
              <li key={item} className="flex gap-3.5 border-t border-ink/15 pt-3">
                <span aria-hidden className="mt-[0.6em] h-px w-3 shrink-0 bg-flare-deep" />
                <span className="font-sans text-fluid-sm leading-relaxed text-ink/70">
                  {item}
                </span>
              </li>
            ))}
          </ul>
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

      {/* FAQ — first-recess, so the page keeps alternating rather than running flat */}
      <SectionShell tone="bone" eyebrow="Questions" heading="The honest answers." headingSize="md">
        <Reveal>
          <FAQAccordion items={FAQ} />
        </Reveal>
      </SectionShell>

      {/* CTA — the page's ONE dark moment. `marker` is off: the heading already
          carries the flare, and a section gets one flare element, not two. */}
      <SectionShell
        tone="dark"
        heading="Let’s build something worth owning."
        accent="worth"
        headingSize="xl"
        className="!pb-14"
      >
        <Button href="/begin" variant="onDark">
          Begin your project
        </Button>
      </SectionShell>
    </>
  );
}
