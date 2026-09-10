import Link from "next/link";
import Logo from "./Logo";
import { NAV_LINKS } from "./nav";

/**
 * Global footer on the onyx dark — the site's closing dark moment. Text is milk; muted
 * labels are milk/60. The flare appears once, as the structural rule.
 */

const linkFocus =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-milk";

export default function SiteFooter() {
  return (
    <footer className="bg-onyx text-milk">
      <div className="container py-20">
        <div className="grid gap-12 md:grid-cols-[1.5fr_1fr_1fr]">
          {/* Brand + studio line */}
          <div>
            <Logo variant="stacked" color="milk" />
            <p className="mt-8 max-w-[40ch] font-sans text-sm leading-relaxed text-milk/60">
              Distinctive digital identities for founder-led beauty, wellness, med-spa,
              and luxury lifestyle brands — built to lead their category.
            </p>
          </div>

          {/* Nav repeat */}
          <nav aria-label="Footer">
            <p className="type-meta text-milk/60">Studio</p>
            {/* -my-1 + py-1 keeps the visual rhythm while clearing the 24px tap
                minimum on a phone (audit 2026-09-09, finding 14). */}
            <ul className="mt-4 space-y-1.5 font-sans text-sm">
              {NAV_LINKS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`link-underline -my-1 inline-block py-1 text-milk transition-colors hover:text-milk/60 ${linkFocus}`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Connect */}
          <div>
            <p className="type-meta text-milk/60">Connect</p>
            <ul className="mt-4 space-y-1.5 font-sans text-sm">
              <li>
                <a
                  href="mailto:hello@krystalbrookcoterie.com"
                  className={`link-underline -my-1 inline-block py-1 text-milk transition-colors hover:text-milk/60 ${linkFocus}`}
                >
                  hello@krystalbrookcoterie.com
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/krystalbrookcoterie/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`link-underline -my-1 inline-block py-1 text-milk transition-colors hover:text-milk/60 ${linkFocus}`}
                >
                  Instagram
                </a>
              </li>
              <li>
                <Link
                  href="/begin"
                  className={`link-underline -my-1 inline-block py-1 text-milk transition-colors hover:text-milk/60 ${linkFocus}`}
                >
                  Commission a project
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Single flare structural rule */}
        <hr className="my-12 h-px border-0 bg-flare" />

        <div className="flex flex-col gap-3 font-sans text-fluid-sm text-milk/60 sm:flex-row sm:items-center sm:justify-between">
          <span>© 2026 Krystal Brook Coterie</span>
          <span>a DBA of Lion &amp; Gazelle Holdings LLC</span>
          <span className="flex gap-5">
            <Link href="/privacy" className={`-my-1 inline-block py-1 transition-colors hover:text-milk ${linkFocus}`}>
              Privacy
            </Link>
            <Link href="/terms" className={`-my-1 inline-block py-1 transition-colors hover:text-milk ${linkFocus}`}>
              Terms
            </Link>
          </span>
        </div>
      </div>
    </footer>
  );
}
