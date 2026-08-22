import { type ReactNode } from "react";
import Eyebrow from "./Eyebrow";
import EditorialHeading from "./EditorialHeading";
import Rule from "./Rule";

/**
 * Section wrapper providing editorial vertical rhythm and a consistent left-aligned
 * header block. `tone` sets the sheet so pages read as one stock in recesses —
 * elevation only goes DOWN from milk — with the river as punctuation:
 *  - light : default milk canvas, ink text
 *  - bone  : first recess — the warm alt-section, the workhorse for rhythm
 *  - stone : deepest recess — the quietest band (never carries the neon flare)
 *  - river : the dark inversion moment (proof bands, closing CTAs), bone text
 * The flare is rationed: the heading's accent word carries it, so the eyebrow
 * stays muted whenever an accent is present.
 */
type Tone = "light" | "bone" | "stone" | "river";

const toneStyles: Record<Tone, { section: string; intro: string }> = {
  light: { section: "text-ink", intro: "text-ink/70" },
  bone: { section: "bg-bone text-ink", intro: "text-ink/70" },
  stone: { section: "bg-stone text-ink", intro: "text-ink/70" },
  river: { section: "bg-river text-bone", intro: "text-bone/75" },
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
  const onDark = tone === "river";
  const hasHeader = marker || Boolean(eyebrow) || Boolean(heading) || Boolean(intro);
  // One flare element per view: the accent word wins; otherwise the eyebrow may carry it.
  const eyebrowTone = accent ? (onDark ? "onDark" : "muted") : onDark ? "flareDark" : "flare";

  const inner = (
    <>
      {hasHeader ? (
        <div className="flex flex-col gap-5">
          {marker ? <Rule width="short" className="mb-2" /> : null}
          {eyebrow ? <Eyebrow tone={eyebrowTone}>{eyebrow}</Eyebrow> : null}
          {heading ? (
            <EditorialHeading
              as={headingAs}
              size={headingSize}
              accent={accent}
              accentOnDark={onDark}
              className="max-w-[24ch]"
            >
              {heading}
            </EditorialHeading>
          ) : null}
          {intro ? (
            <div className={`max-w-measure font-sans text-fluid-lg leading-normal ${t.intro}`}>
              {intro}
            </div>
          ) : null}
        </div>
      ) : null}
      {children ? <div className={hasHeader ? "mt-12" : ""}>{children}</div> : null}
    </>
  );

  return (
    <As id={id} className={`py-section ${t.section} ${className}`}>
      {container ? <div className="container">{inner}</div> : inner}
    </As>
  );
}
