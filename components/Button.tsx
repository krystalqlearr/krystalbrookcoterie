import Link from "next/link";
import { type ReactNode } from "react";

/**
 * A real, hittable control — form submits, dialog actions, and the one place per
 * page where an action has to be unmissable. Everywhere else the CTA is an
 * <ArrowLink>: in this system actions are typography, not boxes, and a filled
 * button used freely makes the page look like software instead of a magazine.
 *
 * Set in the META register (14px uppercase Semibold, +0.11em) with sharp corners.
 *  - primary    : ink fill / bone text — the main action on bone/stone
 *  - ghost      : ink hairline / ink text — secondary on bone/stone
 *  - onDark : bone hairline / bone text — for the forest dark sections
 *
 * Renders an anchor when `href` is set, otherwise a <button>. Focus ring color is
 * per-variant so it stays visible on both canvases.
 */
type Variant = "primary" | "ghost" | "onDark";

const variantClass: Record<Variant, string> = {
  primary:
    "border border-ink bg-ink text-bone hover:border-flare-deep hover:bg-flare-deep focus-visible:outline-ink",
  ghost: "border border-ink/25 text-ink hover:border-ink focus-visible:outline-ink",
  onDark:
    "border border-bone/40 text-bone hover:border-bone hover:bg-bone hover:text-ink focus-visible:outline-bone",
};

const base =
  "inline-flex items-center justify-center rounded-[1px] px-8 py-4 font-sans text-meta-lg font-semibold uppercase transition duration-400 ease-editorial focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4";

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
