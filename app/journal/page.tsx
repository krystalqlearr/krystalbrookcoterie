import type { Metadata } from "next";
import Link from "next/link";
import ArrowLink from "@/components/ArrowLink";
import Button from "@/components/Button";
import IndexMeta from "@/components/IndexMeta";
import PageHero from "@/components/PageHero";
import Reveal, { RevealItem } from "@/components/motion/Reveal";
import ClosingCTA from "@/components/ClosingCTA";
import SectionShell from "@/components/SectionShell";
import { POSTS } from "@/lib/journal";

export const metadata: Metadata = {
  title: "Journal",
  description:
    "Observations on positioning, perception, design, and the decisions that separate a beautiful business from a powerful brand.",
};

// The index is derived from lib/journal.ts, so what this page lists and what is
// actually published can never disagree. A piece becomes a link by gaining a
// body there; until then it is a plain line with no route behind it.
const PUBLISHED = POSTS.filter((p) => p.body?.length).length;
const FORTHCOMING = POSTS.length - PUBLISHED;
const COUNT_LINE =
  FORTHCOMING === 0
    ? `${PUBLISHED === 1 ? "One piece" : `${PUBLISHED} pieces`}.`
    : PUBLISHED === 0
      ? `${POSTS.length} pieces, forthcoming.`
      : `${PUBLISHED === 1 ? "One piece" : `${PUBLISHED} pieces`}, ${FORTHCOMING} forthcoming.`;

export default function JournalPage() {
  return (
    <>
      <PageHero
        marker="Journal"
        eyebrow="Journal"
        title="On brand, beauty & digital presence."
        accent="presence"
        intro="Observations on positioning, perception, design, and the decisions that separate a beautiful business from a powerful brand."
      />

      {/* The index — the same counted-row pattern as /services and /process, on the
          milk recess so the page alternates rather than running milk into the dark.
          Titles sit in INK: these are unpublished, but a muted title read as broken
          rather than forthcoming. "Forthcoming" is stated once, as a status, instead
          of being implied by greying out every headline. */}
      <SectionShell
        tone="rule"
        eyebrow="The index"
        heading={COUNT_LINE}
        headingSize="md"
        intro="Written as the studio publishes them — no filler, no cadence for its own sake."
      >
        <Reveal stagger={0.1}>
          <ol className="border-b border-ink/15">
            {POSTS.map((entry, i) => {
              const live = Boolean(entry.body?.length);
              const row = (
                <div className="grid gap-x-gutter gap-y-4 py-10 lg:grid-cols-4">
                  <div className="lg:col-span-2">
                    <IndexMeta index={i + 1} total={POSTS.length} tag={entry.tag} />
                  </div>
                  <div className="lg:col-span-2">
                    <h2 className="type-display max-w-[34ch] text-fluid-2xl text-ink">
                      {entry.title}
                    </h2>
                    {/* A published piece says so by being readable; a forthcoming
                        one says so in words rather than by being greyed out. */}
                    <p className="type-meta mt-4 text-ink/70">
                      {live ? "Read the piece" : "Forthcoming"}
                    </p>
                  </div>
                </div>
              );
              return (
                <RevealItem as="li" variant="soft" key={entry.slug} className="border-t border-ink/15">
                  {live ? (
                    <Link
                      href={`/journal/${entry.slug}`}
                      className="block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
                      data-cursor="hover"
                    >
                      {row}
                    </Link>
                  ) : (
                    row
                  )}
                </RevealItem>
              );
            })}
          </ol>
        </Reveal>

        <Reveal variant="fade" delay={0.1}>
          <div className="mt-18">
            <ArrowLink href="/begin">Ask about a piece</ArrowLink>
          </div>
        </Reveal>
      </SectionShell>

      {/* CTA — the page's one dark moment. `marker` off: the heading has the flare. */}
      <ClosingCTA
        heading="Rather see the work?"
        accent="work"
      >
        <Button href="/work" variant="onDark">
          View the work
        </Button>
      </ClosingCTA>
    </>
  );
}
