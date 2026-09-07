/**
 * Krystal Brook Coterie wordmark — three lockups in Neue Montreal MEDIUM (500),
 * lowercase, lightly tracked.
 *
 * Lowercase since the 2026-09 Round 2 pivot: the homepage opens on the name in
 * lowercase and the name then floats into the header and BECOMES the logo — one
 * continuous element, same glyphs, same weight, so the wordmark everywhere else
 * matches it. Uppercase announces; lowercase is simply present. The monogram
 * keeps its uppercase "KBC" — it's an initialism, not the name.
 *
 * At 500 it holds its own beside 300-weight display lines without competing
 * with them. Case is applied via CSS so the accessible label stays natural
 * case. Colors are token-mapped; the monogram border uses currentColor.
 *
 * Internals are sized in `em`, so `size` (the root font-size) scales the whole
 * lockup proportionally.
 */

type LogoVariant = "stacked" | "horizontal" | "monogram";
type LogoColor = "milk" | "ink";

const toneClass: Record<LogoColor, string> = {
  milk: "text-milk",
  ink: "text-ink",
};

const defaultSize: Record<LogoVariant, string> = {
  stacked: "1.5rem",
  horizontal: "1.1rem",
  monogram: "2.4rem",
};

const LABEL = "Krystal Brook Coterie";

// Shared wordmark recipe — one place so the lockups can never drift. Case is
// added per lockup below. `whitespace-nowrap` is load-bearing: in the header
// the wordmark sits in a flex row beside the nav, and without it the name
// wraps and collides with the first nav item.
const mark = "font-display font-medium leading-[0.98] tracking-[0.02em] whitespace-nowrap";
const wordmark = `${mark} lowercase`;

export default function Logo({
  variant = "stacked",
  color = "ink",
  size,
  className = "",
}: {
  variant?: LogoVariant;
  color?: LogoColor;
  size?: string;
  className?: string;
}) {
  const tone = toneClass[color];
  const fontSize = size ?? defaultSize[variant];

  if (variant === "monogram") {
    return (
      <span
        role="img"
        aria-label={LABEL}
        style={{ fontSize }}
        className={`inline-flex h-[2em] w-[2em] items-center justify-center rounded-[1px] border border-current ${mark} uppercase tracking-[0.06em] ${tone} ${className}`}
      >
        <span aria-hidden>KBC</span>
      </span>
    );
  }

  if (variant === "horizontal") {
    return (
      <span
        role="img"
        aria-label={LABEL}
        style={{ fontSize }}
        className={`${wordmark} ${tone} ${className}`}
      >
        <span aria-hidden>Krystal Brook Coterie</span>
      </span>
    );
  }

  // stacked — primary lockup
  return (
    <span
      role="img"
      aria-label={LABEL}
      style={{ fontSize }}
      className={`inline-block leading-none ${tone} ${className}`}
    >
      <span aria-hidden className={`block text-[1em] ${wordmark}`}>
        Krystal Brook
      </span>
      <span aria-hidden className={`block text-[1em] ${wordmark}`}>
        Coterie
      </span>
      <span
        aria-hidden
        className="mt-[0.6em] block font-sans text-[0.32em] font-semibold uppercase tracking-meta"
      >
        Web Design Studio
      </span>
    </span>
  );
}
