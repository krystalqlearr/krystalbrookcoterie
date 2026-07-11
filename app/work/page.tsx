import type { Metadata } from "next";
import ProjectCard from "@/components/ProjectCard";
import SectionShell from "@/components/SectionShell";

export const metadata: Metadata = {
  title: "Work — Krystal Brook Coterie",
  description:
    "Selected custom-coded work. Glowtoure is the current flagship; more case studies are in production.",
};

export default function WorkPage() {
  return (
    <SectionShell
      className="pt-32 md:pt-40"
      eyebrow="Selected work"
      heading="Few projects. Each one fully owned."
      accent="owned"
      accentColor="terracotta"
      headingAs="h1"
      intro="KBC is early and deliberate. Every site is hand-built in code and made to compound in value — so the list stays short on purpose. Glowtoure is the current flagship; further case studies are in production."
    >
      {/* Asymmetric editorial layout, per the design direction's Selected Work
          grid (1.4fr / 1fr, align-items:end): Glowtoure anchors large on the left,
          the next case study sits smaller and lifted, bottom-aligned to the feature. */}
      <div className="grid gap-x-gutter gap-y-16 lg:grid-cols-[1.4fr_1fr] lg:items-end">
        <ProjectCard
          size="feature"
          client="Glowtoure"
          tag="Next.js · Tailwind · Vercel"
          descriptor="A luxury tan, given a luxury home"
          href="/work/glowtoure"
        />
        <ProjectCard
          size="side"
          client="Next case study"
          tag="In production"
          descriptor="More, soon"
        />
      </div>
    </SectionShell>
  );
}
