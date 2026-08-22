"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * Character-by-character blur + fade — the site's text entrance.
 *
 * Replaces the earlier line-slide experiments. The reference is bionicegg.com:
 * every character starts at `opacity: 0` + `blur(4px)` and settles to full opacity
 * and no blur, staggered by a CSS custom property (`--char-index`) capped so a long
 * paragraph still finishes quickly. No translateX, no translateY on the text
 * itself — the motion is entirely a focus pull, not a slide. Confirmed against the
 * live site (scrolled an unrevealed element into view and read the computed style
 * before/after) rather than guessed from the CSS alone.
 *
 * WHY CSS TRANSITIONS, NOT FRAMER VARIANTS — a page can carry thousands of these
 * spans once every text block on the site uses it. Framer wraps each animated
 * child in its own component instance with its own orchestration; at that scale
 * the overhead is real. A single IntersectionObserver flips one data attribute,
 * and the browser's compositor drives every character's transition off one CSS
 * rule (`app/globals.css` → `.text-reveal-char`) — the same mechanism the
 * reference site itself uses, and the only one that stays cheap at this scale.
 *
 * WHY CHARACTER-SPLITTING IS SAFE AT RENDER TIME — unlike splitting on rendered
 * *lines* (which depends on wrap points only known after layout, forcing a
 * measure-after-mount step that flashes unsplit text), splitting on *characters*
 * needs nothing but the string itself. It runs identically on the server and the
 * client — no flash, no hydration mismatch, no resize-invalidation to worry about.
 *
 * ACCESSIBILITY — the full string is exposed once via `aria-label` on the outer
 * span; every individual character span is `aria-hidden`, so a screen reader
 * announces the real sentence once, not 40 one-letter fragments. Reduced motion
 * skips the split entirely and renders plain text with no observer, no attribute,
 * no animation.
 *
 * `highlight` colours one substring differently (the flare accent word) while
 * keeping ONE continuous character index across the whole string, so the accent
 * word's stagger timing lands exactly where it would have anyway — it's a colour
 * change, not a second pass.
 */

type Props = {
  /** Plain string only — mixed JSX children render unsplit, no animation. */
  children: string;
  /** Seconds added before this instance's own stagger begins (sequences instances). */
  delay?: number;
  /** A substring of `children` to render in `highlightClassName` instead of inheriting colour. */
  highlight?: string;
  highlightClassName?: string;
  className?: string;
};

export default function TextReveal({
  children,
  delay = 0,
  highlight,
  highlightClassName = "",
  className = "",
}: Props) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (reduce) return;
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduce]);

  if (typeof children !== "string") {
    return <span className={className}>{children}</span>;
  }

  if (reduce) {
    // Plain text, no split, no observer — nothing to animate, nothing to skip past.
    return <span className={className}>{children}</span>;
  }

  const chars = Array.from(children);
  const hlStart = highlight ? children.indexOf(highlight) : -1;
  const hlEnd = hlStart >= 0 ? hlStart + Array.from(highlight!).length : -1;

  return (
    <span
      ref={ref}
      className={className}
      aria-label={children}
      data-text-reveal-visible={visible ? "true" : undefined}
    >
      {chars.map((ch, i) => {
        const inHighlight = hlStart >= 0 && i >= hlStart && i < hlEnd;
        return (
          <span
            key={i}
            aria-hidden
            className={`text-reveal-char${inHighlight ? ` ${highlightClassName}` : ""}`}
            style={{
              ["--char-index" as string]: i,
              transitionDelay: delay ? `calc(${delay}s + min(var(--char-index) * 9ms, 0.52s))` : undefined,
            }}
          >
            {ch}
          </span>
        );
      })}
    </span>
  );
}
