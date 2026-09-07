import { type ReactNode } from "react";

/**
 * A continuous horizontal band — client names, disciplines, or sectors — moving
 * slowly enough to read. It gives a page a heartbeat between two still sections
 * without asking the visitor to do anything.
 *
 * The track is rendered twice and translated exactly −50%, so the loop is seamless
 * at any content width. Pure CSS (no JS, no client component): it costs nothing and
 * runs on the compositor. Hover pauses it; `prefers-reduced-motion` stops it dead
 * (see globals.css) rather than letting it snap to its end position.
 *
 * The duplicate track is aria-hidden and the whole band is presentational — the
 * same names must exist as real, linkable content elsewhere on the page.
 */
type Tone = "onLight" | "onDark";

// The separators are hairline punctuation, NOT accents. They were flare
// until the 2026-09 quiet-luxury pivot, which put ~13 magenta ticks in a
// single decorative band — the exact "accent as habit" the flare budget
// now forbids (CLAUDE.md, Color). As aria-hidden decorative marks they sit
// under the hairline exemption, not the muted text floor.
const toneClass: Record<Tone, { text: string; separator: string }> = {
  onLight: { text: "text-ink", separator: "text-ink/25" },
  onDark: { text: "text-milk", separator: "text-milk/30" },
};

type Props = {
  items: ReactNode[];
  tone?: Tone;
  /** Seconds for one full pass. Slower reads as more expensive. */
  duration?: number;
  className?: string;
};

export default function Marquee({
  items,
  tone = "onLight",
  duration = 90,
  className = "",
}: Props) {
  const t = toneClass[tone];

  const track = (
    <ul className="flex shrink-0 items-center">
      {items.map((item, i) => (
        <li key={i} className="flex items-center">
          <span className={`type-meta whitespace-nowrap px-8 ${t.text}`}>{item}</span>
          <span aria-hidden className={`text-fluid-sm ${t.separator}`}>
            ✳
          </span>
        </li>
      ))}
    </ul>
  );

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div
        className="marquee-track flex w-max animate-marquee"
        style={{ animationDuration: `${duration}s` }}
      >
        {track}
        <div aria-hidden>{track}</div>
      </div>
    </div>
  );
}
