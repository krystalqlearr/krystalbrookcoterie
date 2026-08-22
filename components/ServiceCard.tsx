import ArrowLink from "./ArrowLink";

/**
 * Service tier card — ink top rule, Regular-400 sentence-case name, ink price,
 * muted-ink description. `featured` adds a neon top rule (a graphic) + the
 * "Most commissioned" flag in flare-deep (small text). Ink-forward price (never
 * colored) so it reads expensive, per the Coterie system.
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
      className={`flex flex-col border-t pt-5 ${
        featured
          ? "border-neon bg-gradient-to-b from-neon/[0.06] to-transparent"
          : "border-ink/20"
      } ${className}`}
    >
      {featured ? (
        <span className="mb-3 font-sans text-[0.6rem] font-semibold uppercase tracking-[0.13em] text-flare-deep">
          Most commissioned
        </span>
      ) : null}
      <h3 className="font-display text-fluid-xl font-normal text-ink">
        {name}
      </h3>
      <p className="mt-2 font-sans font-medium text-ink">{price}</p>
      {duration ? (
        <p className="mt-1 font-sans text-xs uppercase tracking-[0.06em] text-ink/70">{duration}</p>
      ) : null}
      <p className="mt-4 max-w-[42ch] font-sans text-sm leading-relaxed text-ink/70">{description}</p>
      {bestFor ? (
        <p className="mt-3 max-w-[42ch] font-sans text-sm leading-relaxed text-ink/70">
          {bestFor}
        </p>
      ) : null}
      {href ? (
        <div className="mt-6">
          <ArrowLink href={href} glyph="→">
            {cta}
          </ArrowLink>
        </div>
      ) : null}
    </article>
  );
}
