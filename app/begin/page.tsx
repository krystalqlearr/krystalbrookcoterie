import type { Metadata } from "next";
import EnquiryForm from "@/components/EnquiryForm";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/motion/Reveal";
import SectionShell from "@/components/SectionShell";

export const metadata: Metadata = {
  title: "Begin",
  description:
    "Start your project with Krystal Brook Coterie. Share the brand and the ambition; every enquiry is reviewed for fit within 48 hours.",
};

export default function BeginPage() {
  return (
    <>
      <PageHero
        marker="Begin"
        eyebrow="Begin"
        title="Tell me what you’re building."
        accent="building"
        intro="A few questions to understand the brand and the ambition. Every enquiry comes straight to me and is reviewed for fit within 48 hours — a match leads to a consultation and a proposal within three business days."
      />

      <SectionShell as="section" className="pt-0">
        <div className="grid gap-x-gutter gap-y-14 lg:grid-cols-[1.4fr_0.6fr]">
          <Reveal>
            <EnquiryForm />
          </Reveal>

          <Reveal delay={0.1}>
            <aside className="space-y-10 lg:border-l lg:border-ink/12 lg:pl-12">
              <div>
                <p className="font-sans text-xs uppercase tracking-[0.16em] text-ink/65">Prefer email?</p>
                <a
                  href="mailto:hello@krystalbrookcoterie.com"
                  className="mt-3 block font-sans text-fluid-base text-ink underline decoration-ink/30 underline-offset-4 transition-colors hover:decoration-ink"
                >
                  hello@krystalbrookcoterie.com
                </a>
                <a
                  href="https://www.instagram.com/krystalbrookcoterie/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 block font-sans text-fluid-base text-ink underline decoration-ink/30 underline-offset-4 transition-colors hover:decoration-ink"
                >
                  Instagram
                </a>
              </div>

              <div>
                <p className="font-sans text-xs uppercase tracking-[0.16em] text-ink/65">
                  A good fit is
                </p>
                <ul className="mt-4 space-y-3 font-sans text-fluid-base leading-relaxed text-ink/65">
                  <li>Founder-led beauty, med-spa, wellness, bridal, or luxury lifestyle.</li>
                  <li>A brand that has outgrown a template — and knows it.</li>
                  <li>Ready to invest in something owned, not rented.</li>
                </ul>
              </div>
            </aside>
          </Reveal>
        </div>
      </SectionShell>
    </>
  );
}
