import ArrowLink from "@/components/ArrowLink";
import EditorialHeading from "@/components/EditorialHeading";
import Marquee from "@/components/Marquee";
import LandingWordmark from "@/components/motion/LandingWordmark";
import Link from "next/link";
import Reveal, { RevealItem } from "@/components/motion/Reveal";
import WorkShowcase from "@/components/WorkShowcase";
import { SERVICES } from "@/lib/services";
import { WORK } from "@/lib/work";

/**
 * Home — "The Row's aesthetic, Bionic Egg's motion." The name, alone, grows and
 * floats into the header; then the site arrives small and stays small:
 *
 *   landing → the work (one frame, expanding in place)
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

// "Ways in" lists the SERVICES (what), from lib/services.ts — the tier names live on
// the hub as engagement sizes, and no price is public but the floor (2026-09-07).

export default function HomePage() {
  const [feature] = WORK;

  return (
    // PREVIEW (2026-09-12): the homepage on onyx. The attribute is the whole
    // switch — globals.css re-points the colour variables for the document, so
    // every `bg-milk`/`text-ink` below renders inverted, and the header and
    // footer follow. Remove the attribute and the page is the milk one again.
    <div data-ground="onyx">
      {/* 1 · The landing — the name, alone. It grows, then floats into the header. */}
      <LandingWordmark />

      {/* 2 · The work — one real, live project in a frame that expands in place.
             No heading here on purpose: the studio line below is the h1. */}
      <section aria-label="Selected work" className="bg-milk">
        <div className="container pb-24">
          <WorkShowcase variant="sequence" gem projects={[feature]} total={WORK.length} />
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

      {/* 4 · Seven ways in — one line each, each the door to its page. */}
      <section className="bg-milk pb-section">
        <div className="container">
          <Reveal variant="soft">
            <h2 className="type-meta text-ink/70">Ways in</h2>
          </Reveal>
          <Reveal as="ul" stagger={0.08} className="mt-8 divide-y divide-ink/12 border-y border-ink/12">
            {/* The flood: a row fills with the flare on hover and every line goes ink
                (4.2 on cherry — legal for small text). Negative margin + padding so
                the fill runs edge to edge of the list, not just the text. */}
            {SERVICES.map((s) => (
              <RevealItem as="li" variant="fade" key={s.slug}>
                <Link
                  href={`/services/${s.slug}`}
                  aria-label={`${s.name} — ${s.eyebrow}`}
                  className="group -mx-4 grid gap-y-1 px-4 py-5 transition-colors duration-600 ease-editorial hover:bg-flare focus-visible:bg-flare focus-visible:outline-none motion-reduce:transition-none sm:grid-cols-[1.4fr_1fr_auto] sm:items-baseline"
                >
                  {/* On a phone the arrow rides the name's line rather than orphaning
                      onto a third row (audit 2026-09-09, finding 13). */}
                  <span className="flex items-baseline justify-between gap-4 font-sans text-fluid-base text-ink sm:justify-start">
                    {s.name}
                    <span aria-hidden className="type-meta text-ink/70 transition-colors duration-600 ease-editorial group-hover:text-ink group-focus-visible:text-ink sm:hidden">
                      →
                    </span>
                  </span>
                  <span className="type-meta text-ink/70 transition-colors duration-600 ease-editorial group-hover:text-ink group-focus-visible:text-ink">
                    {s.eyebrow}
                  </span>
                  <span aria-hidden className="hidden type-meta text-ink/70 transition-colors duration-600 ease-editorial group-hover:text-ink group-focus-visible:text-ink sm:inline">
                    →
                  </span>
                </Link>
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

      {/* 6 · The closing line — on the canvas; the footer is the page's one
             inverted surface (milk, in this preview). */}
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
    </div>
  );
}
