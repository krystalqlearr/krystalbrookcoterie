import type { Transition, Variants } from "framer-motion";

/**
 * Canonical motion language for KBC. Import from here — never inline easing arrays
 * or durations in components (build-plan §9). Mirrors the CSS custom properties in
 * globals.css and the Tailwind `ease-editorial` / `duration-*` tokens.
 *
 * Luxury cadence: slow, weighted, precise — never bouncy.
 */

/** Primary weighted ease-out (settle). */
export const EASE = [0.16, 1, 0.3, 1] as const;
/** Symmetric ease-in-out — for morphs that travel and return (e.g. the work transition). */
export const EASE_INOUT = [0.83, 0, 0.17, 1] as const;

/** Durations, in seconds (Framer units). */
export const DUR = {
  fast: 0.4,
  base: 0.6,
  slow: 0.72,
  xslow: 0.9,
} as const;

/** Shared-layout transition for the signature work morph — symmetric ease-in-out so
 *  the cover opens AND closes with equal weight (slow start, slow settle). */
export const morphTransition: Transition = {
  type: "tween",
  ease: EASE_INOUT,
  duration: DUR.slow,
};

/** Default entrance transition. */
export const enterTransition: Transition = {
  duration: DUR.base,
  ease: EASE,
};

/** Scroll-reveal variants: subtle rise + fade. Distance/stagger overridable per use. */
export const reveal: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: enterTransition,
  },
};

/** Container that staggers its reveal children. */
export const revealStagger = (stagger = 0.08, delayChildren = 0): Variants => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: stagger, delayChildren },
  },
});

/** Blur-to-sharp entrance — short captions and one-liners ONLY. `filter` is not
 *  compositor-only, so never put this on images, frames, or long blocks. */
export const revealSoft: Variants = {
  hidden: { opacity: 0, y: 12, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: DUR.xslow, ease: EASE },
  },
};

/** How far a reveal travels, by what is travelling. The site-wide register
 *  (2026-09-06): WORDS FADE — short lines blur-to-sharp (`revealSoft`), blocks
 *  fade with a breath of rise (`revealFade`, `text`); MEDIA SLIDES — a portrait
 *  or side column enters from the edge it sits on (`media` / `aside`), a
 *  full-width frame travels furthest (`frame`). */
export const TRAVEL = {
  text: 12,
  aside: 24,
  media: 48,
  frame: 64,
} as const;

/** Fade entrance for prose blocks, lists, and forms — opacity does the work and
 *  the rise is a breath, not a move. Safe on long blocks (no filter). */
export const revealFade: Variants = {
  hidden: { opacity: 0, y: TRAVEL.text },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DUR.xslow, ease: EASE },
  },
};

/** Directional scroll reveal — an element enters moving in `from` a direction
 *  ("up" = rises from below, "down" = drops from above, "left"/"right" = slides
 *  in from that edge), fading as it goes; `soft` adds blur-to-sharp for short
 *  text. Distance comes from TRAVEL. Directions are art-directed per placement —
 *  a portrait slides from the side it faces, a side column from its edge, the
 *  homepage frame drops to meet the name that just rose — never random. */
export type RevealDirection = "up" | "down" | "left" | "right";
export const revealFrom = (
  from: RevealDirection,
  distance: number = TRAVEL.media,
  soft = false,
): Variants => {
  const x = from === "left" ? -distance : from === "right" ? distance : 0;
  const y = from === "up" ? distance : from === "down" ? -distance : 0;
  return {
    hidden: { opacity: 0, x, y, ...(soft ? { filter: "blur(6px)" } : {}) },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      ...(soft ? { filter: "blur(0px)" } : {}),
      transition: { duration: DUR.xslow, ease: EASE },
    },
  };
};

/** The landing: the name grows, then floats into the header's wordmark slot.
 *  `endVh` is the scroll distance of the whole travel in viewport heights —
 *  LandingWordmark's pin length and SiteHeader's reveal threshold both read it.
 *  `spring` trails the scroll by a beat and settles without overshoot (the
 *  "float"); `arcPx` is the mid-travel lift that keeps the path from being a
 *  straight line; `growTo` is the pre-travel growth (viewport-capped at use). */
export const LANDING = {
  endVh: 0.6,
  growTo: 2.2,
  growUntil: 0.38,
  spring: { stiffness: 60, damping: 20, mass: 1 },
  arcPx: 24,
} as const;

/** How long the gem holds alone before the work morph starts (ms). */
export const GEM_BEAT_MS = 400;
