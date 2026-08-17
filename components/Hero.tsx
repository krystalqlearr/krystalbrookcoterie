"use client";

import { motion, useMotionValue, useReducedMotion, useSpring, type Variants } from "framer-motion";
import { useEffect } from "react";
import { EASE, DUR } from "@/lib/motion";
import Button from "./Button";
import ArrowLink from "./ArrowLink";

/**
 * Home hero — the first-impression showstopper on warm bone paper: an enormous
 * REGULAR-weight, sentence-case headline arrives with per-line mask choreography,
 * a grotesk subline settles beneath it, and a faint warm haze drifts toward the
 * pointer. The restraint is the luxury signal: 108px of 400-weight type at
 * −0.06em says more than any bold cut can.
 *
 * The LCP is text, so it paints instantly; the atmosphere animates in after. That
 * contrast — instant AND alive — is the craft signal. Fully reduced-motion aware:
 * no reveal, no pointer drift, content is simply present.
 */

// Headline set as discrete lines so each can mask-reveal independently.
const LINE_PARENT: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};
const LINE_CHILD: Variants = {
  hidden: { y: "115%" },
  visible: { y: "0%", transition: { duration: DUR.xslow, ease: EASE } },
};
const FADE_UP: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: DUR.base, ease: EASE, delay },
  }),
};

export default function Hero() {
  const reduce = useReducedMotion();

  // Pointer-reactive bloom — spring-smoothed so it drifts, never snaps.
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const bx = useSpring(mx, { stiffness: 40, damping: 20, mass: 1.2 });
  const by = useSpring(my, { stiffness: 40, damping: 20, mass: 1.2 });

  useEffect(() => {
    if (reduce) return;
    const onMove = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth - 0.5) * 2; // -1 … 1
      const ny = (e.clientY / window.innerHeight - 0.5) * 2;
      mx.set(nx * 60);
      my.set(ny * 60);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [mx, my, reduce]);

  return (
    <section className="relative flex min-h-[86svh] items-center overflow-hidden pb-20 pt-24 md:pt-24">
      {/* Atmosphere — a faint warm paper haze. Felt, not seen. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-0">
        <motion.div
          style={reduce ? undefined : { x: bx, y: by }}
          className="absolute left-[58%] top-[22%] h-[42rem] w-[42rem] -translate-x-1/2 rounded-full bg-mocha/10 blur-[130px]"
        />
        <motion.div
          style={reduce ? undefined : { x: by, y: bx }}
          className="absolute left-[20%] top-[60%] h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-flare/10 blur-[140px]"
        />
        <div className="editorial-grain absolute inset-0" />
        <div className="absolute inset-0 bg-gradient-to-t from-bone via-bone/30 to-transparent" />
      </div>

      <div className="container relative z-[2]">
        {/* Eyebrow */}
        <motion.p
          custom={0}
          variants={FADE_UP}
          initial={reduce ? undefined : "hidden"}
          animate={reduce ? undefined : "visible"}
          className="type-meta text-ink/70"
        >
          Digital identities for beauty, wellness &amp; luxury brands
        </motion.p>

        {/* Headline — DISPLAY register (regular weight, sentence case, hard negative
            tracking), revealed line by line behind a mask. The flare is COLOR on one
            word, in the same face: the serif-italic accent is retired. */}
        <motion.h1
          variants={reduce ? undefined : LINE_PARENT}
          initial={reduce ? undefined : "hidden"}
          animate={reduce ? undefined : "visible"}
          className="type-display mt-8 max-w-[14ch] text-fluid-hero text-ink"
        >
          <span className="block overflow-hidden pb-[0.05em]">
            <motion.span variants={reduce ? undefined : LINE_CHILD} className="block">
              Websites with
            </motion.span>
          </span>
          <span className="block overflow-hidden pb-[0.08em]">
            <motion.span
              variants={reduce ? undefined : LINE_CHILD}
              className="block text-flare"
            >
              presence.
            </motion.span>
          </span>
        </motion.h1>

        {/* Subline — the quiet voice under the statement, now grotesk */}
        <motion.p
          custom={0.9}
          variants={FADE_UP}
          initial={reduce ? undefined : "hidden"}
          animate={reduce ? undefined : "visible"}
          className="mt-9 max-w-[52ch] font-sans text-fluid-lg text-ink/70"
        >
          For founder-led brands ready to look as established as they have become.
          Strategy, art direction, and custom web design built to turn attention into
          trust — and trust into demand.
        </motion.p>

        <motion.div
          custom={1.05}
          variants={FADE_UP}
          initial={reduce ? undefined : "hidden"}
          animate={reduce ? undefined : "visible"}
          className="mt-12 flex flex-wrap items-center gap-x-10 gap-y-6"
        >
          {/* One filled control per view; every other action is typography. */}
          <Button href="/begin" variant="primary">
            Begin your project
          </Button>
          <ArrowLink href="/work">View selected work</ArrowLink>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={reduce ? undefined : { opacity: 0 }}
        animate={reduce ? undefined : { opacity: 1, transition: { delay: 1.4, duration: DUR.base } }}
        className="absolute bottom-8 left-0 right-0"
      >
        <div className="type-meta container flex items-center gap-3 text-ink/70">
          <span className="h-8 w-px bg-gradient-to-b from-ink/50 to-transparent" />
          Scroll
        </div>
      </motion.div>
    </section>
  );
}
