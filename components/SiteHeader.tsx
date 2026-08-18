"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Logo from "./Logo";
import { NAV_LINKS } from "./nav";

export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Transparent over the hero → solidify to rich-black on scroll.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the menu if the viewport grows to desktop.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const onChange = () => mq.matches && setOpen(false);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // Mobile menu: focus trap + Escape to close + body scroll lock + focus return.
  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    if (!panel) return;
    // Capture the trigger now so cleanup returns focus to the right node.
    const toggleButton = toggleRef.current;

    const focusable = () =>
      Array.from(
        panel.querySelectorAll<HTMLElement>('a[href], button:not([disabled])'),
      );
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

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${
        scrolled || open
          ? "border-ink/10 bg-milk/90 backdrop-blur"
          : "border-transparent bg-transparent"
      }`}
    >
      <div className="container flex h-20 items-center justify-between">
        {/* Wordmark — horizontal on desktop, monogram on mobile */}
        <Link href="/" aria-label="Krystal Brook Coterie — home" className={`shrink-0 text-ink ${linkFocus}`}>
          <Logo variant="horizontal" color="ink" size="1rem" className="hidden lg:block" />
          <Logo variant="monogram" color="ink" size="0.9rem" className="lg:hidden" />
        </Link>

        {/* Desktop nav */}
        <nav aria-label="Primary" className="hidden items-center gap-8 lg:flex xl:gap-9">
          {NAV_LINKS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`link-underline type-meta text-ink/70 transition-colors hover:text-ink ${linkFocus}`}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/begin"
            className={`rounded-[1px] border border-ink px-5 py-2.5 type-meta text-ink transition-colors hover:bg-ink hover:text-bone ${linkFocus}`}
          >
            Commission
          </Link>
        </nav>

        {/* Mobile toggle */}
        <button
          ref={toggleRef}
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          className={`flex h-11 w-11 items-center justify-center text-ink lg:hidden ${linkFocus}`}
        >
          <span className="relative block h-3.5 w-6" aria-hidden>
            <span
              className={`absolute left-0 block h-px w-6 bg-current transition-transform duration-300 ${
                open ? "top-1.5 rotate-45" : "top-0"
              }`}
            />
            <span
              className={`absolute left-0 top-1.5 block h-px w-6 bg-current transition-opacity duration-200 ${
                open ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute left-0 block h-px w-6 bg-current transition-transform duration-300 ${
                open ? "top-1.5 -rotate-45" : "top-3"
              }`}
            />
          </span>
        </button>
      </div>

      {/* Mobile menu overlay */}
      {open ? (
        <div
          id="mobile-menu"
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          className="fixed inset-0 top-20 z-40 flex flex-col justify-between bg-milk px-6 pb-12 pt-10 lg:hidden"
        >
          <nav aria-label="Primary" className="flex flex-col gap-6">
            {NAV_LINKS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`type-display text-fluid-2xl text-ink ${linkFocus}`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <Link
            href="/begin"
            onClick={() => setOpen(false)}
            className={`mt-10 inline-block self-start rounded-[1px] border border-ink px-7 py-3.5 type-meta text-ink transition-colors hover:bg-ink hover:text-bone ${linkFocus}`}
          >
            Commission a project
          </Link>
        </div>
      ) : null}
    </header>
  );
}
