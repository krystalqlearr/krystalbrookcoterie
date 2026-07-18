import type { Metadata } from "next";
import SectionMarker from "@/components/SectionMarker";
import WorkShowcase from "@/components/WorkShowcase";

export const metadata: Metadata = {
  title: "Work",
  description:
    "The work speaks first. Selected identities and digital experiences created for brands with a clear point of view — and the ambition to build something people remember.",
};

export default function WorkPage() {
  return (
    <section className="pb-section pt-32 md:pt-40">
      <div className="relative overflow-hidden">
        <SectionMarker label="Work" side="right" />
        <div className="container relative z-10">
        <p className="font-sans text-xs uppercase tracking-[0.2em] text-ink/60">Selected work</p>
        <h1 className="mt-6 max-w-[15ch] font-display text-fluid-display font-extrabold uppercase tracking-[-0.01em] text-ink text-balance">
          The work speaks first.
        </h1>
        <p className="mt-6 max-w-measure font-editorial text-fluid-lg italic leading-snug text-ink/75">
          Selected identities and digital experiences created for brands with a clear
          point of view — and the ambition to build something people remember.
        </p>
        </div>
      </div>

      <div className="container mt-20 md:mt-28">
        <WorkShowcase />
      </div>
    </section>
  );
}
