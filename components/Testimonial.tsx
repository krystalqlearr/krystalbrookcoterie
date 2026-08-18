import Image from "next/image";

/**
 * Editorial testimonial. The quote is set in the DISPLAY register — regular
 * weight, sentence case, tight tracking — so a client's words carry the same
 * typographic authority as the site's own headlines, instead of being demoted to
 * a decorative serif aside.
 *
 * `tone` follows the canvas. `onFlare` is for the full-bleed flare band, which uses
 * the `deep` stop (#A8004F): bone on deep clears AA at 6.02 at ANY size, including
 * the 13px attribution. The neon default would only manage 3.01 for bone and 4.30
 * for ink — fine for the big quote, short for the caption beneath it. One band per
 * page, at most.
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
    quote: "text-bone",
    name: "text-bone",
    meta: "text-bone/60",
    ring: "border-bone/20",
  },
  onFlare: {
    quote: "text-bone",
    name: "text-bone",
    meta: "text-bone/70",
    ring: "border-bone/30",
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
