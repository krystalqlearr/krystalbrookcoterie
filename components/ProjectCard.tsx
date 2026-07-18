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
  const thumb = (
    <ImageFrame
      ratio={ratioBySize[size]}
      src={image?.src}
      alt={image?.alt ?? `${client} — project thumbnail`}
      caption={image ? undefined : client}
      offset={size === "side" ? "up" : "none"}
      fullBleed={Boolean(browserUrl)}
    />
  );

  const body = (
    <>
      {browserUrl ? <BrowserFrame url={browserUrl}>{thumb}</BrowserFrame> : thumb}
      <div className="mt-4 flex items-baseline justify-between font-sans text-xs tracking-[0.04em] text-ink/60">
        <span>{client}</span>
        <span>{tag}</span>
      </div>
      <h3 className={`mt-2 font-editorial font-normal italic text-ink ${headingBySize[size]}`}>{descriptor}</h3>
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
