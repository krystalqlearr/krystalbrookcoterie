import { type ReactNode } from "react";

/**
 * Display heading in PP Editorial New. An `accent` word (must appear in the string
 * children) is rendered in italic — optionally terracotta — matching the reference's
 * italic-accent behavior.
 */
type Level = "h1" | "h2" | "h3" | "h4";
type Size = "sm" | "md" | "lg" | "xl";

const sizeClass: Record<Size, string> = {
  sm: "text-2xl",
  md: "text-3xl md:text-4xl",
  lg: "text-4xl md:text-5xl",
  xl: "text-5xl md:text-7xl",
};

type Props = {
  children: ReactNode;
  accent?: string;
  accentColor?: "inherit" | "terracotta";
  as?: Level;
  size?: Size;
  className?: string;
};

export default function EditorialHeading({
  children,
  accent,
  accentColor = "inherit",
  as: Tag = "h2",
  size = "lg",
  className = "",
}: Props) {
  let content: ReactNode = children;

  if (accent && typeof children === "string" && children.includes(accent)) {
    const i = children.indexOf(accent);
    // Accent word is Editorial New italic serif set against the Neue Montreal headline.
    const emClass =
      accentColor === "terracotta"
        ? "font-editorial font-normal italic text-terracotta"
        : "font-editorial font-normal italic";
    content = (
      <>
        {children.slice(0, i)}
        <em className={emClass}>{accent}</em>
        {children.slice(i + accent.length)}
      </>
    );
  }

  return (
    <Tag className={`font-display font-extrabold leading-[1.03] tracking-tight ${sizeClass[size]} ${className}`}>
      {content}
    </Tag>
  );
}
