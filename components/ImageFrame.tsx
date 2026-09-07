import Image from "next/image";

/**
 * next/image wrapper in an editorial frame. `ratio` sets aspect-ratio; `offset`
 * nudges the frame vertically for asymmetric composition (desktop only). With no
 * `src`, renders an art-directed placeholder: token-based duotone gradients under
 * a filmic grain overlay (see `.editorial-grain`) — no hardcoded brand hex, and it
 * reads as deliberate art direction rather than an empty box until real
 * photography lands. `fullBleed` drops the side frame for a full-width band.
 *
 * `zoomOnGroupHover` lets a parent marked `group` drive a slow scale on the media
 * only — the frame itself never moves, so the crop tightens rather than the layout
 * shifting. Reduced motion cancels it (motion-reduce:transform-none).
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
  /** Scale the media (not the frame) when an ancestor `.group` is hovered. */
  zoomOnGroupHover?: boolean;
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
  zoomOnGroupHover = false,
  sizes = "(min-width: 768px) 50vw, 100vw",
  className = "",
}: Props) {
  const frame = fullBleed
    ? "border-y border-ink/12"
    : `border border-ink/15 ${offsetClass[offset]}`;

  // 1.04 is deliberately small: at this scale it reads as the image breathing,
  // not as a zoom effect. 900ms on the editorial ease keeps it weighted.
  const zoom = zoomOnGroupHover
    ? "transition-transform duration-900 ease-editorial group-hover:scale-[1.04] motion-reduce:transform-none motion-reduce:transition-none"
    : "";

  return (
    <figure
      className={`relative overflow-hidden ${frame} ${className}`}
      style={{ aspectRatio: ratio.replace("/", " / ") }}
    >
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className={`object-cover ${zoom}`}
        />
      ) : (
        /* Art-directed placeholder: a warm onyx field (a dark image slot that
           punctuates the paper) lit by a mocha highlight, under paper grain. The
           flare is deliberately NOT in here — tinting every empty image slot with
           the accent turned the whole page plum and spent the flare on nothing. */
        <div role="img" aria-label={alt} className={`editorial-grain absolute inset-0 bg-onyx ${zoom}`}>
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-mocha/20 to-mocha/35 mix-blend-screen" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
        </div>
      )}
      {/* Scrim. The placeholder brings its own dark field, but a real photograph is
          an unknown canvas — without this, an index or caption can land on a blown
          highlight and drop below AA. Cheap insurance, invisible on dark imagery. */}
      {(index || caption) && src ? (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-ink/45"
        />
      ) : null}
      {index ? (
        <span className="type-meta absolute right-4 top-4 text-milk/60">
          {index}
        </span>
      ) : null}
      {caption ? (
        <figcaption className="type-meta absolute bottom-0 left-0 p-4 text-milk/60">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
