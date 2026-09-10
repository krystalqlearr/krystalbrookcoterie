import { type ReactNode } from "react";
import SectionShell from "./SectionShell";

/**
 * The closing moment — and the top half of ONE composed dark ending.
 *
 * Before this (audit 2026-09-09, finding 7) every inner page stacked two separate
 * onyx blocks: the closing `SectionShell tone="dark"` (120 top / 56 bottom) and
 * then the footer (80 top). Same colour, no seam, two padding scales — so the page
 * ended in ~900px of undifferentiated black with an unexplained gap in the middle,
 * and the "one or two dark moments per page" rule read as one heavy one.
 *
 * Now the section runs to zero bottom padding and draws a single milk/12 hairline
 * 80px under its content; the footer's own 80px sits below it. The rule is the
 * only join, symmetrically spaced, so the ending reads as one object with two
 * parts — the invitation, then the index — instead of a slab.
 *
 * The home page deliberately closes on milk (its footer is its only dark surface),
 * so it does NOT use this; the hairline belongs to the CTA, not the footer, which
 * is what keeps home clean.
 */
type Props = {
  /** Short declarative sentence, ending in a period. */
  heading: string;
  /** One word inside `heading` lifted into the flare — the page's second and last touch. */
  accent?: string;
  /** The action: one `Button variant="onDark"`, optionally a quiet link beside it. */
  children: ReactNode;
};

export default function ClosingCTA({ heading, accent, children }: Props) {
  return (
    <SectionShell tone="dark" heading={heading} accent={accent} headingSize="xl" className="!pb-0">
      {children}
      <div aria-hidden className="mt-20 border-t border-milk/12" />
    </SectionShell>
  );
}
