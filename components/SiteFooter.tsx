import Link from "next/link";
import Logo from "./Logo";
import { NAV_LINKS } from "./nav";

/**
 * Global footer — the ONLY place deep-petrol (#052029) appears.
 * Text is cream; eyebrows/muted labels are greige (never terracotta on petrol —
 * terracotta/petrol is only 4.26:1, below AA). Teal appears once, as the
 * structural rule (non-text).
 */

const linkFocus =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal";

export default function SiteFooter() {
  return (
    <footer className="bg-deep-petrol text-cream">
      <div className="container py-20">
        <div className="grid gap-12 md:grid-cols-[1.5fr_1fr_1fr]">
          {/* Brand + studio line */}
          <div>
            <Logo variant="stacked" color="cream" />
            <p className="mt-8 max-w-[40ch] font-sans text-sm leading-relaxed text-greige">
              Editorial luxury web design for founder-led beauty, wellness, med-spa,
              and bridal brands — custom-coded, owned not rented.
            </p>
          </div>

          {/* Nav repeat */}
          <nav aria-label="Footer">
            <p className="font-sans text-xs uppercase tracking-[0.28em] text-greige">Studio</p>
            <ul className="mt-5 space-y-2.5 font-sans text-sm">
              {NAV_LINKS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`text-cream transition-colors hover:text-greige ${linkFocus}`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Connect */}
          <div>
            <p className="font-sans text-xs uppercase tracking-[0.28em] text-greige">Connect</p>
            <ul className="mt-5 space-y-2.5 font-sans text-sm">
              <li>
                <a
                  href="mailto:hello@krystalbrookcoterie.com"
                  className={`text-cream transition-colors hover:text-greige ${linkFocus}`}
                >
                  hello@krystalbrookcoterie.com
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/krystalbrookcoterie/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-cream transition-colors hover:text-greige ${linkFocus}`}
                >
                  Instagram
                </a>
              </li>
              <li>
                <Link
                  href="/contact"
                  className={`text-cream transition-colors hover:text-greige ${linkFocus}`}
                >
                  Begin a project
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Single teal structural rule */}
        <hr className="my-12 h-px border-0 bg-teal" />

        <div className="flex flex-col gap-3 font-sans text-xs tracking-[0.04em] text-greige sm:flex-row sm:items-center sm:justify-between">
          <span>© 2026 Krystal Brook Coterie</span>
          <span>a DBA of Lion &amp; Gazelle Holdings LLC</span>
          <span className="flex gap-5">
            <Link href="/privacy" className={`transition-colors hover:text-cream ${linkFocus}`}>
              Privacy
            </Link>
            <Link href="/terms" className={`transition-colors hover:text-cream ${linkFocus}`}>
              Terms
            </Link>
          </span>
        </div>
      </div>
    </footer>
  );
}
