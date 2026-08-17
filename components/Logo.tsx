/**
 * Krystal Brook Coterie wordmark — three lockups in Neue Montreal MEDIUM (500),
 * uppercase, lightly tracked.
 *
 * The mark is deliberately the one uppercase thing that isn't META and isn't
 * DISPLAY: at 500 it holds its own beside 400-weight sentence-case headlines
 * without competing with them, which is exactly what the retired Extrabold cut
 * was doing. Text is uppercased via CSS so the accessible label stays natural
 * case. Colors are token-mapped; the monogram border uses currentColor so it
 * tracks the chosen token.
 *
 * Internals are sized in `em`, so `size` (the root font-size) scales the whole
 * lockup proportionally.
 */

type LogoVariant = "stacked" | "horizontal" | "monogram";
type LogoColor = "bone" | "ink";

const toneClass: Record<LogoColor, string> = {
  bone: "text-bone",
  ink: "text-ink",
};

const defaultSize: Record<LogoVariant, string> = {
  stacked: "1.5rem",
  horizontal: "1.1rem",
  monogram: "2.4rem",
};

const LABEL = "Krystal Brook Coterie";

// Shared wordmark recipe — one place so the three lockups can never drift.
// `whitespace-nowrap` is load-bearing: in the header the wordmark sits in a flex
// row beside the nav, and without it "Krystal Brook Coterie" wraps and collides
// with the first nav item.
const wordmark =
  "font-display font-medium uppercase leading-[0.98] tracking-[0.02em] whitespace-nowrap";

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
        className={`inline-flex h-[2em] w-[2em] items-center justify-center rounded-[1px] border border-current ${wordmark} tracking-[0.06em] ${tone} ${className}`}
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
