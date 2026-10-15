import type { Metadata } from "next";
import Image from "next/image";
import Button from "@/components/Button";
import ArrowLink from "@/components/ArrowLink";
import Eyebrow from "@/components/Eyebrow";
import EditorialHeading from "@/components/EditorialHeading";
import IndexMeta from "@/components/IndexMeta";
import Rule from "@/components/Rule";
import Reveal, { RevealItem } from "@/components/motion/Reveal";
import { FILES, SLIDES, VIDEO } from "./content";
import { HearThis, Walkthrough } from "./Walkthrough";

/**
 * /for/kellie — the Yuba Elite Volleyball Club proposal, delivered as a page
 * on the studio's own site instead of an attachment. A static segment, so it
 * wins over /for/[slug] (the cold-outreach template) without touching it.
 *
 * Not linked from the site, not in the sitemap, noindex'd here and
 * disallowed under /for in app/robots.ts. Private by obscurity — that is the
 * right level for a proposal: nothing to log in to, forwards fine.
 *
 * Flare budget on this page: the hero accent word and the closing CTA. The
 * per-slide ▷ glyph and index numbers are functional, per the system rule.
 */
export const metadata: Metadata = {
  title: "For Kellie — Yuba Elite, the new site page by page",
  description:
    "A walkthrough of a new Yuba Elite Volleyball Club website, narrated by Krystal, with the scope of work.",
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
};

export default function KelliePage() {
  return (
    <>
      {/* — Hero — */}
      <section className="relative overflow-hidden pb-14 pt-32 md:pb-20 md:pt-40">
        <div className="container relative z-10">
          <Reveal stagger={0.1}>
            <RevealItem variant="soft">
              <Eyebrow>Made for Kellie Tongson · Yuba Elite Volleyball Club</Eyebrow>
            </RevealItem>
            <RevealItem variant="soft">
              <EditorialHeading as="h1" size="xl" accent="grown into" className="mt-6 max-w-[16ch]">
                The site Yuba Elite has grown into.
              </EditorialHeading>
            </RevealItem>
            <RevealItem variant="fade">
              <div className="mt-8 max-w-measure font-sans text-fluid-lg text-ink/70">
                <p>
                  A new website for the club, shown page by page, with me talking you through
                  it. Watch it, read it, or skip to the parts you care about. The scope of work
                  is at the bottom.
                </p>
              </div>
            </RevealItem>
          </Reveal>
        </div>
      </section>

      {/* — The letter — */}
      <section className="border-t border-ink/12 py-section">
        <div className="container grid gap-10 lg:grid-cols-12">
          <Reveal variant="soft" className="lg:col-span-4">
            <Rule width="short" tone="hair" className="mb-6" />
            <Eyebrow>Before you start</Eyebrow>
            <EditorialHeading as="h2" size="md" className="mt-5 max-w-[14ch]">
              About those forms
            </EditorialHeading>
          </Reveal>
          <Reveal variant="fade" className="lg:col-span-7 lg:col-start-6">
            <div className="max-w-measure space-y-5 font-sans text-fluid-base leading-relaxed text-ink/70">
              <p>
                Kellie, at commitment night you mentioned the forms: you can see them on your
                end, but couldn&rsquo;t figure out why they won&rsquo;t show up for parents.
                That&rsquo;s something I can fix. I design and build websites through my studio,
                Krystal Brook Coterie, and every site I build is fully custom, so there&rsquo;s
                more control and more freedom than a template allows.
              </p>
              <p>
                I&rsquo;d been wanting to pitch this to you regardless. Looking at the site the
                way a new parent would, I thought Yuba Elite had outgrown it, and hearing about
                the forms tells me that first assessment was right on point. So instead of just
                bringing it up, I did the work first: an audit of the current site, a working
                preview of the homepage and tryouts page, and designs for everything else
                you&rsquo;re about to see.
              </p>
              <p className="text-ink">&mdash; Krystal</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* — The video — */}
      <section className="bg-onyx py-section text-milk">
        <div className="container">
          <Reveal stagger={0.1} className="flex flex-col gap-6">
            <RevealItem variant="soft">
              <Eyebrow tone="onDark">Watch it · {VIDEO.minutes}</Eyebrow>
            </RevealItem>
            <RevealItem variant="soft">
              <EditorialHeading as="h2" size="lg" canvas="dark" className="max-w-[18ch]">
                Every page, in my words
              </EditorialHeading>
            </RevealItem>
            <RevealItem variant="fade">
              <p className="max-w-measure font-sans text-fluid-lg text-milk/70">
                Short on time? Pages 2 and 17 are the two-minute version. Everything in
                between is the page-by-page detail, and each page below has a link straight
                to its part of the recording.
              </p>
            </RevealItem>
          </Reveal>
          <Reveal from="up" className="mt-12 border border-milk/15">
            <Walkthrough src={VIDEO.src} poster={VIDEO.poster} />
          </Reveal>
        </div>
      </section>

      {/* — Page by page — */}
      <section className="py-section">
        <div className="container">
          <Reveal stagger={0.1} className="flex flex-col gap-6">
            <RevealItem variant="soft">
              <Eyebrow>Read it · 18 pages</Eyebrow>
            </RevealItem>
            <RevealItem variant="soft">
              <EditorialHeading as="h2" size="lg" className="max-w-[18ch]">
                The same walkthrough, to read at your own pace
              </EditorialHeading>
            </RevealItem>
          </Reveal>

          <ol className="mt-16 divide-y divide-ink/12 border-t border-ink/12">
            {SLIDES.map((s) => (
              <li key={s.id} id={s.id} className="grid gap-8 py-14 lg:grid-cols-12 lg:gap-12">
                <Reveal from="up" className="lg:col-span-7">
                  <div className="border border-ink/15 bg-onyx">
                    <Image
                      src={`/for/kellie/slide-${String(s.n).padStart(2, "0")}.webp`}
                      alt={`Page ${s.n}: ${s.title}`}
                      width={1600}
                      height={900}
                      sizes="(min-width: 1024px) 58vw, 100vw"
                      className="block h-auto w-full"
                    />
                  </div>
                </Reveal>
                <Reveal variant="fade" className="flex flex-col gap-5 lg:col-span-5">
                  <IndexMeta index={s.n} total={SLIDES.length} tag={s.eyebrow || undefined} />
                  <h3 className="font-sans text-fluid-xl text-ink">{s.title}</h3>
                  <p className="font-sans text-fluid-base leading-relaxed text-ink/70">{s.note}</p>
                  <div className="mt-2">
                    <HearThis start={s.start} />
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* — The arrangement — */}
      <section className="border-t border-ink/12 py-section">
        <div className="container grid gap-12 lg:grid-cols-12">
          <Reveal variant="soft" className="lg:col-span-4">
            <Rule width="short" tone="hair" className="mb-6" />
            <Eyebrow>The proposal</Eyebrow>
            <EditorialHeading as="h2" size="md" className="mt-5 max-w-[14ch]">
              My standard rate, and a trade
            </EditorialHeading>
          </Reveal>
          <div className="lg:col-span-7 lg:col-start-6">
            <Reveal stagger={0.08} as="ul" className="divide-y divide-ink/12 border-y border-ink/12">
              {[
                ["Custom build", "$4,500", "Everything in the scope of work, section 03"],
                ["Care plan", "$350 per month", "Performance and security updates, seasonal changes, a monthly check of every form and link"],
                ["First year at standard rates", "$8,700", "Build plus twelve months of care"],
              ].map(([k, v, d]) => (
                <RevealItem key={k} variant="fade">
                  <div className="grid gap-2 py-5 sm:grid-cols-[1fr_auto] sm:items-baseline sm:gap-8">
                    <div>
                      <p className="font-sans text-fluid-base text-ink">{k}</p>
                      <p className="mt-1 font-sans text-fluid-sm text-ink/70">{d}</p>
                    </div>
                    <p className="font-sans text-fluid-xl tabular-nums text-ink">{v}</p>
                  </div>
                </RevealItem>
              ))}
            </Reveal>
            <Reveal variant="fade" className="mt-10 max-w-measure space-y-5 font-sans text-fluid-base leading-relaxed text-ink/70">
              <p className="text-ink">The trade</p>
              <p>
                I pay Baylee&rsquo;s $1,000 commitment deposit like every club family. In place of
                the remaining $2,500 of her 2026&ndash;27 fees, Krystal Brook Coterie delivers the
                full build and the care plan through the end of the season. No other money
                changes hands between us for this work.
              </p>
              <p>
                After the season, if you&rsquo;d like me to keep maintaining and updating the site,
                we&rsquo;ll work out terms that fit the club then. No obligation either way.
              </p>
            </Reveal>
            <Reveal stagger={0.08} as="ul" className="mt-12 divide-y divide-ink/12 border-y border-ink/12">
              {FILES.map((f) => (
                <RevealItem key={f.href} variant="fade">
                  <div className="flex flex-col gap-2 py-5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8">
                    <ArrowLink href={f.href} target="_blank" rel="noopener" direction="upRight">
                      {f.label}
                    </ArrowLink>
                    <p className="font-sans text-fluid-sm text-ink/70">{f.meta}</p>
                  </div>
                </RevealItem>
              ))}
            </Reveal>
          </div>
        </div>
      </section>

      {/* — Next step — */}
      <section className="bg-onyx py-section text-milk">
        <div className="container grid gap-12 lg:grid-cols-12">
          <Reveal stagger={0.1} className="flex flex-col gap-6 lg:col-span-6">
            <RevealItem variant="soft">
              <Eyebrow tone="onDark">Next step</Eyebrow>
            </RevealItem>
            <RevealItem variant="soft">
              <EditorialHeading as="h2" size="lg" canvas="dark" accent="yes" className="max-w-[16ch]">
                If you&rsquo;re in, say yes and send the fee sheet.
              </EditorialHeading>
            </RevealItem>
            <RevealItem variant="fade">
              <p className="max-w-measure font-sans text-fluid-lg text-milk/70">
                I&rsquo;ll start the full build and share every page on a preview link before
                anything goes live. Nothing on the current site changes until you approve it.
              </p>
            </RevealItem>
            <RevealItem variant="fade">
              <div className="mt-4 flex flex-wrap gap-4">
                <Button href="mailto:hello@krystalbrookcoterie.com?subject=Yuba%20Elite%20site" variant="onDark">
                  Email me
                </Button>
              </div>
              <p className="mt-5 font-sans text-fluid-sm text-milk/60">
                Or just text me. Whatever&rsquo;s easiest.
              </p>
            </RevealItem>
          </Reveal>
          <Reveal variant="fade" className="lg:col-span-5 lg:col-start-8">
            <p className="type-meta text-milk/60">What I&rsquo;d need from you</p>
            <ul className="mt-5 divide-y divide-milk/15 border-y border-milk/15 font-sans text-fluid-base text-milk/70">
              {[
                "The fee sheet: tryout fee, season dues by program, what they include",
                "Coach names, bios and photos",
                "20–30 action photos from games or practice",
                "Which registration system stays: PlayMetrics or Upperhand",
                "Club store: what you want to sell",
                "Domain, PlayMetrics and Google Business Profile access at launch",
              ].map((item) => (
                <li key={item} className="py-4">
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>
    </>
  );
}
