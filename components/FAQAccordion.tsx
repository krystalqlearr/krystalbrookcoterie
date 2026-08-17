"use client";

import { type ReactNode, useId, useRef, useState } from "react";

/**
 * Accessible FAQ accordion.
 *  - Each trigger is a <button> inside a heading, with aria-expanded / aria-controls.
 *  - Panels are role="region" labelled by their trigger; collapsed panels are made
 *    inert (invisible → removed from tab order and the a11y tree).
 *  - Keyboard: Enter/Space toggle (native); ArrowUp/Down + Home/End move between triggers.
 *  - Motion: height animates via grid-rows, disabled under prefers-reduced-motion.
 */
type FAQItem = { question: string; answer: ReactNode };

type Props = {
  items: FAQItem[];
  allowMultiple?: boolean;
  className?: string;
};

export default function FAQAccordion({ items, allowMultiple = false, className = "" }: Props) {
  const [openIndexes, setOpenIndexes] = useState<number[]>([]);
  const baseId = useId();
  const triggerRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const isOpen = (i: number) => openIndexes.includes(i);

  const toggle = (i: number) =>
    setOpenIndexes((prev) =>
      prev.includes(i) ? prev.filter((x) => x !== i) : allowMultiple ? [...prev, i] : [i],
    );

  const onKeyDown = (e: React.KeyboardEvent, i: number) => {
    const last = items.length - 1;
    let next: number | null = null;
    if (e.key === "ArrowDown") next = i === last ? 0 : i + 1;
    else if (e.key === "ArrowUp") next = i === 0 ? last : i - 1;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = last;
    if (next !== null) {
      e.preventDefault();
      triggerRefs.current[next]?.focus();
    }
  };

  return (
    <div className={`divide-y divide-ink/12 border-y border-ink/12 ${className}`}>
      {items.map((item, i) => {
        const triggerId = `${baseId}-t-${i}`;
        const panelId = `${baseId}-p-${i}`;
        const open = isOpen(i);
        return (
          <div key={i}>
            <h3 className="m-0">
              <button
                id={triggerId}
                ref={(el) => {
                  triggerRefs.current[i] = el;
                }}
                type="button"
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => toggle(i)}
                onKeyDown={(e) => onKeyDown(e, i)}
                className="flex w-full items-center justify-between gap-6 py-6 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
              >
                <span className="type-display text-fluid-xl text-ink">{item.question}</span>
                <span
                  aria-hidden
                  className={`relative block h-3 w-3 flex-shrink-0 text-ink transition-transform duration-300 motion-reduce:transition-none ${
                    open ? "rotate-45" : ""
                  }`}
                >
                  <span className="absolute left-1/2 top-0 block h-3 w-px -translate-x-1/2 bg-current" />
                  <span className="absolute left-0 top-1/2 block h-px w-3 -translate-y-1/2 bg-current" />
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={triggerId}
              className={`grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none ${
                open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div className={`min-h-0 overflow-hidden ${open ? "" : "invisible"}`}>
                <div className="max-w-measure pb-6 font-sans text-sm leading-relaxed text-ink/70">
                  {item.answer}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
