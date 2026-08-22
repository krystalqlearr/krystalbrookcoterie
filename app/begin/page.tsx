import type { Metadata } from "next";
import EnquiryForm from "@/components/EnquiryForm";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/motion/Reveal";
import TextReveal from "@/components/motion/TextReveal";
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
          <div>
            <p className="mb-8 max-w-measure font-sans text-fluid-base leading-relaxed text-ink/70">
              <TextReveal>
                Every engagement begins with alignment. The details below help determine
                the right scope, timing, and level of partnership for your project.
              </TextReveal>
            </p>
            <Reveal>
              <EnquiryForm />
            </Reveal>
            <p className="mt-10 max-w-measure font-sans text-fluid-base text-ink/70">
              <TextReveal delay={0.06}>
                Projects are accepted selectively to preserve the depth and attention each
                engagement requires. You can expect a response within two business days.
              </TextReveal>
            </p>
          </div>

          {/* Aside — email/Instagram are short link labels, treated as meta/data like
              everywhere else on the site; the "good fit" bullets are full sentences,
              so they get the same TextReveal bullet treatment as /services and the
              case-study scope list. The outer Reveal is gone since the bullets now
              self-animate — "Prefer email?" and the links ride in unanimated. */}
          <aside className="space-y-10 lg:border-l lg:border-ink/12 lg:pl-12">
            <div>
              <p className="type-meta text-ink/70">Prefer email?</p>
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
              <p className="type-meta text-ink/70">A good fit is</p>
              <ul className="mt-4 space-y-3 font-sans text-fluid-base leading-relaxed text-ink/70">
                <li>
                  <TextReveal>
                    Founder-led beauty, med-spa, wellness, bridal, or luxury lifestyle.
                  </TextReveal>
                </li>
                <li>
                  <TextReveal delay={0.04}>
                    A brand that has outgrown a template — and knows it.
                  </TextReveal>
                </li>
                <li>
                  <TextReveal delay={0.08}>Ready to invest in something owned, not rented.</TextReveal>
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </SectionShell>
    </>
  );
}
