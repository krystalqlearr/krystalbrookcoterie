import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ArrowLink from "@/components/ArrowLink";
import Button from "@/components/Button";
import ClosingCTA from "@/components/ClosingCTA";
import Eyebrow from "@/components/Eyebrow";
import PageHero from "@/components/PageHero";
import Reveal, { RevealItem } from "@/components/motion/Reveal";
import SectionShell, { LINES, ON_LEFT, ON_MIDDLE } from "@/components/SectionShell";
import { POSTS, formatDate, getPost, publishedSlugs } from "@/lib/journal";

/**
 * A Journal piece. One template, driven entirely by `lib/journal.ts`.
 *
 * ONLY A PUBLISHED PIECE HAS A ROUTE. `generateStaticParams` lists the slugs
 * that have a body, and `getPost` refuses the rest — so the four forthcoming
 * titles on the index cannot be reached by guessing a URL, and the index does
 * not link them. The page the visitor is promised and the page that exists are
 * the same page.
 *
 * ON THE THREE LINES: the meta column (date, category, back) sits LEFT and the
 * article runs from the MIDDLE, the same shape every meta-and-content page on
 * the site uses. Prose is plain ink — the page's two flare touches are the
 * hero's accent word and the closing CTA's, which is the whole budget.
 *
 * Next 15: `params` is a PROMISE in a dynamic route, so both the page and
 * `generateMetadata` are async and both await it (CLAUDE.md, Stack).
 */
export function generateStaticParams() {
  return publishedSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Journal" };
  return {
    title: post.title,
    description: post.standfirst,
    alternates: { canonical: `/journal/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.standfirst,
      publishedTime: post.published,
    },
  };
}

export default async function JournalPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const others = POSTS.filter((p) => p.slug !== post.slug && p.body?.length).slice(0, 2);

  return (
    <>
      <PageHero
        marker="Journal"
        eyebrow={post.tag}
        title={post.title}
        accent={post.accent}
        intro={post.standfirst}
        size="lg"
      />

      <SectionShell as="section" className="pt-0">
        <div className={LINES}>
          {/* The meta column, inset past a hairline like every other aside on
              the site. It is the piece's record: when, what, and the way back. */}
          <Reveal variant="fade" className={ON_LEFT}>
            <aside className="lg:border-l lg:border-ink/12 lg:pl-10">
              <Eyebrow as="h2">Published</Eyebrow>
              <p className="mt-3 font-sans text-fluid-base text-ink/70">
                {post.published ? formatDate(post.published) : null}
              </p>
              <p className="type-meta mt-8 text-ink/70">Filed under</p>
              <p className="mt-3 font-sans text-fluid-base text-ink/70">{post.tag}</p>
              <div className="mt-10">
                <ArrowLink href="/journal" direction="right">
                  All pieces
                </ArrowLink>
              </div>
            </aside>
          </Reveal>

          {/* The article itself. The first paragraph takes the drop-cap — the
              documented long-form opening, and the one place the flare is
              carved out as functional rather than decorative. */}
          <Reveal stagger={0.06} className={ON_MIDDLE}>
            {/* SPACING LIVES ON THE WRAPPER, NOT THE TEXT. Every block gets its
                own `RevealItem`, so a `first:` utility on the heading or the
                paragraph matches every single one of them — each is the first
                child of its own element — and the whole article collapsed into
                one unbroken column. The rhythm is set here instead, by position
                in the article: nothing above the opening line, a line's worth of
                air between paragraphs, and a clear beat before a new section. */}
            {post.body!.map((block, i) => {
              const space = i === 0 ? "" : block.kind === "h" ? "mt-16" : "mt-6";
              return block.kind === "h" ? (
                <RevealItem key={i} variant="soft" className={space}>
                  <h2 className="type-display max-w-measure text-fluid-xl text-ink">
                    {block.text}
                  </h2>
                </RevealItem>
              ) : (
                <RevealItem key={i} variant="fade" className={space}>
                  <p
                    className={`max-w-measure font-sans text-fluid-base leading-relaxed text-ink/70 ${
                      i === 0 ? "dropcap" : ""
                    }`}
                  >
                    {block.text}
                  </p>
                </RevealItem>
              );
            })}
          </Reveal>
        </div>
      </SectionShell>

      {others.length ? (
        <SectionShell tone="rule" eyebrow="Also in the Journal" headingSize="md" layout="split">
          <Reveal as="ul" stagger={0.08} className="border-b border-ink/15">
            {others.map((p) => (
              <RevealItem as="li" variant="soft" key={p.slug} className="border-t border-ink/15">
                <a
                  href={`/journal/${p.slug}`}
                  className="group block py-8 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
                >
                  <span className="type-meta text-ink/70">{p.tag}</span>
                  <span className="type-display mt-3 block max-w-[34ch] text-fluid-xl text-ink">
                    {p.title}
                  </span>
                </a>
              </RevealItem>
            ))}
          </Reveal>
        </SectionShell>
      ) : null}

      <ClosingCTA heading="Let’s build something worth owning." accent="worth">
        <Button href="/begin" variant="onDark">
          Commission a project
        </Button>
      </ClosingCTA>
    </>
  );
}
