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
/** The scroll-reveal curve (2026-09-07) — measured off bionicegg.com, which is what
 *  Krystal asked the text to do: "a quick fade into visibility as you scroll". Fast
 *  front, soft tail: two-thirds of the travel happens in the first 100ms, then it
 *  eases home. Their `transform 0.7s cubic-bezier(0.2, 0.72, 0.2, 1)`. */
export const EASE_REVEAL = [0.2, 0.72, 0.2, 1] as const;
/** CSS `ease` — what their opacity runs on (they give it a duration only). */
export const EASE_CSS = [0.25, 0.1, 0.25, 1] as const;
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

/** How far a reveal travels, by what is travelling. WORDS: one recipe for every
 *  text block (`revealText`, 32px — Bionic Egg's figure). MEDIA SLIDES — a portrait
 *  or side column enters from the edge it sits on (`media` / `aside`), a
 *  full-width frame travels furthest (`frame`). */
export const TRAVEL = {
  text: 32,
  aside: 24,
  media: 48,
  frame: 64,
} as const;

/** The text reveal — "a quick fade into visibility as you scroll" (2026-09-07).
 *  Measured off bionicegg.com and reproduced property for property: hidden is
 *  `opacity 0 · translateY(32px) · blur(10px)`; visible transitions opacity over
 *  0.65s on CSS `ease` (0 → 0.7 in the first ~220ms — the "quick"), the blur over
 *  0.75s and the rise over 0.7s on EASE_REVEAL (the soft tail). One recipe on
 *  headings, eyebrows, paragraphs, lists and captions alike — they don't
 *  distinguish, and neither do we now. Under reduced motion Reveal renders the
 *  plain tag, so `filter` never reaches a user who asked for stillness. */
export const revealText: Variants = {
  hidden: { opacity: 0, y: TRAVEL.text, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      opacity: { duration: 0.65, ease: EASE_CSS },
      filter: { duration: 0.75, ease: EASE_REVEAL },
      y: { duration: 0.7, ease: EASE_REVEAL },
    },
  },
};

/** `soft` and `fade` both resolve to the one text recipe now; the names stay so
 *  no page had to change, and so a future split (e.g. no blur on very long
 *  prose) is one line here rather than a site-wide edit. */
export const revealSoft: Variants = revealText;
export const revealFade: Variants = revealText;

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
  // Same clock as the text (2026-09-07): media slides on EASE_REVEAL over 0.7s,
  // its fade on CSS `ease` over 0.65s — one motion language on a page.
  return {
    hidden: { opacity: 0, x, y, ...(soft ? { filter: "blur(10px)" } : {}) },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      ...(soft ? { filter: "blur(0px)" } : {}),
      transition: {
        opacity: { duration: 0.65, ease: EASE_CSS },
        x: { duration: 0.7, ease: EASE_REVEAL },
        y: { duration: 0.7, ease: EASE_REVEAL },
        ...(soft ? { filter: { duration: 0.75, ease: EASE_REVEAL } } : {}),
      },
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
