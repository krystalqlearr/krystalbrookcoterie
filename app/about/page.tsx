import type { Metadata } from "next";
import Button from "@/components/Button";
import EditorialHeading from "@/components/EditorialHeading";
import ImageFrame from "@/components/ImageFrame";
import PageHero from "@/components/PageHero";
import Reveal, { RevealItem } from "@/components/motion/Reveal";
import SectionShell from "@/components/SectionShell";

export const metadata: Metadata = {
  title: "About",
  description:
    "Strategy-led, highly art-directed websites for beauty, wellness, med-spa, and luxury lifestyle brands that have outgrown the expected.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        marker="About"
        eyebrow="About"
        title="For founders who refuse to blend in."
        accent="blend in"
        intro="I create strategic, highly art-directed websites for beauty, wellness, med-spa, and luxury lifestyle brands that have outgrown the expected."
      />

      {/* Founder — portrait + narrative, asymmetric */}
      <SectionShell as="section" className="pt-0">
        <div className="grid items-start gap-x-gutter gap-y-12 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal>
            <ImageFrame
              ratio="4/5"
              index="KB"
              alt="Krystal — founder, Krystal Brook Coterie"
              caption="Portrait — forthcoming"
              offset="down"
              sizes="(min-width: 1024px) 33vw, 100vw"
            />
          </Reveal>
          <Reveal stagger={0.12}>
            <RevealItem>
              <EditorialHeading as="h2" size="md" accent="own" className="max-w-[20ch]">
                A studio, and a point of view of its own.
              </EditorialHeading>
            </RevealItem>
            <RevealItem>
              <div className="mt-6 max-w-measure space-y-5 font-sans text-fluid-base leading-relaxed text-ink/70">
                <p>
                  I’m Krystal — the designer and creative partner behind Krystal Brook
                  Coterie, working at the intersection of brand strategy, editorial
                  design, and digital experience.
                </p>
                <p>
                  My work is for founders who understand that a website is not simply
                  where information lives. It is where value is perceived, trust is
                  formed, and the brand becomes real in the mind of the customer.
                </p>
                <p>
                  Each project is approached as its own visual world — considered from
                  the positioning beneath it to the smallest interaction on screen. The
                  result is a website that does not merely represent the business. It
                  strengthens it.
                </p>
              </div>
            </RevealItem>
          </Reveal>
        </div>
      </SectionShell>

      {/* Philosophy — bone alt-section */}
      <SectionShell
        tone="bone"
        eyebrow="Philosophy"
        heading="The standard is distinction."
        accent="distinction"
        headingSize="md"
      >
        <Reveal>
          <div className="max-w-measure space-y-5 font-sans text-fluid-base leading-relaxed text-ink/70">
            <p>
              Luxury is not created by adding more. It is created through restraint,
              precision, consistency, and a clear point of view.
            </p>
            <p>
              That principle shapes every engagement. No interchangeable layouts. No
              visual excess without purpose. No trend applied without understanding what
              it communicates.
            </p>
            <p>
              Only the elements that make the brand more recognizable, more credible, and
              more difficult to replace.
            </p>
          </div>
        </Reveal>
      </SectionShell>

      {/* CTA — the river inversion */}
      <SectionShell
        tone="river"
        marker
        heading="If that sounds like your brand, let’s talk."
        accent="your"
        headingSize="xl"
      >
        <Button href="/begin" variant="onRiver" size="lg">
          Begin your project
        </Button>
      </SectionShell>
    </>
  );
}
