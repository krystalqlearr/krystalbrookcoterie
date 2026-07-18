/**
 * Giant vertical section marker (the VOL.ONE / HAUS device) — a monumental
 * uppercase word running up a section edge as an architectural label. Purely
 * decorative (aria-hidden), sits behind the content, clipped by the section's
 * overflow-hidden. Desktop only — there's no room on mobile.
 *
 * Tone: `ink` on bone/stone sections, `bone` on charcoal. Opacity is deliberately
 * low so it reads as structure, never as a second headline — raise the color
 * opacity below to make it louder.
 */
type Props = {
  label: string;
  side?: "left" | "right";
  tone?: "ink" | "bone";
  className?: string;
};

export default function SectionMarker({ label, side = "right", tone = "ink", className = "" }: Props) {
  const color = tone === "ink" ? "text-ink/[0.09]" : "text-bone/[0.10]";
  const pos = side === "right" ? "right-[-0.08em]" : "left-[-0.08em]";

  return (
    <span
      aria-hidden
      className={`pointer-events-none absolute top-1/2 hidden -translate-y-1/2 select-none font-display font-extrabold uppercase leading-none tracking-[-0.03em] lg:block ${pos} ${color} ${className}`}
      style={{ writingMode: "vertical-rl", fontSize: "clamp(5rem, 15vw, 13rem)" }}
    >
      {label}
    </span>
  );
}
