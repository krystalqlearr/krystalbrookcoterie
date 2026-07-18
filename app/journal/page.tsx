import type { Metadata } from "next";
import Button from "@/components/Button";
import PageHero from "@/components/PageHero";
import Reveal, { RevealItem } from "@/components/motion/Reveal";
import SectionShell from "@/components/SectionShell";

export const metadata: Metadata = {
  title: "Journal",
  description:
    "Observations on positioning, perception, design, and the decisions that separate a beautiful business from a powerful brand.",
};

const ENTRIES = [
  { title: "Why your luxury website still feels inexpensive", tag: "Perception · Soon" },
  { title: "The difference between looking polished and looking established", tag: "Positioning · Soon" },
  { title: "Your brand doesn’t need more content. It needs a stronger point of view.", tag: "Strategy · Soon" },
  { title: "What med-spas get wrong about premium positioning", tag: "Med-spa · Soon" },
  { title: "Why better design can support higher pricing", tag: "Commerce · Soon" },
];

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

      <SectionShell as="section" className="pt-0">
        <Reveal stagger={0.1}>
          <ul className="flex flex-col">
            {ENTRIES.map((e) => (
              <RevealItem as="li" key={e.title}>
                <div className="flex flex-col gap-2 border-t border-ink/12 py-8 md:flex-row md:items-baseline md:justify-between">
                  <h2 className="max-w-[32ch] font-editorial text-fluid-lg font-normal italic text-ink/50">
                    {e.title}
                  </h2>
                  <span className="font-sans text-xs uppercase tracking-[0.16em] text-ink/55">
                    {e.tag}
                  </span>
                </div>
              </RevealItem>
            ))}
          </ul>
        </Reveal>
      </SectionShell>

      <SectionShell
        tone="charcoal"
        marker
        heading="Rather see the work?"
        accent="work"
        headingSize="xl"
      >
        <Button href="/work" variant="onCharcoal">
          View the work
        </Button>
      </SectionShell>
    </>
  );
}
