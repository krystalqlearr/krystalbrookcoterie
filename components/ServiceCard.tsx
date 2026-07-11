import Button from "./Button";

/**
 * Service tier card — teal top rule (structural), display name, terracotta price,
 * greige description. `featured` adds a subtle terracotta wash + "Recommended" flag.
 *
 * Note: the reference sets the flag in teal, but teal-on-rich-black is 4.05:1 (below
 * AA for small text), so the flag uses terracotta (5.01:1) instead — teal stays on
 * the structural rule only.
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
      className={`flex flex-col border-t border-teal pt-5 ${
        featured ? "bg-gradient-to-b from-terracotta/10 to-transparent" : ""
      } ${className}`}
    >
      {featured ? (
        <span className="mb-3 font-sans text-[0.6rem] uppercase tracking-[0.2em] text-terracotta">
          Recommended
        </span>
      ) : null}
      <h3 className="font-display text-2xl text-cream">{name}</h3>
      <p className="mt-2 font-sans text-terracotta">{price}</p>
      {duration ? (
        <p className="mt-1 font-sans text-xs uppercase tracking-[0.06em] text-greige">{duration}</p>
      ) : null}
      <p className="mt-4 max-w-[42ch] font-sans text-sm leading-relaxed text-greige">{description}</p>
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
