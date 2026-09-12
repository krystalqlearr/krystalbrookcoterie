import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Button from "@/components/Button";
import Dispersion from "@/components/motion/Dispersion";
import Reveal from "@/components/motion/Reveal";
import { getProspect, prospectSlugs } from "@/lib/prospects";

/**
 * The outreach template — one file, and the only per-prospect authoring cost
 * is an entry in lib/prospects.ts (a slug and a business name). Everything
 * else is the same Dispersion engine the homepage runs, just pinned to one
 * name instead of dispersed across three verticals.
 *
 * Not linked from the site, not in the sitemap, and noindex'd below — this
 * exists for a cold send, not for browsing. See app/robots.ts.
 */

export function generateStaticParams() {
  return prospectSlugs().map((slug) => ({ slug }));
}

// Next 15: `params` is a Promise, so both entry points await it.
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = getProspect(slug);
  if (!p) return {};
  return {
    title: `Made for ${p.businessName}`,
    description: `A working page, built specifically for ${p.businessName} — move your cursor across it.`,
    robots: { index: false, follow: false },
  };
}

export default async function ProspectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const prospect = getProspect(slug);
  if (!prospect) notFound();

  return (
    <>
      <section className="bg-milk pb-4 pt-32">
        <Reveal variant="fade" className="container">
          <p className="type-meta text-ink/50">
            Made for <span className="text-flare-deep">{prospect.businessName}</span>
          </p>
          <p className="mt-5 max-w-[46ch] font-sans text-fluid-base text-ink/70">
            Nobody sent you a deck. This is a live, working page — move your cursor
            across the sentence below, or just wait a moment and it moves on its own.
          </p>
        </Reveal>
      </section>

      <Dispersion businessName={prospect.businessName} eyebrow="One page, three readings" />

      <section className="bg-milk pb-section pt-4">
        <Reveal variant="fade" className="container">
          <div className="max-w-measure space-y-5 font-sans text-fluid-base leading-relaxed text-ink/70">
            <p>
              This page took about twenty minutes to make for {prospect.businessName}{" "}
              specifically. A full site is the same craft, aimed at the thing that
              actually needs to move: the moment someone lands on your homepage and
              decides, before reading a word, whether you&rsquo;re the real thing.
            </p>
          </div>
          <div className="mt-12">
            <Button href="/begin" variant="primary">
              Tell me about your project
            </Button>
          </div>
        </Reveal>
      </section>
    </>
  );
}
