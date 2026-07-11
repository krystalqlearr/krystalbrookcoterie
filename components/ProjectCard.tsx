import Link from "next/link";
import ImageFrame from "./ImageFrame";

/**
 * Project card — thumbnail (ImageFrame), client + tag meta line, one-line display
 * descriptor. `size` drives asymmetric composition: "feature" is large/16:11,
 * "side" is smaller/4:5 and offset upward.
 */
type Size = "feature" | "side";

const ratioBySize: Record<Size, string> = { feature: "16/11", side: "4/5" };
const headingBySize: Record<Size, string> = { feature: "text-3xl", side: "text-xl" };

type Props = {
  client: string;
  tag: string;
  descriptor: string;
  image?: { src: string; alt: string };
  href?: string;
  size?: Size;
  className?: string;
};

export default function ProjectCard({
  client,
  tag,
  descriptor,
  image,
  href,
  size = "feature",
  className = "",
}: Props) {
  const body = (
    <>
      <ImageFrame
        ratio={ratioBySize[size]}
        src={image?.src}
        alt={image?.alt ?? `${client} — project thumbnail`}
        caption={image ? undefined : client}
        offset={size === "side" ? "up" : "none"}
      />
      <div className="mt-4 flex items-baseline justify-between font-sans text-xs tracking-[0.04em] text-greige">
        <span>{client}</span>
        <span>{tag}</span>
      </div>
      <h3 className={`mt-2 font-display text-cream ${headingBySize[size]}`}>{descriptor}</h3>
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        className={`group block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal ${className}`}
      >
        {body}
      </Link>
    );
  }

  return <div className={className}>{body}</div>;
}
