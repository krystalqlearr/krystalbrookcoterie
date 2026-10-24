import type { Metadata } from "next";
import Image from "next/image";
import Button from "@/components/Button";
import ArrowLink from "@/components/ArrowLink";
import Eyebrow from "@/components/Eyebrow";
import EditorialHeading from "@/components/EditorialHeading";
import IndexMeta from "@/components/IndexMeta";
import Rule from "@/components/Rule";
import Reveal, { RevealItem } from "@/components/motion/Reveal";
import { EXCHANGE, FILES, NEEDS, PACKAGES, SITE_URL, SLIDES, STANDARD, SUBSCRIPTIONS, VIDEO } from "./content";
import { HearThis, Walkthrough } from "./Walkthrough";

/**
 * /for/lisa — the Badabling Artistry proposal, delivered as a page on the
 * studio's own site, in the same shape as /for/kellie. A static segment, so it
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
  title: "For Lisa — Badabling Artistry, the site page by page",
  description:
    "A walkthrough of a new Badabling Artistry website, built around Lisa's new photo, with the founding-client offer.",
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
};

const hasVideo = VIDEO.src.length > 0;

export default function LisaPage() {
  return (
    <>
      {/* — Hero — */}
      <section className="relative overflow-hidden pb-14 pt-32 md:pb-20 md:pt-40">
        <div className="container relative z-10">
          <Reveal stagger={0.1}>
            <RevealItem variant="soft">
              <Eyebrow>Made for Lisa · Badabling Artistry</Eyebrow>
            </RevealItem>
            <RevealItem variant="soft">
              <EditorialHeading as="h1" size="xl" accent="deserves" className="mt-6 max-w-[16ch]">
                The site your new photo deserves.
              </EditorialHeading>
            </RevealItem>
            <RevealItem variant="fade">
              <div className="mt-8 max-w-measure font-sans text-fluid-lg text-ink/70">
                <p>
                  A Badabling website you can open and scroll like it&rsquo;s live, on your phone
                  or your laptop. Below it, the same site page by page with me explaining each
                  one, a printed menu and a business card off the same photo, and the offer.
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
      <section className="border-t border-ink/12 py-section">
        <div className="container grid gap-10 lg:grid-cols-12">
          <Reveal variant="soft" className="lg:col-span-4">
            <Rule width="short" tone="hair" className="mb-6" />
            <Eyebrow>Before you start</Eyebrow>
            <EditorialHeading as="h2" size="md" className="mt-5 max-w-[14ch]">
              About that photo
            </EditorialHeading>
          </Reveal>
          <Reveal variant="fade" className="lg:col-span-7 lg:col-start-6">
            <div className="max-w-measure space-y-5 font-sans text-fluid-base leading-relaxed text-ink/70">
              <p>
                Lisa, I saw your new photo and couldn&rsquo;t leave it alone. It was too good to
                sit on Instagram, so I built the first screen of a website around it. Then I kept
                going: your menu with your real prices, a few of your lip results for the work
                section, a printed menu, and a business card, all out of the same system.
              </p>
              <p>
                Everything here is a draft from your page. The prices are your regular rates,
                the captions are my guesses, and the words in your voice are placeholders. What
                I wanted you to see is the direction, and how good you already look in it. If
                it&rsquo;s a yes, the real build starts with your corrections.
              </p>
              <p className="text-ink">&mdash; Krystal</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* — The video (once it exists) — */}
      {hasVideo && (
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
      <section className="py-section">
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
                Each page, with what I&rsquo;d say about it. Or skip the reading and{" "}
                <ArrowLink href={SITE_URL} target="_blank" rel="noopener" direction="upRight">
                  open the site
                </ArrowLink>{" "}
                and scroll it yourself.
              </p>
            </RevealItem>
          </Reveal>

          <ol className="mt-16 divide-y divide-ink/12 border-t border-ink/12">
            {SLIDES.map((s) => (
              <li key={s.id} id={s.id} className="grid gap-8 py-14 lg:grid-cols-12 lg:gap-12">
                <Reveal from="up" className="lg:col-span-7">
                  <div className="border border-ink/15 bg-onyx">
                    <Image
                      src={`/for/lisa/slide-${String(s.n).padStart(2, "0")}.webp`}
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
      <section className="border-t border-ink/12 py-section">
        <div className="container grid gap-10 lg:grid-cols-12">
          <Reveal variant="soft" className="lg:col-span-4">
            <Rule width="short" tone="hair" className="mb-6" />
            <Eyebrow>Why custom code</Eyebrow>
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
                This site has no plugin layer. It&rsquo;s custom code, served from Vercel, with
                no admin login to guess and nothing third-party to go stale. The design can&rsquo;t
                rot; the only thing that needs upkeep is the framework underneath, and that&rsquo;s
                what a care plan covers. It&rsquo;s also why the pages load the way they do: there
                is nothing on them that isn&rsquo;t yours.
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
      <section className="border-t border-ink/12 py-section">
        <div className="container grid gap-12 lg:grid-cols-12">
          <Reveal variant="soft" className="lg:col-span-4">
            <Rule width="short" tone="hair" className="mb-6" />
            <Eyebrow>The offer</Eyebrow>
            <EditorialHeading as="h2" size="md" className="mt-5 max-w-[14ch]">
              My standard rate, and a founding-client rate
            </EditorialHeading>
          </Reveal>
          <div className="lg:col-span-7 lg:col-start-6">
            <p className="type-meta text-ink/70">What this costs a business client</p>
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

            <p className="type-meta mt-14 text-ink/70">What I&rsquo;m offering you</p>
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
              <p className="text-ink">Why it&rsquo;s a founding-client rate</p>
              <p>
                This isn&rsquo;t a discount for the asking. You&rsquo;re one of the first three
                businesses I&rsquo;m building for under my studio, and a finished Badabling site is
                the proof that lets me charge full rate from the next client on. So the price is
                an exchange:
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
              <p className="text-ink">What you&rsquo;d pay the providers directly</p>
              <p>
                These are the accounts the site runs on. They&rsquo;re opened in your name, billed
                to you at the provider&rsquo;s published price, and I don&rsquo;t mark them up.
                You own everything from day one.
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
              <p className="text-ink">The care plan, and going without one</p>
              <p>
                A care plan is optional and month to month. Essential keeps the site fast, secure
                and online: the framework updated and redeployed every month, the forms and
                booking tested, and half an hour of content changes. Growth and Partner add
                hours, reporting and strategy on top.
              </p>
              <p>
                Without one, the site is still yours and still works. But security updates become
                your job: the framework publishes patches, and someone comfortable with code needs
                to update and redeploy at least quarterly. Skipped for a year or two, that turns
                into a paid project. I&rsquo;d rather you know that now than find out later.
              </p>
              <p className="text-ink">Terms</p>
              <p>
                Half to book your slot and start date, half at launch approval before anything goes
                live. Two rounds of revisions are included, one at design and one at build; more are
                billed by the hour. The timeline is set at kickoff once the photos and corrections are
                in; late content pauses the clock, it doesn&rsquo;t compress the quality.
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
                If you&rsquo;re in, say yes and pick A or B.
              </EditorialHeading>
            </RevealItem>
            <RevealItem variant="fade">
              <p className="max-w-measure font-sans text-fluid-lg text-milk/70">
                I&rsquo;ll send the agreement, and the build starts the day the deposit and your
                corrections land. Every page goes on a preview link before anything is public.
              </p>
            </RevealItem>
            <RevealItem variant="fade">
              <div className="mt-4 flex flex-wrap gap-4">
                <Button href="mailto:hello@krystalbrookcoterie.com?subject=Badabling%20site" variant="onDark">
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
