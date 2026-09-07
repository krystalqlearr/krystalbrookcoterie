import ArrowLink from "@/components/ArrowLink";
import EditorialHeading from "@/components/EditorialHeading";
import IndexMeta from "@/components/IndexMeta";
import Marquee from "@/components/Marquee";
import LandingWordmark from "@/components/motion/LandingWordmark";
import Reveal, { RevealItem } from "@/components/motion/Reveal";
import WorkShowcase from "@/components/WorkShowcase";
import { WORK } from "@/lib/work";

/**
 * Home — "The Row's aesthetic, Bionic Egg's motion." The name, alone, grows and
 * floats into the header; then the site arrives small and stays small:
 *
 *   landing → the work (one frame, expanding in place) → the two concepts, quiet
 *        → the studio line → four tiers, one line each → marquee → closing line
 *        → footer (the page's only dark surface)
 *
 * Nothing on the page persuades. Copy is the fewest true declarative words —
 * the studio line and the closing line are WORKING DEFAULTS until the copy
 * review. See docs/kbc-build-plan.md, Phase 8.
 *
 * FLARE BUDGET — the page spends zero accent touches. What's coloured is
 * functional and carved out: IndexMeta's numbers, ArrowLink's glyph, the tier
 * flag. TYPE — two tiers: the h1 at `fluid-xl` (Light 300), every h2 at
 * `type-meta`. DARK — the footer only.
 *
 * MOTION — words fade, media slides: the frame drops from above (the name just
 * rose), every line sharpens or fades in on scroll, the tiers arrive one by one.
 */

const SECTORS = [
  "Beauty",
  "Med-spa",
  "Wellness",
  "Bridal",
  "Luxury lifestyle",
  "Aesthetics",
  "Founder-led",
];

// Real prices and durations — the same claims /services makes. If one changes
// there, change it here.
const TIERS = [
  { name: "The Edit", price: "$4,500", duration: "2–3 weeks" },
  { name: "Signature", price: "$9,800", duration: "6–8 weeks", flag: "Most commissioned" },
  { name: "Atelier", price: "$22,000+", duration: "8–12 weeks" },
  { name: "Private Commission", price: "$32,000+", duration: "Scoped to the work" },
];

export default function HomePage() {
  const [feature, ...concepts] = WORK;

  return (
    <>
      {/* 1 · The landing — the name, alone. It grows, then floats into the header. */}
      <LandingWordmark />

      {/* 2 · The work — one real, live project in a frame that expands in place.
             No heading here on purpose: the studio line below is the h1. */}
      <section aria-label="Selected work" className="bg-milk">
        <div className="container">
          <WorkShowcase variant="sequence" gem projects={[feature]} total={WORK.length} />

          {/* The two concepts — quiet, honest, not expandable. */}
          <ul className="mx-auto max-w-[calc((100svh-14rem)*1.7778)] divide-y divide-ink/12 border-t border-ink/12 pb-24">
            {concepts.map((p, i) => (
              <li key={p.id} className="py-8">
                <Reveal variant="soft">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2">
                    <IndexMeta index={i + 2} total={WORK.length} tag={p.client} />
                    {p.status ? <span className="type-meta text-ink/70">{p.status}</span> : null}
                  </div>
                  <p className="mt-3 max-w-measure font-sans text-fluid-base text-ink/70">{p.descriptor}</p>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 3 · The studio line — the page's h1, small. */}
      <section className="bg-milk py-section">
        <div className="container">
          <Reveal variant="soft">
            <EditorialHeading as="h1" size="sm" className="max-w-[24ch]">
              Websites for brands that don&rsquo;t need to explain themselves.
            </EditorialHeading>
          </Reveal>
        </div>
      </section>

      {/* 4 · Four ways in — one line each. */}
      <section className="bg-milk pb-section">
        <div className="container">
          <Reveal variant="soft">
            <h2 className="type-meta text-ink/70">Ways in</h2>
          </Reveal>
          <Reveal as="ul" stagger={0.08} className="mt-8 divide-y divide-ink/12 border-y border-ink/12">
            {/* The flood: a row fills with the flare on hover and every line goes ink
                (4.3 on lipstick — legal for small text). Negative margin + padding so
                the fill runs edge to edge of the list, not just the text. */}
            {TIERS.map((tier) => (
              <RevealItem
                as="li"
                variant="fade"
                key={tier.name}
                className="group -mx-4 grid gap-y-1 px-4 py-5 transition-colors duration-600 ease-editorial hover:bg-flare motion-reduce:transition-none sm:grid-cols-[1.4fr_1fr_1fr] sm:items-baseline"
              >
                <span className="flex items-baseline gap-4 font-sans text-fluid-base text-ink">
                  {tier.name}
                  {tier.flag ? (
                    <span className="type-meta text-flare-deep transition-colors duration-600 ease-editorial group-hover:text-ink">
                      {tier.flag}
                    </span>
                  ) : null}
                </span>
                <span className="type-meta text-ink/70 transition-colors duration-600 ease-editorial group-hover:text-ink [font-variant-numeric:tabular-nums]">
                  {tier.price}
                </span>
                <span className="type-meta text-ink/70 transition-colors duration-600 ease-editorial group-hover:text-ink">
                  {tier.duration}
                </span>
              </RevealItem>
            ))}
          </Reveal>
          <Reveal variant="fade" className="mt-8">
            <ArrowLink href="/services" direction="right">
              The engagements
            </ArrowLink>
          </Reveal>
        </div>
      </section>

      {/* 5 · Sectors — the page's heartbeat, slow. */}
      <section aria-hidden className="border-y border-ink/12 py-10">
        <Marquee items={SECTORS} />
      </section>

      {/* 6 · The closing line — on milk; the footer is the only dark surface. */}
      <section className="bg-milk py-section">
        <div className="container">
          <Reveal variant="soft">
            <p className="max-w-[24ch] font-sans text-fluid-lg text-ink">Ready when you are.</p>
            <div className="mt-8">
              <ArrowLink href="/begin">Commission</ArrowLink>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
