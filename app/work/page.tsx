import type { Metadata } from "next";
import SectionMarker from "@/components/SectionMarker";
import WorkShowcase from "@/components/WorkShowcase";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Selected custom-coded work. Open a project and it expands, in place, into a full case study. Glowtoure is the current flagship; more are in production.",
};

export default function WorkPage() {
  return (
    <section className="pb-section pt-32 md:pt-40">
      <div className="relative overflow-hidden">
        <SectionMarker label="Work" side="right" />
        <div className="container relative z-10">
        <p className="font-sans text-xs uppercase tracking-[0.2em] text-ink/60">Selected work</p>
        <h1 className="mt-6 max-w-[15ch] font-display text-fluid-display font-extrabold uppercase tracking-[-0.01em] text-ink text-balance">
          Proof, before promises.
        </h1>
        <p className="mt-6 max-w-measure font-editorial text-fluid-lg italic leading-snug text-ink/75">
          Few projects, each fully owned. Open one — and watch the work expand into itself.
        </p>
        </div>
      </div>

      <div className="container mt-20 md:mt-28">
        <WorkShowcase />
      </div>
    </section>
  );
}
