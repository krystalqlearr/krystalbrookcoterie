import type { Metadata } from "next";
import Button from "@/components/Button";
import PageHero from "@/components/PageHero";
import Reveal, { RevealItem } from "@/components/motion/Reveal";
import SectionShell from "@/components/SectionShell";

export const metadata: Metadata = {
  title: "Journal",
  description:
    "Notes from the studio on custom-coded web design, editorial craft, and building brands worth owning.",
};

const ENTRIES = [
  { title: "Rented vs. owned: what a template actually costs", tag: "Positioning · Soon" },
  { title: "The Glowtoure build, in detail", tag: "Case study · In production" },
  { title: "What you actually own when the site is yours", tag: "Studio · Soon" },
];

export default function JournalPage() {
  return (
    <>
      <PageHero
        marker="Journal"
        eyebrow="Journal"
        title="Notes from the studio."
        accent="studio"
        intro="Writing on custom-coded craft, editorial design, and building brands worth owning. The first entries are in production."
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
        accent="work"        headingSize="xl"
      >
        <Button href="/work" variant="onCharcoal">
          View the work
        </Button>
      </SectionShell>
    </>
  );
}
