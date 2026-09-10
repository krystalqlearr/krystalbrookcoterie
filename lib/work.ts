/**
 * Single source of truth for work / case studies.
 *
 * ONE PROJECT (2026-09-09, her call). Maison Dermé and Étoile Atelier were
 * CONCEPTS — invented brands with gradient placeholders and a "Concept" /
 * "In production" label — carried to make the work look fuller. On the one site
 * whose whole pitch is that this studio can be trusted, two invented clients
 * beside one real one is the same failure as the invented testimonial removed
 * in 94ffc5a. Deleted. The counted index suppresses its total while there is a
 * single project (see IndexMeta / WorkShowcase), and restores itself the moment
 * a second real one lands.
 *
 * Consumed by both the `/work` index transition (WorkShowcase) and the
 * `/work/[slug]` case-study routes, so the two can never drift. Presentation fields (span/pt/field) drive the index grid;
 * narrative fields drive both. `caseStudy: true` means a full route page exists.
 */

export type WorkProject = {
  id: string;
  index: string;
  client: string;
  descriptor: string; // framed as the shift created, not the deliverable
  accent: string; // a word within the descriptor, set in italic
  category: string;
  capabilities: string; // what the engagement covered (leads over tech on cards)
  stack: string; // tech — a supporting proof point, shown deeper in the case study
  url: string;
  year: string;
  role: string;
  status?: string;
  caseStudy?: boolean; // has a full /work/[slug] page
  seoDescription?: string;
  // Index-grid presentation
  span: string; // asymmetric grid placement
  pt: string; // collapsed frame aspect, as padding-top %
  // Which edge the frame slides in from on /work — the side of the grid it sits
  // on (left-heavy → "left", right column → "right", centred → rises "up").
  // Art-directed with `span`; change them together.
  enter: "left" | "right" | "up";
  field: string; // token-based gradient classes (fallback when no image)
  image?: string; // real screenshot/asset; overrides the gradient field
  // A looping, muted screen recording of the live site. Takes precedence over
  // `image` in the work frame; `poster` (normally the image) stands in under
  // reduced motion and before the video decodes. Files live in /public/video.
  video?: { mp4: string; webm?: string; poster: string };
  // The site on a phone — silent looping scrolls of the real pages, shown as a
  // row on the case study. mp4 only: H.264 plays everywhere and these encode
  // small enough that a second format would buy nothing.
  phones?: { label: string; mp4: string; poster: string; alt: string }[];
  // A published deliverable from the engagement that a visitor can open — the
  // brand book, a written design system. Shown under Scope: the list CLAIMS the
  // work, this SHOWS it. External by definition, so it opens in a new tab.
  deliverable?: { label: string; href: string; note: string };
  // Narrative
  intro: string;
  body: string[];
  scope: string[];
  results?: { label: string; value: string }[];
  testimonial?: { quote: string; name: string; role: string };
};

export const WORK: WorkProject[] = [
  {
    id: "glowtoure",
    index: "01",
    client: "Glowtoure",
    descriptor: "A luxury service, given the digital experience its pricing demanded.",
    accent: "luxury service",
    category: "Beauty · Self-tan",
    capabilities: "Brand Strategy · Art Direction · Web Design · Development",
    // Verified against the live site 2026-09-07 (its own bundles, not memory):
    // /_next/ assets and next/image, the `lenis` class + two Lenis chunks,
    // Tailwind classes, and four Pangram Pangram faces self-hosted through
    // next/font (PP Frama, PP Frama Text, PP Right Serif, PP Playground) served
    // with a Vercel deployment id. Framer Motion, Sanity and Three.js left no
    // signature — not claimed.
    stack: "Next.js · Tailwind CSS · Lenis · next/image · Pangram Pangram type · Vercel",
    url: "glowtoure.com",
    year: "2025",
    role: "Design & build",
    caseStudy: true,
    seoDescription:
      "How Krystal Brook Coterie designed and hand-built Glowtoure — a custom-coded, editorial digital flagship for a founder-led luxury spray-tan house across the Sacramento region.",
    span: "lg:col-span-7",
    pt: "62.5%",
    enter: "left",
    field: "from-mocha/35 via-mocha/20 to-onyx",
    image: "/images/glowtoure/og-glowtoure.webp",
    // The first 31s of Krystal's 2026-09-06 full-screen recording — the
    // homepage, hero to footer, at its natural scroll pace — side-trimmed to
    // 16:9 (1440×810). No browser chrome; the site's own cursor dot is in shot.
    video: {
      mp4: "/video/glowtoure.mp4",
      webm: "/video/glowtoure.webm",
      poster: "/video/glowtoure-poster.jpg",
    },
    // Recorded 2026-09-09 from the live site at iPhone width, driven at a
    // constant 300 css px a second so all three read at one pace (see
    // scratchpad/gt-record.mjs). The three chosen are the journey — the brand,
    // the offer, the booking; bridal and gallery are captured too and swap in
    // by changing a line here.
    phones: [
      {
        label: "Home",
        mp4: "/video/glowtoure/home.mp4",
        poster: "/video/glowtoure/home-poster.jpg",
        alt: "Glowtoure's home page scrolling on a phone",
      },
      {
        label: "Services",
        mp4: "/video/glowtoure/services.mp4",
        poster: "/video/glowtoure/services-poster.jpg",
        alt: "Glowtoure's services page scrolling on a phone",
      },
      {
        label: "Booking",
        mp4: "/video/glowtoure/book.mp4",
        poster: "/video/glowtoure/book-poster.jpg",
        alt: "Glowtoure's booking page scrolling on a phone",
      },
    ],
    intro:
      "A founder-led tanning house whose service was far more considered than its first website let on. The brief: a digital presence that felt as premium as the ritual — and priced it accordingly.",
    body: [
      "Glowtoure is a private, custom-colour spray-tan studio, mobile and in-studio across the greater Sacramento region. The service is intimate and exacting; the old site read like a booking utility, quietly undercutting the price and the positioning.",
      "We rebuilt the brand from its positioning up — a warm, editorial world where the photography leads and every screen signals authority. Custom colour, private appointments, bridal and event work, prep-to-aftercare: each given the room a luxury service deserves, paced like a magazine rather than a landing page.",
      "The result reads unmistakably high-end on the first scroll, makes the offer feel worth its price, and turns a browse into a booking.",
    ],
    // The brand book, credited on its own last line ("Identity, design system
    // and art direction by Krystal Brook"). It is the visible proof of the first
    // two scope lines: nine locked colours with the 80/15/5 distribution, four
    // Pangram Pangram faces with one job each, one button geometry, five logo
    // variants, voice and standing rules, and the governance that holds it.
    // Nothing here is claimed on the client's behalf — the document says it
    // itself.
    //
    // ON OUR OWN DOMAIN, ALWAYS (2026-09-10, her call, emphatic). It was briefly
    // linked at the artifact host it was authored on; a studio that sells owned
    // over rented cannot hand a prospect a URL on someone else's platform, least
    // of all one that names the tool. The document is a static file under
    // /public/brand with a rewrite giving it this path — see next.config.mjs.
    deliverable: {
      label: "Open the Glowtoure brand system",
      href: "/work/glowtoure/brand-system",
      note: "The system was written down, not just built — nine locked colours, four faces with one job each, and the governance that keeps a tenth colour from quietly appearing eighteen months in.",
    },
    scope: [
      "Art direction",
      "Design system",
      "Custom front-end (Next.js · Tailwind)",
      "Motion & interaction",
      "Booking flow",
      "Performance & SEO",
    ],
    // Measured 2026-08-18, Lighthouse 12.8.2 against the live https://glowtoure.com,
    // MOBILE emulation — the harder of the two runs and the one Google ranks on.
    //
    // Performance is deliberately ABSENT. Desktop scores 98 (LCP 1.1s) but mobile
    // scores 77 (LCP 4.8s), and publishing the desktop figure alone would be a
    // selective truth. Two fixable causes on the Glowtoure side: an apex→www redirect
    // chain costing ~864ms, and a 2,424ms load delay on the hero LCP image (missing
    // priority/fetchpriority). Fix those, re-measure, and add the row back honestly.
    results: [
      { label: "Accessibility", value: "97 / 100" },
      { label: "Best practices · SEO", value: "100 · 100" },
      { label: "Layout shift (CLS)", value: "0.001" },
    ],
    // NO TESTIMONIAL until a real, approved, attributed quote exists.
    //
    // This field previously held an invented quote credited to "Founder, Glowtoure" —
    // a real, named, identifiable client — rendered under a heading reading "Proof".
    // Inventing evidence and attributing it to a real business is not a placeholder;
    // it is a false statement about a third party, on the one site whose entire pitch
    // is that this studio can be trusted. It also exposes Krystal if the client ever
    // sees words they never said.
    //
    // To restore: add { quote, name, role } with words the client actually wrote and
    // approved in writing. The case study renders this block conditionally, so leaving
    // it absent is safe and simply hides the section.
  },
];

export const getProject = (id: string): WorkProject | undefined =>
  WORK.find((p) => p.id === id);

/** Slugs that have a full case-study route (for generateStaticParams). */
export const caseStudySlugs = (): string[] =>
  WORK.filter((p) => p.caseStudy).map((p) => p.id);
