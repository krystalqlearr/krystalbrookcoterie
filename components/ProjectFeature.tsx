import Image from "next/image";
import Eyebrow from "./Eyebrow";
import EditorialHeading from "./EditorialHeading";
import ArrowLink from "./ArrowLink";

/**
 * Editorial project feature — a large numbered thumbnail panel beside a detail
 * column set off by a neon structural rule (a graphic, so the neon stop is
 * sanctioned). `reverse` alternates the panel side for a stacked, magazine-style
 * list. Ink text on milk; the thumb panel is deep river.
 */
type Props = {
  index: string; // "01"
  client: string;
  tag: string;
  description: string;
  eyebrow?: string;
  year?: string; // e.g. "MMXXVI"
  href?: string;
  image?: { src: string; alt: string };
  reverse?: boolean;
  className?: string;
};

export default function ProjectFeature({
  index,
  client,
  tag,
  description,
  eyebrow = "Selected work",
  year,
  href,
  image,
  reverse = false,
  className = "",
}: Props) {
  return (
    <article
      className={`grid gap-x-gutter gap-y-8 lg:grid-cols-[1.5fr_1fr] lg:items-center ${className}`}
    >
      {/* Thumbnail panel with numeral watermark */}
      <div className={reverse ? "lg:order-2" : ""}>
        <div className="relative aspect-[3/2] overflow-hidden border border-ink/15 bg-gradient-to-br from-river via-ink to-ink">
          <span
            aria-hidden
            className="absolute left-6 top-3 font-display text-[6rem] leading-none text-bone/10 md:text-[8rem]"
          >
            {index}
          </span>
          {image ? (
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(min-width: 1024px) 60vw, 100vw"
              className="object-cover"
            />
          ) : null}
          <span className="absolute bottom-4 left-6 font-sans text-[0.6rem] uppercase tracking-[0.13em] text-bone/60">
            {client}
            {year ? ` · ${year}` : ""}
          </span>
        </div>
      </div>

      {/* Detail column — wine structural rule on the left */}
      <div className={`border-l-2 border-neon pl-8 ${reverse ? "lg:order-1" : ""}`}>
        <Eyebrow>
          {eyebrow}
          {year ? ` · ${year}` : ""}
        </Eyebrow>
        <EditorialHeading as="h2" size="lg" className="mt-4">
          {client}
        </EditorialHeading>
        <span className="mt-5 inline-block rounded-[1px] border border-ink/30 px-3 py-1 font-sans text-[0.6rem] font-semibold uppercase tracking-[0.13em] text-ink/70">
          {tag}
        </span>
        <p className="mt-6 max-w-[40ch] font-sans leading-relaxed text-ink/70">{description}</p>
        {href ? (
          <ArrowLink href={href} glyph="→" className="mt-8">
            View the case study
          </ArrowLink>
        ) : null}
      </div>
    </article>
  );
}
