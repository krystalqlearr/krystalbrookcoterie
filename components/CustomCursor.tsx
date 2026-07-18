"use client";

import { useEffect, useRef } from "react";

/**
 * Custom cursor — a single inversion dot. It uses mix-blend-difference so it
 * optically inverts whatever it crosses: near-black on the bone canvas, light over
 * charcoal sections and imagery. Grows on hover over interactive targets. No ring,
 * no label, no color — ultra-minimal, high-end.
 *
 * Guardrails:
 *  - Coarse/touch pointers: renders nothing active, native cursor stays.
 *  - prefers-reduced-motion: the grow transition is damped globally (globals.css);
 *    the dot tracks 1:1 so there's no lag to disable.
 *  - Never blocks focus/keyboard — pointer-events:none, no preventDefault.
 */

const INTERACTIVE_SELECTOR =
  'a[href], button, [role="button"], input, select, textarea, label, summary, [tabindex]:not([tabindex="-1"]), [data-cursor="hover"]';

const DOT = 14; // base diameter (px)
const DOT_HOVER = 44; // grows over interactive targets

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    if (!dot) return;

    const finePointer = window.matchMedia("(pointer: fine)");
    let enabled = false;
    let visible = false;
    let hovering = false;
    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;

    const render = () => {
      const size = hovering ? DOT_HOVER : DOT;
      dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
      dot.style.width = `${size}px`;
      dot.style.height = `${size}px`;
      dot.style.opacity = visible ? "1" : "0";
    };

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (!visible) visible = true;
      render();
    };
    const onOver = (e: MouseEvent) => {
      const next = !!(e.target as Element | null)?.closest?.(INTERACTIVE_SELECTOR);
      if (next !== hovering) {
        hovering = next;
        render();
      }
    };
    const onEnter = () => {
      visible = true;
      render();
    };
    const onLeave = () => {
      visible = false;
      render();
    };

    const enable = () => {
      if (enabled) return;
      enabled = true;
      document.documentElement.classList.add("kbc-cursor-none");
      window.addEventListener("mousemove", onMove, { passive: true });
      document.addEventListener("mouseover", onOver, { passive: true });
      document.documentElement.addEventListener("mouseenter", onEnter);
      document.documentElement.addEventListener("mouseleave", onLeave);
      render();
    };

    const disable = () => {
      if (!enabled) return;
      enabled = false;
      document.documentElement.classList.remove("kbc-cursor-none");
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.documentElement.removeEventListener("mouseenter", onEnter);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      visible = false;
      hovering = false;
      render();
    };

    const sync = () => {
      if (finePointer.matches) enable();
      else disable();
    };

    sync();
    finePointer.addEventListener("change", sync);
    return () => {
      finePointer.removeEventListener("change", sync);
      disable();
    };
  }, []);

  return (
    <div
      ref={dotRef}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[9999] rounded-full bg-bone mix-blend-difference"
      style={{
        width: DOT,
        height: DOT,
        opacity: 0,
        willChange: "transform, width, height",
        transition:
          "width .3s cubic-bezier(0.16,1,0.3,1), height .3s cubic-bezier(0.16,1,0.3,1), opacity .25s ease",
      }}
    />
  );
}
