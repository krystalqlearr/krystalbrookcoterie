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
    "Krystal Brook Coterie is a custom-code-first web design studio for founder-led luxury brands — senior judgment at boutique scale.",
};

const VALUES = [
  {
    word: "Editorial",
    body: "Type does the heavy lifting. Generous space, left-aligned composition, imagery placed with intent rather than to fill a grid.",
  },
  {
    word: "Owned",
    body: "Real code on a real stack — yours outright. No platform lock-in, no rented ground, no monthly ransom to keep your brand online.",
  },
  {
    word: "Precise",
    body: "Pixel-perfect, fast, accessible. Restraint that signals confidence, and details resolved to the millimeter.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        marker="About"
        eyebrow="About"
        title="Senior judgment, at boutique scale."
        accent="judgment"
        intro="Krystal Brook Coterie designs and hand-builds custom-coded websites for founder-led beauty, med-spa, wellness, bridal, and luxury lifestyle brands — the ones who care how things feel and are ready to own something built to last."
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
              <EditorialHeading as="h2" size="md" accent="one" className="max-w-[20ch]">
                One studio, one standard, one decision-maker — me.
              </EditorialHeading>
            </RevealItem>
            <RevealItem>
              <div className="mt-6 max-w-measure space-y-5 font-sans text-fluid-base leading-relaxed text-ink/70">
                <p>
                  I started KBC because founder-led luxury brands were being handed the same
                  rented templates as everyone else — beautiful on the surface, fragile
                  underneath, and impossible to truly own. They deserved the engineering the
                  largest companies run, translated into something intimate and editorial.
                </p>
                <p>
                  Every decision here is mine — the direction, the design system, the code, the
                  words. Nothing is handed down to a junior, because there is no one to hand it
                  to. That is the whole advantage of a studio built this way: agency-grade
                  engineering with one senior mind on every detail, at a pace and price a
                  traditional agency structurally can’t reach.
                </p>
                <p>
                  The result is a site a brand owns outright — built to compound in value, not
                  age into a liability.
                </p>
              </div>
            </RevealItem>
          </Reveal>
        </div>
      </SectionShell>

      {/* Values — petrol alt-section */}
      <SectionShell tone="stone" eyebrow="What the work is" heading="Three words, held to." accent="three" headingSize="md">
        <Reveal stagger={0.1}>
          <div className="grid gap-x-gutter gap-y-10 md:grid-cols-3">
            {VALUES.map((v) => (
              <RevealItem key={v.word}>
                <div className="border-t border-ink/20 pt-5">
                  <h3 className="font-display text-fluid-lg font-extrabold uppercase tracking-[-0.01em] text-ink">{v.word}</h3>
                  <p className="mt-3 max-w-[38ch] font-sans text-fluid-base leading-relaxed text-ink/70">
                    {v.body}
                  </p>
                </div>
              </RevealItem>
            ))}
          </div>
        </Reveal>
      </SectionShell>

      {/* Taste */}
      <SectionShell eyebrow="Taste" heading="Restraint, with editorial nerve." headingSize="md">
        <Reveal>
          <div className="max-w-measure space-y-5 font-sans text-fluid-base leading-relaxed text-ink/70">
            <p>
              KBC lives deliberately between two references: The Row — luxury through what’s
              withheld — and the bold editorial confidence of the great fashion houses.
              Restraint everywhere, nerve where it counts.
            </p>
            <p>
              A dark-led canvas. A single warm accent. A fine structural line. Nothing extra —
              the kind of room that tells you, before a word is spoken, that you’re in expert
              hands.
            </p>
          </div>
        </Reveal>
      </SectionShell>

      {/* CTA — cream showstopper */}
      <SectionShell
        tone="charcoal"
        marker
        heading="If that sounds like your brand, let’s talk."
        accent="your"        headingSize="xl"
      >
        <Button href="/begin" variant="onCharcoal">
          Begin your project
        </Button>
      </SectionShell>
    </>
  );
}
