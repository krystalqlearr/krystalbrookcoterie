"use client";

import { useEffect } from "react";

/**
 * THE OPENING LINE ARRIVES A LINE AT A TIME (2026-09-22).
 *
 * The page's `h1` is cut into its real rendered lines and each one rises from
 * behind the line above it, a beat apart. It is the difference between a
 * headline appearing and a headline being delivered — the thing that makes a
 * film title sequence feel like one, and the studios Krystal measures against
 * all do it.
 *
 * ONLY THE `h1`, ONLY ONCE PER PAGE. A stagger applied to every heading stops
 * being a moment and becomes a mannerism — the same rule the flare budget is
 * built on. The page's opening line is the moment; every other heading keeps
 * the ordinary reveal.
 *
 * WHY THE SPLIT HAPPENS IN THE BROWSER, AFTER MOUNT. Where a line breaks is
 * not knowable until the text is laid out in a real viewport with the real
 * font — it depends on width, and it changes when the window changes. So the
 * server renders the heading as plain text, exactly as it always has, and this
 * rewrites it once the type is settled. Nothing about the returned markup
 * changes, which is the rule the reduced-motion hydration bug bought us
 * (CLAUDE.md, Motion): the server and the client render the same tree, and the
 * difference is style applied afterwards.
 *
 * HOW THE LINES ARE FOUND. Walk the heading's text one character at a time with
 * a Range and watch its rectangle's top edge; when the top jumps, the line
 * broke there. Each line is then cloned out of the live tree with
 * `Range.cloneContents`, so an inline span inside the heading survives intact —
 * which matters, because the accent word is a `background-clip: text` gradient
 * and rebuilding it from a string would lose it.
 *
 * WHAT IT DOES NOT DO. Lines move; they do not fade. The heading already sits
 * inside `Reveal`, which owns opacity, and two opacity animations on one
 * element read as mud. And under reduced motion the heading is never split at
 * all — there is nothing to stagger, so there is nothing to damp.
 */

const MARK = "data-line-reveal";

/** The heading's untouched markup, kept out of the DOM so a resize can
 *  re-measure from clean text instead of from lines it produced itself. */
const SOURCE = new WeakMap<HTMLElement, string>();

type Line = { start: [Node, number]; end: [Node, number] };

/** Every text node inside the heading, in document order. */
function textNodes(root: Element): Text[] {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const out: Text[] = [];
  let n: Node | null;
  while ((n = walker.nextNode())) if (n.textContent) out.push(n as Text);
  return out;
}

/**
 * Character positions where the rendered line changes. Cheap enough to do
 * literally: a display heading is a short declarative sentence, so this walks
 * tens of characters, not thousands.
 */
function findLines(root: Element): Line[] {
  const nodes = textNodes(root);
  if (!nodes.length) return [];

  const range = document.createRange();
  const lines: Line[] = [];
  let start: [Node, number] = [nodes[0], 0];
  let lastTop: number | null = null;

  for (const node of nodes) {
    const len = node.textContent?.length ?? 0;
    for (let i = 0; i < len; i++) {
      range.setStart(node, i);
      range.setEnd(node, i + 1);
      const rect = range.getBoundingClientRect();
      // A collapsed rect is a soft-wrap space or a zero-width character; it has
      // no position to compare, so it belongs to whichever line follows.
      if (rect.width === 0 && rect.height === 0) continue;
      const top = Math.round(rect.top);
      if (lastTop !== null && top > lastTop + 1) {
        lines.push({ start, end: [node, i] });
        start = [node, i];
      }
      lastTop = top;
    }
  }
  const last = nodes[nodes.length - 1];
  lines.push({ start, end: [last, last.textContent?.length ?? 0] });
  return lines;
}

function split(heading: HTMLElement) {
  // Keep the original tree so a resize can re-measure from clean text rather
  // than from lines it produced itself.
  const original = SOURCE.get(heading) ?? heading.innerHTML;
  if (SOURCE.has(heading)) heading.innerHTML = original;
  SOURCE.set(heading, original);

  const lines = findLines(heading);
  // One line is not a stagger. Leave it exactly as it was.
  if (lines.length < 2) {
    heading.setAttribute(MARK, "single");
    return;
  }

  const frag = document.createDocumentFragment();
  const range = document.createRange();
  lines.forEach((line, i) => {
    range.setStart(line.start[0], line.start[1]);
    range.setEnd(line.end[0], line.end[1]);
    const mask = document.createElement("span");
    mask.className = "line-mask";
    const inner = document.createElement("span");
    inner.className = "line-inner";
    inner.style.setProperty("--line", String(i));
    inner.appendChild(range.cloneContents());
    mask.appendChild(inner);
    frag.appendChild(mask);
  });

  heading.innerHTML = "";
  heading.appendChild(frag);
  heading.setAttribute(MARK, "done");
}

export default function LineReveal() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const heading = document.querySelector<HTMLElement>("h1.type-display");
    if (!heading) return;

    let alive = true;
    const reveal = () => heading.classList.add("is-line-revealed");

    const run = () => {
      if (!alive) return;
      split(heading);
      if (heading.getAttribute(MARK) !== "done") return;

      // The h1 is above the fold on every page, so this fires at once; the
      // observer exists so a heading pushed down by a long hero still waits.
      const io = new IntersectionObserver(
        (entries) => {
          if (entries.some((e) => e.isIntersecting)) {
            reveal();
            io.disconnect();
          }
        },
        { threshold: 0.15 },
      );
      io.observe(heading);
      // A line that never reveals is an invisible headline — the worst failure
      // this file could have. If anything above goes quiet, show it anyway.
      window.setTimeout(reveal, 1500);
    };

    // Lines depend on the real font, not the fallback.
    if (document.fonts?.ready) document.fonts.ready.then(run);
    else run();

    let t = 0;
    const onResize = () => {
      window.clearTimeout(t);
      t = window.setTimeout(() => {
        if (heading.getAttribute(MARK) !== "done") return;
        split(heading);
        reveal(); // already seen; re-cut lines should not replay the entrance
      }, 180);
    };
    window.addEventListener("resize", onResize);

    return () => {
      alive = false;
      window.clearTimeout(t);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return null;
}
