import { type ReactNode } from "react";

/**
 * Display heading — monumental UPPERCASE Neue Montreal Extrabold (the HAUS/VOL.ONE
 * register). Big, confident, tightly set. The serif voice is now a SEPARATE italic
 * subline (see Hero / PageHero / Testimonial), never an inline word — so the old
 * `accent` prop is retired (kept optional + ignored so existing callers don't break).
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
  /** @deprecated inline accent retired — the serif italic is now a separate subline */
  accent?: string;
  as?: Level;
  size?: Size;
  className?: string;
};

export default function EditorialHeading({
  children,
  as: Tag = "h2",
  size = "lg",
  className = "",
}: Props) {
  return (
    <Tag
      className={`font-display font-extrabold uppercase tracking-[-0.01em] text-balance ${sizeClass[size]} ${className}`}
    >
      {children}
    </Tag>
  );
}
