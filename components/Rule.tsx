/**
 * Teal structural divider. `short` = 64px section marker; `full` spans the container.
 * Teal is structural only — this is its canonical use.
 */
type RuleProps = {
  width?: "full" | "short";
  className?: string;
};

export default function Rule({ width = "full", className = "" }: RuleProps) {
  return (
    <hr className={`h-px border-0 bg-teal ${width === "short" ? "w-16" : "w-full"} ${className}`} />
  );
}
