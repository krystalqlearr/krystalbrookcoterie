import Image from "next/image";
import Link from "next/link";
import Eyebrow from "./Eyebrow";
import EditorialHeading from "./EditorialHeading";

/**
 * Editorial project feature — a large numbered thumbnail panel beside a detail
 * column set off by a teal structural rule. Matches the reference Work-page layout.
 * `reverse` alternates the panel side for a stacked, magazine-style list.
 *
 * Tag text is greige (not teal): teal-on-rich-black is 4.05:1, below AA — the teal
 * stays on the tag border and the column rule (structural only).
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
        <div className="relative aspect-[3/2] overflow-hidden border border-cream/15 bg-gradient-to-br from-terracotta/15 via-mocha/5 to-rich-black">
          <span
            aria-hidden
            className="absolute left-6 top-3 font-display text-[6rem] leading-none text-cream/10 md:text-[8rem]"
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
          <span className="absolute bottom-4 left-6 font-sans text-[0.6rem] uppercase tracking-[0.22em] text-greige">
            {client}
            {year ? ` · ${year}` : ""}
          </span>
        </div>
      </div>

      {/* Detail column — teal structural rule on the left */}
      <div className={`border-l-2 border-teal pl-8 ${reverse ? "lg:order-1" : ""}`}>
        <Eyebrow>
          {eyebrow}
          {year ? ` · ${year}` : ""}
        </Eyebrow>
        <EditorialHeading as="h2" size="lg" className="mt-4">
          {client}
        </EditorialHeading>
        <span className="mt-5 inline-block rounded-[1px] border border-teal px-3 py-1 font-sans text-[0.6rem] uppercase tracking-[0.2em] text-greige">
          {tag}
        </span>
        <p className="mt-6 max-w-[40ch] font-sans leading-relaxed text-greige">{description}</p>
        {href ? (
          <Link
            href={href}
            className="mt-8 inline-flex items-center gap-2 border-b border-terracotta/50 pb-1 font-sans text-xs uppercase tracking-[0.16em] text-terracotta transition-colors hover:border-terracotta focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal"
          >
            View the case study <span aria-hidden>→</span>
          </Link>
        ) : null}
      </div>
    </article>
  );
}
