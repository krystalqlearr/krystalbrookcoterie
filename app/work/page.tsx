import type { Metadata } from "next";
import ArrowLink from "@/components/ArrowLink";
import Eyebrow from "@/components/Eyebrow";
import Reveal, { RevealItem } from "@/components/motion/Reveal";
import SectionMarker from "@/components/SectionMarker";
import WorkShowcase from "@/components/WorkShowcase";

export const metadata: Metadata = {
  title: "Work",
  description:
    "The work speaks first. Selected identities and digital experiences created for brands with a clear point of view — and the ambition to build something people remember.",
};

export default function WorkPage() {
  return (
    <section className="pb-section pt-32 md:pt-40">
      <div className="relative overflow-hidden">
        <SectionMarker label="Work" side="right" />
        <div className="container relative z-10">
          <Reveal stagger={0.1}>
            <RevealItem variant="soft">
              <Eyebrow>Selected work</Eyebrow>
            </RevealItem>
            <RevealItem variant="soft">
              <h1 className="type-display mt-8 max-w-[15ch] text-fluid-display text-ink">
                The work speaks first.
              </h1>
            </RevealItem>
            <RevealItem variant="fade">
              <p className="mt-8 max-w-measure font-sans text-fluid-lg text-ink/70">
                Selected identities and digital experiences created for brands with a
                clear point of view — and the ambition to build something people
                remember.
              </p>
            </RevealItem>
          </Reveal>
        </div>
      </div>

      {/* Each frame slides in from the side of the grid it sits on (lib/work `enter`). */}
      <div className="container mt-20 md:mt-28">
        <WorkShowcase />
      </div>

      {/* The page ended on the last project with nowhere to go. */}
      <Reveal variant="fade" className="container mt-30">
        <ArrowLink href="/begin">Commission a project</ArrowLink>
      </Reveal>
    </section>
  );
}
