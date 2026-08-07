import Image from "next/image";

/**
 * next/image wrapper in an editorial frame. `ratio` sets aspect-ratio; `offset`
 * nudges the frame vertically for asymmetric composition (desktop only). With no
 * `src`, renders an art-directed placeholder: token-based duotone gradients under
 * a filmic grain overlay (see `.editorial-grain`) — no hardcoded brand hex, and it
 * reads as deliberate art direction rather than an empty box until real
 * photography lands. `fullBleed` drops the side frame for a full-width band.
 */
type Offset = "none" | "up" | "down";

const offsetClass: Record<Offset, string> = {
  none: "",
  up: "lg:-translate-y-10",
  down: "lg:translate-y-10",
};

type Props = {
  alt: string;
  src?: string;
  ratio?: string; // e.g. "4/5", "16/11", "3/4"
  offset?: Offset;
  caption?: string;
  index?: string; // small editorial index shown top-right, e.g. "01"
  priority?: boolean;
  fullBleed?: boolean;
  sizes?: string;
  className?: string;
};

export default function ImageFrame({
  alt,
  src,
  ratio = "4/5",
  offset = "none",
  caption,
  index,
  priority = false,
  fullBleed = false,
  sizes = "(min-width: 768px) 50vw, 100vw",
  className = "",
}: Props) {
  const frame = fullBleed
    ? "border-y border-ink/12"
    : `border border-ink/15 ${offsetClass[offset]}`;

  return (
    <figure
      className={`relative overflow-hidden ${frame} ${className}`}
      style={{ aspectRatio: ratio.replace("/", " / ") }}
    >
      {src ? (
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover" />
      ) : (
        /* Art-directed placeholder: a warm charcoal field (a dark image slot that
           punctuates the bone canvas) with a mocha→wine highlight and paper grain. */
        <div role="img" aria-label={alt} className="editorial-grain absolute inset-0 bg-charcoal">
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-mocha/25 to-cherry/30 mix-blend-screen" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
        </div>
      )}
      {index ? (
        <span className="absolute right-4 top-4 font-sans text-[0.6rem] uppercase tracking-[0.22em] text-bone/60">
          {index}
        </span>
      ) : null}
      {caption ? (
        <figcaption className="absolute bottom-0 left-0 p-4 font-sans text-[0.6rem] uppercase tracking-[0.22em] text-bone/55">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
