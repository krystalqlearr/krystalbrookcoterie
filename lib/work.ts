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
  field: string; // token-based gradient classes (fallback when no image)
  image?: string; // real screenshot/asset; overrides the gradient field
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
    stack: "Next.js · Tailwind · Vercel",
    url: "glowtoure.com",
    year: "2025",
    role: "Design & build",
    caseStudy: true,
    seoDescription:
      "How Krystal Brook Coterie designed and hand-built Glowtoure — a custom-coded, editorial digital flagship for a founder-led luxury spray-tan house across the Sacramento region.",
    span: "lg:col-span-7",
    pt: "62.5%",
    field: "from-cherry/30 via-mocha/40 to-charcoal",
    image: "/images/glowtoure/og-glowtoure.webp",
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
    results: [
      { label: "Lighthouse performance", value: "To publish" },
      { label: "Core Web Vitals", value: "To publish" },
      { label: "Stack", value: "Next.js · Tailwind · Vercel" },
      { label: "Engagement", value: "Fully custom-coded" },
    ],
    // Placeholder until a real client quote is gathered — kept consistent with the
    // homepage proof section; swap for an attributed testimonial when available.
    testimonial: {
      quote: "She built us something that finally feels as considered as the work we do.",
      name: "Founder",
      role: "Glowtoure",
    },
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
    field: "from-maroon/35 via-charcoal to-charcoal",
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
    field: "from-mocha/30 via-charcoal to-charcoal",
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
