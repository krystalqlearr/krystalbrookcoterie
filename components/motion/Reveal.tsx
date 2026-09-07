"use client";

import { type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  reveal,
  revealFade,
  revealFrom,
  revealSoft,
  revealStagger,
  type RevealDirection,
} from "@/lib/motion";

/**
 * Scroll-reveal primitive — the canonical entrance across the site (build-plan §3).
 * Under reduced motion it renders content immediately with no transform.
 *
 * THE REGISTER (2026-09-07): words fade, media slides — on Bionic Egg's clock.
 *  - `variant`  : "soft" and "fade" are now the SAME text recipe (`revealText`):
 *                 opacity 0.65s on CSS ease, a 32px rise and a 10px blur clearing
 *                 over 0.7/0.75s on EASE_REVEAL — a quick fade into visibility with
 *                 a soft tail. Measured off bionicegg.com; see lib/motion.ts.
 *                 "rise" (default, legacy) — 24px rise + fade on EASE.
 *  - `from`     : a direction — "up" rises from below, "down" drops from above,
 *                 "left"/"right" slide in from that edge — with `distance` px of
 *                 travel (TRAVEL.media by default; pass TRAVEL.aside / .frame).
 *                 For media and side columns. Combine with `variant="soft"` for
 *                 text that slides AND sharpens. Directions are art-directed per
 *                 placement, never random.
 *  - `as`       : element tag (default div)
 *  - `stagger`  : when set, children animate in sequence (children should be <RevealItem>)
 *  - `delay`    : delay before the (first) child animates
 *  - `amount`   : how much must be in view before firing (0–1). Default 0.15 —
 *                 the reveal starts as the block clears the bottom edge, so it
 *                 is already arriving while you scroll to it, never waiting.
 */
type Variant = "rise" | "soft" | "fade";

const variantMap = { rise: reveal, soft: revealSoft, fade: revealFade } as const;

const pick = (variant: Variant, from?: RevealDirection, distance?: number) =>
  from ? revealFrom(from, distance, variant === "soft") : variantMap[variant];

type Props = {
  children: ReactNode;
  as?: "div" | "section" | "ul" | "ol" | "li" | "header" | "figure";
  variant?: Variant;
  from?: RevealDirection;
  distance?: number;
  stagger?: number;
  delay?: number;
  amount?: number;
  className?: string;
};

function RevealRoot({
  children,
  as = "div",
  variant = "rise",
  from,
  distance,
  stagger,
  delay = 0,
  amount = 0.15,
  className = "",
}: Props) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as];

  if (reduce) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  const variants = stagger ? revealStagger(stagger, delay) : pick(variant, from, distance);

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
  variant = "rise",
  from,
  distance,
  className = "",
}: {
  children: ReactNode;
  as?: "div" | "li" | "figure" | "p";
  variant?: Variant;
  from?: RevealDirection;
  distance?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  if (reduce) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }
  const MotionTag = motion[as];
  return (
    <MotionTag className={className} variants={pick(variant, from, distance)}>
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
