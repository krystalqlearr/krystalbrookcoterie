import { type ReactNode } from "react";
import EditorialHeading from "./EditorialHeading";
import Eyebrow from "./Eyebrow";
import SectionMarker from "./SectionMarker";
import Reveal, { RevealItem } from "./motion/Reveal";

/**
 * Consistent page opener — META eyebrow + fluid DISPLAY headline + grotesk intro,
 * left-aligned, choreographed in. Reserves space for the fixed header. An optional
 * `marker` renders the giant vertical section label up the right edge. Used by
 * every top-level page so openings read as one system.
 *
 * Write the title as short declarative sentences ending in a period — that
 * cadence is what the display register is built for.
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
          <RevealItem variant="soft">
            <Eyebrow>{eyebrow}</Eyebrow>
          </RevealItem>
          <RevealItem variant="soft">
            {/* `accent-on-load` tells globals.css that this heading is already on
                screen when the page arrives, so its accent word develops on a
                clock rather than waiting for a scroll that never comes. */}
            <EditorialHeading
              as="h1"
              size={size}
              accent={accent}
              className="accent-on-load mt-6 max-w-[20ch]"
            >
              {title}
            </EditorialHeading>
          </RevealItem>
          {intro ? (
            <RevealItem variant="fade">
              <div className="mt-8 max-w-measure font-sans text-fluid-lg text-ink/70">
                {intro}
              </div>
            </RevealItem>
          ) : null}
        </Reveal>
      </div>
    </section>
  );
}
