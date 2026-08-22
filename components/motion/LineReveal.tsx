"use client";

import { type ReactNode } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { EASE, DUR } from "@/lib/motion";
import { splitLines } from "@/lib/lines";

/**
 * Line-by-line slide — the display register's entrance.
 *
 * Each line sits in an `overflow-hidden` block and travels up from fully below it,
 * so the type appears to rise from behind the paper rather than fade toward the
 * reader. That is a materially different gesture from the old rise-and-fade: no
 * opacity ramp, no drift, just weight arriving. It is the same choreography the
 * hero already used, promoted to the whole site.
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
  // 110% not 100%: descenders (g, y, p) sit below the box, and at 100% their tails
  // stay visible above the mask edge for the whole travel.
  hidden: { y: "110%" },
  visible: { y: "0%", transition: { duration: DUR.xslow, ease: EASE } },
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
        // pb keeps descenders from being clipped by the mask at rest.
        <span key={i} className="block overflow-hidden pb-[0.08em]">
          <motion.span variants={LINE} className="block">
            {line}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}
