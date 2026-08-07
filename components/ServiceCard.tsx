import Button from "./Button";

/**
 * Service tier card — ink top rule, uppercase sans name, ink price, muted-ink
 * description. `featured` adds a wine top rule + wash + "Most commissioned" flag.
 * Ink-forward price (never colored) so it reads expensive, per the bone-led system.
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
          ? "border-cherry bg-gradient-to-b from-cherry/12 to-transparent"
          : "border-ink/20"
      } ${className}`}
    >
      {featured ? (
        <span className="mb-3 font-sans text-[0.6rem] uppercase tracking-[0.2em] text-cherry">
          Most commissioned
        </span>
      ) : null}
      <h3 className="font-display text-fluid-lg font-extrabold uppercase tracking-[-0.01em] text-ink">
        {name}
      </h3>
      <p className="mt-2 font-sans font-medium text-ink">{price}</p>
      {duration ? (
        <p className="mt-1 font-sans text-xs uppercase tracking-[0.06em] text-ink/60">{duration}</p>
      ) : null}
      <p className="mt-4 max-w-[42ch] font-sans text-sm leading-relaxed text-ink/70">{description}</p>
      {bestFor ? (
        <p className="mt-3 max-w-[42ch] font-sans text-sm italic leading-relaxed text-ink/55 font-editorial">
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
