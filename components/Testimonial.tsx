import Image from "next/image";

/**
 * Editorial testimonial — display-italic quote with greige attribution. Optional
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
        <div className="relative h-14 w-14 overflow-hidden rounded-full border border-cream/15">
          <Image src={image.src} alt={image.alt} fill sizes="56px" className="object-cover" />
        </div>
      ) : null}
      <blockquote className="font-display text-2xl italic leading-[1.35] text-cream">
        {quote}
      </blockquote>
      <figcaption className="font-sans text-sm tracking-[0.04em] text-greige">
        <span className="text-cream">{name}</span>
        {role ? <>, {role}</> : null}
      </figcaption>
    </figure>
  );
}
