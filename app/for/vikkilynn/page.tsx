import type { Metadata } from "next";
import Image from "next/image";
import Button from "@/components/Button";
import ArrowLink from "@/components/ArrowLink";
import Eyebrow from "@/components/Eyebrow";
import EditorialHeading from "@/components/EditorialHeading";
import IndexMeta from "@/components/IndexMeta";
import Rule from "@/components/Rule";
import Reveal, { RevealItem } from "@/components/motion/Reveal";
import { CARE, EXCHANGE, FILES, NEEDS, PACKAGES, SITE_URL, SLIDES, STANDARD, SUBSCRIPTIONS, VIDEO } from "./content";
import { HearThis, Walkthrough } from "./Walkthrough";

/**
 * /for/vikkilynn — the Love Vee Beauty proposal, delivered as a page on the
 * studio's own site, in the same shape as /for/lisa and /for/kellie. A static segment, so it
 * wins over /for/[slug] (the cold-outreach template) without touching it.
 *
 * Not linked from the site, not in the sitemap, noindex'd here and disallowed
 * under /for in app/robots.ts. Private by obscurity: nothing to log in to,
 * forwards fine, which is the right level for a proposal to a friend.
 *
 * The video section renders only once VIDEO.src is set (see content.ts).
 *
 * Flare budget on this page: the hero accent word and the closing CTA. The
 * per-slide ▷ glyph, index numbers and the option flags are functional.
 */
export const metadata: Metadata = {
  title: "For Vikki — Love Vee Beauty, the site page by page",
  description:
    "A walkthrough of a new Love Vee Beauty website and brand, with the founding-client offer.",
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
};

const hasVideo = VIDEO.src.length > 0;

export default function VikkilynnPage() {
  return (
    <>
      {/* — Hero — */}
      <section className="relative overflow-hidden pb-14 pt-28 md:pb-20 md:pt-40">
        <div className="container relative z-10">
          <Reveal stagger={0.1}>
            <RevealItem variant="soft">
              <Eyebrow>For Vikki, from Krystal<span className="hidden sm:inline"> · Love Vee Beauty</span></Eyebrow>
            </RevealItem>
            <RevealItem variant="soft">
              <EditorialHeading as="h1" size="xl" accent="website" className="mt-6 max-w-[16ch]">
                Vikki, this is you with a website.
              </EditorialHeading>
            </RevealItem>
            <RevealItem variant="fade">
              <div className="mt-8 max-w-measure font-sans text-fluid-lg text-ink/70">
                <p>
                  I built the first version of a Love Vee Beauty website. Open it and scroll it
                  like it&rsquo;s real, on your phone or your laptop. Everything under it is me
                  walking you through it page by page, the brand it comes with, and what it would
                  actually cost to make it real.
                </p>
              </div>
            </RevealItem>
            <RevealItem variant="fade">
              <div className="mt-8 flex flex-wrap items-center gap-5">
                <Button href={SITE_URL} target="_blank" rel="noopener">
                  Open the site
                </Button>
                <p className="font-sans text-fluid-sm text-ink/70">Opens in a new tab. Try it on your phone too.</p>
              </div>
            </RevealItem>
          </Reveal>
        </div>
      </section>

      {/* — The letter — */}
      <section className="border-t border-ink/12 py-16 md:py-section">
        <div className="container grid gap-10 lg:grid-cols-12">
          <Reveal variant="soft" className="lg:col-span-4">
            <Rule width="short" tone="hair" className="mb-6" />
            <Eyebrow>Before you start</Eyebrow>
            <EditorialHeading as="h2" size="md" className="mt-5 max-w-[14ch]">
              Why I built this without asking
            </EditorialHeading>
          </Reveal>
          <Reveal variant="fade" className="lg:col-span-7 lg:col-start-6">
            <div className="max-w-measure space-y-5 font-sans text-fluid-base leading-relaxed text-ink/70">
              <p>
                You built a seven-year business with no website at all, on DMs and word of mouth,
                and your first-year clients are still on your books. That is rarer than you think.
                It also means every person who searches for lashes in Orangevale and doesn&rsquo;t
                already know you can&rsquo;t find you. So instead of talking about it again, I
                built the first page, so you could see it.
              </p>
              <p>
                None of this is final. The services and times are my best guesses, the photos are
                labelled slots until we shoot the real ones, and the words are written the way you
                talk, minus the babes, so correct anything you&rsquo;d never say. The pink is the
                pink you asked for. The name is all three words, everywhere. If you love it, we fix
                the details together and build the real thing.
              </p>
              <p className="text-ink">&mdash; Krystal</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* — The video (once it exists) — */}
      {hasVideo && (
        <section className="bg-onyx py-16 md:py-section text-milk">
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
                  Each page below has a link straight to its part of the recording.
                </p>
              </RevealItem>
            </Reveal>
            <Reveal from="up" className="mt-12 border border-milk/15">
              <Walkthrough src={VIDEO.src} poster={VIDEO.poster} />
            </Reveal>
          </div>
        </section>
      )}

      {/* — Page by page — */}
      <section className="py-16 md:py-section">
        <div className="container">
          <Reveal stagger={0.1} className="flex flex-col gap-6">
            <RevealItem variant="soft">
              <Eyebrow>Read it · {SLIDES.length} pages</Eyebrow>
            </RevealItem>
            <RevealItem variant="soft">
              <EditorialHeading as="h2" size="lg" className="max-w-[18ch]">
                The site, page by page
              </EditorialHeading>
            </RevealItem>
            <RevealItem variant="fade">
              <p className="max-w-measure font-sans text-fluid-lg text-ink/70">
                Each page, the way I&rsquo;d explain it if you were sitting next to me. Or skip
                all that,{" "}
                <ArrowLink href={SITE_URL} target="_blank" rel="noopener" direction="upRight">
                  open the site
                </ArrowLink>{" "}
                and scroll it yourself.
              </p>
            </RevealItem>
          </Reveal>

          <ol className="mt-10 md:mt-16 divide-y divide-ink/12 border-t border-ink/12">
            {SLIDES.map((s) => (
              <li key={s.id} id={s.id} className="grid gap-6 py-10 md:gap-8 md:py-14 lg:grid-cols-12 lg:gap-12">
                <Reveal from="up" className="lg:col-span-7">
                  <div className="border border-ink/15 bg-onyx">
                    <Image
                      src={`/for/vikkilynn/slide-${String(s.n).padStart(2, "0")}.webp`}
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
                  {hasVideo && (
                    <div className="mt-2">
                      <HearThis start={s.start} />
                    </div>
                  )}
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* — Why it's built this way — */}
      <section className="border-t border-ink/12 py-16 md:py-section">
        <div className="container grid gap-10 lg:grid-cols-12">
          <Reveal variant="soft" className="lg:col-span-4">
            <Rule width="short" tone="hair" className="mb-6" />
            <Eyebrow>Why I build it this way</Eyebrow>
            <EditorialHeading as="h2" size="md" className="mt-5 max-w-[14ch]">
              No plugins to break into
            </EditorialHeading>
          </Reveal>
          <Reveal variant="fade" className="lg:col-span-7 lg:col-start-6">
            <div className="max-w-measure space-y-5 font-sans text-fluid-base leading-relaxed text-ink/70">
              <p>
                Most small-business sites run on WordPress: about 40% of every website on the
                internet, and nearly 60% of sites built on a content system. WordPress gets its
                features from third-party plugins, and that plugin layer is where the risk lives.
                In 2025, security firm Patchstack counted 11,334 new vulnerabilities in the
                WordPress ecosystem, up 42% on the year. 91% of them were in plugins, and
                46% had no fix available on the day they were disclosed.
              </p>
              <p>
                Yours won&rsquo;t have any of that. It&rsquo;s custom code, hosted on Vercel, with
                no admin login for someone to guess and no plugins to go stale. The design
                can&rsquo;t rot. The only thing that ever needs upkeep is the framework
                underneath, which is what the care plan is for. It&rsquo;s also why it loads so
                fast: there&rsquo;s nothing on your pages that isn&rsquo;t yours.
              </p>
            </div>
            <ul className="mt-8 divide-y divide-ink/12 border-y border-ink/12">
              {[
                ["WordPress usage, October 2026", "https://w3techs.com/technologies/details/cm-wordpress", "W3Techs"],
                ["State of WordPress Security in 2026", "https://patchstack.com/whitepaper/state-of-wordpress-security-in-2026/", "Patchstack"],
              ].map(([label, href, who]) => (
                <li key={href} className="flex flex-col gap-2 py-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8">
                  <ArrowLink href={href} target="_blank" rel="noopener" direction="upRight">
                    {label}
                  </ArrowLink>
                  <p className="font-sans text-fluid-sm text-ink/70">{who}</p>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* — The offer — */}
      <section className="border-t border-ink/12 py-16 md:py-section">
        <div className="container grid gap-12 lg:grid-cols-12">
          <Reveal variant="soft" className="lg:col-span-4">
            <Rule width="short" tone="hair" className="mb-6" />
            <Eyebrow>The offer</Eyebrow>
            <EditorialHeading as="h2" size="md" className="mt-5 max-w-[14ch]">
              What it costs, and what I&rsquo;m offering you
            </EditorialHeading>
          </Reveal>
          <div className="lg:col-span-7 lg:col-start-6">
            <p className="type-meta text-ink/70">What a business client pays me</p>
            <Reveal stagger={0.08} as="ul" className="mt-5 divide-y divide-ink/12 border-y border-ink/12">
              {STANDARD.map(([k, v, d]) => (
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

            <p className="type-meta mt-14 text-ink/70">What I&rsquo;m offering you, because it&rsquo;s you</p>
            <div className="mt-5 grid gap-6 md:grid-cols-2">
              {PACKAGES.map((p) => (
                <Reveal key={p.id} variant="fade" className="flex flex-col border border-ink/15 bg-white p-7">
                  <p className="type-meta text-flare-deep">{p.flag}</p>
                  <h3 className="mt-3 font-sans text-fluid-xl text-ink">{p.title}</h3>
                  <p className="mt-2 font-sans text-fluid-2xl tabular-nums text-ink">{p.price}</p>
                  <ul className="mt-6 divide-y divide-ink/12 border-t border-ink/12 font-sans text-fluid-sm leading-relaxed text-ink/70">
                    {p.items.map((item) => (
                      <li key={item} className="py-3">
                        {item}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              ))}
            </div>

            <Reveal variant="fade" className="mt-12 max-w-measure space-y-5 font-sans text-fluid-base leading-relaxed text-ink/70">
              <p className="text-ink">Why the number is what it is</p>
              <p>
                Here&rsquo;s the honest math. A site like this one, with the brand system, the
                shop, memberships and booking all working together, is a site I&rsquo;d quote at
                around $5,000 to build and $250 a month to maintain and refresh each season. For
                comparison, I offered Lisa her site, without an online shop, for $3,500.
              </p>
              <p>
                You&rsquo;re getting it for less than either, because it&rsquo;s you. You&rsquo;re
                my best friend, you&rsquo;ve built something real with no help from a website, and
                you deserve one that matches the work. Same scope, same process, same care as a
                full-rate client, nothing held back.
              </p>
              <p>
                It still works best as a trade, so here&rsquo;s what I&rsquo;d ask for in return.
                The first one matters most:
              </p>
            </Reveal>
            <Reveal stagger={0.06} as="ul" className="mt-5 divide-y divide-ink/12 border-y border-ink/12 font-sans text-fluid-base text-ink/70">
              {EXCHANGE.map((item) => (
                <RevealItem key={item} variant="fade">
                  <li className="py-4">{item}</li>
                </RevealItem>
              ))}
            </Reveal>

            <Reveal variant="fade" className="mt-12 max-w-measure space-y-5 font-sans text-fluid-base leading-relaxed text-ink/70">
              <p className="text-ink">What it costs to run, so there are no surprises</p>
              <p>
                Some of this costs money to keep running, and I&rsquo;d rather tell you now. Every
                site needs a domain and hosting. On Option B, Stripe takes its standard fee on each
                card payment, and your booking platform, Vagaro or whichever you choose, has its own
                monthly plan. These accounts are in your name, billed to you at whatever the
                provider charges, and I don&rsquo;t add anything on top.
              </p>
              <p>
                The care plan below is the other half: it keeps the site maintained, and it means
                you&rsquo;d always have me for changes, updates and seasonal promos, and to keep
                building your online presence with you.
              </p>
            </Reveal>
            <Reveal stagger={0.08} as="ul" className="mt-5 divide-y divide-ink/12 border-y border-ink/12">
              {SUBSCRIPTIONS.map(([k, v, d]) => (
                <RevealItem key={k} variant="fade">
                  <div className="grid gap-2 py-5 sm:grid-cols-[1fr_auto] sm:items-baseline sm:gap-8">
                    <div>
                      <p className="font-sans text-fluid-base text-ink">{k}</p>
                      <p className="mt-1 font-sans text-fluid-sm text-ink/70">{d}</p>
                    </div>
                    <p className="font-sans text-fluid-base tabular-nums text-ink">{v}</p>
                  </div>
                </RevealItem>
              ))}
            </Reveal>

            <Reveal variant="fade" className="mt-12 max-w-measure space-y-5 font-sans text-fluid-base leading-relaxed text-ink/70">
              <p className="text-ink">
                Your care plan: {CARE.price}, instead of {CARE.standard}
              </p>
              <p>
                Optional and month to month. Because it&rsquo;s you, it covers more than the
                standard plan does:
              </p>
              <ul className="divide-y divide-ink/12 border-y border-ink/12">
                {CARE.items.map((item) => (
                  <li key={item} className="py-3">
                    {item}
                  </li>
                ))}
              </ul>
              <p className="text-ink">Going without one</p>
              <p>
                If you skip it, the site is still yours and it still works. But the security
                updates become your problem: the framework publishes patches, and someone who&rsquo;s
                comfortable with code needs to update and redeploy it at least every few months.
                Let it sit for a year or two and it turns into a paid project. I&rsquo;d rather tell
                you that now than have you find out later.
              </p>
              <p className="text-ink">The terms, so there are no surprises</p>
              <p>
                50% up front to book your slot, and 50% before launch, before anything goes live.
                Launch is four to six weeks out, with one shoot day in between: a small photoshoot
                of the studio, you, a few of your clients and your lash line. Two rounds of
                revisions are included, one at design and one at build; after that it&rsquo;s by
                the hour. If content or photos run late, the date moves rather than the quality.
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
      <section className="bg-onyx py-16 md:py-section text-milk">
        <div className="container grid gap-12 lg:grid-cols-12">
          <Reveal stagger={0.1} className="flex flex-col gap-6 lg:col-span-6">
            <RevealItem variant="soft">
              <Eyebrow tone="onDark">Next step</Eyebrow>
            </RevealItem>
            <RevealItem variant="soft">
              <EditorialHeading as="h2" size="lg" canvas="dark" accent="yes" className="max-w-[16ch]">
                If you&rsquo;re in, just tell me yes, and A or B.
              </EditorialHeading>
            </RevealItem>
            <RevealItem variant="fade">
              <p className="max-w-measure font-sans text-fluid-lg text-milk/70">
                I&rsquo;ll send over the agreement, and we start the day the deposit and your
                corrections land. You&rsquo;ll see every page on a preview link before anything
                goes public, so nothing goes live without you.
              </p>
            </RevealItem>
            <RevealItem variant="fade">
              <div className="mt-4 flex flex-wrap gap-4">
                <Button href="mailto:hello@krystalbrookcoterie.com?subject=Love%20Vee%20Beauty%20site" variant="onDark">
                  Email me
                </Button>
              </div>
              <p className="mt-5 font-sans text-fluid-sm text-milk/60">
                Or just text me. You know where I am.
              </p>
            </RevealItem>
          </Reveal>
          <Reveal variant="fade" className="lg:col-span-5 lg:col-start-8">
            <p className="type-meta text-milk/60">What I&rsquo;d need from you</p>
            <ul className="mt-5 divide-y divide-milk/15 border-y border-milk/15 font-sans text-fluid-base text-milk/70">
              {NEEDS.map((item) => (
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
