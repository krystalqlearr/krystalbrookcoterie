import { type ReactNode } from "react";
import EditorialHeading from "./EditorialHeading";
import Eyebrow from "./Eyebrow";
import SectionMarker from "./SectionMarker";
import Reveal, { RevealItem } from "./motion/Reveal";

/**
 * Consistent page opener — muted eyebrow + Regular-400 sentence-case display
 * headline (the accent word carries the page's flare) + a quiet intro one
 * register down. Left-aligned, choreographed in. Reserves space for the fixed
 * header. An optional `marker` renders the giant vertical section label up the
 * right edge. Used by every top-level page so openings read as one system.
 */
type Props = {
  eyebrow: string;
  title: string;
  accent?: string;
  intro?: ReactNode;
  size?: "lg" | "xl";
  marker?: string;
};

export default function PageHero({ eyebrow, title, accent, intro, size = "xl", marker }: Props) {
  return (
    <section className="relative overflow-hidden pb-14 pt-32 md:pb-20 md:pt-40">
      {marker ? <SectionMarker label={marker} side="right" /> : null}
      <div className="container relative z-10">
        <Reveal stagger={0.1}>
          <RevealItem>
            <Eyebrow>{eyebrow}</Eyebrow>
          </RevealItem>
          <RevealItem>
            <EditorialHeading as="h1" size={size} accent={accent} className="mt-6 max-w-[20ch]">
              {title}
            </EditorialHeading>
          </RevealItem>
          {intro ? (
            <RevealItem>
              <div className="mt-7 max-w-measure font-sans text-fluid-lg leading-normal text-ink/70">
                {intro}
              </div>
            </RevealItem>
          ) : null}
        </Reveal>
      </div>
    </section>
  );
}
