import Button from "./Button";
import TextReveal from "./motion/TextReveal";

/**
 * Service tier card — ink top rule, uppercase sans name, ink price, muted-ink
 * description. `featured` adds a flare top rule + wash + "Most commissioned" flag.
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
          ? "border-flare bg-gradient-to-b from-flare/12 to-transparent"
          : "border-ink/20"
      } ${className}`}
    >
      {featured ? (
        <span className="type-meta mb-4 block text-flare-deep">Most commissioned</span>
      ) : null}
      <h3 className="type-display text-fluid-2xl text-ink">
        <TextReveal>{name}</TextReveal>
      </h3>
      <p className="mt-3 font-sans font-medium text-ink">{price}</p>
      {duration ? <p className="type-meta mt-2 text-ink/70">{duration}</p> : null}
      <p className="mt-5 max-w-[42ch] font-sans text-sm leading-relaxed text-ink/70">
        <TextReveal delay={0.04}>{description}</TextReveal>
      </p>
      {bestFor ? (
        <p className="mt-3 max-w-[42ch] font-sans text-sm leading-relaxed text-ink/70">
          <TextReveal delay={0.08}>{bestFor}</TextReveal>
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
