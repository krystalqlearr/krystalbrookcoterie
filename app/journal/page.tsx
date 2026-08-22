import type { Metadata } from "next";
import ArrowLink from "@/components/ArrowLink";
import Button from "@/components/Button";
import IndexMeta from "@/components/IndexMeta";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/motion/Reveal";
import TextReveal from "@/components/motion/TextReveal";
import SectionShell from "@/components/SectionShell";

export const metadata: Metadata = {
  title: "Journal",
  description:
    "Observations on positioning, perception, design, and the decisions that separate a beautiful business from a powerful brand.",
};

const ENTRIES = [
  { title: "Why your luxury website still feels inexpensive", tag: "Perception" },
  { title: "The difference between looking polished and looking established", tag: "Positioning" },
  { title: "Your brand doesn’t need more content. It needs a stronger point of view.", tag: "Strategy" },
  { title: "What med-spas get wrong about premium positioning", tag: "Med-spa" },
  { title: "Why better design can support higher pricing", tag: "Commerce" },
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

      {/* The index — the same counted-row pattern as /services and /process, on the
          bone recess so the page alternates rather than running milk into the dark.
          Titles sit in INK: these are unpublished, but a muted title read as broken
          rather than forthcoming. "Forthcoming" is stated once, as a status, instead
          of being implied by greying out every headline. */}
      <SectionShell
        tone="bone"
        eyebrow="The index"
        heading="Five pieces, forthcoming."
        headingSize="md"
        intro="Written as the studio publishes them — no filler, no cadence for its own sake."
      >
        {/* Each row's title now self-animates via TextReveal (its own whileInView),
            which is why the row is no longer wrapped in a fade-up Reveal — that
            would fire a second, competing entrance on the same text. IndexMeta
            rides in unanimated, same rule as /process and /services. */}
        <ol className="border-b border-ink/15">
          {ENTRIES.map((entry, i) => (
            <li key={entry.title} className="border-t border-ink/15">
              <div className="grid gap-x-gutter gap-y-4 py-10 lg:grid-cols-[13rem_1fr]">
                <IndexMeta index={i + 1} total={ENTRIES.length} tag={entry.tag} />
                <h2 className="type-display max-w-[34ch] text-fluid-xl text-ink">
                  <TextReveal>{entry.title}</TextReveal>
                </h2>
              </div>
            </li>
          ))}
        </ol>

        <Reveal delay={0.1}>
          <div className="mt-18">
            <ArrowLink href="/begin">Ask about a piece</ArrowLink>
          </div>
        </Reveal>
      </SectionShell>

      {/* CTA — the page's one dark moment. `marker` off: the heading has the flare. */}
      <SectionShell
        tone="dark"
        heading="Rather see the work?"
        accent="work"
        headingSize="xl"
        className="!pb-14"
      >
        <Button href="/work" variant="onDark">
          View the work
        </Button>
      </SectionShell>
    </>
  );
}
