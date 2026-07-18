"use client";

import { type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { reveal, revealStagger } from "@/lib/motion";

/**
 * Scroll-reveal primitive — subtle rise + fade as content enters the viewport.
 * The canonical entrance across the site (build-plan §3). Under reduced motion it
 * renders content immediately with no transform.
 *
 *  - `as`       : element tag (default div)
 *  - `stagger`  : when set, children animate in sequence (children should be <Reveal.Item>)
 *  - `delay`    : delay before the (first) child animates
 *  - `amount`   : how much must be in view before firing (0–1)
 */
type Props = {
  children: ReactNode;
  as?: "div" | "section" | "ul" | "ol" | "li" | "header" | "figure";
  stagger?: number;
  delay?: number;
  amount?: number;
  className?: string;
};

function RevealRoot({
  children,
  as = "div",
  stagger,
  delay = 0,
  amount = 0.3,
  className = "",
}: Props) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as];

  if (reduce) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  const variants = stagger ? revealStagger(stagger, delay) : reveal;

  return (
    <MotionTag
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
      transition={stagger ? undefined : { delay }}
    >
      {children}
    </MotionTag>
  );
}

/** A staggered child inside a <Reveal stagger>. */
function RevealItem({
  children,
  as = "div",
  className = "",
}: {
  children: ReactNode;
  as?: "div" | "li" | "figure" | "p";
  className?: string;
}) {
  const reduce = useReducedMotion();
  if (reduce) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }
  const MotionTag = motion[as];
  return (
    <MotionTag className={className} variants={reveal}>
      {children}
    </MotionTag>
  );
}

/**
 * Use <Reveal> for entrances and the named <RevealItem> for staggered children.
 * (Import RevealItem directly — do NOT hang it off Reveal as a property; a
 * `default.Item` reference can't be resolved across the RSC server/client boundary.)
 */
export { RevealItem };
export default RevealRoot;
