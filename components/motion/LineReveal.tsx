"use client";

import { type ReactNode } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { EASE, DUR } from "@/lib/motion";
import { splitLines } from "@/lib/lines";

/**
 * Line-by-line slide — the display register's entrance.
 *
 * Each line sits in an `overflow-hidden` block and travels in from the RIGHT
 * toward its resting position on the left. Moving AGAINST the reading direction
 * before settling reads as a firmer arrival than a same-direction slide would —
 * the line has to cross the whole box and stop exactly on the left margin, so the
 * stop itself becomes the emphasis. No opacity ramp, no vertical drift — just
 * weight arriving.
 *
 * This is per-heading, not a single scroll-scrubbed effect: every EditorialHeading
 * on the site already runs through this component, and each fires independently
 * via `whileInView` the moment its own heading crosses into the viewport — so the
 * same slide repeats every time you scroll a new heading into view, all the way
 * down the page. It does NOT continue to move once settled; if what's wanted is a
 * single transform tied continuously to scroll position (each line still drifting
 * as you keep scrolling past it, not settling once), that is a different
 * mechanism — a scroll-linked transform (Framer's `useScroll`/`useTransform`
 * against each heading's own scroll progress) rather than a viewport-triggered
 * one-shot — and would need to be built separately from this component.
 *
 * HOW A LINE IS DECIDED — this is the load-bearing decision. Measuring real wrap
 * points at runtime (the SplitText approach) means reading layout after mount,
 * rewriting the DOM, and accepting a flash plus layout shift on the LCP element.
 * Instead this splits on SENTENCES, which the display register already guarantees:
 * headlines are written as short declarative sentences ending in a period, stacked
 * two or three deep ("Rented is over. Yours will be owned."). So a sentence IS a
 * line here, the split is deterministic, it happens during render, and there is
 * nothing to measure. A sentence that wraps simply travels as one block.
 *
 * Pass `lines` directly to override the split for a heading that breaks elsewhere.
 *
 * Reduced motion renders the text immediately with no transform and no mask.
 */

const LINES: Variants = {
  hidden: {},
  visible: (delay: number = 0) => ({
    transition: { staggerChildren: 0.09, delayChildren: delay },
  }),
};

const LINE: Variants = {
  // 100% of the line's OWN width, from the right. A masked reveal can only ever
  // show what is inside the mask box — which is exactly the line's own width —
  // so anything travelled beyond 100% is invisible dead motion; 100% is not a
  // rounded number, it is the mask's actual edge.
  hidden: { x: "100%" },
  visible: { x: "0%", transition: { duration: DUR.xslow, ease: EASE } },
};

export default function LineReveal({
  children,
  lines,
  delay = 0,
  className = "",
}: {
  /** A plain string is split on sentences. Anything else renders as one line. */
  children?: ReactNode;
  /** Explicit lines, when the natural break is not a sentence break. */
  lines?: ReactNode[];
  delay?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();

  const resolved: ReactNode[] =
    lines ??
    (typeof children === "string" ? splitLines(children) : [children]);

  if (reduce) {
    return (
      <span className={className}>
        {resolved.map((line, i) => (
          <span key={i} className="block">
            {line}
          </span>
        ))}
      </span>
    );
  }

  return (
    <motion.span
      className={className}
      custom={delay}
      variants={LINES}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
    >
      {resolved.map((line, i) => (
        // pb keeps descenders (g, y, p) from being clipped by the mask at rest —
        // still needed here even though the TRAVEL is now horizontal, because the
        // mask box itself is still only as tall as the line.
        <span key={i} className="block overflow-hidden pb-[0.08em]">
          <motion.span variants={LINE} className="block">
            {line}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}
