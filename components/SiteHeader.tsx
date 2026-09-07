"use client";

import Link from "next/link";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Logo from "./Logo";
import { NAV_LINKS } from "./nav";
import { LANDING } from "@/lib/motion";

/**
 * The header is the name and one word. No link row, no outlined button — a
 * client site needs its "reserve" button in view; a studio's own site is
 * calmer than that. `menu` opens a full-screen milk page with the six links
 * set large and light, one per line, and Commission last. The bar stays
 * above the panel so the name and `close` remain where they were.
 *
 * On the homepage the header stays out entirely (opacity 0 + inert) until the
 * landing name has floated into the wordmark slot — `LandingWordmark` sets
 * `data-landing` on <html>, observed here because the header mounts before
 * <main>. See docs/kbc-build-plan.md §3.
 */
export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [atLanding, setAtLanding] = useState(false);
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const sync = () => {
      setScrolled(window.scrollY > 8);
      const hasLanding = document.documentElement.hasAttribute("data-landing");
      setAtLanding(hasLanding && window.scrollY < window.innerHeight * LANDING.endVh);
    };
    sync();
    window.addEventListener("scroll", sync, { passive: true });
    const observer = new MutationObserver(sync);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-landing"] });
    return () => {
      window.removeEventListener("scroll", sync);
      observer.disconnect();
    };
  }, []);

  // Menu: focus trap + Escape to close + body scroll lock + focus return.
  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    if (!panel) return;
    const toggleButton = toggleRef.current;

    const focusable = () => Array.from(panel.querySelectorAll<HTMLElement>('a[href], button:not([disabled])'));
    focusable()[0]?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        setOpen(false);
        return;
      }
      if (e.key !== "Tab") return;
      const items = focusable();
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      toggleButton?.focus();
    };
  }, [open]);

  const linkFocus =
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink";

  // `inert` keeps the invisible header out of the tab order. React 18's DOM
  // layer predates the attribute (passing `true` warns; the types only allow
  // boolean), so it's spread in as the empty-string form the browser reads.
  const hiddenAtLanding = atLanding && !open;
  const inertProps = hiddenAtLanding ? ({ inert: "" } as Record<string, string>) : {};

  return (
    <header
      {...inertProps}
      // No backdrop-blur while the menu is open: `backdrop-filter` makes the
      // header the containing block for its fixed descendants, which collapsed
      // the panel's `inset-0` to the 80px bar (height 0). Solid milk instead.
      className={`fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,opacity] duration-600 ease-editorial ${
        open
          ? "border-ink/10 bg-milk"
          : scrolled
            ? "border-ink/10 bg-milk/90 backdrop-blur"
            : "border-transparent bg-transparent"
      } ${hiddenAtLanding ? "pointer-events-none opacity-0" : "opacity-100"}`}
    >
      <div className="container flex h-20 items-center justify-between">
        {/* The landing's name floats into this slot and becomes the logo;
            `data-wordmark-slot` is what LandingWordmark measures against. */}
        <Link
          href="/"
          aria-label="Krystal Brook Coterie — home"
          data-wordmark-slot
          className={`shrink-0 text-ink ${linkFocus}`}
        >
          <Logo variant="horizontal" color="ink" size="0.95rem" />
        </Link>

        <button
          ref={toggleRef}
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="site-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          data-cursor="hover"
          data-cursor-label={open ? "close" : "menu"}
          className={`-mr-3 px-3 py-2 type-meta text-ink/70 transition-colors hover:text-ink ${linkFocus}`}
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      {open ? (
        <div
          id="site-menu"
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          className="fixed inset-0 top-20 z-40 flex flex-col justify-center bg-milk"
        >
          <nav aria-label="Primary" className="container">
            <ul className="flex flex-col gap-2">
              {[...NAV_LINKS, { href: "/begin", label: "Commission" }].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={`type-display inline-block text-fluid-3xl text-ink transition-colors hover:text-ink/60 ${linkFocus}`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
