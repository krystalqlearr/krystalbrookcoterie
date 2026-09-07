import type { Metadata } from "next";
import ArrowLink from "@/components/ArrowLink";
import Button from "@/components/Button";
import IndexMeta from "@/components/IndexMeta";
import PageHero from "@/components/PageHero";
import Reveal, { RevealItem } from "@/components/motion/Reveal";
import SectionShell from "@/components/SectionShell";

export const metadata: Metadata = {
  title: "Process",
  description:
    "Beautiful is not the brief. How the studio works — a strategy-first process that builds brand experiences that are exact, commercially effective, and impossible to confuse with anyone else.",
};

const PHASES = [
  {
    title: "Position",
    body: "We define the brand’s position, audience, offer, competitive landscape, and desired perception. This becomes the strategic standard against which every decision is made.",
  },
  {
    title: "Direct",
    body: "The visual world takes shape through typography, composition, imagery, motion, and art direction. The objective is not to follow the category — it is to create a presence the category recognizes.",
  },
  {
    title: "Design",
    body: "Every page is designed around hierarchy, emotion, and movement. The experience is built to hold attention, communicate value, and make the next step feel inevitable.",
  },
  {
    title: "Build",
    body: "The approved direction is translated into a precise, responsive website with refined interactions, considered performance, and a backend your team can actually use.",
  },
  {
    title: "Release",
    body: "Before launch, every detail is reviewed across devices, content is finalized, and the site is prepared to enter the world exactly as intended.",
  },
];

export default function ProcessPage() {
  return (
    <>
      <PageHero
        marker="Process"
        eyebrow="Process"
        title="Beautiful is not the brief."
        accent="brief"
        intro="The goal is a brand experience that is beautiful, strategically exact, commercially effective, and impossible to confuse with anyone else."
      />

      {/* The argument, before the mechanics */}
      <SectionShell as="section" className="pt-0">
        <Reveal variant="fade">
          <div className="max-w-measure space-y-5 font-sans text-fluid-base leading-relaxed text-ink/70">
            <p>
              Every project begins beneath the surface. We clarify what the brand stands
              for, who it must move, and what the website needs to accomplish before a
              visual direction is established.
            </p>
            <p>
              The result is not decoration. It is a complete digital system built to
              sharpen perception and support the next stage of the business.
            </p>
          </div>
        </Reveal>
      </SectionShell>

      {/* The five phases — the same counted-row pattern as the /services tiers, so a
          sequence reads identically wherever it appears on the site. The numerals
          previously ran as five neon display figures; that spent the flare five times
          on one page. IndexMeta carries the count in the AA-safe stop instead, and
          the phase name takes the display weight. */}
      <SectionShell tone="rule" eyebrow="How it runs" heading="Five phases, in order.">
        <ol className="border-b border-ink/15">
          {PHASES.map((phase, i) => (
            <Reveal as="li" variant="fade" key={phase.title} className="border-t border-ink/15">
              <div className="grid gap-x-gutter gap-y-5 py-12 lg:grid-cols-[13rem_1fr]">
                <IndexMeta index={i + 1} total={PHASES.length} />
                <div className="max-w-measure">
                  <h2 className="type-display text-fluid-2xl text-ink">{phase.title}</h2>
                  <p className="mt-5 font-sans text-fluid-base leading-relaxed text-ink/70">
                    {phase.body}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </ol>

        <Reveal variant="fade" delay={0.1}>
          <div className="mt-18">
            <ArrowLink href="/services">See what each phase covers</ArrowLink>
          </div>
        </Reveal>
      </SectionShell>

      {/* The coterie — how each client is held, not just what the steps are. The
          word in the name means a small circle; this is what it means in practice.
          WORKING COPY until the copy review (docs/kbc-copy.md, "Process"). */}
      <SectionShell
        tone="rule"
        eyebrow="The coterie"
        heading="A small circle, on purpose."
        headingSize="md"
        intro="Coterie means a small, chosen circle. It is also how the studio runs."
      >
        <Reveal as="ul" stagger={0.08} className="grid max-w-editorial gap-x-gutter gap-y-8 sm:grid-cols-2">
          {[
            ["One senior hand", "Every decision — strategy, design, code, the words — is made by the person you commissioned. Nothing is handed down."],
            ["A fixed number at a time", "The studio takes a limited number of commissions at once, so each one has the attention its price implies."],
            ["Direct access", "You talk to the person doing the work. Questions are answered by the person who knows the answer."],
            ["Revisions in hours", "Because the whole system is held in one head, a change is a conversation, not a ticket."],
          ].map(([title, body]) => (
            <RevealItem as="li" variant="fade" key={title} className="border-t border-ink/12 pt-5">
              <h3 className="type-display text-fluid-xl text-ink">{title}</h3>
              <p className="mt-3 max-w-[40ch] font-sans text-fluid-base leading-relaxed text-ink/70">{body}</p>
            </RevealItem>
          ))}
        </Reveal>
      </SectionShell>

      {/* CTA — the page's one dark moment. `marker` is off: the heading already
          carries the flare, and a section gets one flare element, not two. */}
      <SectionShell
        tone="dark"
        heading="Ready when you are."
        accent="Ready"
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
