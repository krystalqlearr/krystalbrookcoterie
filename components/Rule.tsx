/**
 * Structural rule. `short` is the flare tick that opens a section header — a
 * 2px neon dash (a graphic, so the neon stop is sanctioned; reads on milk, bone
 * and river). `full` is the quiet ink hairline that separates rows in a list —
 * 1px, never thicker (decorative, so ink/15 is exempt from the text floor).
 */
type RuleProps = {
  width?: "full" | "short";
  className?: string;
};

export default function Rule({ width = "full", className = "" }: RuleProps) {
  if (width === "short") {
    return <hr className={`h-[2px] w-11 border-0 bg-neon ${className}`} />;
  }
  return <hr className={`h-px w-full border-0 bg-ink/15 ${className}`} />;
}
