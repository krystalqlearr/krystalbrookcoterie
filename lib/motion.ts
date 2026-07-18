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

/** Shared-layout transition for the signature work morph. */
export const morphTransition: Transition = {
  type: "tween",
  ease: EASE,
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
