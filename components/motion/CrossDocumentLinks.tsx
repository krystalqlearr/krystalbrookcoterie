"use client";

import { useEffect } from "react";

/**
 * EVERY PAGE DISSOLVES INTO THE NEXT (2026-09-22).
 *
 * The site already had cross-document view transitions — `@view-transition
 * { navigation: auto }` has been in globals.css since the work frame shipped —
 * but almost nothing ever reached them. Next's `<Link>` handles an internal
 * click itself and swaps the page in React, and a soft navigation is not a
 * document navigation, so the browser had nothing to tween. Only `/work` →
 * the case study transitioned, because `WorkShowcase` opts that one click out
 * of Next's router by hand.
 *
 * This does the same thing for every other internal link: a capture-phase
 * listener that answers one question — should the BROWSER own this navigation?
 * — and, when the answer is yes, hands it over with `location.href`. React
 * attaches its own listeners on the root container in the bubble phase, so
 * capturing at the document means this runs first and `preventDefault` stops
 * `<Link>` before it ever routes.
 *
 * WHY A HARD NAVIGATION IS NOT A DOWNGRADE HERE. It costs a document request,
 * and the browser spends it under the old page's snapshot — nothing blanks,
 * nothing jumps, and the pause is hidden inside the transition it buys. The
 * alternatives were both worse and are both written down: React's own
 * `<ViewTransition>` needs React 19's experimental channel, and hand-rolling
 * one over `router.push` means holding the page frozen under a snapshot until
 * an RSC fetch resolves — a promise that, if it never settles, freezes the
 * site. The browser's version cannot strand the page, because the browser owns
 * the snapshot.
 *
 * EVERYTHING IS DECIDED AT CLICK TIME, NEVER AT RENDER. No markup changes, no
 * branch on a media query during render, nothing for the server and the client
 * to disagree about — the rule the reduced-motion hydration bug bought us
 * (CLAUDE.md, Motion). A browser without cross-document support, or a visitor
 * who asked for less motion, simply never gets past the guards and keeps
 * Next's soft navigation exactly as it is today.
 */
export default function CrossDocumentLinks() {
  useEffect(() => {
    // `CSSViewTransitionRule` is the precise probe for CROSS-DOCUMENT support.
    // `document.startViewTransition` only proves the same-document kind, and a
    // browser with one and not the other would pay for a full page load and
    // get no dissolve for it. Checked once here, and again at click time in
    // case the check is ever moved.
    if (!("CSSViewTransitionRule" in window)) return;

    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented) return;
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

      const target = e.target;
      if (!(target instanceof Element)) return;
      const link = target.closest<HTMLAnchorElement>("a[href]");
      if (!link) return;

      // The work frame writes its own `view-transition-name` before navigating,
      // so it must keep its own handler. Ours would preempt it from the capture
      // phase and the frame would cross-fade instead of travelling.
      if (link.closest("[data-work-frame]")) return;

      // Anything that isn't a plain in-page navigation stays the browser's
      // business: new tabs, downloads, mailto/tel, and the brand book, which is
      // a static file served by a rewrite rather than a route.
      if (link.target && link.target !== "_self") return;
      if (link.hasAttribute("download")) return;
      if (link.dataset.noTransition !== undefined) return;

      let url: URL;
      try {
        url = new URL(link.href, window.location.href);
      } catch {
        return;
      }
      if (url.origin !== window.location.origin) return;
      // A hash on the page you are already on is a scroll, not a navigation —
      // and Lenis owns scrolling.
      if (url.pathname === window.location.pathname && url.search === window.location.search) return;

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      e.preventDefault();
      window.location.href = url.href;
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  return null;
}
