import { type ReactNode } from "react";

/**
 * Minimal browser chrome for presenting a site. A restrained onyx frame —
 * muted dots + a quiet address pill — so a light site UI reads as "a website
 * we built." The dots are chrome, not an accent: all three stay milk/25 so a
 * page with several frames never spends its flare budget on window dressing.
 *
 * `BrowserChrome` is the bar alone, shared with WorkShowcase's morphing frame
 * so the two can never drift; `BrowserFrame` is the bar plus a bordered body.
 */
export function BrowserChrome({ label }: { label: string }) {
  return (
    <div className="flex shrink-0 items-center gap-3 border-b border-milk/10 px-4 py-2.5">
      <span className="flex gap-1.5" aria-hidden>
        <span className="h-2 w-2 rounded-full bg-milk/25" />
        <span className="h-2 w-2 rounded-full bg-milk/25" />
        <span className="h-2 w-2 rounded-full bg-milk/25" />
      </span>
      <span className="truncate rounded-sm bg-milk/5 px-3 py-1 font-sans text-[0.7rem] tracking-[0.04em] text-milk/60">
        {label}
      </span>
    </div>
  );
}

type Props = {
  url?: string;
  children: ReactNode;
  className?: string;
};

export default function BrowserFrame({ url = "glowtoure.com", children, className = "" }: Props) {
  return (
    <div className={`overflow-hidden border border-ink/15 bg-onyx ${className}`}>
      <BrowserChrome label={url} />
      <div className="relative">{children}</div>
    </div>
  );
}
