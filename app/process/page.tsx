import type { Metadata } from "next";
import Button from "@/components/Button";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/motion/Reveal";
import SectionShell from "@/components/SectionShell";

export const metadata: Metadata = {
  title: "Process",
  description:
    "Beautiful is not the brief. How the studio works — a strategy-first process that builds brand experiences that are exact, commercially effective, and impossible to confuse with anyone else.",
};

const PHASES = [
  {
    n: "01",
    title: "Position",
    body: "We define the brand’s position, audience, offer, competitive landscape, and desired perception. This becomes the strategic standard against which every decision is made.",
  },
  {
    n: "02",
    title: "Direct",
    body: "The visual world takes shape through typography, composition, imagery, motion, and art direction. The objective is not to follow the category — it is to create a presence the category recognizes.",
  },
  {
    n: "03",
    title: "Design",
    body: "Every page is designed around hierarchy, emotion, and movement. The experience is built to hold attention, communicate value, and make the next step feel inevitable.",
  },
  {
    n: "04",
    title: "Build",
    body: "The approved direction is translated into a precise, responsive website with refined interactions, considered performance, and a backend your team can actually use.",
  },
  {
    n: "05",
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

      {/* Process intro */}
      <SectionShell as="section" className="pt-0">
        <Reveal>
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

      <SectionShell as="section" className="pt-0">
        <ol className="flex flex-col">
          {PHASES.map((p) => (
            <Reveal as="li" key={p.n} className="group border-t border-ink/15 py-10 md:py-12">
              <div className="grid gap-x-gutter gap-y-4 md:grid-cols-[auto_1fr] md:items-baseline">
                <span className="font-display text-fluid-xl font-extrabold text-ink/30 md:w-28">
                  {p.n}
                </span>
                <div className="max-w-measure">
                  <h2 className="font-display text-fluid-xl font-extrabold uppercase tracking-[-0.01em] text-ink">{p.title}</h2>
                  <p className="mt-3 font-sans text-fluid-base leading-relaxed text-ink/70">{p.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </ol>
      </SectionShell>

      {/* CTA — charcoal showstopper */}
      <SectionShell
        tone="charcoal"
        marker
        heading="Ready when you are."
        accent="Ready"
        headingSize="xl"
      >
        <Button href="/begin" variant="onCharcoal">
          Begin your project
        </Button>
      </SectionShell>
    </>
  );
}
