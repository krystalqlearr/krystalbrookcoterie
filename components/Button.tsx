import Link from "next/link";
import { type ReactNode } from "react";

/**
 * Editorial button. Cream-filled CTAs (dark text) are the primary action — matching
 * the reference and keeping terracotta as an accent, not a button fill (cream-on-
 * terracotta is only 3.40:1, below AA).
 *  - primary : cream fill / rich-black text — for dark & petrol canvases
 *  - ghost   : greige outline / cream text  — for dark & petrol canvases
 *  - onCream : rich-black outline / ink text — for cream showstopper sections
 *
 * Renders an anchor when `href` is set, otherwise a <button>. Visible teal focus
 * ring; being a native button/anchor it triggers the custom cursor's hover-ring.
 */
type Variant = "primary" | "ghost" | "onCream";

const variantClass: Record<Variant, string> = {
  primary: "border border-cream bg-cream text-rich-black hover:bg-cream/90",
  ghost: "border border-greige text-cream hover:border-cream",
  onCream:
    "border border-rich-black text-rich-black hover:bg-rich-black hover:text-cream",
};

const base =
  "inline-flex items-center justify-center rounded-[1px] px-7 py-3.5 font-sans text-xs font-medium uppercase tracking-[0.14em] transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal";

type Props = {
  children: ReactNode;
  variant?: Variant;
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
  href,
  type = "button",
  target,
  rel,
  "aria-label": ariaLabel,
  className = "",
}: Props) {
  const cls = `${base} ${variantClass[variant]} ${className}`;

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
