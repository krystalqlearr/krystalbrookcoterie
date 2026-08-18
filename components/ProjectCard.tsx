import Link from "next/link";
import ImageFrame from "./ImageFrame";
import BrowserFrame from "./BrowserFrame";

/**
 * Project card — thumbnail (ImageFrame), client + tag meta line, one-line display
 * descriptor. `size` drives asymmetric composition: "feature" is large/16:11,
 * "side" is smaller/4:5 and offset upward. Set `browserUrl` to present the
 * thumbnail as a site screenshot inside a minimal BrowserFrame (for web-design
 * case studies, so a light site UI sits cleanly on the dark canvas).
 */
type Size = "feature" | "side";

const ratioBySize: Record<Size, string> = { feature: "16/11", side: "4/5" };
const headingBySize: Record<Size, string> = { feature: "text-fluid-2xl", side: "text-fluid-lg" };

type Props = {
  client: string;
  tag: string;
  descriptor: string;
  image?: { src: string; alt: string };
  browserUrl?: string;
  href?: string;
  size?: Size;
  className?: string;
};

export default function ProjectCard({
  client,
  tag,
  descriptor,
  image,
  browserUrl,
  href,
  size = "feature",
  className = "",
}: Props) {
  const interactive = Boolean(href);

  const thumb = (
    <ImageFrame
      ratio={ratioBySize[size]}
      src={image?.src}
      alt={image?.alt ?? `${client} — project thumbnail`}
      caption={image ? undefined : client}
      offset={size === "side" ? "up" : "none"}
      fullBleed={Boolean(browserUrl)}
      zoomOnGroupHover={interactive}
    />
  );

  const body = (
    <>
      <div className="overflow-hidden">
        {browserUrl ? <BrowserFrame url={browserUrl}>{thumb}</BrowserFrame> : thumb}
      </div>
      <div className="type-meta mt-5 flex items-baseline justify-between gap-4 text-ink/70">
        <span className="text-ink">{client}</span>
        <span>{tag}</span>
      </div>
      <h3 className={`type-display mt-3 text-ink ${headingBySize[size]}`}>
        {descriptor}
        {/* The arrow is part of the heading line, so it arrives on the same
            baseline as the last word rather than floating in its own row. */}
        {interactive ? (
          <span
            aria-hidden
            className="ml-3 inline-block text-flare opacity-0 transition-all duration-500 ease-editorial group-hover:translate-x-1 group-hover:opacity-100 group-focus-visible:translate-x-1 group-focus-visible:opacity-100 motion-reduce:transition-none"
          >
            ↗︎
          </span>
        ) : null}
      </h3>
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        className={`group block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink ${className}`}
      >
        {body}
      </Link>
    );
  }

  return <div className={className}>{body}</div>;
}
