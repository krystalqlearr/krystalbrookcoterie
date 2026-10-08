/**
 * Single source of truth for the Journal (2026-10-08). Drives the index, the
 * post pages and the sitemap, so the three can never disagree about what has
 * actually been published.
 *
 * FORTHCOMING ENTRIES ARE REAL ENTRIES, NOT PLACEHOLDERS. The index has listed
 * five titles since it shipped and said, in its own heading, that they were
 * forthcoming — which was honest, and stayed honest only as long as nothing
 * pretended otherwise. A post becomes published by gaining `body`; until then
 * it has a title and a tag, it renders as a plain line with no link, and there
 * is no route behind it to 404 into. The heading counts both states from this
 * array rather than hardcoding a number, so publishing the second piece cannot
 * leave the page claiming the wrong thing.
 *
 * The body is authored here as structured blocks rather than as a string of
 * markdown: the site has no markdown renderer, every block maps to a documented
 * component or class, and a heading inside an article has to take the display
 * register at the right size like any other heading. Prose stays plain ink —
 * the flare budget for the page is spent on the hero's accent word and the
 * closing CTA's, which is already two (CLAUDE.md, Color).
 */

export type Block =
  | { kind: "p"; text: string }
  /** A section heading inside the article. Sentence case, ends in a period. */
  | { kind: "h"; text: string };

export type Post = {
  slug: string;
  title: string;
  /** The one-word-ish category shown in the index meta line. */
  tag: string;
  /** Shown under the title and used as the meta description. Keep under 155. */
  standfirst: string;
  /** ISO date. Absent until the piece is published. */
  published?: string;
  /** One word inside the title, lifted into the flare on the post's own page. */
  accent?: string;
  /** Present only on a published piece. Its absence is what "forthcoming" means. */
  body?: Block[];
};

export const POSTS: Post[] = [
  {
    slug: "why-your-luxury-website-still-feels-inexpensive",
    title: "Why your luxury website still feels inexpensive",
    tag: "Perception",
    accent: "inexpensive",
    standfirst:
      "Good photography, a restrained palette, an expensive logo — and it still reads as a business that is hoping rather than one that is certain. That is a craft problem, and craft is specific.",
    published: "2026-10-08",
    body: [
      {
        kind: "p",
        text: "You have good photography. The palette is restrained. The logo was expensive. And the site still reads like a business that is hoping, rather than one that is certain.",
      },
      {
        kind: "p",
        text: "This is rarely a taste problem. The people it happens to have excellent taste — that is usually why they noticed something was wrong. It is a craft problem, and craft is specific. Here is what is actually producing the feeling.",
      },
      { kind: "h", text: "Everything moves too fast." },
      {
        kind: "p",
        text: "Expensive things are heavy. A gallery door, a car door, a thick paper stock turning — the weight is the signal, and weight takes time. Most websites animate at 150 to 200 milliseconds, because that is what the default is, and defaults are tuned for software.",
      },
      {
        kind: "p",
        text: "A brand is not software. When a link underlines itself in a tenth of a second, it snaps, and a snap reads as plastic. Slow the same movement down to four tenths and give it an ease that decelerates at the end, and the identical effect reads as considered. Nothing was added. The clock changed.",
      },
      {
        kind: "p",
        text: "The test is simple: if you notice the animation, it is wrong. You should only notice that the page feels calm.",
      },
      { kind: "h", text: "The accent colour shows up in every section." },
      {
        kind: "p",
        text: "A signature colour used once is a decision. Used in every section, it is a habit — and the eye can tell the difference, even when the viewer cannot explain it.",
      },
      {
        kind: "p",
        text: "Count the accent on your own site. If it appears in the hero, the headings, the icons, the buttons, the dividers and the footer, it is no longer doing any work. The most confident thing a brand can do with its best colour is spend it twice a page and leave everything else in plain ink.",
      },
      { kind: "h", text: "The typography is announcing instead of speaking." },
      {
        kind: "p",
        text: "Bold display type is the instinct when a brand wants to be taken seriously. It almost always achieves the opposite, because volume is what you use when you are not sure you will be heard.",
      },
      {
        kind: "p",
        text: "The houses that never have to raise their voices set their largest type light and tight — a thin weight, letters pulled close, lines stacked nearly on top of one another. It reads as enormous and quiet at the same time. That combination is very hard to fake and very easy to recognise, which is exactly why it works.",
      },
      { kind: "h", text: "The layout starts in a different place on every screen." },
      {
        kind: "p",
        text: "Scroll your site slowly and watch only the left edge of the text. If the paragraphs begin at five or six different distances from the edge of the screen, every one of those was a reasonable decision made on its own — and collectively they read as clutter.",
      },
      {
        kind: "p",
        text: "Editorial design solves this with a grid that is not negotiable. Text begins in one of a few fixed positions, on every page, forever. The restriction is what produces the calm. A page where everything lines up does not look designed; it looks inevitable.",
      },
      { kind: "h", text: "It is selling by explaining." },
      {
        kind: "p",
        text: "Badges. “Why choose us.” A list of adjectives. A wall of trust signals arranged like a defence.",
      },
      {
        kind: "p",
        text: "Explaining is what you do when the work is not visible. If the site itself is the proof — if it loads instantly, moves beautifully, and holds together at every size — the visitor has already drawn the conclusion by the time they read a single sentence. The writing’s job is then much easier: say what you do, once, and stop.",
      },
      { kind: "h", text: "What this actually costs you." },
      {
        kind: "p",
        text: "None of these are aesthetic complaints. A brand that looks like it charges less than it does gets negotiated with. It attracts the client who wants a discount instead of the one who wants the work, and it loses the second kind silently — they never enquire, so you never learn you lost them.",
      },
      {
        kind: "p",
        text: "The fix is not more. In every case above the fix is less, held to a stricter standard: fewer colours used more rarely, one typeface used more confidently, fewer starting positions, slower movement, less explanation.",
      },
      {
        kind: "p",
        text: "A website should not have to argue that the business is worth the price. It should make the question feel slightly impolite.",
      },
    ],
  },
  {
    slug: "looking-polished-versus-looking-established",
    title: "The difference between looking polished and looking established",
    tag: "Positioning",
    standfirst: "Polish is achievable in a weekend. Authority is structural.",
  },
  {
    slug: "a-stronger-point-of-view",
    title: "Your brand doesn’t need more content. It needs a stronger point of view.",
    tag: "Strategy",
    standfirst: "Volume is the cheapest thing a brand can produce, and the least convincing.",
  },
  {
    slug: "what-med-spas-get-wrong-about-premium-positioning",
    title: "What med-spas get wrong about premium positioning",
    tag: "Med-spa",
    standfirst: "Clinical credibility and desirability are not opposites, and the best in the category prove it.",
  },
  {
    slug: "why-better-design-supports-higher-pricing",
    title: "Why better design can support higher pricing",
    tag: "Commerce",
    standfirst: "Price is read before it is justified.",
  },
];

/** Published pieces only — the ones with a body, newest first. */
export const publishedPosts = (): Post[] =>
  POSTS.filter((p) => p.body?.length).sort((a, b) =>
    (b.published ?? "").localeCompare(a.published ?? ""),
  );

export const publishedSlugs = (): string[] => publishedPosts().map((p) => p.slug);

/** A post is only routable once it has a body; forthcoming titles must 404. */
export const getPost = (slug: string): Post | undefined =>
  POSTS.find((p) => p.slug === slug && p.body?.length);

/** "8 October 2026" — long form, matching the editorial register. */
export const formatDate = (iso: string): string =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
