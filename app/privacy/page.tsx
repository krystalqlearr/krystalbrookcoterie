import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import SectionShell from "@/components/SectionShell";

export const metadata: Metadata = {
  title: "Privacy",
  description: "How Krystal Brook Coterie collects, uses, and protects your information.",
};

const SECTIONS = [
  {
    h: "What we collect",
    p: "When you submit an enquiry, we collect the details you provide — your name, brand, email, links, and project information. We do not collect payment or financial details through this website.",
  },
  {
    h: "How we use it",
    p: "Your information is used solely to respond to your enquiry, assess project fit, and communicate about working together. We do not sell or rent your information to anyone.",
  },
  {
    h: "Analytics & cookies",
    p: "We may use privacy-respecting analytics to understand how the site is used. Any non-essential tracking is opt-in, and essential functionality never requires you to accept marketing cookies.",
  },
  {
    h: "Data retention",
    p: "Enquiry information is kept only as long as needed to evaluate and pursue a potential engagement, after which it is deleted on request or in the ordinary course.",
  },
  {
    h: "Your rights",
    p: "You may request access to, correction of, or deletion of the information you’ve shared at any time by writing to hello@krystalbrookcoterie.com.",
  },
  {
    h: "Contact",
    p: "Questions about this policy can be sent to hello@krystalbrookcoterie.com.",
  },
];

export default function PrivacyPage() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Privacy policy." size="lg" />
      <SectionShell as="section" className="pt-0">
        <div className="max-w-measure space-y-10">
          <p className="font-sans text-fluid-base leading-relaxed text-ink/70">
            Krystal Brook Coterie (a DBA of Lion &amp; Gazelle Holdings LLC) respects your
            privacy. This summary explains what we collect and how we use it.
          </p>
          {SECTIONS.map((s) => (
            <div key={s.h} className="border-t border-ink/12 pt-6">
              <h2 className="type-display text-fluid-xl text-ink">{s.h}</h2>
              <p className="mt-3 font-sans text-fluid-base leading-relaxed text-ink/70">{s.p}</p>
            </div>
          ))}
          <p className="border-t border-ink/12 pt-6 font-sans text-xs uppercase tracking-[0.12em] text-ink/70">
            This is a working summary pending final review by counsel before launch.
          </p>
        </div>
      </SectionShell>
    </>
  );
}
