import Rule from "./Rule";

/**
 * The proof band — a short row of facts on the onyx dark, sitting directly under the
 * hero. It's the first dark inversion of the page and it does one job: convert
 * the headline's claim into something checkable before the visitor has scrolled.
 *
 * The figure is set in the DISPLAY register (regular weight, tight tracking) and
 * the label in META beneath a hairline, so the row reads as a data plate rather
 * than as marketing. Keep it to three or four items — five starts to look like a
 * dashboard, and every figure must be one you can defend.
 */
type Stat = {
  /** The figure itself — keep it short: "12", "3 wks", "100%". */
  figure: string;
  label: string;
  /** Optional qualifier, e.g. "average, Signature tier". */
  note?: string;
};

type Props = {
  stats: Stat[];
  className?: string;
};

export default function StatStrip({ stats, className = "" }: Props) {
  return (
    <section className={`bg-onyx py-18 text-milk ${className}`}>
      <div className="container">
        <dl className="grid grid-cols-1 gap-x-gutter gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col gap-4">
              <dd className="type-display text-fluid-2xl text-milk">{stat.figure}</dd>
              <Rule tone="hairOnDark" />
              <dt className="type-meta text-milk/60">{stat.label}</dt>
              {stat.note ? (
                <p className="max-w-[24ch] font-sans text-fluid-sm text-milk/60">{stat.note}</p>
              ) : null}
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
