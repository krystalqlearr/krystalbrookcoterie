import { type ReactNode } from "react";
import Eyebrow from "./Eyebrow";
import EditorialHeading from "./EditorialHeading";
import Rule from "./Rule";

/**
 * Section wrapper providing editorial vertical rhythm and a consistent left-aligned
 * header block. `tone` sets the canvas so pages alternate bone / stone / charcoal
 * instead of one flat scroll:
 *  - light   : default bone canvas, ink text, muted eyebrow
 *  - stone   : deeper-paper alt-section for quiet rhythm, ink text
 *  - charcoal: dark inversion moment (closing CTAs), bone text — "charcoal punctuation"
 * Intros use the serif-italic voice (the HAUS supporting line).
 */
type Tone = "light" | "stone" | "charcoal";

const toneStyles: Record<
  Tone,
  { section: string; eyebrow: "flare" | "flareDark"; intro: string }
> = {
  light: { section: "text-ink", eyebrow: "flare", intro: "text-ink/75" },
  stone: { section: "bg-stone text-ink", eyebrow: "flare", intro: "text-ink/75" },
  charcoal: { section: "bg-charcoal text-bone", eyebrow: "flareDark", intro: "text-bone/75" },
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
        <div className="flex flex-col gap-5">
          {marker ? <Rule width="short" className="mb-2" /> : null}
          {eyebrow ? <Eyebrow tone={t.eyebrow}>{eyebrow}</Eyebrow> : null}
          {heading ? (
            <EditorialHeading
              as={headingAs}
              size={headingSize}
              accent={accent}
              accentOnDark={tone === "charcoal"}
              className="max-w-[22ch]"
            >
              {heading}
            </EditorialHeading>
          ) : null}
          {intro ? (
            <div className={`max-w-measure font-editorial text-fluid-lg italic leading-snug ${t.intro}`}>{intro}</div>
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
