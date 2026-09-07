import { type ReactNode } from "react";

/**
 * Display heading — the site's headline voice.
 *
 * Neue Montreal at REGULAR weight (400), sentence case, enormous, with hard
 * negative tracking (−0.045 → −0.06em) and sub-1 leading. The size tokens carry
 * the tracking and leading, so a heading is never hand-tuned. Write headings as
 * short declarative sentences that end in a period, stacked two or three deep:
 *
 *   "Digital identities. Built to be chosen."
 *
 * The flare thread survives as COLOR, not as a second typeface: pass one word (or
 * one short phrase) as `accent` and it lifts into the neon flare — `flare` on
 * the onyx dark — in the same face and weight. One per view. The serif-italic accent
 * word is retired; so is uppercase extrabold.
 *
 * The neon stop is safe here and ONLY here among text: every display size floors at
 * 24px, which is WCAG "large text", so the 3:1 bar applies rather than 4.5:1.
 */
type Level = "h1" | "h2" | "h3" | "h4";
type Size = "sm" | "md" | "lg" | "xl" | "hero";
type Canvas = "milk" | "dark";

/**
 * The accent is the neon on both grounds (2026-09-07 palette): cherry #FF1744
 * measures 3.60 on milk — every display size floors at 24px, so the 3:1 large-text
 * bar applies — and 4.81 on onyx, text-legal at any size. The map stays as the
 * enforcement point: if a ground ever appears on which the neon fails, its stop
 * changes HERE, not in a page.
 */
const accentByCanvas: Record<Canvas, string> = {
  milk: "text-flare",
  dark: "text-flare",
};

// Fluid sizes; each token carries its own negative tracking + sub-1 leading.
const sizeClass: Record<Size, string> = {
  sm: "text-fluid-xl",
  md: "text-fluid-2xl",
  lg: "text-fluid-3xl",
  xl: "text-fluid-display",
  hero: "text-fluid-hero",
};

type Props = {
  children: ReactNode;
  /** One word or short phrase (a substring of the heading) lifted into the flare. */
  accent?: string;
  /**
   * The canvas this heading sits on. Selects the accent's flare stop so it always
   * clears contrast — pass it whenever the section is not the default milk paper.
   * SectionShell derives it from `tone` automatically.
   */
  canvas?: Canvas;
  as?: Level;
  size?: Size;
  className?: string;
};

export default function EditorialHeading({
  children,
  accent,
  canvas = "milk",
  as: Tag = "h2",
  size = "lg",
  className = "",
}: Props) {
  // Same face, same weight, same tracking — only the color changes.
  const flareClass = accentByCanvas[canvas];

  let content: ReactNode = children;
  if (accent && typeof children === "string" && children.includes(accent)) {
    const i = children.indexOf(accent);
    content = (
      <>
        {children.slice(0, i)}
        <span className={flareClass}>{accent}</span>
        {children.slice(i + accent.length)}
      </>
    );
  }

  return (
    <Tag className={`type-display ${sizeClass[size]} ${className}`}>{content}</Tag>
  );
}
