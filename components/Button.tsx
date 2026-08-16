import Link from "next/link";
import { type ReactNode } from "react";

/**
 * Editorial button. On the bone canvas the primary action is an INK fill with bone
 * text (HAUS-like: confident, near-monochrome). Terracotta is retired.
 *  - primary    : ink fill / bone text — the main action on bone/stone
 *  - ghost      : ink outline / ink text — secondary on bone/stone
 *  - onCharcoal : bone outline / bone text — for charcoal (dark) sections
 *
 * Renders an anchor when `href` is set, otherwise a <button>. Focus ring color is
 * per-variant so it stays visible on both canvases.
 */
type Variant = "primary" | "ghost" | "onCharcoal";

const variantClass: Record<Variant, string> = {
  primary: "border border-ink bg-ink text-bone hover:border-cherry hover:bg-cherry focus-visible:outline-ink",
  ghost: "border border-ink/40 text-ink hover:border-ink focus-visible:outline-ink",
  onCharcoal:
    "border border-bone text-bone hover:bg-bone hover:text-ink focus-visible:outline-bone",
};

type Size = "sm" | "lg";

const sizeClass: Record<Size, string> = {
  sm: "px-7 py-3.5 text-xs tracking-[0.14em]", // current default
  lg: "px-9 py-4 text-sm tracking-[0.16em]", // primary client actions
};

const base =
  "inline-flex items-center justify-center rounded-[1px] font-sans font-medium uppercase transition duration-300 ease-editorial focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4";

type Props = {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  href?: string;
  type?: "button" | "submit" | "reset";
  target?: string;
  rel?: string;
  "aria-label"?: string;
  className?: string;
};

export default function Button({
  children,
  variant = "primary",
  size = "sm",
  href,
  type = "button",
  target,
  rel,
  "aria-label": ariaLabel,
  className = "",
}: Props) {
  const cls = `${base} ${sizeClass[size]} ${variantClass[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} target={target} rel={rel} aria-label={ariaLabel} className={cls}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} aria-label={ariaLabel} className={cls}>
      {children}
    </button>
  );
}
