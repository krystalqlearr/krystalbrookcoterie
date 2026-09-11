"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { useHydrated } from "@/lib/useHydrated";

/**
 * A row of phone screens playing the real site — the mobile counterpart to the
 * desktop browser frame at the top of a case study. Bare screens, not device
 * mockups: rounded phone bezels would be the only round corners on a site whose
 * rule is `rounded-[1px]`, and the point is the design, not the hardware.
 *
 * WEIGHT IS THE WHOLE PROBLEM with a row of autoplaying video, so nothing is
 * fetched until the row is near the viewport: `src` is only attached once an
 * IntersectionObserver fires, which keeps the case study's initial load exactly
 * where it was. Each clip is a silent, looping ~15s scroll (see
 * scratchpad/gt-record.mjs — driven at a constant 300 css px a second, so the
 * pace is identical across every screen).
 *
 * REDUCED MOTION gets the poster frame and downloads no video: the <video> is
 * given no `src` and no autoplay, and a <video> with a poster and no source loads
 * only the poster. It is ALWAYS a <video>, never swapped for an <img>. The server
 * can't see the motion preference, so the old swap made server and browser render
 * different elements — React hydration error #418 and a full client re-render,
 * live on /work/glowtoure (2026-09-10). So `src` and `autoPlay` are attached only
 * after hydration (`useHydrated`), and only when motion is allowed.
 */

export type Phone = {
  /** Meta-caps label under the screen — what page this is. */
  label: string;
  mp4: string;
  poster: string;
  /** Accessible label for the screen. */
  alt: string;
};

// The recordings are iPhone-shaped: 390 × 844 css, captured at 2×.
const RATIO = 390 / 844;

export default function PhoneRow({ phones, className = "" }: { phones: Phone[]; className?: string }) {
  const reduce = useReducedMotion();
  const hydrated = useHydrated();
  const videoOn = hydrated && !reduce;
  const ref = useRef<HTMLUListElement>(null);
  const [near, setNear] = useState(false);

  useEffect(() => {
    if (!videoOn) return;
    const el = ref.current;
    if (!el) return;
    // No IntersectionObserver (or an old engine) — just load; correctness first.
    if (typeof IntersectionObserver === "undefined") {
      setNear(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setNear(true);
          io.disconnect();
        }
      },
      { rootMargin: "300px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [videoOn]);

  return (
    <ul
      ref={ref}
      className={`-mx-6 flex snap-x snap-mandatory gap-6 overflow-x-auto px-6 pb-2 md:mx-0 md:grid md:grid-cols-3 md:gap-x-gutter md:overflow-visible md:px-0 ${className}`}
    >
      {phones.map((p) => (
        <li key={p.mp4} className="w-[68%] shrink-0 snap-start md:w-auto">
          <div
            className="relative w-full overflow-hidden border border-milk/15 bg-onyx"
            style={{ aspectRatio: RATIO }}
          >
            <video
              // No `src` until the row is near the viewport AND motion is allowed,
              // so a page never scrolled this far, or a reduced-motion visit,
              // downloads nothing but the poster.
              src={videoOn && near ? p.mp4 : undefined}
              poster={p.poster}
              autoPlay={videoOn}
              loop
              muted
              playsInline
              preload="none"
              aria-label={p.alt}
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
          <p className="type-meta mt-4 text-milk/60">{p.label}</p>
        </li>
      ))}
    </ul>
  );
}
