import { type ReactNode } from "react";
import Eyebrow from "./Eyebrow";
import EditorialHeading from "./EditorialHeading";
import Rule from "./Rule";
import Reveal, { RevealItem } from "./motion/Reveal";

/**
 * Section wrapper providing editorial vertical rhythm and a consistent, always
 * left-aligned header block: flare tick → META eyebrow → DISPLAY heading → intro,
 * staggered in on scroll (tick/eyebrow/heading sharpen, the intro fades) so every
 * section opening on the site arrives the same way.
 *
 * `tone` sets the ground. The site has TWO (2026-09-07 palette): the milk canvas
 * and the onyx dark. Rhythm on the milk comes from whitespace and hairlines, not
 * from tinted sheets — the beige recesses were retired because a tint next to a
 * hot red reads cream-and-terracotta, and a pale grey would have been cleaner but
 * no more contrasty (1.1–1.3 : 1 against milk either way).
 *  - light : the milk canvas — the default; paints nothing, inherits the page
 *  - rule  : the milk canvas with a hairline above — the alternating section
 *  - dark  : the onyx inversion moment (closing CTAs, the footer), milk text
 *
 * FLARE DISCIPLINE: the eyebrow is deliberately muted, not flare-coloured. A section gets at
 * most one flare element — either the `marker` tick or the heading's `accent` word.
 * If you pass an accent, leave marker off, and vice versa.
 *
 * The intro is grotesk, not serif: the serif-italic supporting voice is retired.
 */
type Tone = "light" | "rule" | "dark";

const toneStyles: Record<
  Tone,
  { section: string; eyebrow: "muted" | "onDark"; marker: "flare"; intro: string }
> = {
  light: { section: "text-ink", eyebrow: "muted", marker: "flare", intro: "text-ink/70" },
  rule: { section: "border-t border-ink/12 text-ink", eyebrow: "muted", marker: "flare", intro: "text-ink/70" },
  dark: {
    section: "bg-onyx text-milk",
    eyebrow: "onDark",
    marker: "flare",
    intro: "text-milk/70",
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
        <Reveal stagger={0.1} className="flex flex-col gap-6">
          {marker ? (
            <RevealItem variant="soft">
              <Rule width="short" tone={t.marker} className="mb-1" />
            </RevealItem>
          ) : null}
          {eyebrow ? (
            <RevealItem variant="soft">
              <Eyebrow tone={t.eyebrow}>{eyebrow}</Eyebrow>
            </RevealItem>
          ) : null}
          {heading ? (
            <RevealItem variant="soft">
              <EditorialHeading
                as={headingAs}
                size={headingSize}
                accent={accent}
                canvas={tone === "dark" ? "dark" : "milk"}
                className="max-w-[18ch]"
              >
                {heading}
              </EditorialHeading>
            </RevealItem>
          ) : null}
          {intro ? (
            <RevealItem variant="fade">
              <div className={`max-w-measure font-sans text-fluid-lg ${t.intro}`}>{intro}</div>
            </RevealItem>
          ) : null}
        </Reveal>
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
