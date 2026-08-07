"use client";

import { motion, useMotionValue, useReducedMotion, useSpring, type Variants } from "framer-motion";
import { useEffect } from "react";
import { EASE, DUR } from "@/lib/motion";
import Button from "./Button";

/**
 * Home hero — the first-impression showstopper on warm bone paper: a monumental
 * UPPERCASE sans headline arrives with per-line mask choreography, a serif italic
 * subline settles beneath it (the HAUS pairing), and a faint warm haze drifts
 * toward the pointer.
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
          className="absolute left-[20%] top-[60%] h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-cherry/10 blur-[140px]"
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
          className="font-sans text-xs font-medium uppercase tracking-[0.28em] text-cherry"
        >
          Digital identities for beauty, wellness &amp; luxury brands
        </motion.p>

        {/* Headline — monumental uppercase sans, per-line mask reveal */}
        <motion.h1
          variants={reduce ? undefined : LINE_PARENT}
          initial={reduce ? undefined : "hidden"}
          animate={reduce ? undefined : "visible"}
          className="mt-6 max-w-[16ch] font-display text-fluid-hero font-extrabold uppercase leading-[0.9] tracking-[-0.01em] text-ink"
        >
          <span className="block overflow-hidden pb-[0.05em]">
            <motion.span variants={reduce ? undefined : LINE_CHILD} className="block">
              Websites with
            </motion.span>
          </span>
          <span className="block overflow-hidden pb-[0.08em]">
            <motion.span
              variants={reduce ? undefined : LINE_CHILD}
              className="block font-editorial font-normal italic normal-case tracking-normal leading-[0.95] text-cherry"
            >
              presence.
            </motion.span>
          </span>
        </motion.h1>

        {/* Serif italic subline — the quiet voice under the statement */}
        <motion.p
          custom={0.9}
          variants={FADE_UP}
          initial={reduce ? undefined : "hidden"}
          animate={reduce ? undefined : "visible"}
          className="mt-8 max-w-[46ch] font-editorial text-fluid-lg italic leading-snug text-ink/75"
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
          className="mt-9 flex flex-wrap items-center gap-4"
        >
          <Button href="/begin" variant="primary">
            Begin your project
          </Button>
          <Button href="/work" variant="ghost">
            View selected work
          </Button>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={reduce ? undefined : { opacity: 0 }}
        animate={reduce ? undefined : { opacity: 1, transition: { delay: 1.4, duration: DUR.base } }}
        className="absolute bottom-8 left-0 right-0"
      >
        <div className="container flex items-center gap-3 font-sans text-[0.65rem] uppercase tracking-[0.28em] text-ink/60">
          <span className="h-8 w-px bg-gradient-to-b from-ink/50 to-transparent" />
          Scroll
        </div>
      </motion.div>
    </section>
  );
}
