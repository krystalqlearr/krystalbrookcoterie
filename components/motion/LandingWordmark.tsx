"use client";

import { useLayoutEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { DUR, EASE, LANDING } from "@/lib/motion";

/**
 * The landing moment — the first screen is the name, at small scale, on an
 * otherwise empty canvas. No headline, no CTA, no image, and no header or nav
 * (SiteHeader stays out until the name has arrived).
 *
 * Scrolling doesn't cut to the site. The name GROWS toward you first — the
 * page's one large-type moment, transient — then FLOATS into the header's
 * wordmark slot and becomes the logo. One continuous element: same glyphs,
 * same weight, same case, so the nav never "appears"; the name arrives where
 * it lives.
 *
 * Float, not snap: the transforms are driven by a spring that trails the
 * scroll by a beat and settles without overshoot, the path lifts slightly
 * mid-travel instead of running straight, and the real Logo takes over only
 * once the spring has come to rest — not at a scroll threshold.
 *
 * Geometry: the outer wrapper is `100svh + endVh` tall so the sticky box stays
 * pinned for exactly the travel distance — while pinned, the box IS the
 * viewport, so the traveler's coordinates are viewport coordinates and the
 * header slot's rect can be used directly. A ghost span measures the name at
 * rest (a reload mid-scroll would otherwise measure a mid-morph element).
 * `transformOrigin: 0% 50%` is load-bearing: tightening tracking shrinks the
 * box from the right, so anchoring the LEFT edge lands the name exactly on
 * the slot's left edge whatever its final width.
 *
 * Accessibility/SEO: decorative — the traveler and ghost are aria-hidden, the
 * header Link stays the one accessible brand name, and the real <h1> lives in
 * the page below. Reduced motion: a static band, no growth, no travel, header
 * visible from the start.
 */

const REST_PX = 13; // the name's rest size (text-meta)
const REST_TRACKING_PX = 0.42 * REST_PX;
// Extra pinned distance AFTER the travel completes. The spring trails the
// scroll, so on a fast scroll the name is still settling and fading when the
// travel distance is passed — if the sticky box released there, the page
// would drag the name up off the header mid-fade. The hold keeps the box
// pinned (name sitting exactly on the logo, fading out) until the spring is
// certainly at rest; the transforms themselves still complete at endVh.
const HOLD_VH = 0.35;

type Measure = {
  vw: number;
  vh: number;
  w0: number;
  h0: number;
  slotLeft: number;
  slotCenterY: number;
  logoScale: number;
  logoTracking: string;
  growTo: number;
};

const DEFAULTS: Measure = {
  vw: 1440,
  vh: 900,
  w0: 235,
  h0: 16,
  slotLeft: 24,
  slotCenterY: 40,
  logoScale: 1.2,
  logoTracking: "0.3px",
  growTo: LANDING.growTo,
};

export default function LandingWordmark() {
  const reduce = useReducedMotion();
  const ghostRef = useRef<HTMLSpanElement | null>(null);
  const [m, setM] = useState<Measure>(DEFAULTS);
  const [arrived, setArrived] = useState(false);

  // Tells SiteHeader there's a landing screen on this route so it stays out
  // until the name has arrived. Layout effect (before paint) so the header
  // never flashes in first; removed on unmount so other routes are unaffected.
  useLayoutEffect(() => {
    if (reduce) return;
    document.documentElement.dataset.landing = "";
    return () => {
      delete document.documentElement.dataset.landing;
    };
  }, [reduce]);

  useLayoutEffect(() => {
    if (reduce) return;
    const measure = () => {
      const ghost = ghostRef.current;
      if (!ghost) return;
      const slot = document.querySelector<HTMLElement>("[data-wordmark-slot]");
      const logo = slot?.querySelector<HTMLElement>('[role="img"]');
      const rect = slot?.getBoundingClientRect();
      const cs = logo ? getComputedStyle(logo) : null;
      const w0 = ghost.offsetWidth || DEFAULTS.w0;
      setM({
        vw: window.innerWidth,
        vh: window.innerHeight,
        w0,
        h0: ghost.offsetHeight || DEFAULTS.h0,
        slotLeft: rect ? rect.left : DEFAULTS.slotLeft,
        slotCenterY: rect ? rect.top + rect.height / 2 : DEFAULTS.slotCenterY,
        logoScale: cs ? parseFloat(cs.fontSize) / REST_PX : DEFAULTS.logoScale,
        logoTracking: cs?.letterSpacing && cs.letterSpacing !== "normal" ? cs.letterSpacing : "0px",
        // Grow as far as the viewport allows without clipping the name mid-word.
        growTo: Math.max(1, Math.min(LANDING.growTo, (window.innerWidth * 0.92) / w0)),
      });
    };
    measure();
    window.addEventListener("resize", measure);
    document.fonts?.ready.then(measure);
    return () => window.removeEventListener("resize", measure);
  }, [reduce]);

  const { scrollY } = useScroll();
  const raw = useTransform(scrollY, [0, m.vh * LANDING.endVh], [0, 1], { clamp: true });
  const p = useSpring(raw, LANDING.spring);

  const g = LANDING.growUntil;
  // Left edge (origin 0% 50%): centred while growing, then to the slot.
  const x = useTransform(
    p,
    [0, g, 1],
    [m.vw / 2 - m.w0 / 2, m.vw / 2 - (m.w0 * m.growTo) / 2, m.slotLeft],
  );
  // Vertical origin is the centre, so `top` is centre − h0/2 at every scale.
  const yLine = useTransform(
    p,
    [0, g, 1],
    [m.vh / 2 - m.h0 / 2, m.vh / 2 - m.h0 / 2, m.slotCenterY - m.h0 / 2],
  );
  const y = useTransform([p, yLine], ([t, base]) => {
    const travel = Math.max(0, (Number(t) - g) / (1 - g));
    return Number(base) - Math.sin(travel * Math.PI) * LANDING.arcPx;
  });
  const scale = useTransform(p, [0, g, 1], [1, m.growTo, m.logoScale]);
  const letterSpacing = useTransform(
    p,
    [0, g, 1],
    [`${REST_TRACKING_PX}px`, `${REST_TRACKING_PX}px`, m.logoTracking],
  );
  const inkAlpha = useTransform(p, [0, g, 1], [0.7, 0.7, 1]);

  // Arrival = the spring has settled, not a scroll threshold.
  useMotionValueEvent(p, "change", (v) => setArrived(v >= 0.985));

  if (reduce) {
    return (
      <section className="flex min-h-[42svh] items-center justify-center bg-milk">
        <span className="font-display font-medium text-meta lowercase tracking-[0.42em] text-ink/70">
          krystal brook coterie
        </span>
      </section>
    );
  }

  return (
    <div
      className="relative bg-milk"
      style={{ height: `calc(100svh + ${(LANDING.endVh + HOLD_VH) * 100}svh)` }}
    >
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <span
          ref={ghostRef}
          aria-hidden
          className="invisible absolute left-0 top-0 whitespace-nowrap font-display font-medium text-meta lowercase"
          style={{ letterSpacing: `${REST_TRACKING_PX}px` }}
        >
          krystal brook coterie
        </span>
        <motion.span
          aria-hidden
          className="pointer-events-none absolute left-0 top-0 whitespace-nowrap font-display font-medium text-meta lowercase text-ink"
          style={{ x, y, scale, letterSpacing, transformOrigin: "0% 50%" }}
          animate={{ opacity: arrived ? 0 : 1 }}
          transition={{ duration: DUR.base, ease: EASE }}
        >
          <motion.span style={{ opacity: inkAlpha }}>krystal brook coterie</motion.span>
        </motion.span>
      </div>
    </div>
  );
}
