"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Site-wide momentum scroll (Lenis). Renders nothing — it's a side-effect that
 * smooths the window scroll so the whole site moves with weight.
 *
 * Guardrails:
 *  - Skipped entirely under prefers-reduced-motion (native scroll returns).
 *  - Inner scroll containers opt out with `data-lenis-prevent` (e.g. the
 *    case-study modal in WorkShowcase).
 *  - Cleans up its rAF loop and instance on unmount.
 */
export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => 1 - Math.pow(1 - t, 3), // ease-out cubic, weighted
      smoothWheel: true,
    });

    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);

  return null;
}
