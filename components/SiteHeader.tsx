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
      toggleRef.current?.focus();
    };
  }, [open]);

  const linkFocus =
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${
        scrolled || open
          ? "border-cream/10 bg-rich-black"
          : "border-transparent bg-transparent"
      }`}
    >
      <div className="container flex h-20 items-center justify-between">
        {/* Wordmark — horizontal on desktop, monogram on mobile */}
        <Link href="/" aria-label="Krystal Brook Coterie — home" className={`text-cream ${linkFocus}`}>
          <Logo variant="horizontal" color="cream" size="1.25rem" className="hidden md:block" />
          <Logo variant="monogram" color="cream" size="1.05rem" className="md:hidden" />
        </Link>

        {/* Desktop nav */}
        <nav aria-label="Primary" className="hidden items-center gap-9 md:flex">
          {NAV_LINKS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`font-sans text-xs uppercase tracking-[0.16em] text-greige transition-colors hover:text-cream ${linkFocus}`}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className={`rounded-[1px] border border-terracotta px-4 py-2 font-sans text-xs uppercase tracking-[0.14em] text-cream transition-colors hover:bg-terracotta ${linkFocus}`}
          >
            Begin
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
          className={`flex h-11 w-11 items-center justify-center text-cream md:hidden ${linkFocus}`}
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
          className="fixed inset-0 top-20 z-40 flex flex-col justify-between bg-rich-black px-6 pb-12 pt-10 md:hidden"
        >
          <nav aria-label="Primary" className="flex flex-col gap-6">
            {NAV_LINKS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`font-display text-3xl text-cream ${linkFocus}`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className={`mt-10 inline-block self-start rounded-[1px] border border-terracotta px-6 py-3 font-sans text-xs uppercase tracking-[0.14em] text-cream transition-colors hover:bg-terracotta ${linkFocus}`}
          >
            Begin your project
          </Link>
        </div>
      ) : null}
    </header>
  );
}
