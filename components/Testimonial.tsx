import Image from "next/image";

/**
 * Editorial testimonial — a Regular-400 quote under an oversized neon quote mark
 * (a glyph ≥24px, so the neon stop is sanctioned), muted attribution. Optional
 * circular portrait. Left-aligned, held to a comfortable measure.
 */
type Props = {
  quote: string;
  name: string;
  role?: string;
  image?: { src: string; alt: string };
  className?: string;
};

export default function Testimonial({ quote, name, role, image, className = "" }: Props) {
  return (
    <figure className={`flex max-w-[46ch] flex-col gap-6 ${className}`}>
      {image ? (
        <div className="relative h-14 w-14 overflow-hidden rounded-full border border-ink/15">
          <Image src={image.src} alt={image.alt} fill sizes="56px" className="object-cover" />
        </div>
      ) : null}
      <div>
        <span aria-hidden className="block font-display text-[3.5rem] leading-[0.4] text-neon">
          &ldquo;
        </span>
        <blockquote className="mt-4 font-sans text-fluid-xl leading-[1.25] tracking-[-0.02em] text-ink">
          {quote}
        </blockquote>
      </div>
      <figcaption className="font-sans text-sm tracking-[0.04em] text-ink/70">
        <span className="text-ink">{name}</span>
        {role ? <>, {role}</> : null}
      </figcaption>
    </figure>
  );
}
