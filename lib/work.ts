/**
 * Single source of truth for work / case studies. Consumed by both the `/work`
 * index transition (WorkShowcase) and the `/work/[slug]` case-study routes, so the
 * two can never drift. Presentation fields (span/pt/field) drive the index grid;
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
    intro:
      "A founder-led tanning house whose service was far more considered than its first website let on. The brief: a digital presence that felt as premium as the ritual — and priced it accordingly.",
    body: [
      "Glowtoure is a private, custom-colour spray-tan studio, mobile and in-studio across the greater Sacramento region. The service is intimate and exacting; the old site read like a booking utility, quietly undercutting the price and the positioning.",
      "We rebuilt the brand from its positioning up — a warm, editorial world where the photography leads and every screen signals authority. Custom colour, private appointments, bridal and event work, prep-to-aftercare: each given the room a luxury service deserves, paced like a magazine rather than a landing page.",
      "The result reads unmistakably high-end on the first scroll, makes the offer feel worth its price, and turns a browse into a booking.",
    ],
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
      { label: "Stack", value: "Next.js · Tailwind CSS · Lenis · Pangram Pangram type · Vercel" },
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
  {
    id: "maison-derme",
    index: "02",
    client: "Maison Dermé",
    descriptor: "A clinical brand, repositioned as a modern authority.",
    accent: "modern authority",
    category: "Med-spa",
    capabilities: "Brand Strategy · Web Design · Development · Copy Direction",
    stack: "Next.js · Sanity",
    url: "maisonderme.com",
    year: "2025",
    role: "Design & build",
    status: "In production",
    span: "lg:col-span-4 lg:col-start-9 lg:mt-32",
    pt: "125%",
    enter: "right",
    field: "from-mocha/25 via-onyx to-onyx",
    intro:
      "A concept for a med-spa that wanted to read like a maison, not a clinic — where credentials and calm hold the same page, and the brand feels like the authority in its market.",
    body: [
      "Cool, quiet, and exact. A restrained warm-neutral system with generous space, so the medical rigour reads as confidence rather than sterility — and the pricing feels earned.",
      "Treatments, practitioner bios, and bookings flow from a CMS the team can run themselves, so the brand can move as fast as the business does.",
    ],
    scope: ["Brand-to-web translation", "Design system", "Headless CMS", "Booking flow", "Accessibility"],
  },
  {
    id: "etoile-atelier",
    index: "03",
    client: "Étoile Atelier",
    descriptor: "A founder-led business, transformed into a category-ready brand.",
    accent: "category-ready brand",
    category: "Luxury lifestyle",
    capabilities: "Brand Strategy · Art Direction · Web Design · Development",
    stack: "Next.js · Tailwind",
    url: "etoileatelier.com",
    year: "2026",
    role: "Design & build",
    status: "Concept",
    span: "lg:col-span-6 lg:col-start-3 lg:mt-10",
    pt: "66%",
    enter: "up",
    field: "from-mocha/30 via-onyx to-onyx",
    intro:
      "A lifestyle house where the founder is the brand — and the site had to make it legible to a market that had never heard the name, and impossible to mistake for anyone else.",
    body: [
      "A warm-neutral world built around long-form storytelling and full-bleed imagery, paced like a magazine — positioning the brand a tier above the category it entered.",
      "Type does the heavy lifting: monumental display against a serif italic voice, set with the air that signals a business worth taking seriously.",
    ],
    scope: ["Editorial direction", "Design system", "Custom front-end", "Motion & interaction"],
  },
];

export const getProject = (id: string): WorkProject | undefined =>
  WORK.find((p) => p.id === id);

/** Slugs that have a full case-study route (for generateStaticParams). */
export const caseStudySlugs = (): string[] =>
  WORK.filter((p) => p.caseStudy).map((p) => p.id);
