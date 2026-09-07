"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion, type Transition } from "framer-motion";
import Button from "./Button";
import IndexMeta from "./IndexMeta";
import Reveal from "./motion/Reveal";
import CrystalMark, { preloadCrystalMark } from "./motion/CrystalMark";
import { BrowserChrome } from "./BrowserFrame";
import { EASE, DUR, GEM_BEAT_MS, TRAVEL, morphTransition, revealFrom } from "@/lib/motion";
import { WORK as PROJECTS, type WorkProject as Project } from "@/lib/work";

/**
 * WorkShowcase — the signature "work transition": a browser-framed project
 * expands, in place, into a full-bleed case study (Framer Motion shared-layout
 * FLIP). Collapse reverses it. A template cannot morph a frame into a scrolling
 * case study at 60fps; the site becomes the proof.
 *
 * Two layouts, one morph:
 *  - `index`    — the editorial grid on /work (asymmetric spans from lib/work).
 *  - `sequence` — the homepage: one project per screen, a 16/10 frame sized to
 *                 fit a viewport, caption beneath, no heading (so the page's h1
 *                 further down stays its first heading).
 *
 * `gem` — before the morph, the CrystalMark holds alone on milk for GEM_BEAT_MS:
 * the brand's living mark as the between-moment. Preloaded on hover/focus so the
 * first click never waits on Three.js. Skipped under reduced motion.
 *
 * The frame SLIDES in on scroll (the site's "media slides" register): on the
 * homepage it drops from above — the name just rose into the header, the work
 * descends to meet it — and on /work each frame enters from the side of the
 * grid it sits on (`WorkProject.enter`). The entrance lives on the frame itself,
 * never on a wrapper: a transformed ancestor would become the containing block
 * for the frame's `fixed` expanded state and clip the morph.
 *
 * Media is video-ready: a project with `video` plays a looping, muted screen
 * recording (poster under reduced motion); otherwise its image; otherwise the
 * gradient field. Non-live projects show their `status` in the chrome pill, never
 * a URL that doesn't resolve, and the case-study CTA only appears with `caseStudy`.
 *
 * Guardrails: reduced motion (instant, no morph, no gem), Esc + backdrop close,
 * body scroll locked while open, focus moves to Close on open and back to the
 * trigger on close, all colours from tokens.
 */

type Props = {
  variant?: "index" | "sequence";
  gem?: boolean;
  projects?: Project[];
  /** Index total for captions when the sequence shows a subset (e.g. 1 of 3). */
  total?: number;
};

export default function WorkShowcase({
  variant = "index",
  gem = false,
  projects = PROJECTS,
  total,
}: Props) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [pendingId, setPendingId] = useState<string | null>(null);
  const beat = useRef<number | null>(null);
  const reduce = useReducedMotion();
  const active = projects.find((p) => p.id === selectedId) ?? null;

  const frameT: Transition = reduce ? { duration: 0 } : morphTransition;

  const clearBeat = () => {
    if (beat.current) window.clearTimeout(beat.current);
    beat.current = null;
  };

  const open = (id: string) => {
    if (reduce || !gem) {
      setSelectedId(id);
      return;
    }
    setPendingId(id);
    clearBeat();
    beat.current = window.setTimeout(() => {
      setSelectedId(id);
      setPendingId(null);
      beat.current = null;
    }, GEM_BEAT_MS);
  };

  const close = () => {
    clearBeat();
    setPendingId(null);
    setSelectedId(null);
  };

  useEffect(() => clearBeat, []);

  useEffect(() => {
    if (!selectedId) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedId]);

  const wrapper =
    variant === "sequence"
      ? "flex flex-col"
      : // Column gap is 24px, NOT `gap-x-gutter`: across a 12-column grid the 64px
        // gutter becomes eleven gaps — 704px of an 896px track.
        "grid grid-cols-1 gap-y-16 lg:grid-cols-12 lg:gap-x-6";

  return (
    <>
      <div className={wrapper}>
        {projects.map((p, i) => (
          <ProjectSlot
            key={p.id}
            project={p}
            index={i + 1}
            total={total ?? projects.length}
            variant={variant}
            gem={gem}
            selected={selectedId === p.id}
            frameT={frameT}
            reduce={!!reduce}
            onOpen={() => open(p.id)}
            onClose={close}
          />
        ))}
      </div>

      <AnimatePresence>
        {pendingId && (
          <motion.div
            key="gem"
            aria-hidden
            className="pointer-events-none fixed inset-0 z-[230] flex items-center justify-center bg-milk"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: DUR.fast * 0.5, ease: EASE } }}
            exit={{ opacity: 0, transition: { duration: DUR.fast, ease: EASE } }}
          >
            <CrystalMark className="h-9 w-9" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Backdrop — hides the page behind the morph. */}
      <AnimatePresence>
        {active && (
          <motion.div
            key="backdrop"
            className="fixed inset-0 z-[200] bg-onyx"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.4 }}
            onClick={close}
          />
        )}
      </AnimatePresence>
    </>
  );
}

function ProjectSlot({
  project: p,
  index,
  total,
  variant,
  gem,
  selected,
  frameT,
  reduce,
  onOpen,
  onClose,
}: {
  project: Project;
  index: number;
  total: number;
  variant: "index" | "sequence";
  gem: boolean;
  selected: boolean;
  frameT: Transition;
  reduce: boolean;
  onOpen: () => void;
  onClose: () => void;
}) {
  const sequence = variant === "sequence";
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const wasSelected = useRef(false);

  useEffect(() => {
    if (selected) {
      closeRef.current?.focus();
      wasSelected.current = true;
    } else if (wasSelected.current) {
      wasSelected.current = false;
      triggerRef.current?.focus();
    }
  }, [selected]);

  const preload = () => {
    if (gem) void preloadCrystalMark();
  };

  const chromeLabel = p.status ?? p.url;

  const media = (() => {
    if (p.video && !reduce) {
      return (
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          poster={p.video.poster}
          aria-label={`${p.client} — ${p.descriptor}`}
          className={`absolute inset-0 h-full w-full object-cover transition-transform duration-700 ${
            selected ? "" : "group-hover:scale-[1.04]"
          }`}
        >
          {p.video.webm ? <source src={p.video.webm} type="video/webm" /> : null}
          <source src={p.video.mp4} type="video/mp4" />
        </video>
      );
    }
    const still = p.video?.poster ?? p.image;
    if (still) {
      return (
        <Image
          src={still}
          alt={`${p.client} — ${p.descriptor}`}
          fill
          sizes={selected ? "100vw" : "(min-width: 1024px) 60vw, 100vw"}
          priority={selected}
          className={`object-cover transition-transform duration-700 ${
            selected ? "" : "group-hover:scale-[1.04]"
          }`}
        />
      );
    }
    return (
      <>
        <div
          aria-hidden
          className={`absolute inset-0 bg-gradient-to-br ${p.field} transition-transform duration-700 ${
            selected ? "" : "group-hover:scale-[1.04]"
          }`}
        />
        <div aria-hidden className="editorial-grain absolute inset-0" />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-1/4 -top-1/4 h-2/3 w-2/3 rounded-full bg-milk/10 blur-3xl"
        />
      </>
    );
  })();

  // Scroll entrance — the variant's own transition wins over `frameT` for the
  // reveal; `frameT` still drives the layout morph. Once in view the transform
  // resolves to `none`, so the expanded `fixed` frame is never offset.
  const entrance = reduce
    ? {}
    : {
        variants: revealFrom(sequence ? "down" : p.enter, TRAVEL.frame),
        initial: "hidden",
        whileInView: "visible",
        viewport: { once: true, amount: 0.3 },
      };

  const frame = (
    <motion.div
      layout
      transition={frameT}
      {...entrance}
      data-lenis-prevent
      className={
        selected
          ? "group fixed inset-0 z-[210] flex flex-col overflow-y-auto bg-onyx"
          : "group absolute inset-0 flex flex-col overflow-hidden border border-ink/15 bg-onyx"
      }
    >
      {/* Real, focusable trigger over the collapsed frame — keyboard + a11y. */}
      {!selected && (
        <button
          ref={triggerRef}
          type="button"
          onClick={onOpen}
          onPointerEnter={preload}
          onFocus={preload}
          data-cursor="hover"
          data-cursor-label="open"
          aria-label={`Open ${p.client} case study`}
          className="absolute inset-0 z-10 cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-milk"
        />
      )}

      <BrowserChrome label={chromeLabel} />

      {/* The field — media in collapsed state; hero in expanded. */}
      <div className={selected ? "relative aspect-[16/9] w-full shrink-0" : "relative flex-1"}>
        {media}
        {!selected && !p.video && p.image && (
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-onyx/70 via-transparent to-transparent"
          />
        )}

        {!selected && !sequence && (
          <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5 md:p-6">
            <span className="type-meta text-milk/85">{p.client}</span>
            <span className="flex translate-x-[-6px] items-center gap-2 type-meta text-milk opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100">
              View <span aria-hidden>→</span>
            </span>
          </div>
        )}

        {selected && (
          <div className="absolute inset-0 flex items-end bg-gradient-to-t from-onyx/85 to-transparent p-6 md:p-16">
            <div>
              <p className="type-meta text-flare">
                {p.category}
                {p.status ? ` · ${p.status}` : ""}
              </p>
              <span aria-hidden className="mt-5 block h-[3px] w-12 bg-flare" />
              <h2 className="type-display mt-6 max-w-[18ch] text-fluid-display text-milk">
                {renderAccent(p.descriptor, p.accent)}
              </h2>
            </div>
          </div>
        )}
      </div>

      {selected && <ExpandedBody project={p} reduce={reduce} />}
    </motion.div>
  );

  const closeButton = selected && (
    <motion.button
      ref={closeRef}
      type="button"
      onClick={onClose}
      data-cursor="hover"
      data-cursor-label="close"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { delay: reduce ? 0 : 0.35 } }}
      className="fixed right-5 top-5 z-[220] flex items-center gap-2 rounded-full border border-milk/25 bg-onyx/60 px-4 py-2 type-meta text-milk backdrop-blur transition-colors hover:border-milk md:right-8 md:top-8"
    >
      Close <span aria-hidden>✕</span>
    </motion.button>
  );

  if (sequence) {
    return (
      <div className="flex min-h-[100svh] flex-col justify-center py-24">
        {/* A 16:9 frame (the recording's own aspect — the site's hero and its
            widest sections both fit it without cropping) that fills the container
            but is capped by the viewport height, so it always fits one screen. */}
        <div
          className="relative mx-auto w-full"
          style={{
            maxWidth: "calc((100svh - 14rem) * 1.7778)",
            paddingTop: selected ? undefined : "56.25%",
          }}
        >
          {frame}
        </div>
        <Reveal variant="soft" className="mx-auto mt-6 w-full" >
          <div style={{ maxWidth: "calc((100svh - 14rem) * 1.7778)" }} className="mx-auto">
            <IndexMeta index={index} total={total} tag={p.client} />
            <p className="mt-3 max-w-measure font-sans text-fluid-base text-ink/70">{p.descriptor}</p>
          </div>
        </Reveal>
        {closeButton}
      </div>
    );
  }

  return (
    <div className={`relative ${p.span}`}>
      {/* Slot placeholder — holds the grid space so siblings never reflow. */}
      <div className="relative w-full" style={{ paddingTop: selected ? undefined : p.pt }}>
        {frame}
      </div>

      {/* Collapsed meta — stays in the grid slot (hidden behind backdrop when open).
          Fades in after the frame has slid; the Close button stays OUTSIDE this
          wrapper (it is fixed, and must not sit under a transformed ancestor). */}
      <Reveal variant="fade" delay={0.2}>
        <div className="mt-5 flex items-baseline justify-between font-sans text-xs tracking-[0.06em] text-ink/70">
          <span>
            {p.index} · {p.category}
          </span>
          {p.status ? <span>{p.status}</span> : null}
        </div>
        <h3 className="type-display mt-3 max-w-[24ch] text-fluid-xl text-ink">
          {renderAccent(p.descriptor, p.accent, false)}
        </h3>
        <p className="mt-3 type-meta text-ink/70">{p.capabilities}</p>
      </Reveal>

      {closeButton}
    </div>
  );
}

function ExpandedBody({ project: p, reduce }: { project: Project; reduce: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: reduce ? 0 : 24 }}
      animate={{ opacity: 1, y: 0, transition: { delay: reduce ? 0 : 0.28, duration: DUR.base, ease: EASE } }}
      className="mx-auto w-full max-w-editorial px-6 py-16 md:px-16 md:py-24"
    >
      <p className="type-display max-w-[34ch] text-fluid-2xl text-milk">{p.intro}</p>

      <dl className="mt-14 grid grid-cols-2 gap-y-8 border-y border-milk/20 py-8 font-sans md:grid-cols-4">
        {[
          ["Client", p.client],
          ["Role", p.role],
          ["Year", p.year],
          ["Stack", p.stack],
        ].map(([label, value]) => (
          <div key={label}>
            <dt className="type-meta text-milk/60">{label}</dt>
            <dd className="mt-2 text-milk">{value}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-14 grid gap-x-gutter gap-y-8 md:grid-cols-[1fr_1.4fr]">
        <p className="type-meta text-flare">The work</p>
        <div className="max-w-measure space-y-5 font-sans text-lg leading-relaxed text-milk/70">
          {p.body.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      </div>

      <div className="relative mt-16 aspect-[16/8] w-full overflow-hidden border border-milk/10">
        <div aria-hidden className={`absolute inset-0 bg-gradient-to-tr ${p.field}`} />
        <div aria-hidden className="editorial-grain absolute inset-0" />
      </div>

      <div className="mt-16 grid gap-x-gutter gap-y-8 md:grid-cols-[1fr_1.4fr]">
        <p className="type-meta text-flare">Scope</p>
        <ul className="max-w-measure divide-y divide-milk/15 font-sans text-lg text-milk">
          {p.scope.map((item) => (
            <li key={item} className="py-3">
              {item}
            </li>
          ))}
        </ul>
      </div>

      {p.caseStudy && (
        <div className="mt-14">
          <Button href={`/work/${p.id}`} variant="onDark">
            Read the full case study
          </Button>
        </div>
      )}

      <div className="mt-20 border-t border-milk/10 pt-8 type-meta text-milk/60">
        Krystal Brook Coterie — {p.index}
      </div>
    </motion.div>
  );
}

/** The descriptor with its single accent word lifted into the flare. */
function renderAccent(text: string, accent: string, onDark = true) {
  const at = text.toLowerCase().indexOf(accent.toLowerCase());
  if (at === -1) return text;
  const before = text.slice(0, at);
  const match = text.slice(at, at + accent.length);
  const after = text.slice(at + accent.length);
  return (
    <>
      {before}
      <span className={onDark ? "text-flare" : "text-flare"}>{match}</span>
      {after}
    </>
  );
}
