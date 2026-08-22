import Link from "next/link";
import { type ReactNode } from "react";

/**
 * Filled/outline button — RESERVED for real form controls (submit, begin, send):
 * at most one filled button per view. Decorative CTAs are typography instead —
 * see ArrowLink. Label is the meta register (Semibold 600, 13px, +0.13em).
 *  - primary : ink fill / milk text; hover deepens into flare-deep (the sanctioned
 *              small-surface flare stop). The main action on milk/bone.
 *  - ghost   : ink outline / ink text — secondary on milk/bone.
 *  - onRiver : bone outline / bone text — for river (dark) sections.
 * Focus rings are NEVER the flare: ink on paper, bone on river.
 *
 * Renders an anchor when `href` is set, otherwise a <button>.
 */
type Variant = "primary" | "ghost" | "onRiver";

const variantClass: Record<Variant, string> = {
  primary:
    "border border-ink bg-ink text-milk hover:border-flare-deep hover:bg-flare-deep focus-visible:outline-ink",
  ghost: "border border-ink/40 text-ink hover:border-ink focus-visible:outline-ink",
  onRiver: "border border-bone text-bone hover:bg-bone hover:text-ink focus-visible:outline-bone",
};

type Size = "sm" | "lg";

const sizeClass: Record<Size, string> = {
  sm: "px-7 py-3.5 text-xs tracking-[0.13em]", // compact form controls
  lg: "px-9 py-4 text-meta", // primary client actions (meta token carries tracking)
};

const base =
  "inline-flex items-center justify-center rounded-[1px] font-sans font-semibold uppercase transition duration-300 ease-editorial focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4";

type Props = {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  href?: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  disabled?: boolean;
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
  onClick,
  disabled,
  target,
  rel,
  "aria-label": ariaLabel,
  className = "",
}: Props) {
  const cls = `${base} ${sizeClass[size]} ${variantClass[variant]} ${
    disabled ? "cursor-not-allowed opacity-60" : ""
  } ${className}`;

  if (href) {
    return (
      <Link href={href} target={target} rel={rel} aria-label={ariaLabel} className={cls}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} aria-label={ariaLabel} className={cls}>
      {children}
    </button>
  );
}
