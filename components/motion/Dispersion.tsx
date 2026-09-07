"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import Eyebrow from "@/components/Eyebrow";

/**
 * Dispersion — the positioning statement, demonstrated instead of stated.
 * A sentence shared by every vertical KBC works with has words that never
 * move (anchors) and words that only exist as one of three readings
 * (variants). Move the incidence angle and the readings separate; land on
 * one and the sentence reads as a single, specific claim for that vertical.
 *
 * THE ENGINEERING RULE, unchanged from the verified prototype: a slot's
 * width is measured once per breakpoint and pinned to its widest variant.
 * Every frame after that writes transform + opacity only — never a layout
 * property, or the anchors drift and the whole idea reads as broken.
 *
 * A slot cannot wrap, so a narrow screen doesn't reflow the sentence, it
 * cuts it differently — three hand-set line structures (sm/md/lg), not one
 * structure reflowing badly. On sm the long middle slot splits into two.
 *
 * Coarse pointers get auto-sweep after a short idle, same principle as
 * Nucleation's fallback ceiling: the mechanic demonstrates itself, nobody
 * is told to do anything. Touch-drag is deliberately not wired to the angle
 * here — this lives mid-page in a normal scroll, and hijacking touch to
 * drive it would fight the visitor's ability to just scroll past it.
 *
 * Device tilt (present in the prototype) is intentionally not ported: an
 * iOS permission prompt on a first visit costs more than the effect earns,
 * and a phone's resting angle is unpredictable — touch-drag and auto-sweep
 * already cover mobile. Same reasoning as the prototype's own recommendation.
 */

type Part = { t: string } | { v: string[] };
type Breakpoint = "sm" | "md" | "lg";
type Slot = { el: HTMLSpanElement; vs: (HTMLSpanElement | null)[] };

const DEFAULT_READINGS = ["Med-spa", "Bridal", "Beauty brand"];
// When `businessName` pins the subject, the readout can't sensibly track a
// vertical anymore (there's only the one business) — these three angles
// pair with the three middle-slot phrases (proven / handled / trusted).
const PERSONALIZED_READINGS: [string, string, string] = ["Confidence", "Ease", "Trust"];
const N = 3;

// The subject slot — three verticals by default (the homepage's own claim).
// A caller can pin this to one fixed name instead (see `businessName` below)
// for the outreach template: the same mechanic, personalized to one prospect
// rather than dispersed across three of KBC's own verticals.
function buildBreakpoints(subject: Part, withArticle: boolean): Record<Breakpoint, Part[][]> {
  // "The clinic/studio/label" reads correctly (common noun) — "The Radiance
  // Med Spa" doesn't (proper noun). Drop the article for a pinned business name.
  const opener = withArticle ? [{ t: "The" }, subject] : [subject];
  return {
    lg: [
      [...opener, { t: "should look like" }],
      [
        {
          v: [
            "the results are already proven",
            "the day is already handled",
            "the product is already trusted",
          ],
        },
      ],
      [{ t: "before anyone reads" }, { v: ["a price.", "a review.", "an ingredient list."] }],
    ],
    md: [
      [...opener, { t: "should look like" }],
      [
        {
          v: [
            "the results are already proven",
            "the day is already handled",
            "the product is already trusted",
          ],
        },
      ],
      [{ t: "before anyone reads" }],
      [{ v: ["a price.", "a review.", "an ingredient list."] }],
    ],
    sm: [
      opener,
      [{ t: "should look like" }],
      [{ v: ["the results are", "the day is", "the product is"] }],
      [{ v: ["already proven", "already handled", "already trusted"] }],
      [{ t: "before anyone reads" }],
      [{ v: ["a price.", "a review.", "an ingredient list."] }],
    ],
  };
}

const DEFAULT_SUBJECT: Part = { v: ["clinic", "studio", "label"] };

type DispersionProps = {
  /** Pins the subject slot to one fixed name instead of dispersing across
   * the three default verticals — the outreach template's whole trick. */
  businessName?: string;
  /** The three labels tracked in "Refracted for — X" / used for SSR text.
   * Only meaningful when `businessName` is also set — otherwise the default
   * three verticals apply. */
  readingNames?: [string, string, string];
  eyebrow?: string;
};

const TOKENS: Record<Breakpoint, { fan: string; shear: string; pitch: string; size: string }> = {
  lg: { fan: "1.02em", shear: "0.10em", pitch: "2.18em", size: "clamp(26px,3.4vw,54px)" },
  md: { fan: "0.96em", shear: "0.09em", pitch: "2.0em", size: "clamp(24px,3.2vw,34px)" },
  sm: { fan: "0.86em", shear: "0.07em", pitch: "1.94em", size: "clamp(19px,5.2vw,24px)" },
};

function currentBP(): Breakpoint {
  if (typeof window === "undefined") return "lg";
  return window.innerWidth < 640 ? "sm" : window.innerWidth < 1024 ? "md" : "lg";
}

export default function Dispersion({ businessName, readingNames, eyebrow = "Positioning" }: DispersionProps) {
  const subject: Part = businessName ? { t: businessName } : DEFAULT_SUBJECT;
  const BREAKPOINTS = buildBreakpoints(subject, !businessName);
  const READINGS = businessName ? readingNames ?? PERSONALIZED_READINGS : DEFAULT_READINGS;

  // The neutral reading (index 1) — used for SSR/no-JS and the pre-mount
  // frame, so a visitor without JS gets one complete, correct sentence,
  // never a blank.
  const STATIC_TEXT = businessName
    ? `${businessName} should look like the day is already handled before anyone reads a review.`
    : "The studio should look like the day is already handled before anyone reads a review.";

  const reduce = useReducedMotion();

  // Same SSR/no-flash discipline as Hero: pre-mount and no-JS render the
  // complete static sentence; useLayoutEffect flips before first paint for
  // JS visitors, so they never see the static frame render then swap.
  const [mounted, setMounted] = useState(false);
  useLayoutEffect(() => setMounted(true), []);

  const [bp, setBp] = useState<Breakpoint>("lg");
  useEffect(() => {
    setBp(currentBP());
    let t = 0;
    const onResize = () => {
      window.clearTimeout(t);
      t = window.setTimeout(() => setBp(currentBP()), 120);
    };
    window.addEventListener("resize", onResize);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const sectionRef = useRef<HTMLDivElement>(null);
  const readingRef = useRef<HTMLSpanElement>(null);
  const incRef = useRef<HTMLDivElement>(null);
  const thetaOutRef = useRef<HTMLDivElement>(null);

  // Slot registry — a Map keyed by stable "line-part" id, populated/cleared
  // directly by callback refs (React's documented pattern for a dynamic ref
  // list). Safer than resetting an array in an effect: it can't desync
  // across a breakpoint change, since a slot that unmounts deletes its own
  // entry rather than leaving a stale one behind.
  const slotsRef = useRef<Map<string, Slot>>(new Map());
  function getSlot(id: string): Slot {
    let s = slotsRef.current.get(id);
    if (!s) {
      s = { el: null as unknown as HTMLSpanElement, vs: [] };
      slotsRef.current.set(id, s);
    }
    return s;
  }

  // Measure: pin each slot's width to its widest variant so later frames
  // only ever touch transform/opacity, never a layout property.
  useEffect(() => {
    if (!mounted) return;
    const measure = () => {
      for (const s of Array.from(slotsRef.current.values())) {
        if (!s.el) continue;
        s.el.style.width = "auto";
        let w = 0;
        for (const v of s.vs) if (v) w = Math.max(w, v.getBoundingClientRect().width);
        s.el.style.width = Math.ceil(w) + "px";
      }
    };
    measure();
    if (document.fonts?.ready) document.fonts.ready.then(measure);
  }, [mounted, bp]);

  // The dispersion loop itself.
  useEffect(() => {
    if (!mounted) return;
    const section = sectionRef.current;
    if (!section) return;

    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const IDLE_MS = coarse ? 900 : 1200;
    const FAN_FALLOFF = 0.85;

    let theta = 0;
    let target = 0;
    let sweeping = false;
    let lastInput = performance.now();
    let raf = 0;

    function apply(th: number) {
      const sel = ((th + 1) / 2) * (N - 1);
      const fan = reduce ? 0 : 1;

      for (const s of Array.from(slotsRef.current.values())) {
        for (let i = 0; i < N; i++) {
          const v = s.vs[i];
          if (!v) continue;
          const d = i - sel;
          const ad = Math.abs(d);
          const dy = fan * Math.sign(d) * Math.pow(ad, FAN_FALLOFF);
          const dx = fan * d;
          v.style.transform =
            "translate3d(calc(-50% + " +
            dx.toFixed(4) +
            " * var(--dispersion-shear)), calc(" +
            dy.toFixed(4) +
            " * var(--dispersion-fan)), 0)";
          v.style.opacity = reduce
            ? i === 1
              ? "1"
              : "0"
            : Math.max(0.14, Math.min(1, 1 - ad * 0.8)).toFixed(3);
        }
      }

      if (incRef.current) incRef.current.style.transform = `rotate(${(th * 26).toFixed(2)}deg)`;
      if (thetaOutRef.current) {
        thetaOutRef.current.textContent = `Incidence ${(th * 26).toFixed(2)}°`;
      }
      const near = Math.round(sel);
      const pure = Math.abs(sel - near) < 0.14;
      if (readingRef.current) {
        readingRef.current.textContent = pure ? READINGS[near] : "in dispersion";
      }
    }

    function onPointerMove(e: PointerEvent) {
      if (e.pointerType === "touch") return;
      const rect = section!.getBoundingClientRect();
      lastInput = performance.now();
      sweeping = false;
      target = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    }
    section.addEventListener("pointermove", onPointerMove);

    function tick(now: number) {
      if (sweeping || now - lastInput > IDLE_MS) {
        sweeping = true;
        target = Math.sin(now / 2600) * 0.98;
      }
      theta += (target - theta) * (reduce ? 1 : 0.16);
      apply(theta);
      raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);

    return () => {
      section.removeEventListener("pointermove", onPointerMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [mounted, bp, reduce, READINGS]);

  const tokens = TOKENS[bp];

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[46vh] overflow-hidden bg-milk py-section"
      style={{ touchAction: "pan-y" }}
    >
      <div className="container relative">
        <Eyebrow className="mb-16">{eyebrow}</Eyebrow>

        {/* Not mounted (SSR / pre-hydration) or no-JS: one complete, correct
            sentence, no variants, nothing to disperse from. */}
        {!mounted ? (
          <p className="type-display max-w-[22ch] text-fluid-xl text-ink">{STATIC_TEXT}</p>
        ) : (
          <>
            <div className="mb-8 flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2">
              <span className="type-meta text-ink/50">
                Refracted for — <span ref={readingRef}>Bridal</span>
              </span>
              <div
                ref={thetaOutRef}
                className="type-meta text-ink/50 [font-variant-numeric:tabular-nums]"
              >
                Incidence 0.00°
              </div>
            </div>

            <div
              className="max-w-[min(1040px,100%)] text-ink"
              style={
                {
                  fontSize: tokens.size,
                  letterSpacing: "-0.018em",
                  "--dispersion-fan": tokens.fan,
                  "--dispersion-shear": tokens.shear,
                  "--dispersion-pitch": tokens.pitch,
                } as React.CSSProperties
              }
            >
              {BREAKPOINTS[bp].map((line, li) => (
                <div key={li} className="dispersion-line">
                  {line.map((part, pi) => {
                    if ("t" in part) {
                      return (
                        <span key={pi} className="dispersion-anchor">
                          {part.t}
                        </span>
                      );
                    }
                    const id = `${li}-${pi}`;
                    return (
                      <span
                        key={pi}
                        ref={(node) => {
                          if (node) getSlot(id).el = node;
                          else slotsRef.current.delete(id);
                        }}
                        className="dispersion-slot"
                      >
                        {part.v.map((text, i) => (
                          <span
                            key={i}
                            ref={(node) => {
                              getSlot(id).vs[i] = node;
                            }}
                            className="dispersion-variant"
                          >
                            {text}
                          </span>
                        ))}
                      </span>
                    );
                  })}
                </div>
              ))}
            </div>

            <div className="mt-10 flex items-center justify-between">
              <span className="type-meta hidden text-ink/40 sm:inline">
                A screenshot only ever captures one angle
              </span>
              <div
                ref={incRef}
                aria-hidden
                className="h-px w-20 origin-right bg-ink/30 sm:w-[104px]"
              />
            </div>
          </>
        )}
      </div>
    </section>
  );
}
