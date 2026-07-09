"use client";

import { useEffect, useRef } from "react";

/**
 * Custom cursor — terracotta dot follows the pointer 1:1; teal ring lags behind
 * (lerp) and expands on hover over interactive elements. Matches the spec in
 * docs/kbc-design-direction.html.
 *
 * Guardrails:
 *  - Coarse/touch pointers: renders nothing active, native cursor stays.
 *  - prefers-reduced-motion: no follow-lag (ring tracks 1:1) but hover still fires.
 *  - Never blocks focus/keyboard — elements are pointer-events:none, no preventDefault.
 *  - Colors come from tokens (bg-terracotta / border-teal), never hardcoded hex.
 */

const INTERACTIVE_SELECTOR =
  'a[href], button, [role="button"], input, select, textarea, label, summary, [tabindex]:not([tabindex="-1"]), [data-cursor="hover"]';

const RING_BASE = 34;
const RING_HOVER = 56;
const LERP = 0.18;

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const finePointer = window.matchMedia("(pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    let enabled = false;
    let visible = false;
    let hovering = false;
    let raf = 0;

    let mx = window.innerWidth / 2; // pointer target
    let my = window.innerHeight / 2;
    let rx = mx; // lagged ring position
    let ry = my;

    const renderDot = () => {
      dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
      dot.style.opacity = visible ? "1" : "0";
    };

    const renderRing = () => {
      ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
      const size = hovering ? RING_HOVER : RING_BASE;
      ring.style.width = `${size}px`;
      ring.style.height = `${size}px`;
      ring.style.opacity = visible ? (hovering ? "1" : "0.6") : "0";
    };

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (!visible) visible = true;
      renderDot();
      if (reducedMotion.matches) {
        rx = mx;
        ry = my;
        renderRing();
      }
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as Element | null;
      const next = !!target?.closest?.(INTERACTIVE_SELECTOR);
      if (next !== hovering) {
        hovering = next;
        renderRing();
      }
    };

    const onEnter = () => {
      visible = true;
      renderDot();
      renderRing();
    };

    const onLeave = () => {
      visible = false;
      renderDot();
      renderRing();
    };

    const loop = () => {
      rx += (mx - rx) * LERP;
      ry += (my - ry) * LERP;
      renderRing();
      raf = requestAnimationFrame(loop);
    };

    const enable = () => {
      if (enabled) return;
      enabled = true;
      document.documentElement.classList.add("kbc-cursor-none");
      window.addEventListener("mousemove", onMove, { passive: true });
      document.addEventListener("mouseover", onOver, { passive: true });
      document.documentElement.addEventListener("mouseenter", onEnter);
      document.documentElement.addEventListener("mouseleave", onLeave);
      if (!reducedMotion.matches) raf = requestAnimationFrame(loop);
      renderDot();
      renderRing();
    };

    const disable = () => {
      if (!enabled) return;
      enabled = false;
      document.documentElement.classList.remove("kbc-cursor-none");
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.documentElement.removeEventListener("mouseenter", onEnter);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
      visible = false;
      hovering = false;
      renderDot();
      renderRing();
    };

    // (Re)evaluate whether the cursor should run at all.
    const sync = () => {
      if (finePointer.matches) enable();
      else disable();
    };

    // Reduced-motion can toggle live — restart so the lag loop starts/stops.
    const onReducedChange = () => {
      if (!finePointer.matches) return;
      disable();
      enable();
    };

    sync();
    finePointer.addEventListener("change", sync);
    reducedMotion.addEventListener("change", onReducedChange);

    return () => {
      finePointer.removeEventListener("change", sync);
      reducedMotion.removeEventListener("change", onReducedChange);
      disable();
    };
  }, []);

  return (
    <>
      <div
        ref={ringRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[9999] rounded-full border border-teal"
        style={{
          width: RING_BASE,
          height: RING_BASE,
          opacity: 0,
          willChange: "transform, width, height, opacity",
          transition:
            "width .22s ease, height .22s ease, opacity .22s ease, border-color .22s ease",
        }}
      />
      <div
        ref={dotRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[9999] rounded-full bg-terracotta"
        style={{ width: 7, height: 7, opacity: 0, willChange: "transform" }}
      />
    </>
  );
}
