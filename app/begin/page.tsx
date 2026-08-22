import type { Metadata } from "next";
import EnquiryForm from "@/components/EnquiryForm";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/motion/Reveal";
import SectionShell from "@/components/SectionShell";

export const metadata: Metadata = {
  title: "Commission",
  description:
    "For founders ready to create a more distinctive, credible, and commercially powerful digital presence. Projects are accepted selectively.",
};

export default function BeginPage() {
  return (
    <>
      <PageHero
        marker="Commission"
        eyebrow="Commission"
        title="Let’s build what comes next."
        accent="next"
        intro="For founders ready to create a more distinctive, credible, and commercially powerful digital presence. Share where the brand stands today, what is changing, and what the next version must make possible."
      />

      <SectionShell as="section" className="pt-0">
        <div className="grid gap-x-gutter gap-y-14 lg:grid-cols-[1.4fr_0.6fr]">
          <Reveal>
            <p className="mb-8 max-w-measure font-sans text-fluid-base leading-relaxed text-ink/70">
              Every engagement begins with alignment. The details below help determine
              the right scope, timing, and level of partnership for your project.
            </p>
            <EnquiryForm />
            <p className="mt-10 max-w-measure font-sans text-fluid-base leading-normal text-ink/70">
              Projects are accepted selectively to preserve the depth and attention each
              engagement requires. You can expect a response within two business days.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <aside className="space-y-10 lg:border-l lg:border-ink/12 lg:pl-12">
              <div>
                <p className="font-sans text-xs font-semibold uppercase tracking-[0.13em] text-ink/70">Prefer email?</p>
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
                <p className="font-sans text-xs font-semibold uppercase tracking-[0.13em] text-ink/70">
                  A good fit is
                </p>
                <ul className="mt-4 space-y-3 font-sans text-fluid-base leading-relaxed text-ink/70">
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
