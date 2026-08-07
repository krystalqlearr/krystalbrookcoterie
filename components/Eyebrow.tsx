import { type ReactNode } from "react";

/**
 * Small tracked-caps label — the editorial cover-line. Tone is canvas-aware:
 *  - muted     → ink/65 on bone/stone (quiet, for non-section labels)
 *  - onDark    → bone/60 on charcoal (quiet)
 *  - flare     → cherry (the wine cover-line on bone/stone) — section labels
 *  - flareDark → blush (the wine cover-line on charcoal)
 */
type EyebrowTone = "muted" | "onDark" | "flare" | "flareDark";

type EyebrowProps = {
  children: ReactNode;
  tone?: EyebrowTone;
  as?: "p" | "span" | "div";
  className?: string;
};

const toneClass: Record<EyebrowTone, string> = {
  muted: "text-ink/65",
  onDark: "text-bone/60",
  flare: "text-cherry",
  flareDark: "text-blush",
};

export default function Eyebrow({ children, tone = "muted", as: As = "p", className = "" }: EyebrowProps) {
  return (
    <As className={`font-sans text-xs font-medium uppercase tracking-[0.28em] ${toneClass[tone]} ${className}`}>
      {children}
    </As>
  );
}
