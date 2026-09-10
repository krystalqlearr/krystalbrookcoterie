/**
 * Single source of truth for the studio's services (2026-09-07). Drives the
 * `/services` hub, the seven `/services/[slug]` pages, the Menu panel's services
 * column, the home "Ways in" rows and the sitemap — so none of them can drift.
 *
 * The shape follows what the studios Krystal admires actually do (Bionic Egg,
 * Clay, Studio Krista — checked 2026-09-07): services sold BY DISCIPLINE, on
 * their own pages, with NO price list on the site — the proposal carries the
 * price and the enquiry is the filter. Exactly one figure is public: `FLOOR`.
 * The four tier names survive as engagement SIZES ("commissioned as"), not as a
 * menu. Names are one word in the site's fewest-words register; the full name
 * is the eyebrow (and the metadata title, so search still sees "SEO" and
 * "Website redesign").
 *
 * Every line of copy here is a WORKING DEFAULT until Krystal's copy review —
 * see docs/kbc-copy.md, "Services".
 */

export type Service = {
  slug: string;
  /** One word — the name everywhere on the site. */
  name: string;
  /** The full name — eyebrow on the page, title in metadata. */
  eyebrow: string;
  /** The hero line (h1). Short, declarative, ends in a period. */
  line: string;
  /** One-word accent inside `line` (a substring), or none. */
  accent?: string;
  /** What it covers — a hairline list. */
  covers: string[];
  /** Optional add-ons, listed under the covers. */
  addOns?: string[];
  /** Who it's for — one paragraph. */
  forWhom: string;
  /** Which engagement sizes carry it. */
  commissionedAs: string[];
  /** What it is built with — the studio's own stack, named where it belongs. A
   *  proof point, not a headline (docs/kbc-voice.md), so it sits in the meta
   *  column of the page beside "Commissioned as", never in the hero. */
  builtWith?: string[];
  /** Two or three questions, answered plainly. */
  questions: { question: string; answer: string }[];
  /** Related service slugs, in order. */
  related: string[];
  /** A project id from lib/work.ts to frame on the page. */
  work?: string;
  /**
   * A project id whose published `deliverable` this page should open.
   *
   * A screenshot of a website is the wrong proof for a discipline whose output
   * ISN'T a website — Identity ships a system, so the proof is the system. This
   * puts it on the page where the buying intent actually is, instead of three
   * clicks deep in a case study. Renders nothing if the project has no
   * deliverable, so it can never point at a page that doesn't exist.
   */
  deliverable?: string;
};

/** The one public figure. Everything else is priced in the proposal. */
export const FLOOR = "$4,500";
export const FLOOR_LINE = `Engagements begin at ${FLOOR}.`;

/** Engagement sizes — names and timelines only. No prices on the site. */
export const TIERS = [
  {
    name: "The Edit",
    duration: "2–3 weeks",
    description:
      "A focused digital debut for brands ready to stop looking new. Strategic direction, custom design, and a polished presence built to establish credibility from the first click.",
  },
  {
    name: "Signature",
    duration: "6–8 weeks",
    flag: "Most commissioned",
    description:
      "The complete brand website. Strategy, creative direction, custom design, and a CMS your team can run — a digital identity that feels unmistakably yours and guides visitors toward action.",
  },
  {
    name: "Atelier",
    duration: "8–12 weeks",
    description:
      "For brands whose website must do more than look beautiful. Immersive art direction, advanced interactions, custom journeys, and an experience designed for authority and scale.",
  },
  {
    name: "Private Commission",
    duration: "Scoped to the work",
    description:
      "No standard scope. No predetermined ceiling. A fully commissioned digital experience shaped around the complexity, ambition, and operating model of the brand.",
  },
] as const;

export const SERVICES: Service[] = [
  {
    slug: "identity",
    name: "Identity",
    eyebrow: "Brand & identity",
    line: "Everything a brand needs to be recognised.",
    accent: "recognised",
    covers: [
      "Name",
      "Logo and mark",
      "Market positioning",
      "Colour palette",
      "Typography",
      "Visual voice",
      "Brand guidelines",
    ],
    forWhom:
      "Founders launching, renaming, or outgrowing a brand that was made in a hurry. The position is set first; the mark follows from it, so the identity holds up long after the launch.",
    commissionedAs: ["The Edit", "Signature", "Atelier"],
    builtWith: ["Pangram Pangram type"],
    questions: [
      {
        question: "Do I need a full identity before a website?",
        answer:
          "Not always. A website can be built on a strong existing identity. When the identity is the weak point, it comes first — a site can only be as clear as the brand beneath it.",
      },
      {
        question: "What do I receive?",
        answer:
          "The mark in every format, the palette and type system, and a guideline that lets anyone apply them without you in the room.",
      },
    ],
    related: ["collateral", "websites"],
    // The page that sells identity work had no proof on it at all — it asked a
    // prospect to take the studio's word for it while a complete, real brand
    // system sat three clicks away in a case study. Glowtoure's book IS an
    // identity deliverable, so it belongs here more than anywhere.
    deliverable: "glowtoure",
  },
  {
    slug: "collateral",
    name: "Collateral",
    eyebrow: "Digital & print collateral",
    line: "Launch-ready, in every format the brand will meet.",
    accent: "Launch-ready",
    covers: [
      "Packaging",
      "Presentations and decks",
      "Stationery",
      "Signage",
      "Sales materials",
      "Brand-ready assets — social, email, templates",
    ],
    forWhom:
      "Brands with an identity that now has to work in the world — on a box, a wall, a deck, a feed. Files arrive print-ready, set to the printer's specification. The printing itself isn't mine, but I'll point you to the right press.",
    commissionedAs: ["The Edit", "Signature"],
    questions: [
      {
        question: "Do you print?",
        answer:
          "No. You receive print-ready files, set up to the printer's specification, and a recommendation of who should print them.",
      },
      {
        question: "Can collateral be commissioned on its own?",
        answer:
          "Yes, on an existing identity. If the identity needs work first, that's where we start.",
      },
    ],
    related: ["identity", "websites"],
  },
  {
    slug: "websites",
    name: "Websites",
    eyebrow: "Custom website design",
    line: "An original website, designed and built to the brand.",
    accent: "original",
    covers: [
      "Strategy and structure",
      "Original design — nothing underneath it",
      "Front end and back end",
      "Responsive on every screen",
      "Motion and interaction",
      "Performance, accessibility and the search foundation",
      "Launch",
    ],
    addOns: [
      "Booking flow",
      "E-commerce",
      "Content management",
      "Integrations",
      "Copy direction",
      "Photography direction",
    ],
    forWhom:
      "Founder-led brands whose website has to carry the full weight of the business — the first impression, the proof, and the next step. Built around the brand and its goals, and owned outright at the end.",
    commissionedAs: ["Signature", "Atelier", "Private Commission"],
    builtWith: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Lenis", "next/image", "Pangram Pangram type, self-hosted", "Three.js — where a project earns it", "Vercel"],
    questions: [
      {
        question: "What makes it custom?",
        answer:
          "There is no theme underneath. The structure, the design system and the code are made for this brand — which is why it can look like nothing else, and why you own all of it.",
      },
      {
        question: "How long does it take?",
        answer:
          "Six to eight weeks for a Signature site; eight to twelve for Atelier. Timelines hold from the day content and assets are in hand.",
      },
    ],
    related: ["development", "redesign", "search"],
    work: "glowtoure",
  },
  {
    slug: "redesign",
    name: "Redesign",
    eyebrow: "Website redesign",
    line: "For brands that have outgrown their website.",
    accent: "outgrown",
    covers: [
      "An audit of what the current site does, and doesn't",
      "Repositioning where the brand has moved on",
      "Original design on the new position",
      "Rebuild — or migration, where the platform still serves",
      "Redirects, search equity and analytics carried across",
      "Launch without downtime",
    ],
    forWhom:
      "The business has changed and the site hasn't. A redesign is not a refresh of the old one — it starts from where the brand is now and keeps only what still earns its place.",
    commissionedAs: ["Signature", "Atelier"],
    builtWith: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Pangram Pangram type, self-hosted", "Vercel"],
    questions: [
      {
        question: "Redesign, or start again?",
        answer:
          "If the positioning has moved, start again — a new coat on an old structure shows. If the brand is right and the site is merely dated, a redesign on the existing content is faster, and honest.",
      },
    ],
    related: ["websites", "development", "search"],
  },
  {
    slug: "development",
    name: "Development",
    eyebrow: "Website development",
    line: "Built to be run by the people who own it.",
    accent: "own",
    covers: [
      "Content management",
      "E-commerce",
      "Booking and integrations",
      "Testing across devices and browsers",
      "Analytics",
      "Deployment and execution",
    ],
    forWhom:
      "Brands with a design in hand — mine or another studio's — that needs building properly, and brands whose site needs to do more than it does.",
    commissionedAs: ["Signature", "Atelier", "Private Commission"],
    builtWith: ["Next.js", "TypeScript", "Sanity", "Vercel"],
    questions: [
      {
        question: "Can you build a design that isn't yours?",
        answer: "Yes, when it's good. I'll say so if it isn't.",
      },
      {
        question: "What do I own?",
        answer: "Everything — the code, the system, the deployment. Host it anywhere; extend it forever.",
      },
    ],
    related: ["websites", "search"],
  },
  {
    slug: "search",
    name: "Search",
    eyebrow: "SEO",
    line: "Visible to the people who are looking.",
    accent: "Visible",
    covers: [
      "Strategy for the brand, the market and the location",
      "Site structure and internal linking",
      "On-page foundation",
      "Analytics and reporting",
      "Ongoing visibility, tied to business goals",
    ],
    forWhom:
      "Brands that want to be found for what they actually do, where they do it — not ranked for everything, chosen for the right thing.",
    commissionedAs: ["The Edit", "Signature", "a Care Plan"],
    builtWith: ["Next.js", "next/image", "Vercel"],
    questions: [
      {
        question: "Is search included in a website?",
        answer:
          "The foundation is — structure, speed, markup. Strategy and ongoing visibility are commissioned as Search, on their own or within a Care Plan.",
      },
    ],
    related: ["websites", "development"],
  },
  {
    slug: "squarespace",
    name: "Squarespace",
    eyebrow: "Squarespace websites",
    line: "When the business doesn't need custom code yet, it still deserves a designer.",
    accent: "designer",
    covers: [
      "Strategy and structure",
      "Original design, built on the platform",
      "Typography, palette and imagery set to the brand",
      "Pages your team can edit",
      "Search foundation",
      "Launch",
    ],
    forWhom:
      "Brands that want a custom look and real creative thinking without complexity the business doesn't need yet. Intentional, not templated — and a step, not a ceiling: when the brand outgrows it, the design comes with you.",
    commissionedAs: ["The Edit", "Signature"],
    builtWith: ["Squarespace"],
    questions: [
      {
        question: "Isn't Squarespace a template?",
        answer:
          "It's a platform. What you see is designed for the brand — the layout, the type, the pace of the page. The difference from custom code is what the site can do, not how it looks.",
      },
      {
        question: "When would you steer me to custom?",
        answer:
          "When the site needs to do something the platform can't — bespoke booking, motion, integrations, scale. Then it's a Websites commission, and the design carries across.",
      },
    ],
    related: ["identity", "websites"],
  },
];

export const getService = (slug: string): Service | undefined =>
  SERVICES.find((s) => s.slug === slug);

export const serviceSlugs = (): string[] => SERVICES.map((s) => s.slug);
