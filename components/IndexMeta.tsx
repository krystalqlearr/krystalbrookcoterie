/**
 * The counted index — `01 / 07` followed by a category tag, set in the META
 * register. It's the device that makes a list of projects or services read as an
 * edited sequence rather than a grid of cards: the reader knows where they are
 * and how much is left.
 *
 * The live number takes the flare (the AA-safe `deep` stop — this is 13px text);
 * the total and tag sit at the muted floor, so the eye lands on position first.
 * Hierarchy here is carried by COLOR, not by opacity: ink/70 is the lowest value
 * that clears 4.5:1 on both milk, so there is no fainter step available. Numbers are zero-padded to two digits and set in
 * tabular figures so a column of them aligns.
 *
 * Use on project cards, service rows, and process steps.
 */
type Tone = "onLight" | "onDark";

const toneClass: Record<Tone, { current: string; total: string; tag: string }> = {
  onLight: { current: "text-flare-deep", total: "text-ink/70", tag: "text-ink/70" },
  onDark: { current: "text-flare", total: "text-milk/60", tag: "text-milk/60" },
};

type Props = {
  index: number;
  /** Omit for an un-counted step — renders just `01` and the tag. */
  total?: number;
  tag?: string;
  tone?: Tone;
  /** Set when the index sits inside a flooded row (a `group` that fills with the
   *  neon on hover/focus). Every part goes ONYX while flooded: flare-deep on the
   *  neon is 1.80 and ink is 4.22, both under AA for 13px text; onyx is 5.07.
   *  Found 2026-11-24 by a hover-state contrast pass the route audit cannot see. */
  flood?: boolean;
  className?: string;
};

const FLOOD = "transition-colors duration-600 ease-editorial group-hover:text-onyx group-focus-visible:text-onyx";

const pad = (n: number) => String(n).padStart(2, "0");

export default function IndexMeta({
  index,
  total,
  tag,
  tone = "onLight",
  flood = false,
  className = "",
}: Props) {
  const base = toneClass[tone];
  const f = flood ? ` ${FLOOD}` : "";
  const t = { current: base.current + f, total: base.total + f, tag: base.tag + f };

  return (
    <p className={`type-meta flex flex-wrap items-baseline gap-x-3 gap-y-1 ${className}`}>
      <span className={`tabular-nums ${t.current}`}>{pad(index)}</span>
      {total ? <span className={`tabular-nums ${t.total}`}>/ {pad(total)}</span> : null}
      {tag ? (
        <>
          <span aria-hidden className={t.total}>
            —
          </span>
          <span className={t.tag}>{tag}</span>
        </>
      ) : null}
    </p>
  );
}
