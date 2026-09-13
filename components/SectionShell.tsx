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

/**
 * THE THREE LINES (2026-09-12). The site is set on a four-track grid with the
 * editorial gutter (at 1440: tracks of 248px, lines at 128 · 440 · 752 · 1064),
 * and text may START on only three of them — the page edge (LEFT), the half
 * (MIDDLE) and the last track (RIGHT). Krystal: "I kind of like when things are
 * left and right" — and the expensive version of left-and-right is the same
 * left and the same right on every page. Before this, content started at seven
 * different x positions across the site (128, 400, 640, 752, 812, 976, 1017);
 * every new one read as a new decision, and a page of new decisions reads as
 * clutter however reasonable each was.
 *
 *  - stack : the header block and the children, all from the LEFT line — the
 *            hero and any full-width moment.
 *  - split : the label (eyebrow) on the LEFT, the heading + intro + children
 *            from the MIDDLE line. The scanning layout: run your eye down the
 *            labels, read right.
 *  - aside : heading + children from the LEFT spanning three tracks, `aside`
 *            from the RIGHT line — meta columns, captions, side notes.
 *
 * Halves, thirds and quarters happen INSIDE a column, never against the page
 * edge with their own start line. Below `lg` everything stacks from the left.
 */
type Layout = "stack" | "split" | "aside";

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
  layout?: Layout;
  /** `aside` layout only — what sits on the RIGHT line. */
  aside?: ReactNode;
  children?: ReactNode;
  className?: string;
};

/** The grid every layout but `stack` is set on. Exported so a page can put a
 *  bespoke block (a caption row, a form) on the same three lines. */
export const LINES = "grid gap-x-gutter gap-y-8 lg:grid-cols-4";
export const ON_LEFT = "lg:col-span-2";
export const ON_MIDDLE = "lg:col-span-2 lg:col-start-3";
export const ON_LEFT_WIDE = "lg:col-span-3";
export const ON_RIGHT = "lg:col-span-1 lg:col-start-4";

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
  layout = "stack",
  aside,
  children,
  className = "",
}: Props) {
  const t = toneStyles[tone];
  const hasHeader = marker || Boolean(eyebrow) || Boolean(heading) || Boolean(intro);

  // When the section has no display heading, the eyebrow IS the heading — so the
  // document outline matches what a sighted reader sees (audit 2026-09-09,
  // finding 4). With a heading present it stays a <p>.
  const label = eyebrow ? (
    <Eyebrow tone={t.eyebrow} as={heading ? "p" : headingAs}>
      {eyebrow}
    </Eyebrow>
  ) : null;
  const line = heading ? (
    <EditorialHeading
      as={headingAs}
      size={headingSize}
      accent={accent}
      canvas={tone === "dark" ? "dark" : "milk"}
      className="max-w-[18ch]"
    >
      {heading}
    </EditorialHeading>
  ) : null;
  const lede = intro ? (
    <div className={`max-w-measure font-sans text-fluid-lg ${t.intro}`}>{intro}</div>
  ) : null;
  const tick = marker ? <Rule width="short" tone={t.marker} className="mb-1" /> : null;

  // An eyebrow-only header is one 13px line: 64px under it left a label floating
  // over a gap (audit, finding 11). A display heading still gets the full drop.
  const drop = hasHeader ? (heading ? "mt-16" : "mt-8") : "";

  let inner: ReactNode;
  if (layout === "split") {
    // Label on the LEFT line; everything else from the MIDDLE line.
    inner = (
      <div className={LINES}>
        {label || tick ? (
          <Reveal stagger={0.1} className={`${ON_LEFT} flex flex-col gap-6`}>
            {tick ? <RevealItem variant="soft">{tick}</RevealItem> : null}
            {label ? <RevealItem variant="soft">{label}</RevealItem> : null}
          </Reveal>
        ) : null}
        <div className={ON_MIDDLE}>
          {line || lede ? (
            <Reveal stagger={0.1} className="flex flex-col gap-6">
              {line ? <RevealItem variant="soft">{line}</RevealItem> : null}
              {lede ? <RevealItem variant="fade">{lede}</RevealItem> : null}
            </Reveal>
          ) : null}
          {children ? <div className={line || lede ? "mt-16" : ""}>{children}</div> : null}
        </div>
      </div>
    );
  } else {
    const header = hasHeader ? (
      <Reveal stagger={0.1} className="flex flex-col gap-6">
        {tick ? <RevealItem variant="soft">{tick}</RevealItem> : null}
        {label ? <RevealItem variant="soft">{label}</RevealItem> : null}
        {line ? <RevealItem variant="soft">{line}</RevealItem> : null}
        {lede ? <RevealItem variant="fade">{lede}</RevealItem> : null}
      </Reveal>
    ) : null;
    const body = children ? <div className={drop}>{children}</div> : null;
    inner =
      layout === "aside" ? (
        // Heading + children from the LEFT line over three tracks; the aside on
        // the RIGHT line.
        <div className={LINES}>
          <div className={ON_LEFT_WIDE}>
            {header}
            {body}
          </div>
          {aside ? <div className={ON_RIGHT}>{aside}</div> : null}
        </div>
      ) : (
        <>
          {header}
          {body}
        </>
      );
  }

  return (
    <As id={id} className={`py-section ${t.section} ${className}`}>
      {container ? <div className="container">{inner}</div> : inner}
    </As>
  );
}
