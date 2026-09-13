import ArrowLink from "@/components/ArrowLink";
import EditorialHeading from "@/components/EditorialHeading";
import Marquee from "@/components/Marquee";
import LandingWordmark from "@/components/motion/LandingWordmark";
import Link from "next/link";
import Reveal, { RevealItem } from "@/components/motion/Reveal";
import { LINES, ON_LEFT, ON_MIDDLE } from "@/components/SectionShell";
import WorkShowcase from "@/components/WorkShowcase";
import { SERVICES } from "@/lib/services";
import { WORK } from "@/lib/work";

/**
 * Home — "The Row's aesthetic, Bionic Egg's motion." The name, alone, grows and
 * floats into the header; then the site arrives small and stays small:
 *
 *   landing → the work (one frame, expanding in place)
 *        → the statement | the seven ways in → marquee → closing line
 *        → footer (the page's only dark surface)
 *
 * ON THE THREE LINES (2026-09-12 — Krystal: "the text placements are kind of
 * random and need order"). Every block starts on the LEFT line or the MIDDLE
 * line (components/SectionShell.tsx), and the page alternates: the frame full
 * width with its caption split left | middle, then the statement on the LEFT
 * beside the index of services from the MIDDLE, then the closing on the LEFT.
 * Two size tiers — the h1 and the closing line at `md`, everything else meta or
 * body — and ONE vertical rhythm: every section is `py-section`. Before this the
 * page had a 36px h1 alone in 340px of air, a list whose right column started at
 * an x no other page used, and gaps of 192 / 340 / 373 between blocks.
 *
 * Nothing on the page persuades. Copy is the fewest true declarative words —
 * the studio line and the closing line are WORKING DEFAULTS until the copy
 * review. See docs/kbc-build-plan.md, Phase 8.
 *
 * FLARE BUDGET — the page spends zero accent touches. What's coloured is
 * functional and carved out: IndexMeta's numbers, ArrowLink's glyph. DARK — the
 * footer only.
 *
 * MOTION — words fade, media slides: the frame drops from above (the name just
 * rose), every line sharpens or fades in on scroll, the rows arrive one by one.
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

const rowMeta =
  "type-meta text-ink/70 transition-colors duration-600 ease-editorial group-hover:text-ink group-focus-visible:text-ink";

export default function HomePage() {
  const [feature] = WORK;

  return (
    <>
      {/* 1 · The landing — the name, alone. It grows, then floats into the header. */}
      <LandingWordmark />

      {/* 2 · The work — one real, live project in a frame that expands in place;
             its caption sits on the two lines the rest of the page reads on.
             No heading here on purpose: the statement below is the h1. */}
      <section aria-label="Selected work" className="py-section">
        <div className="container">
          <WorkShowcase variant="sequence" gem projects={[feature]} total={WORK.length} />
        </div>
      </section>

      {/* 3 · The statement | the index. The h1 on the LEFT line; the seven ways
             in from the MIDDLE line — statement left, index right, the editorial
             pairing. Each row is the door to its page. */}
      <section className="py-section">
        <div className="container">
          <div className={LINES}>
            <Reveal variant="soft" className={ON_LEFT}>
              <EditorialHeading as="h1" size="md" className="max-w-[16ch]">
                Websites for brands that don&rsquo;t need to explain themselves.
              </EditorialHeading>
            </Reveal>

            <div className={ON_MIDDLE}>
              <Reveal variant="soft">
                <h2 className="type-meta text-ink/70">Ways in</h2>
              </Reveal>
              <Reveal
                as="ul"
                stagger={0.08}
                className="mt-8 divide-y divide-ink/12 border-y border-ink/12"
              >
                {/* Two lines per row — the name with its arrow, the discipline beneath —
                    because the column is a half, and a half will not hold name,
                    discipline and arrow on one line without wrapping the discipline.
                    The flood: a row fills with the flare on hover and every line goes
                    ink (4.2 on cherry — legal for small text). Negative margin +
                    padding so the fill runs edge to edge of the list. */}
                {SERVICES.map((s) => (
                  <RevealItem as="li" variant="fade" key={s.slug}>
                    <Link
                      href={`/services/${s.slug}`}
                      aria-label={`${s.name} — ${s.eyebrow}`}
                      className="group -mx-4 flex flex-col gap-1 px-4 py-5 transition-colors duration-600 ease-editorial hover:bg-flare focus-visible:bg-flare focus-visible:outline-none motion-reduce:transition-none"
                    >
                      <span className="flex items-baseline justify-between gap-4 font-sans text-fluid-base text-ink">
                        {s.name}
                        <span aria-hidden className={rowMeta}>
                          →
                        </span>
                      </span>
                      <span className={rowMeta}>{s.eyebrow}</span>
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
          </div>
        </div>
      </section>

      {/* 4 · Sectors — the page's heartbeat, slow. A band, not a section. */}
      <section aria-hidden className="border-y border-ink/12 py-10">
        <Marquee items={SECTORS} />
      </section>

      {/* 5 · The closing line — on the LEFT line, at the same size as the h1: the
             page's second and last display line. The footer is the only dark
             surface. */}
      <section className="py-section">
        <div className="container">
          <Reveal variant="soft">
            <EditorialHeading as="h2" size="md" className="max-w-[16ch]">
              Ready when you are.
            </EditorialHeading>
            <div className="mt-8">
              <ArrowLink href="/begin">Commission</ArrowLink>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
