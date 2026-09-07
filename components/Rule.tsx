/**
 * Structural hairline. Two jobs, two tones:
 *  - `flare` (default, `short`) — a 64px flare tick that opens a section header.
 *    This is one of the three places the flare may appear; ration it.
 *  - `hair` — a full-width ink/milk hairline that separates rows in a list.
 *
 * Sits at exactly 1px on every canvas; never thicker.
 */
type Width = "full" | "short";
type Tone = "flare" | "hair" | "hairOnDark";

const toneClass: Record<Tone, string> = {
  flare: "bg-flare",
  hair: "bg-ink/15",
  hairOnDark: "bg-milk/20",
};

type RuleProps = {
  width?: Width;
  tone?: Tone;
  className?: string;
};

export default function Rule({ width = "full", tone = "flare", className = "" }: RuleProps) {
  return (
    <hr
      className={`h-px border-0 ${toneClass[tone]} ${width === "short" ? "w-16" : "w-full"} ${className}`}
    />
  );
}
