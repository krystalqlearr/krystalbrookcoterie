/**
 * Giant vertical section marker — a monumental word running up a section edge as
 * an architectural label. Set in the DISPLAY register (regular weight, sentence
 * case, hard negative tracking) so it reads as the same voice as the headlines,
 * scaled up rather than as a different, louder typeface. Purely decorative
 * (aria-hidden), sits behind the content, clipped by the section's
 * overflow-hidden. Desktop only — there's no room on mobile.
 *
 * Tone: `ink` on milk sections, `milk` on the onyx dark. Opacity is deliberately
 * low so it reads as structure, never as a second headline — raise the color
 * opacity below to make it louder.
 *
 * SIZE IS DERIVED FROM THE LABEL, not fixed (audit 2026-09-09, finding 12). The text
 * runs vertically, so its extent is bounded by the section's height while the word
 * length varies: a fixed 13vw fitted "About" and clipped "Commission" to "ommissi.".
 * `50 / length` vw holds every label to roughly the same optical height, so a long
 * word simply sets smaller instead of running off the section.
 */
type Props = {
  label: string;
  side?: "left" | "right";
  tone?: "ink" | "milk";
  className?: string;
};

export default function SectionMarker({ label, side = "right", tone = "ink", className = "" }: Props) {
  const color = tone === "ink" ? "text-ink/[0.09]" : "text-milk/[0.10]";
  const pos = side === "right" ? "right-[-0.08em]" : "left-[-0.08em]";

  return (
    <span
      aria-hidden
      className={`pointer-events-none absolute top-1/2 hidden -translate-y-1/2 select-none font-display font-normal normal-case leading-none tracking-display lg:block ${pos} ${color} ${className}`}
      style={{
        writingMode: "vertical-rl",
        fontSize: `clamp(2.5rem, ${(50 / Math.max(label.length, 4)).toFixed(2)}vw, 11rem)`,
      }}
    >
      {label}
    </span>
  );
}
