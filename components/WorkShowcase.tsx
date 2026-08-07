"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion, type Transition } from "framer-motion";
import Button from "./Button";
import { EASE, DUR, morphTransition } from "@/lib/motion";
import { WORK as PROJECTS, type WorkProject as Project } from "@/lib/work";

/**
 * WorkShowcase — the signature "work transition": an editorial project index
 * where a browser-framed thumbnail expands, in place, into a full-bleed
 * cinematic case study (Framer Motion shared-layout FLIP). Collapse reverses it.
 *
 * This is the credibility moment: a template cannot morph a grid card into a
 * scrolling case study at 60fps. The site becomes the proof.
 *
 * Guardrails: honours prefers-reduced-motion (instant, no morph), Esc + backdrop
 * close, locks body scroll while open, all colours from tokens.
 */

// Project data + type come from the single source in lib/work.ts (imported as
// PROJECTS / Project above), so the index transition and the /work/[slug] case
// studies never drift.

export default function WorkShowcase() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const reduce = useReducedMotion();
  const active = PROJECTS.find((p) => p.id === selectedId) ?? null;

  const frameT: Transition = reduce ? { duration: 0 } : morphTransition;

  useEffect(() => {
    if (!selectedId) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedId(null);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [selectedId]);

  return (
    <>
      <div className="grid grid-cols-1 gap-x-gutter gap-y-16 lg:grid-cols-12">
        {PROJECTS.map((p) => (
          <ProjectSlot
            key={p.id}
            project={p}
            selected={selectedId === p.id}
            frameT={frameT}
            reduce={!!reduce}
            onOpen={() => setSelectedId(p.id)}
            onClose={() => setSelectedId(null)}
          />
        ))}
      </div>

      {/* Backdrop — hides the grid behind the morph. */}
      <AnimatePresence>
        {active && (
          <motion.div
            key="backdrop"
            className="fixed inset-0 z-[200] bg-charcoal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.4 }}
            onClick={() => setSelectedId(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}

function ProjectSlot({
  project: p,
  selected,
  frameT,
  reduce,
  onOpen,
  onClose,
}: {
  project: Project;
  selected: boolean;
  frameT: Transition;
  reduce: boolean;
  onOpen: () => void;
  onClose: () => void;
}) {
  return (
    <div className={`relative ${p.span}`}>
      {/* Slot placeholder — holds the grid space so siblings never reflow. */}
      <div className="relative w-full" style={{ paddingTop: selected ? undefined : p.pt }}>
        <motion.div
          layout
          transition={frameT}
          data-lenis-prevent
          className={
            selected
              ? "group fixed inset-0 z-[210] flex flex-col overflow-y-auto bg-charcoal"
              : "group absolute inset-0 flex flex-col overflow-hidden border border-ink/15 bg-charcoal"
          }
        >
          {/* Real, focusable trigger over the collapsed frame — keyboard + a11y. */}
          {!selected && (
            <button
              type="button"
              onClick={onOpen}
              data-cursor="hover"
              data-cursor-label="View"
              aria-label={`Open ${p.client} case study`}
              className="absolute inset-0 z-10 cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bone"
            />
          )}
          {/* Browser chrome — the "this is a real website" signal. */}
          <div className="flex shrink-0 items-center gap-3 border-b border-bone/10 px-4 py-2.5">
            <span className="flex gap-1.5" aria-hidden>
              <span className="h-2 w-2 rounded-full bg-blush" />
              <span className="h-2 w-2 rounded-full bg-bone/25" />
              <span className="h-2 w-2 rounded-full bg-bone/25" />
            </span>
            <span className="truncate rounded-sm bg-bone/5 px-3 py-1 font-sans text-[0.65rem] tracking-[0.06em] text-bone/50">
              {p.url}
            </span>
          </div>

          {/* The field — placeholder art in collapsed state; hero in expanded. */}
          <div className={selected ? "relative aspect-[16/9] w-full shrink-0" : "relative flex-1"}>
            {p.image ? (
              <>
                <Image
                  src={p.image}
                  alt={`${p.client} — ${p.descriptor}`}
                  fill
                  sizes={selected ? "100vw" : "(min-width: 1024px) 60vw, 100vw"}
                  priority={selected}
                  className={`object-cover transition-transform duration-700 ${
                    selected ? "" : "group-hover:scale-[1.04]"
                  }`}
                />
                {!selected && (
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-transparent to-transparent"
                  />
                )}
              </>
            ) : (
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
                  className="pointer-events-none absolute -right-1/4 -top-1/4 h-2/3 w-2/3 rounded-full bg-bone/10 blur-3xl"
                />
              </>
            )}

            {!selected && (
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5 md:p-6">
                <span className="font-sans text-xs uppercase tracking-[0.16em] text-bone/85">
                  {p.client}
                </span>
                <span className="flex translate-x-[-6px] items-center gap-2 font-sans text-xs uppercase tracking-[0.12em] text-bone opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100">
                  View <span aria-hidden>→</span>
                </span>
              </div>
            )}

            {selected && (
              <div className="absolute inset-0 flex items-end bg-gradient-to-t from-charcoal/85 to-transparent p-6 md:p-16">
                <div>
                  <p className="font-sans text-xs uppercase tracking-[0.2em] text-blush">
                    {p.category}
                  </p>
                  <span aria-hidden className="mt-5 block h-[3px] w-12 bg-blush" />
                  <h2 className="mt-5 max-w-[18ch] font-editorial text-4xl font-normal italic leading-[1.1] tracking-[-0.01em] text-bone md:text-6xl">
                    {renderAccent(p.descriptor, p.accent)}
                  </h2>
                </div>
              </div>
            )}
          </div>

          {/* Case study body — only exists when expanded; fades up after the morph. */}
          {selected && <ExpandedBody project={p} reduce={reduce} />}
        </motion.div>
      </div>

      {/* Collapsed meta — stays in the grid slot (hidden behind backdrop when open). */}
      <div className="mt-5 flex items-baseline justify-between font-sans text-xs tracking-[0.06em] text-ink/60">
        <span>
          {p.index} · {p.category}
        </span>
        {p.status ? <span>{p.status}</span> : null}
      </div>
      <h3 className="mt-2 max-w-[24ch] font-editorial text-2xl font-normal italic text-ink md:text-3xl">
        {renderAccent(p.descriptor, p.accent, false)}
      </h3>
      <p className="mt-3 font-sans text-xs uppercase tracking-[0.12em] text-ink/55">{p.capabilities}</p>

      {/* Close affordance — outside the morphing box, so it never distorts. */}
      {selected && (
        <motion.button
          type="button"
          onClick={onClose}
          data-cursor="hover"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { delay: reduce ? 0 : 0.35 } }}
          className="fixed right-5 top-5 z-[220] flex items-center gap-2 rounded-full border border-bone/25 bg-charcoal/60 px-4 py-2 font-sans text-xs uppercase tracking-[0.14em] text-bone backdrop-blur transition-colors hover:border-bone md:right-8 md:top-8"
        >
          Close <span aria-hidden>✕</span>
        </motion.button>
      )}
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
      <p className="max-w-[34ch] font-editorial text-2xl italic leading-snug text-bone md:text-[2rem]">
        {p.intro}
      </p>

      {/* Meta band — hairline-separated structural rules. */}
      <dl className="mt-14 grid grid-cols-2 gap-y-8 border-y border-bone/20 py-8 font-sans md:grid-cols-4">
        {[
          ["Client", p.client],
          ["Role", p.role],
          ["Year", p.year],
          ["Stack", p.stack],
        ].map(([label, value]) => (
          <div key={label}>
            <dt className="text-xs uppercase tracking-[0.16em] text-bone/60">{label}</dt>
            <dd className="mt-2 text-bone">{value}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-14 grid gap-x-gutter gap-y-8 md:grid-cols-[1fr_1.4fr]">
        <p className="font-sans text-sm uppercase tracking-[0.16em] text-blush">The work</p>
        <div className="max-w-measure space-y-5 font-sans text-lg leading-relaxed text-bone/70">
          {p.body.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      </div>

      {/* A scroll band — gives the case study real length and cinema. */}
      <div className="relative mt-16 aspect-[16/8] w-full overflow-hidden border border-bone/10">
        <div aria-hidden className={`absolute inset-0 bg-gradient-to-tr ${p.field}`} />
        <div aria-hidden className="editorial-grain absolute inset-0" />
      </div>

      <div className="mt-16 grid gap-x-gutter gap-y-8 md:grid-cols-[1fr_1.4fr]">
        <p className="font-sans text-sm uppercase tracking-[0.16em] text-blush">Scope</p>
        <ul className="max-w-measure divide-y divide-bone/15 font-sans text-lg text-bone">
          {p.scope.map((item) => (
            <li key={item} className="py-3">
              {item}
            </li>
          ))}
        </ul>
      </div>

      {p.caseStudy && (
        <div className="mt-14">
          <Button href={`/work/${p.id}`} variant="onCharcoal">
            Read the full case study
          </Button>
        </div>
      )}

      <div className="mt-20 border-t border-bone/10 pt-8 font-sans text-xs uppercase tracking-[0.16em] text-bone/55">
        Krystal Brook Coterie — {p.index}
      </div>
    </motion.div>
  );
}

/**
 * Renders the descriptor with its SINGLE accent word lifted into the wine flare
 * (blush on this charcoal overlay) — the wine thread, carried into the transition.
 */
function renderAccent(text: string, accent: string, onDark = true) {
  const at = text.toLowerCase().indexOf(accent.toLowerCase());
  if (at === -1) return text;
  const before = text.slice(0, at);
  const match = text.slice(at, at + accent.length);
  const after = text.slice(at + accent.length);
  return (
    <>
      {before}
      <em className={`italic ${onDark ? "text-blush" : "text-cherry"}`}>{match}</em>
      {after}
    </>
  );
}
