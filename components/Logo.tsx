/**
 * Krystal Brook Coterie identity — the wordmark in Neue Montreal MEDIUM (500),
 * uppercase and lightly tracked, plus the registration mark.
 *
 * THE RULE: the mark is what the wordmark BECOMES when there isn't room. It is
 * never set beside the wordmark — at header size a mark renders around 16–19px,
 * which next to legible words reads as clutter rather than authority, and the
 * whole system is built on restraint. So the mark serves the surfaces the
 * wordmark cannot: the favicon, the mobile header, an avatar, a stamp.
 *
 * The wordmark sits at 500 deliberately — the one uppercase thing that is neither
 * META nor DISPLAY. At that weight it holds its own beside 400-weight sentence-case
 * headlines without competing, which is exactly what the retired Extrabold cut did.
 * Text is uppercased via CSS so the accessible label stays natural case.
 *
 * Internals are sized in `em`, so `size` (the root font-size) scales a whole
 * lockup proportionally.
 */

type LogoVariant = "stacked" | "horizontal" | "mark";
type LogoColor = "bone" | "ink";

const toneClass: Record<LogoColor, string> = {
  bone: "text-bone",
  ink: "text-ink",
};

const defaultSize: Record<LogoVariant, string> = {
  stacked: "1.5rem",
  horizontal: "1.1rem",
  mark: "2.4rem",
};

const LABEL = "Krystal Brook Coterie";

// Shared wordmark recipe — one place so the lockups can never drift.
// `whitespace-nowrap` is load-bearing: in the header the wordmark sits in a flex
// row beside the nav, and without it "Krystal Brook Coterie" wraps and collides
// with the first nav item.
const wordmark =
  "font-display font-medium uppercase leading-[0.98] tracking-[0.02em] whitespace-nowrap";

/**
 * The registration mark — four crop corners around a flare crosshair.
 *
 * Print registration marks are what a page carries when it has been prepared
 * properly: editorial by inheritance, precise by definition, and a frame — which
 * is what the studio does to a brand. Drawn on the same 1px logic as `Rule`.
 *
 * `simplified` drops the crosshair and thickens the corners. That is not a
 * scaled-down version, it is the SMALL DRAWING: below roughly 20px the crosshair
 * silts up and the corners alone still read as a frame. `app/icon.svg` ships this
 * variant. Stroke width is expressed against the 64-unit viewBox so it scales
 * with the mark rather than hairlining out.
 */
export function RegistrationMark({
  simplified = false,
  className = "",
  flare = true,
}: {
  simplified?: boolean;
  className?: string;
  /** Crosshair in the flare. Off for single-colour stamps and dark-on-dark uses. */
  flare?: boolean;
}) {
  if (simplified) {
    return (
      <svg viewBox="0 0 64 64" fill="none" aria-hidden className={className}>
        <g stroke="currentColor" strokeWidth="8" strokeLinecap="butt">
          <path d="M8 22 V8 H22" />
          <path d="M42 8 H56 V22" />
          <path d="M56 42 V56 H42" />
          <path d="M22 56 H8 V42" />
        </g>
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 64 64" fill="none" aria-hidden className={className}>
      <g stroke="currentColor" strokeWidth="4.5" strokeLinecap="butt">
        <path d="M6 20 V6 H20" />
        <path d="M44 6 H58 V20" />
        <path d="M58 44 V58 H44" />
        <path d="M20 58 H6 V44" />
      </g>
      <path
        d="M32 26 V38 M26 32 H38"
        strokeWidth="4.5"
        strokeLinecap="butt"
        className={flare ? "stroke-flare" : "stroke-current"}
      />
    </svg>
  );
}

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

  // The mark alone — the wordmark's stand-in wherever it will not fit.
  if (variant === "mark") {
    return (
      <span
        role="img"
        aria-label={LABEL}
        style={{ fontSize }}
        className={`inline-flex h-[1em] w-[1em] ${tone} ${className}`}
      >
        <RegistrationMark className="h-full w-full" />
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
