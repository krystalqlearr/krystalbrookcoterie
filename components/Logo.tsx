/**
 * Krystal Brook Coterie wordmark — three lockups in Neue Montreal Extrabold,
 * UPPERCASE (matches the HAUS-register display headlines). Text is uppercased via
 * CSS so the accessible label stays natural case. Colors are token-mapped; the
 * monogram border uses currentColor so it tracks the chosen token.
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
        className={`inline-flex h-[2em] w-[2em] items-center justify-center rounded-[1px] border border-current font-display font-extrabold uppercase leading-none tracking-[0.02em] ${tone} ${className}`}
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
        className={`font-display font-extrabold uppercase leading-none tracking-[-0.01em] ${tone} ${className}`}
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
      <span aria-hidden className="block font-display text-[1em] font-extrabold uppercase leading-[0.95] tracking-[-0.01em]">
        Krystal Brook
      </span>
      <span aria-hidden className="block font-display text-[1em] font-extrabold uppercase leading-[0.95] tracking-[-0.01em]">
        Coterie
      </span>
      <span
        aria-hidden
        className="mt-[0.55em] block font-sans text-[0.34em] font-medium uppercase tracking-[0.42em]"
      >
        Web Design Studio
      </span>
    </span>
  );
}
