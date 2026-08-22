/**
 * Giant vertical section marker — a monumental word running up a section edge as
 * an architectural label. Set in the display register (Regular 400, sentence
 * case — the meta register is the only uppercase on the site). Purely decorative
 * (aria-hidden), sits behind the content, clipped by the section's
 * overflow-hidden. Desktop only — there's no room on mobile.
 *
 * Tone: `ink` on milk/bone/stone sections, `bone` on river. Opacity is
 * deliberately low so it reads as structure, never as a second headline.
 */
type Props = {
  label: string;
  side?: "left" | "right";
  tone?: "ink" | "bone";
  className?: string;
};

export default function SectionMarker({ label, side = "right", tone = "ink", className = "" }: Props) {
  const color = tone === "ink" ? "text-ink/[0.07]" : "text-bone/[0.08]";
  const pos = side === "right" ? "right-[-0.08em]" : "left-[-0.08em]";

  return (
    <span
      aria-hidden
      className={`pointer-events-none absolute top-1/2 hidden -translate-y-1/2 select-none font-display font-normal leading-none tracking-[-0.05em] lg:block ${pos} ${color} ${className}`}
      style={{ writingMode: "vertical-rl", fontSize: "clamp(5rem, 15vw, 13rem)" }}
    >
      {label}
    </span>
  );
}
