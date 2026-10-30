"use client";

import { useEffect, useRef, useState } from "react";

/**
 * The narrated walkthrough, and the one mechanic this page adds to the deck:
 * every slide below the player has a "Hear this part" link that jumps the
 * video to the second that slide's narration starts. <Walkthrough> owns the
 * <video>; <HearThis> is the per-slide control. They talk through one window
 * event so the page itself stays a server component.
 */
const SEEK_EVENT = "kbc:seek";

type SeekDetail = { start: number };

export function Walkthrough({ src, poster }: { src: string; poster: string }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const onSeek = (e: Event) => {
      const v = ref.current;
      if (!v) return;
      const { start } = (e as CustomEvent<SeekDetail>).detail;
      v.currentTime = start;
      v.scrollIntoView({ behavior: "smooth", block: "center" });
      void v.play().catch(() => {});
    };
    window.addEventListener(SEEK_EVENT, onSeek);
    return () => window.removeEventListener(SEEK_EVENT, onSeek);
  }, []);

  return (
    <video
      ref={ref}
      id="walkthrough"
      className="aspect-video w-full bg-onyx"
      controls
      playsInline
      preload="metadata"
      poster={poster}
    >
      <source src={src} type="video/mp4" />
      Your browser can&rsquo;t play this video. Download it instead:{" "}
      <a href={src} className="underline">
        walkthrough.mp4
      </a>
    </video>
  );
}

const mmss = (s: number) => {
  const m = Math.floor(s / 60);
  const r = Math.floor(s % 60);
  return `${m}:${String(r).padStart(2, "0")}`;
};

export function HearThis({ start }: { start: number }) {
  const [pressed, setPressed] = useState(false);
  return (
    <button
      type="button"
      onClick={() => {
        setPressed(true);
        window.dispatchEvent(new CustomEvent<SeekDetail>(SEEK_EVENT, { detail: { start } }));
      }}
      className="type-meta group inline-flex items-center gap-3 text-ink transition duration-400 ease-editorial hover:text-flare-deep focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
      aria-label={`Play the narration for this page, from ${mmss(start)}`}
    >
      <span aria-hidden className="text-flare">
        {pressed ? "▶︎" : "▷"}
      </span>
      Hear this part
      <span className="tabular-nums text-ink/70">{mmss(start)}</span>
    </button>
  );
}
