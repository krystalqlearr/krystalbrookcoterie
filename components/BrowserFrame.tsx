import { type ReactNode } from "react";

/**
 * Minimal browser chrome for presenting site screenshots. A restrained CHARCOAL
 * frame — muted dots + a quiet address pill — so a light site UI (and real
 * screenshots) pop against the bone canvas and read as "a website we built."
 * Wrap an ImageFrame (or image) as the child.
 */
type Props = {
  url?: string;
  children: ReactNode;
  className?: string;
};

export default function BrowserFrame({ url = "glowtoure.com", children, className = "" }: Props) {
  return (
    <div className={`overflow-hidden border border-ink/15 bg-forest ${className}`}>
      <div className="flex items-center gap-3 border-b border-bone/10 px-4 py-2.5">
        <span className="flex gap-1.5" aria-hidden>
          <span className="h-2 w-2 rounded-full bg-flare" />
          <span className="h-2 w-2 rounded-full bg-bone/25" />
          <span className="h-2 w-2 rounded-full bg-bone/25" />
        </span>
        <span className="truncate rounded-sm bg-bone/5 px-3 py-1 font-sans text-[0.7rem] tracking-[0.04em] text-bone/60">
          {url}
        </span>
      </div>
      <div className="relative">{children}</div>
    </div>
  );
}
