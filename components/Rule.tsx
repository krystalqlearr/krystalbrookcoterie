/**
 * Structural divider in camel — the single warm accent, used as the section marker
 * tick. `short` = 64px marker; `full` spans the container. Reads on both bone and
 * charcoal sections.
 */
type RuleProps = {
  width?: "full" | "short";
  className?: string;
};

export default function Rule({ width = "full", className = "" }: RuleProps) {
  return (
    <hr className={`h-px border-0 bg-camel ${width === "short" ? "w-16" : "w-full"} ${className}`} />
  );
}
