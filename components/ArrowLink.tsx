import Link from "next/link";
import { type ReactNode } from "react";

/**
 * The signature action. In this system a CTA is not a box — it's typography:
 * a META-caps label, a flare arrow glyph, and a hairline beneath. On hover the
 * hairline wipes in from the left in the flare while the arrow travels in its own
 * direction. No fill, no border, no radius.
 *
 * Use ArrowLink for every editorial call to action (in-page, section, card).
 * Reserve <Button> for real form controls, where a target you can hit matters.
 *
 * `direction` sets both the glyph and where it travels:
 *  - upRight (↗) : leaves the page / opens a case study — the default
 *  - right   (→) : continues in the same flow
 *  - down    (↓) : scrolls to an anchor further down this page
 *
 * The glyphs carry U+FE0E (text presentation selector) so they render as
 * typography rather than as an emoji arrow on iOS/Android.
 */
type Direction = "upRight" | "right" | "down";
type Tone = "onLight" | "onDark" | "flare";

const glyph: Record<Direction, string> = {
  upRight: "↗︎",
  right: "→︎",
  down: "↓︎",
};

const toneClass: Record<Tone, { label: string; glyph: string; rule: string; ring: string }> = {
  onLight: {
    label: "text-ink",
    glyph: "text-flare",
    rule: "bg-ink/20",
    ring: "focus-visible:outline-ink",
  },
  onDark: {
    label: "text-milk",
    glyph: "text-flare",
    rule: "bg-milk/25",
    ring: "focus-visible:outline-milk",
  },
  // For a CTA that must lead the view on its own — the label itself takes the flare.
  // It is 13px text, so it uses the AA-safe `deep` stop, never the neon default.
  flare: {
    label: "text-flare-deep",
    glyph: "text-flare",
    rule: "bg-flare/25",
    ring: "focus-visible:outline-ink",
  },
};

type Props = {
  children: ReactNode;
  href?: string;
  direction?: Direction;
  tone?: Tone;
  /** Stretch the hairline to the full width of the parent instead of hugging the label. */
  block?: boolean;
  type?: "button" | "submit" | "reset";
  target?: string;
  rel?: string;
  "aria-label"?: string;
  className?: string;
};

export default function ArrowLink({
  children,
  href,
  direction = "upRight",
  tone = "onLight",
  block = false,
  type = "button",
  target,
  rel,
  "aria-label": ariaLabel,
  className = "",
}: Props) {
  const t = toneClass[tone];
  const cls = [
    "arrow-link group/arrow inline-flex flex-col gap-2.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4",
    block ? "w-full" : "w-fit",
    t.ring,
    className,
  ].join(" ");

  const inner = (
    <>
      <span className={`type-meta flex items-baseline justify-between gap-3 ${t.label}`}>
        <span>{children}</span>
        <span aria-hidden className={`arrow-link__glyph text-[1.15em] leading-none ${t.glyph}`}>
          {glyph[direction]}
        </span>
      </span>
      {/* Hairline track; the flare wipes across it on hover/focus. */}
      <span aria-hidden className={`relative block h-px w-full ${t.rule}`}>
        <span className="arrow-link__rule absolute inset-0 block bg-flare" />
      </span>
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        target={target}
        rel={rel}
        aria-label={ariaLabel}
        data-direction={direction}
        className={cls}
      >
        {inner}
      </Link>
    );
  }

  return (
    <button type={type} aria-label={ariaLabel} data-direction={direction} className={cls}>
      {inner}
    </button>
  );
}
