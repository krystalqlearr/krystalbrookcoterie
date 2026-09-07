"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import Button from "./Button";
import ArrowLink from "./ArrowLink";
import HeroCrystal from "./motion/HeroCrystal";

/**
 * PARKED — not imported anywhere as of the 2026-09 quiet-luxury pivot. The
 * homepage's hero is now plain, immediate content in app/page.tsx: a
 * waiting state that withholds the page until you move your pointer, plus
 * a seed HUD and a share mechanic, is a clever trick that announces
 * itself — the opposite of the restraint the site is now built on. Kept,
 * not deleted, alongside HeroCrystal.tsx as raw material for the future
 * per-client crystal generator. See docs/kbc-build-plan.md, Phase 7.
 *
 * ---
 *
 * Nucleation — the hero doesn't load pre-composed. It arrives nearly empty and
 * waits: your first pointer movement (or touch, or a 900ms deterministic
 * fallback so it never blocks a real visitor or a crawler) becomes the seed
 * the whole headline — and a real, hand-rolled WebGL crystal — grow outward
 * from, in one of five art-directed orientations. Coterie's rule — nothing
 * exists until it's connected to something present — applied to the first
 * three seconds of the site itself.
 *
 * The seed encodes into the URL, so the exact formation is shareable: reload
 * a link with ?seed=ne and you reproduce that visitor's orientation exactly —
 * same layout, same camera angle, same crystal geometry — instantly, no
 * waiting.
 *
 * Nucleation is a presentational layer over a page that is already complete —
 * it is never the reason content exists. Server-rendered output (and anyone
 * without JS) gets the full, centered, fully visible hero with no waiting
 * state at all; only once React mounts does `useLayoutEffect` flip it into
 * the hidden/waiting state *before the browser's first paint*, so a JS
 * visitor never actually sees the SSR fallback flash — they go straight to
 * the nucleation moment — while search crawlers and no-JS visitors see a
 * correct, readable page and nothing else, forever.
 */

type Zone = "center" | "ne" | "nw" | "se" | "sw";

const ORIENTATIONS: Record<
  Zone,
  { align: "left" | "right" | "center"; label: string; camYaw: number }
> = {
  center: { align: "center", label: "Center — still water", camYaw: 0 },
  ne: { align: "left", label: "North-east — rising current", camYaw: Math.PI * 0.15 },
  nw: { align: "right", label: "North-west — against the bank", camYaw: -Math.PI * 0.15 },
  se: { align: "left", label: "South-east — deep channel", camYaw: Math.PI * 0.35 },
  sw: { align: "right", label: "South-west — the far shore", camYaw: -Math.PI * 0.35 },
};

// Deterministic points used to reproduce a shared ?seed= link exactly, and as
// the no-interaction fallback (se) so the hero never waits forever.
const REPRO_POINTS: Record<Zone, { x: number; y: number }> = {
  center: { x: 0.5, y: 0.5 },
  ne: { x: 0.78, y: 0.22 },
  nw: { x: 0.22, y: 0.22 },
  se: { x: 0.76, y: 0.62 },
  sw: { x: 0.22, y: 0.78 },
};

const alignClass: Record<"left" | "right" | "center", string> = {
  left: "items-start text-left",
  right: "items-end text-right",
  center: "items-center text-center",
};

function zoneFor(x: number, y: number, w: number, h: number): Zone {
  const cx = w / 2, cy = h / 2;
  const dx = x - cx, dy = y - cy;
  const dist = Math.hypot(dx, dy);
  const radius = Math.min(w, h) * 0.22;
  if (dist < radius) return "center";
  const angle = Math.atan2(dy, dx);
  if (angle >= -Math.PI / 2 && angle < 0) return "ne";
  if (angle >= -Math.PI && angle < -Math.PI / 2) return "nw";
  if (angle >= 0 && angle < Math.PI / 2) return "se";
  return "sw";
}

export default function Hero() {
  const reduce = useReducedMotion();
  const stageRef = useRef<HTMLDivElement>(null);
  const seededRef = useRef(false);

  const [seed, setSeed] = useState<{ zone: Zone; xPct: number; yPct: number; fromUrl: boolean } | null>(null);
  const [copied, setCopied] = useState(false);

  // Server-rendered and pre-hydration output must be the complete, visible
  // page — `mounted` starts false so that's exactly what SSR/no-JS visitors
  // get. `useLayoutEffect`, not `useEffect`, flips it before the browser's
  // first paint, so a JS-capable visitor never actually sees that fallback —
  // they go straight to the hidden/waiting nucleation state with no flash.
  const [mounted, setMounted] = useState(false);
  useLayoutEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const seedAt = (x: number, y: number, w: number, h: number, fromUrl: boolean) => {
      if (seededRef.current) return;
      seededRef.current = true;
      const zone = zoneFor(x, y, w, h);
      const xPct = (x / w) * 100;
      const yPct = (y / h) * 100;
      if (!fromUrl) {
        const url = new URL(window.location.href);
        url.searchParams.set("seed", zone);
        window.history.replaceState({}, "", url);
      }
      setSeed({ zone, xPct, yPct, fromUrl });
    };

    const rect = stage.getBoundingClientRect();
    const w = rect.width, h = rect.height;

    const params = new URLSearchParams(window.location.search);
    const shared = params.get("seed") as Zone | null;

    if (shared && ORIENTATIONS[shared]) {
      const rp = REPRO_POINTS[shared];
      seedAt(rp.x * w, rp.y * h, w, h, true);
      return;
    }
    if (reduce) {
      seedAt(w / 2, h / 2, w, h, false);
      return;
    }

    const onFirstMove = (e: PointerEvent | TouchEvent) => {
      const point = "touches" in e ? e.touches[0] : e;
      seedAt(point.clientX - rect.left, point.clientY - rect.top, w, h, false);
      cleanup();
    };
    // 900ms: fast enough that nothing reads as broken, slow enough that a
    // real visitor's own cursor is still usually what fires this — not the
    // fallback. Much shorter (e.g. 400ms) would mean most visitors never
    // get the chance to be the seed at all, which defeats the mechanic.
    const fallback = window.setTimeout(() => {
      const rp = REPRO_POINTS.se;
      seedAt(rp.x * w, rp.y * h, w, h, false);
      cleanup();
    }, 900);
    function cleanup() {
      window.clearTimeout(fallback);
      window.removeEventListener("pointermove", onFirstMove);
      window.removeEventListener("touchstart", onFirstMove);
    }
    window.addEventListener("pointermove", onFirstMove, { passive: true });
    window.addEventListener("touchstart", onFirstMove, { passive: true });
    return cleanup;
  }, [reduce]);

  // Three states: pre-mount (SSR/no-JS — always fully visible), waiting
  // (mounted, no seed yet — hidden), revealed (seeded — visible again).
  const waiting = mounted && seed === null;
  const revealed = !mounted || seed !== null;
  const orientation = seed ? ORIENTATIONS[seed.zone] : !mounted ? ORIENTATIONS.center : null;

  // The crystal's anchor. Off-center zones already clear the text naturally
  // (their seed sits on the opposite side/band from the text it produces).
  // Center is the one case with no clear side at all — text is centered
  // across the full column, top to bottom of the paragraph band — so rather
  // than fight that with an ever-larger horizontal push, it's anchored to a
  // corner (reusing NE's clear top-right) instead of the literal seed point.
  const isCenterBand = orientation?.align === "center";
  const crystalXPct = seed ? (isCenterBand ? 87 : seed.xPct) : 0;
  const crystalYPct = seed ? (isCenterBand ? 18 : seed.yPct) : 0;

  const handleShare = () => {
    if (typeof navigator === "undefined" || !navigator.clipboard) return;
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    });
  };

  return (
    <section
      ref={stageRef}
      className="relative min-h-[92svh] overflow-hidden bg-milk pb-20 pt-24 md:pt-24"
    >
      {/* Waiting state — nearly nothing, on purpose. Coterie's rule applied to
          the first three seconds: the page doesn't exist until you're present.
          Never shown pre-mount — SSR/no-JS visitors get the full page instead. */}
      <div
        aria-hidden={!waiting}
        className={`absolute inset-0 z-[3] flex flex-col items-center justify-center gap-4 transition-opacity duration-700 ${
          waiting ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <span className="type-meta">Krystal Brook Coterie</span>
        <span className="type-meta flex items-center gap-2 text-ink/55">
          <span className="h-[5px] w-[5px] animate-pulse rounded-full bg-flare" aria-hidden />
          {seed?.fromUrl ? "Reproducing a shared formation" : "Awaiting a nucleation site"}
        </span>
      </div>

      {/* The crystal — real geometry, growing directly out of the exact point
          where this visit began. No box, no diorama: a transparent canvas
          centered on the seed coordinate, sitting behind the text (z-[1])
          so the headline stays legible over it. This IS the "glow" now —
          there's nothing left to fake with a blurred dot once the real
          crystal is doing the work. */}
      {seed ? (
        <div
          aria-hidden
          className={`pointer-events-none absolute z-[1] -translate-x-1/2 -translate-y-1/2 transition-opacity ${
            isCenterBand
              ? "h-[13rem] w-[13rem] sm:h-[15rem] sm:w-[15rem] lg:h-[17rem] lg:w-[17rem]"
              : "h-[16rem] w-[16rem] sm:h-[20rem] sm:w-[20rem] lg:h-[24rem] lg:w-[24rem]"
          } ${reduce ? "duration-0" : "duration-[1400ms] delay-0"}`}
          // Centered on the seed, but clamped 20rem from both the top and
          // bottom of the section: at the largest off-center size (lg,
          // half-height 12rem) that leaves clearance from the fixed
          // transparent header above (ne/nw sit at 22% down) and the
          // seed/share HUD row below (sw sits at 78% down), without
          // shrinking the box to something that undersells the actual WebGL
          // craft. Center is smaller too, and anchored further into its
          // corner (82%/18%) — centered text has no clear side at all, so it
          // needs both a smaller footprint and more distance from the point
          // to actually clear the paragraph. Some overlap with the headline
          // itself is fine — bold display type reads over it easily, same as
          // any graphic behind large type; it's only the smaller
          // paragraph/meta text that needs a hard clearance floor.
          style={{
            left: `${crystalXPct}%`,
            top: `clamp(${isCenterBand ? "14rem" : "20rem"}, ${crystalYPct}%, calc(100% - ${isCenterBand ? "14rem" : "20rem"}))`,
            opacity: revealed ? 1 : 0,
          }}
        >
          <HeroCrystal
            active={revealed}
            seedKey={`${seed.zone}-${seed.xPct.toFixed(1)}-${seed.yPct.toFixed(1)}`}
            camYaw={orientation?.camYaw ?? 0}
          />
        </div>
      ) : null}

      {/* Content — always in the DOM; gated only by clip-path, so a crawler or
          screen reader sees the real headline regardless of seed state. */}
      <div
        className="container relative z-[2] flex h-full flex-col justify-center"
        style={{
          // No seed yet at all (pre-mount/SSR): no clipping — fully visible,
          // nothing to reveal from. Waiting (mounted, no seed): clipped shut.
          // Seeded: revealed from that exact point.
          clipPath: !seed ? "none" : revealed ? `circle(150% at ${seed.xPct}% ${seed.yPct}%)` : "circle(0% at 50% 50%)",
          transition: reduce || !mounted ? "none" : "clip-path 1.1s cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        <div className={`flex flex-col ${orientation ? alignClass[orientation.align] : "items-start text-left"}`}>
          <p
            className="type-meta text-flare-deep transition-all duration-700"
            style={{ transitionDelay: reduce ? "0ms" : "500ms", opacity: revealed ? 1 : 0, transform: revealed ? "none" : "translateY(10px)" }}
          >
            Lattice orientation — {orientation?.label ?? "—"}
          </p>

          <h1
            className="type-display mt-4 max-w-[14ch] text-fluid-hero text-ink transition-all duration-[800ms]"
            style={{ transitionDelay: reduce ? "0ms" : "650ms", opacity: revealed ? 1 : 0, transform: revealed ? "none" : "translateY(16px)" }}
          >
            Websites with <span className="text-flare">presence.</span>
          </h1>

          <p
            className="mt-9 max-w-[42ch] font-sans text-fluid-lg text-ink/70 transition-all duration-[800ms]"
            style={{ transitionDelay: reduce ? "0ms" : "850ms", opacity: revealed ? 1 : 0, transform: revealed ? "none" : "translateY(10px)" }}
          >
            For founder-led brands ready to look as established as they have become.
            Strategy, art direction, and custom web design built to turn attention into
            trust — and trust into demand.
          </p>

          <div
            className="mt-12 flex flex-wrap items-center gap-x-10 gap-y-6 transition-all duration-[800ms]"
            style={{ transitionDelay: reduce ? "0ms" : "1000ms", opacity: revealed ? 1 : 0, transform: revealed ? "none" : "translateY(10px)" }}
          >
            <Button href="/begin" variant="primary">
              Begin your project
            </Button>
            <ArrowLink href="/work">View selected work</ArrowLink>
          </div>
        </div>
      </div>

      {/* HUD — the seed coordinate and the share mechanic. Only makes sense
          once a real seed exists (the clipboard API needs JS regardless), so
          it stays out of the SSR/no-JS fallback entirely rather than showing
          a "Seed —" that never happened. In normal flow rather than pinned
          to the section's bottom edge, so it can't collide with anything. */}
      {seed ? (
        <div
          className="relative z-[3] mt-16 transition-opacity duration-1000"
          style={{ transitionDelay: reduce ? "0ms" : "1300ms", opacity: revealed ? 1 : 0 }}
        >
          <div className="container flex flex-wrap items-center justify-between gap-4">
            <span className="type-meta text-ink/50">
              Seed <strong className="text-flare-deep">{seed.zone.toUpperCase()}</strong> · this page
              grew from where you were
            </span>
            <button
              type="button"
              onClick={handleShare}
              className="type-meta text-ink underline decoration-ink/30 underline-offset-4 transition-colors hover:decoration-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
            >
              {copied ? "Copied ✓" : "Copy the link that grew this way ↗"}
            </button>
          </div>
        </div>
      ) : null}
    </section>
  );
}
