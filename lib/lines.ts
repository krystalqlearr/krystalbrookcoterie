/**
 * Split a headline into its display lines.
 *
 * Lives in `lib/` and NOT in the LineReveal client component on purpose: this is
 * called from `EditorialHeading`, which is a SERVER component. Next only exposes
 * component exports across the "use client" boundary, so a plain function imported
 * from a client module resolves to undefined at server render — it typechecks
 * cleanly and then throws `splitLines is not a function` on every route.
 *
 * A line is a SENTENCE. The display register already guarantees headlines are
 * written as short declarative sentences ending in a period, stacked two or three
 * deep, so the split is deterministic and needs no layout measurement — no flash,
 * no shift on the LCP element. A sentence that wraps simply travels as one block.
 */
export function splitLines(text: string): string[] {
  const parts = text.match(/[^.!?]+[.!?]*\s*/g);
  if (!parts) return [text];
  const out = parts.map((p) => p.trim()).filter(Boolean);
  return out.length ? out : [text];
}
