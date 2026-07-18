import type { Metadata } from "next";
import Button from "@/components/Button";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/motion/Reveal";
import SectionShell from "@/components/SectionShell";

export const metadata: Metadata = {
  title: "Process",
  description:
    "How the studio works: a considered path from inquiry to launch, with senior judgment on every decision and revision cycles measured in hours.",
};

const PHASES = [
  {
    n: "01",
    title: "Inquiry",
    body: "You share the brand, the ambition, and the timing through the enquiry. Every inquiry is reviewed for fit within 48 hours — I only take work I can make exceptional.",
  },
  {
    n: "02",
    title: "Fit & consultation",
    body: "If it’s a match, we meet for a focused 30-minute consultation — the brand, the goals, the standard. If it isn’t, I’ll point you somewhere better. No hard sell, ever.",
  },
  {
    n: "03",
    title: "Proposal",
    body: "Within three business days you receive a clear proposal: scope, tier, timeline, and price. One decision-maker, one document, nothing buried.",
  },
  {
    n: "04",
    title: "Design",
    body: "I direct the art direction and design system to a single approved vision. You see the real thing early, and revision cycles are measured in hours, not weeks.",
  },
  {
    n: "05",
    title: "Build",
    body: "The approved design is engineered by hand, in code — pixel-perfect, fast, and accessible. No page builders, no compromises hidden under a theme.",
  },
  {
    n: "06",
    title: "Launch & handover",
    body: "We ship to your own infrastructure and hand over everything — the code, the system, the keys. You own it outright, and a Care Plan keeps it in condition.",
  },
];

export default function ProcessPage() {
  return (
    <>
      <PageHero
        marker="Process"
        eyebrow="Process"
        title="A considered path, from first word to launch."
        accent="considered"
        intro="Boutique scale is the advantage: one senior mind on every decision, a short and honest path, and work that moves as fast as your brand needs without ever feeling rushed."
      />

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

      {/* After you inquire — petrol alt-section */}
      <SectionShell
        tone="stone"
        eyebrow="After you inquire"
        heading="What happens next is simple."
        headingSize="md"
        intro="Your inquiry lands with me directly. Within 48 hours it’s reviewed for fit; a match leads to a consultation and a proposal within three business days. Clear, quick, and human at every step."
      />

      {/* CTA — cream showstopper */}
      <SectionShell
        tone="charcoal"
        marker
        heading="Ready when you are."
        accent="Ready"        headingSize="xl"
      >
        <Button href="/begin" variant="onCharcoal">
          Begin your project
        </Button>
      </SectionShell>
    </>
  );
}
