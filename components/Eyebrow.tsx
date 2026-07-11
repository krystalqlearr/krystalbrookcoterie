import { type ReactNode } from "react";

/**
 * Small tracked-caps label. Tone maps to an AA-safe color per canvas:
 *  - terracotta → dark canvases (5.01:1)
 *  - greige     → petrol canvases (7.41:1); terracotta would be 4.26:1 (fails)
 *  - ink        → cream showstoppers (rich-black, 17:1); terracotta is 3.40:1 (fails)
 * `onPetrol` still forces greige for backward compatibility.
 */
type EyebrowTone = "greige" | "terracotta" | "ink";

type EyebrowProps = {
  children: ReactNode;
  tone?: EyebrowTone;
  onPetrol?: boolean;
  as?: "p" | "span" | "div";
  className?: string;
};

const toneClass: Record<EyebrowTone, string> = {
  greige: "text-greige",
  terracotta: "text-terracotta",
  ink: "text-rich-black",
};

export default function Eyebrow({
  children,
  tone = "greige",
  onPetrol = false,
  as: As = "p",
  className = "",
}: EyebrowProps) {
  const color = onPetrol ? "text-greige" : toneClass[tone];
  return (
    <As className={`font-sans text-xs font-medium uppercase tracking-[0.28em] ${color} ${className}`}>
      {children}
    </As>
  );
}
