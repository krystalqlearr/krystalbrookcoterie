import { type ReactNode } from "react";

/**
 * Meta label — Semibold 600, 13px, +0.13em, UPPERCASE: the only uppercase
 * register on the site. Tone is canvas-aware, and the flare is RATIONED — when
 * the heading below carries the flare accent, the eyebrow stays muted:
 *  - muted     → ink/70 on milk/bone/stone (the muted floor — ink/65 fails stone)
 *  - onDark    → bone/60 on river
 *  - flare     → flare-deep (small flare text on paper) — only when nothing else flares
 *  - flareDark → flare-lift on river
 */
type EyebrowTone = "muted" | "onDark" | "flare" | "flareDark";

type EyebrowProps = {
  children: ReactNode;
  tone?: EyebrowTone;
  as?: "p" | "span" | "div";
  className?: string;
};

const toneClass: Record<EyebrowTone, string> = {
  muted: "text-ink/70",
  onDark: "text-bone/60",
  flare: "text-flare-deep",
  flareDark: "text-flare-lift",
};

export default function Eyebrow({ children, tone = "muted", as: As = "p", className = "" }: EyebrowProps) {
  return (
    <As className={`font-sans text-meta font-semibold uppercase ${toneClass[tone]} ${className}`}>
      {children}
    </As>
  );
}
