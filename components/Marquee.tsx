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

const toneClass: Record<Tone, { text: string; separator: string }> = {
  onLight: { text: "text-ink", separator: "text-flare-deep" },
  onDark: { text: "text-bone", separator: "text-flare-lift" },
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
  duration = 42,
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
