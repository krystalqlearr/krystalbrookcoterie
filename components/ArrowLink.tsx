import Link from "next/link";
import { type ReactNode } from "react";

/**
 * ArrowLink — the Coterie CTA. Actions are typography, not boxes: a meta label,
 * a flare arrow glyph, and a hairline that wipes in on hover or focus.
 * Glyphs: ↗ leaves (external / a different surface) · → continues · ↓ scrolls.
 * The arrow is a graphic, so the neon stop is sanctioned (flare-lift on river).
 * Filled buttons stay reserved for real form controls — everything else is this.
 */
type Tone = "onLight" | "onRiver";
type Glyph = "↗" | "→" | "↓";

const toneStyles: Record<
  Tone,
  { label: string; arrow: string; track: string; wipe: string; focus: string }
> = {
  onLight: {
    label: "text-ink",
    arrow: "text-neon",
    track: "bg-ink/15",
    wipe: "bg-neon",
    focus: "focus-visible:outline-ink",
  },
  onRiver: {
    label: "text-bone",
    arrow: "text-flare-lift",
    track: "bg-bone/20",
    wipe: "bg-flare-lift",
    focus: "focus-visible:outline-bone",
  },
};

export default function ArrowLink({
  href,
  children,
  glyph = "→",
  tone = "onLight",
  target,
  rel,
  className = "",
}: {
  href: string;
  children: ReactNode;
  glyph?: Glyph;
  tone?: Tone;
  target?: string;
  rel?: string;
  className?: string;
}) {
  const t = toneStyles[tone];
  return (
    <Link
      href={href}
      target={target}
      rel={rel}
      className={`group inline-block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 ${t.focus} ${className}`}
    >
      <span className={`inline-flex items-baseline gap-3 pb-3 font-sans text-meta font-semibold uppercase ${t.label}`}>
        {children}
        <span aria-hidden className={`translate-y-[1px] ${t.arrow}`}>
          {glyph}
        </span>
      </span>
      <span aria-hidden className={`relative block h-px w-full overflow-hidden ${t.track}`}>
        <span
          className={`absolute inset-0 origin-left scale-x-0 transition-transform duration-600 ease-editorial group-hover:scale-x-100 group-focus-visible:scale-x-100 ${t.wipe}`}
        />
      </span>
    </Link>
  );
}
