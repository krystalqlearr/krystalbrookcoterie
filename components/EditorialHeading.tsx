import { type ReactNode } from "react";

/**
 * Display heading — the Coterie register: Neue Montreal REGULAR 400, sentence
 * case, a short declarative line that ends in a period. Tracking and leading live
 * in the fluid size tokens — never hand-tune a heading. Exactly ONE word may be
 * lifted into the flare (same face, no italic): neon on paper, flare-lift on
 * river. Pass it as `accent` — matched as a substring. Every display size floors
 * at 24px, which is what sanctions the neon stop on a heading word.
 */
type Level = "h1" | "h2" | "h3" | "h4";
type Size = "sm" | "md" | "lg" | "xl" | "hero";

const sizeClass: Record<Size, string> = {
  sm: "text-fluid-xl",
  md: "text-fluid-2xl",
  lg: "text-fluid-3xl",
  xl: "text-fluid-display",
  hero: "text-fluid-hero",
};

type Props = {
  children: ReactNode;
  /** One word (a substring of the heading) lifted into the flare — same face. */
  accent?: string;
  /** On river sections the flare shifts to flare-lift so it stays legible. */
  accentOnDark?: boolean;
  as?: Level;
  size?: Size;
  className?: string;
};

export default function EditorialHeading({
  children,
  accent,
  accentOnDark = false,
  as: Tag = "h2",
  size = "lg",
  className = "",
}: Props) {
  const flareClass = accentOnDark ? "text-flare-lift" : "text-neon";

  // Lift the accent word into the flare when it's found in the string.
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
    <Tag className={`font-display font-normal text-balance ${sizeClass[size]} ${className}`}>
      {content}
    </Tag>
  );
}
