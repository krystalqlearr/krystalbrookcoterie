import Link from "next/link";
import Logo from "./Logo";
import { NAV_LINKS } from "./nav";

/**
 * Global footer on charcoal (ink) — the site's closing dark moment. Text is bone;
 * muted labels are bone/60. Camel appears once, as the structural rule.
 */

const linkFocus =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-bone";

export default function SiteFooter() {
  return (
    <footer className="bg-ink text-bone">
      <div className="container py-20">
        <div className="grid gap-12 md:grid-cols-[1.5fr_1fr_1fr]">
          {/* Brand + studio line */}
          <div>
            <Logo variant="stacked" color="bone" />
            <p className="mt-8 max-w-[40ch] font-sans text-sm leading-relaxed text-bone/60">
              Distinctive digital identities for founder-led beauty, wellness, med-spa,
              and luxury lifestyle brands — built to lead their category.
            </p>
          </div>

          {/* Nav repeat */}
          <nav aria-label="Footer">
            <p className="font-sans text-xs uppercase tracking-[0.28em] text-bone/60">Studio</p>
            <ul className="mt-5 space-y-2.5 font-sans text-sm">
              {NAV_LINKS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`text-bone transition-colors hover:text-bone/60 ${linkFocus}`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Connect */}
          <div>
            <p className="font-sans text-xs uppercase tracking-[0.28em] text-bone/60">Connect</p>
            <ul className="mt-5 space-y-2.5 font-sans text-sm">
              <li>
                <a
                  href="mailto:hello@krystalbrookcoterie.com"
                  className={`text-bone transition-colors hover:text-bone/60 ${linkFocus}`}
                >
                  hello@krystalbrookcoterie.com
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/krystalbrookcoterie/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-bone transition-colors hover:text-bone/60 ${linkFocus}`}
                >
                  Instagram
                </a>
              </li>
              <li>
                <Link
                  href="/begin"
                  className={`text-bone transition-colors hover:text-bone/60 ${linkFocus}`}
                >
                  Commission a project
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Single camel structural rule */}
        <hr className="my-12 h-px border-0 bg-camel" />

        <div className="flex flex-col gap-3 font-sans text-xs tracking-[0.04em] text-bone/55 sm:flex-row sm:items-center sm:justify-between">
          <span>© 2026 Krystal Brook Coterie</span>
          <span>a DBA of Lion &amp; Gazelle Holdings LLC</span>
          <span className="flex gap-5">
            <Link href="/privacy" className={`transition-colors hover:text-bone ${linkFocus}`}>
              Privacy
            </Link>
            <Link href="/terms" className={`transition-colors hover:text-bone ${linkFocus}`}>
              Terms
            </Link>
          </span>
        </div>
      </div>
    </footer>
  );
}
