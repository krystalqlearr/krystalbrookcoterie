import { type ReactNode } from "react";

/**
 * The META register — 13px uppercase Semibold at +0.13em. This is the only
 * uppercase left on the site, and it carries everything that isn't a headline or
 * body copy: section labels, cover-lines, tags, categories, captions, credits.
 *
 * Tone is canvas-aware:
 *  - muted     → ink/60 on milk (the default; quiet structural label)
 *  - onDark    → milk/60 on the onyx dark
 *  - ink       → full ink, for labels that need to sit forward
 *  - flare     → flare-deep (the cover-line on milk — the AA-safe stop, since
 *                this is 13px text and the neon default fails at that size)
 *  - flareDark → flare (the cover-line on the onyx dark)
 *
 * The flare is rationed: one flare element per view, total, across eyebrow + rule
 * tick + heading accent. If the heading already carries it, keep the eyebrow muted.
 */
type EyebrowTone = "muted" | "onDark" | "ink" | "flare" | "flareDark";

type EyebrowProps = {
  children: ReactNode;
  tone?: EyebrowTone;
  as?: "p" | "span" | "div";
  className?: string;
};

const toneClass: Record<EyebrowTone, string> = {
  muted: "text-ink/70",
  onDark: "text-milk/60",
  ink: "text-ink",
  flare: "text-flare-deep",
  flareDark: "text-flare",
};

export default function Eyebrow({
  children,
  tone = "muted",
  as: As = "p",
  className = "",
}: EyebrowProps) {
  return <As className={`type-meta ${toneClass[tone]} ${className}`}>{children}</As>;
}
