import Image from "next/image";

/**
 * THE FRAME OPENS TO THE FULL WIDTH OF THE SCREEN (2026-09-23).
 *
 * One image per page, and never two: a framed still of real work that widens
 * as it crosses the viewport until it runs edge to edge, then settles. It is
 * the page's one cinematic breath — moments stop working when they repeat,
 * which is the same rule the flare budget and the line reveal are built on.
 *
 * THE RESTING STATE IS THE FINISHED STATE. The image is full-bleed in plain
 * CSS; the entrance is a scroll-driven animation layered on top inside an
 * `@supports` block. A browser with no scroll timeline, or a visitor who asked
 * for less motion, sees the finished full-bleed band with no entrance at all —
 * never an image stuck half-open. Same rule the accent wash follows.
 *
 * WHY IT IS A CLIP AND NOT A WIDTH. Animating width or margin would run layout
 * on every frame of a scroll and shove the rest of the page around as it went.
 * The element is always the full width of the screen; what animates is the
 * WINDOW onto it — `clip-path: inset()`, which is composited, and which leaves
 * every other element on the page exactly where it was.
 *
 * HOW IT LINES UP WITH THE TEXT. The closed state has to start on the same
 * line the words start on, or the move reads as approximate. The wrapper is a
 * container-query context, so `cqw` inside it measures the WRAPPER (the
 * editorial column), while `vw` measures the screen: the inset is the
 * difference between the two, halved. No magic number, and it stays correct at
 * every breakpoint because both terms are live.
 *
 * WHAT IT SHOWS. Real work only — screens from a site that is actually live
 * (CLAUDE.md, Signature devices). A studio that sells websites should show
 * websites; stock photography of a person would be decoration, and decoration
 * is what the rest of the site spends its restraint avoiding.
 */
type Props = {
  src: string;
  alt: string;
  /** Meta-caps line under the band — name the work, don't describe the picture. */
  caption?: string;
  /** 16/9 by default; the captures are 2880×1620. */
  ratio?: string;
  priority?: boolean;
};

export default function BleedImage({
  src,
  alt,
  caption,
  ratio = "16/9",
  priority = false,
}: Props) {
  return (
    <section className="py-section">
      <div className="container">
        <div className="bleed-wrap">
          <div className="bleed-frame" style={{ aspectRatio: ratio }}>
            <Image
              src={src}
              alt={alt}
              fill
              sizes="100vw"
              priority={priority}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
        {caption ? (
          <p className="type-meta mt-6 text-ink/70">{caption}</p>
        ) : null}
      </div>
    </section>
  );
}
