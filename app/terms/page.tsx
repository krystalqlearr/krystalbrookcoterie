import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import SectionShell from "@/components/SectionShell";

export const metadata: Metadata = {
  title: "Terms",
  description: "The terms that govern use of the Krystal Brook Coterie website.",
};

const SECTIONS = [
  {
    h: "Use of this site",
    p: "This website is provided for information about the studio and its services. By using it, you agree to use it lawfully and not to disrupt or misuse it.",
  },
  {
    h: "Enquiries & proposals",
    p: "Submitting an enquiry does not create a contract or guarantee availability. Any engagement is governed by a separate written proposal and agreement signed by both parties.",
  },
  {
    h: "Intellectual property",
    p: "The design, code, and content of this website are owned by Krystal Brook Coterie unless otherwise noted. Project deliverables are transferred to clients as set out in each engagement’s agreement.",
  },
  {
    h: "No warranty",
    p: "The site is provided “as is,” without warranties of any kind. We work to keep it accurate and available but do not guarantee it will always be error-free or uninterrupted.",
  },
  {
    h: "Limitation of liability",
    p: "To the extent permitted by law, Krystal Brook Coterie is not liable for indirect or consequential damages arising from use of this website.",
  },
  {
    h: "Contact",
    p: "Questions about these terms can be sent to hello@krystalbrookcoterie.com.",
  },
];

export default function TermsPage() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Terms of use." size="lg" />
      <SectionShell as="section" className="pt-0">
        <div className="max-w-measure space-y-10">
          <p className="font-sans text-fluid-base leading-relaxed text-ink/70">
            These terms govern your use of the Krystal Brook Coterie website, operated by
            Lion &amp; Gazelle Holdings LLC.
          </p>
          {SECTIONS.map((s) => (
            <div key={s.h} className="border-t border-ink/12 pt-6">
              <h2 className="type-display text-fluid-xl text-ink">{s.h}</h2>
              <p className="mt-3 font-sans text-fluid-base leading-relaxed text-ink/70">{s.p}</p>
            </div>
          ))}
          <p className="border-t border-ink/12 pt-6 type-meta text-ink/70">
            This is a working summary pending final review by counsel before launch.
          </p>
        </div>
      </SectionShell>
    </>
  );
}
