import { type ReactNode } from "react";
import Eyebrow from "./Eyebrow";
import EditorialHeading from "./EditorialHeading";
import Rule from "./Rule";

/**
 * Section wrapper providing editorial vertical rhythm and a consistent left-aligned
 * header block. `tone` sets the canvas so pages can alternate rich-black / petrol /
 * cream instead of one flat dark scroll:
 *  - dark  : default rich-black canvas, cream text, terracotta eyebrow
 *  - petrol: deep-petrol alt-section, cream text, greige eyebrow (AA)
 *  - cream : cream showstopper (1–2 per page), rich-black text, ink eyebrow (AA)
 */
type Tone = "dark" | "petrol" | "cream";

const toneStyles: Record<
  Tone,
  { section: string; eyebrow: "terracotta" | "greige" | "ink"; intro: string }
> = {
  dark: { section: "text-cream", eyebrow: "terracotta", intro: "text-greige" },
  petrol: { section: "bg-deep-petrol text-cream", eyebrow: "greige", intro: "text-greige" },
  cream: { section: "bg-cream text-rich-black", eyebrow: "ink", intro: "text-rich-black/75" },
};

type Props = {
  eyebrow?: string;
  heading?: string;
  accent?: string;
  accentColor?: "inherit" | "terracotta";
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
  accentColor = "inherit",
  intro,
  marker = false,
  container = true,
  tone = "dark",
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
              accentColor={accentColor}
              className="max-w-[22ch]"
            >
              {heading}
            </EditorialHeading>
          ) : null}
          {intro ? (
            <div className={`max-w-measure font-sans leading-relaxed ${t.intro}`}>{intro}</div>
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
