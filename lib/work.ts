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
  descriptor: string;
  accent: string; // the one word rendered as Editorial New italic
  category: string;
  stack: string;
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
    descriptor: "A luxury tan, given a luxury home",
    accent: "luxury",
    category: "Beauty · Self-tan",
    stack: "Next.js · Tailwind · Vercel",
    url: "glowtoure.com",
    year: "2025",
    role: "Design & build",
    caseStudy: true,
    seoDescription:
      "How Krystal Brook Coterie designed and hand-built Glowtoure — a custom-coded, editorial digital flagship for a founder-led luxury spray-tan house across the Sacramento region.",
    span: "lg:col-span-7",
    pt: "62.5%",
    field: "from-camel/30 via-mocha/40 to-ink",
    image: "/images/glowtoure/og-glowtoure.webp",
    intro:
      "A founder-led tanning house with a product far more considered than its first website let on. The brief: a digital flagship that felt as premium as the ritual itself.",
    body: [
      "Glowtoure is a private, custom-colour spray-tan studio — mobile and in-studio across the greater Sacramento region, from a Plumas Lake home studio. The service is intimate and exacting: every solution mixed fresh to the client's undertone and desired depth. The old site didn't carry that; it read like a booking utility, not a luxury ritual.",
      "We rebuilt the brand from the canvas up — a warm, editorial system where the photography leads and the interface recedes. Custom colour, private appointments, bridal and event work, prep-to-aftercare guidance: each given room to breathe, paced like a magazine rather than a landing page. Every section is hand-coded — no builder, no template, no compromise on the details that carry a luxury feeling.",
      "The result loads instantly, moves with intention, and reads unmistakably high-end on the first scroll — before a single word is read.",
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
    descriptor: "Clinical precision, softened",
    accent: "softened",
    category: "Med-spa",
    stack: "Next.js · Sanity",
    url: "maisonderme.com",
    year: "2025",
    role: "Design & build",
    status: "In production",
    span: "lg:col-span-4 lg:col-start-9 lg:mt-32",
    pt: "125%",
    field: "from-camel/25 via-ink to-ink",
    intro:
      "A concept for a med-spa that wanted to look like a maison, not a clinic — where credentials and calm live on the same page without one undercutting the other.",
    body: [
      "Cool, quiet, and exact. A restrained teal-and-petrol system with generous space, so the medical rigour reads as confidence rather than sterility.",
      "Bookings, treatments, and practitioner bios flow from a headless CMS, so the studio can move as fast as the brand needs to.",
    ],
    scope: ["Brand-to-web translation", "Design system", "Headless CMS", "Booking flow", "Accessibility"],
  },
  {
    id: "etoile-atelier",
    index: "03",
    client: "Étoile Atelier",
    descriptor: "The founder's vision, framed",
    accent: "framed",
    category: "Luxury lifestyle",
    stack: "Next.js · Tailwind",
    url: "etoileatelier.com",
    year: "2026",
    role: "Design & build",
    status: "Concept",
    span: "lg:col-span-6 lg:col-start-3 lg:mt-10",
    pt: "66%",
    field: "from-mocha/30 via-ink to-ink",
    intro:
      "A lifestyle house where the founder is the brand. The site had to hold a point of view — editorial, owned, and impossible to mistake for a template.",
    body: [
      "A warm-neutral system built around long-form storytelling and full-bleed imagery, paced like a magazine rather than a landing page.",
      "Type does the heavy lifting: large display Neue Montreal against Editorial New italics, set with the air only a hand-built layout affords.",
    ],
    scope: ["Editorial direction", "Design system", "Custom front-end", "Motion & interaction"],
  },
];

export const getProject = (id: string): WorkProject | undefined =>
  WORK.find((p) => p.id === id);

/** Slugs that have a full case-study route (for generateStaticParams). */
export const caseStudySlugs = (): string[] =>
  WORK.filter((p) => p.caseStudy).map((p) => p.id);
