import Button from "./Button";

/**
 * Service tier card — a WHITE sheet lifted off the milk with a hairline, display
 * name, ink price, muted-ink description. `featured` adds a flare top rule and the
 * "Most commissioned" flag. Ink-forward price (never coloured) so it reads expensive.
 *
 * THE FLOOD (2026-09-07, Krystal: "when you scroll over a service card the whole
 * card turns the flare colour and the text changes to work with it"): on hover or
 * focus-within the card fills with the neon and the type re-colours to stay legal —
 * the display name goes milk (3.8 on lipstick: legal at ≥24px only), every smaller
 * line goes INK (4.3 on lipstick: legal for text). Transient, so it spends nothing
 * from the flare budget. Reduced motion: the colours still swap, just without the
 * transition.
 */
type Props = {
  name: string;
  price: string;
  description: string;
  duration?: string;
  bestFor?: string;
  href?: string;
  cta?: string;
  featured?: boolean;
  className?: string;
};

export default function ServiceCard({
  name,
  price,
  description,
  duration,
  bestFor,
  href,
  cta = "Explore",
  featured = false,
  className = "",
}: Props) {
  return (
    <article
      className={`group flex flex-col border bg-white p-6 transition-colors duration-600 ease-editorial hover:bg-flare focus-within:bg-flare motion-reduce:transition-none ${
        featured ? "border-t-2 border-t-flare border-ink/12" : "border-ink/12"
      } ${className}`}
    >
      {featured ? (
        <span className="type-meta mb-4 block text-flare-deep transition-colors duration-600 ease-editorial group-hover:text-ink group-focus-within:text-ink">
          Most commissioned
        </span>
      ) : null}
      <h3 className="type-display text-fluid-2xl text-ink transition-colors duration-600 ease-editorial group-hover:text-milk group-focus-within:text-milk">
        {name}
      </h3>
      <p className="mt-3 font-sans font-medium text-ink">{price}</p>
      {duration ? (
        <p className="type-meta mt-2 text-ink/70 transition-colors duration-600 ease-editorial group-hover:text-ink group-focus-within:text-ink">
          {duration}
        </p>
      ) : null}
      <p className="mt-5 max-w-[42ch] font-sans text-sm leading-relaxed text-ink/70 transition-colors duration-600 ease-editorial group-hover:text-ink group-focus-within:text-ink">
        {description}
      </p>
      {bestFor ? (
        <p className="mt-3 max-w-[42ch] font-sans text-sm leading-relaxed text-ink/70 transition-colors duration-600 ease-editorial group-hover:text-ink group-focus-within:text-ink">
          {bestFor}
        </p>
      ) : null}
      {href ? (
        <div className="mt-6">
          <Button href={href} variant="ghost">
            {cta}
          </Button>
        </div>
      ) : null}
    </article>
  );
}
