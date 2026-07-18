import Button from "./Button";

/**
 * Service tier card — ink top rule, uppercase sans name, ink price, muted-ink
 * description. `featured` adds a subtle camel wash + "Recommended" flag. Ink-forward
 * (no colored price) so it reads expensive, per the bone-led system.
 */
type Props = {
  name: string;
  price: string;
  description: string;
  duration?: string;
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
  href,
  cta = "Explore",
  featured = false,
  className = "",
}: Props) {
  return (
    <article
      className={`flex flex-col border-t border-ink/20 pt-5 ${
        featured ? "bg-gradient-to-b from-camel/15 to-transparent" : ""
      } ${className}`}
    >
      {featured ? (
        <span className="mb-3 font-sans text-[0.6rem] uppercase tracking-[0.2em] text-ink">
          Recommended
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
