import Image from "next/image";

/**
 * Editorial testimonial. The quote is set in the DISPLAY register — regular
 * weight, sentence case, tight tracking — so a client's words carry the same
 * typographic authority as the site's own headlines, instead of being demoted to
 * a decorative serif aside.
 *
 * `tone` follows the canvas. `onFlare` is for the full-bleed flare band, which uses
 * the `flare-deep` stop (#B3102E): FULL milk on it is 6.48, AA at any size,
 * including the 13px attribution. The attribution must be full milk — at milk/70
 * it measured 3.74 and failed (caught by `npm run verify`, fixed 2026-09-11; this
 * comment used to quote the retired magenta #A8004F). One band per page, at most.
 */
type Tone = "onLight" | "onDark" | "onFlare";

const toneClass: Record<Tone, { quote: string; name: string; meta: string; ring: string }> = {
  onLight: {
    quote: "text-ink",
    name: "text-ink",
    meta: "text-ink/70",
    ring: "border-ink/15",
  },
  onDark: {
    quote: "text-milk",
    name: "text-milk",
    meta: "text-milk/60",
    ring: "border-milk/20",
  },
  onFlare: {
    quote: "text-milk",
    name: "text-milk",
    meta: "text-milk",
    ring: "border-milk/30",
  },
};

type Props = {
  quote: string;
  name: string;
  role?: string;
  image?: { src: string; alt: string };
  tone?: Tone;
  className?: string;
};

export default function Testimonial({
  quote,
  name,
  role,
  image,
  tone = "onLight",
  className = "",
}: Props) {
  const t = toneClass[tone];

  return (
    <figure className={`flex max-w-[42ch] flex-col gap-8 ${className}`}>
      {image ? (
        <div className={`relative h-14 w-14 overflow-hidden rounded-full border ${t.ring}`}>
          <Image src={image.src} alt={image.alt} fill sizes="56px" className="object-cover" />
        </div>
      ) : null}
      <blockquote className={`type-display text-fluid-xl ${t.quote}`}>{quote}</blockquote>
      <figcaption className={`type-meta ${t.meta}`}>
        <span className={t.name}>{name}</span>
        {role ? <span aria-hidden> — </span> : null}
        {role}
      </figcaption>
    </figure>
  );
}
