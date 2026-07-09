/**
 * Krystal Brook Coterie wordmark — three lockups, typeset in PP Editorial New.
 * Matches docs/kbc-design-direction.html (.wm-stacked / .wm-horizontal / .wm-mono).
 *
 * If brand SVGs are added to /public/logo, swap the typeset markup for
 * <Image src="/logo/…svg" …/> per variant — the API (variant/color/size) stays the same.
 * None exist yet, so we typeset. Colors are token-mapped; the monogram border
 * uses currentColor so it always tracks the chosen token.
 *
 * Internals are sized in `em`, so `size` (the root font-size) scales the whole
 * lockup proportionally — no Tailwind arbitrary-value override races.
 */

type LogoVariant = "stacked" | "horizontal" | "monogram";
type LogoColor = "cream" | "rich-black";

const toneClass: Record<LogoColor, string> = {
  cream: "text-cream",
  "rich-black": "text-rich-black",
};

// Default root font-size per variant (reproduces the reference px sizes).
const defaultSize: Record<LogoVariant, string> = {
  stacked: "1.6rem",
  horizontal: "1.5rem",
  monogram: "2.6rem",
};

const LABEL = "Krystal Brook Coterie";

export default function Logo({
  variant = "stacked",
  color = "cream",
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
        className={`inline-flex h-[2.12em] w-[2.12em] items-center justify-center rounded-[1px] border border-current font-display leading-none tracking-[0.04em] ${tone} ${className}`}
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
        className={`font-display leading-none tracking-[0.03em] ${tone} ${className}`}
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
      <span aria-hidden className="block font-display text-[1em] leading-[1.02] tracking-[0.02em]">
        Krystal Brook
      </span>
      <span aria-hidden className="block font-display text-[1em] italic leading-[1.02]">
        Coterie
      </span>
      <span
        aria-hidden
        className="mt-[0.375em] block font-sans text-[0.4375em] uppercase tracking-[0.42em]"
      >
        Web Design Studio
      </span>
    </span>
  );
}
