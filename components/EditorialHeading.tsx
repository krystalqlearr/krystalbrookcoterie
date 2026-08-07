import { type ReactNode } from "react";

/**
 * Display heading — monumental UPPERCASE Neue Montreal Extrabold (the HAUS/VOL.ONE
 * register). Exactly ONE word may be lifted into the wine "flare": Editorial New
 * italic, lowercase, in cherry (blush on charcoal). Pass that word as `accent` —
 * it's matched as a substring of the heading. This is the site's signature thread:
 * read down a page, the flare words form a spine (owned → follows → worth → presence).
 */
type Level = "h1" | "h2" | "h3" | "h4";
type Size = "sm" | "md" | "lg" | "xl" | "hero";

// Fluid sizes; the tokens carry their own tight leading (0.9–1.12) — ideal for caps.
const sizeClass: Record<Size, string> = {
  sm: "text-fluid-xl",
  md: "text-fluid-2xl",
  lg: "text-fluid-3xl",
  xl: "text-fluid-display",
  hero: "text-fluid-hero",
};

type Props = {
  children: ReactNode;
  /** One word (a substring of the heading) lifted into the serif-italic wine flare. */
  accent?: string;
  /** On charcoal sections the flare shifts to blush so it stays vivid + legible. */
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
  const flareClass = `font-editorial font-normal italic normal-case tracking-normal ${
    accentOnDark ? "text-blush" : "text-cherry"
  }`;

  // Lift the accent word into the serif wine flare when it's found in the string.
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
    <Tag
      className={`font-display font-extrabold uppercase tracking-[-0.01em] text-balance ${sizeClass[size]} ${className}`}
    >
      {content}
    </Tag>
  );
}
