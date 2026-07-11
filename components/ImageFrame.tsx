import Image from "next/image";

/**
 * next/image wrapper in an editorial frame. `ratio` sets aspect-ratio; `offset`
 * nudges the frame vertically for asymmetric composition (desktop only). With no
 * `src`, renders a token-based gradient placeholder (no hardcoded hex).
 */
type Offset = "none" | "up" | "down";

const offsetClass: Record<Offset, string> = {
  none: "",
  up: "lg:-translate-y-8",
  down: "lg:translate-y-8",
};

type Props = {
  alt: string;
  src?: string;
  ratio?: string; // e.g. "4/5", "16/11", "3/4"
  offset?: Offset;
  caption?: string;
  priority?: boolean;
  sizes?: string;
  className?: string;
};

export default function ImageFrame({
  alt,
  src,
  ratio = "4/5",
  offset = "none",
  caption,
  priority = false,
  sizes = "(min-width: 768px) 50vw, 100vw",
  className = "",
}: Props) {
  return (
    <figure
      className={`relative overflow-hidden border border-cream/15 ${offsetClass[offset]} ${className}`}
      style={{ aspectRatio: ratio.replace("/", " / ") }}
    >
      {src ? (
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover" />
      ) : (
        <div
          role="img"
          aria-label={alt}
          className="absolute inset-0 bg-gradient-to-br from-terracotta/25 via-mocha/10 to-rich-black"
        />
      )}
      {caption ? (
        <figcaption className="absolute bottom-0 left-0 p-4 font-sans text-[0.6rem] uppercase tracking-[0.22em] text-greige">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
