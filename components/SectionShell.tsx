import { type ReactNode } from "react";
import Eyebrow from "./Eyebrow";
import EditorialHeading from "./EditorialHeading";
import Rule from "./Rule";

/**
 * Section wrapper providing editorial vertical rhythm and a consistent, always
 * left-aligned header block: flare tick → META eyebrow → DISPLAY heading → intro.
 *
 * `tone` sets the canvas so a page alternates instead of scrolling flat. Three
 * sheets of one stock descending from the canvas, plus the dark inversion:
 *  - light   : THE CANVAS (milk) — the default; paints nothing, inherits the page
 *  - bone    : first recess — the warm alt-section, the workhorse for rhythm
 *  - stone   : deepest recess — the quietest band
 *  - dark    : the forest inversion moment (proof bands, closing CTAs), bone text
 *
 * FLARE DISCIPLINE: the eyebrow is deliberately muted, not flare-coloured. A section gets at
 * most one flare element — either the `marker` tick or the heading's `accent` word.
 * If you pass an accent, leave marker off, and vice versa.
 *
 * The intro is grotesk, not serif: the serif-italic supporting voice is retired.
 */
type Tone = "light" | "bone" | "stone" | "dark";

const toneStyles: Record<
  Tone,
  { section: string; eyebrow: "muted" | "onDark"; marker: "flare"; intro: string }
> = {
  light: { section: "text-ink", eyebrow: "muted", marker: "flare", intro: "text-ink/70" },
  bone: { section: "bg-bone text-ink", eyebrow: "muted", marker: "flare", intro: "text-ink/70" },
  stone: { section: "bg-stone text-ink", eyebrow: "muted", marker: "flare", intro: "text-ink/70" },
  dark: {
    section: "bg-forest text-bone",
    eyebrow: "onDark",
    marker: "flare",
    intro: "text-bone/70",
  },
};

type Props = {
  eyebrow?: string;
  heading?: string;
  accent?: string;
  intro?: ReactNode;
  marker?: boolean;
  container?: boolean;
  tone?: Tone;
  as?: "section" | "header";
  id?: string;
  headingAs?: "h1" | "h2" | "h3";
  headingSize?: "sm" | "md" | "lg" | "xl";
  children?: ReactNode;
  className?: string;
};

export default function SectionShell({
  eyebrow,
  heading,
  accent,
  intro,
  marker = false,
  container = true,
  tone = "light",
  as: As = "section",
  id,
  headingAs = "h2",
  headingSize = "lg",
  children,
  className = "",
}: Props) {
  const t = toneStyles[tone];
  const hasHeader = marker || Boolean(eyebrow) || Boolean(heading) || Boolean(intro);

  const inner = (
    <>
      {hasHeader ? (
        <div className="flex flex-col gap-6">
          {marker ? <Rule width="short" tone={t.marker} className="mb-1" /> : null}
          {eyebrow ? <Eyebrow tone={t.eyebrow}>{eyebrow}</Eyebrow> : null}
          {heading ? (
            <EditorialHeading
              as={headingAs}
              size={headingSize}
              accent={accent}
              // Stone drops the accent to the `deep` stop; the neon fails on it.
              canvas={tone === "light" ? "milk" : tone}
              className="max-w-[18ch]"
            >
              {heading}
            </EditorialHeading>
          ) : null}
          {intro ? (
            <div className={`max-w-measure font-sans text-fluid-lg ${t.intro}`}>{intro}</div>
          ) : null}
        </div>
      ) : null}
      {children ? <div className={hasHeader ? "mt-16" : ""}>{children}</div> : null}
    </>
  );

  return (
    <As id={id} className={`py-section ${t.section} ${className}`}>
      {container ? <div className="container">{inner}</div> : inner}
    </As>
  );
}
