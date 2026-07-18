import { type ReactNode } from "react";

/**
 * Small tracked-caps label. Tone maps to a canvas-aware muted ink:
 *  - muted  → ink/65 on bone/stone (default)
 *  - onDark → bone/60 on charcoal sections
 * (The colored-eyebrow options are retired — labels are quiet neutral only.)
 */
type EyebrowTone = "muted" | "onDark";

type EyebrowProps = {
  children: ReactNode;
  tone?: EyebrowTone;
  as?: "p" | "span" | "div";
  className?: string;
};

const toneClass: Record<EyebrowTone, string> = {
  muted: "text-ink/65",
  onDark: "text-bone/60",
};

export default function Eyebrow({ children, tone = "muted", as: As = "p", className = "" }: EyebrowProps) {
  return (
    <As className={`font-sans text-xs font-medium uppercase tracking-[0.28em] ${toneClass[tone]} ${className}`}>
      {children}
    </As>
  );
}
