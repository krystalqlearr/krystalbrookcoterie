/**
 * Outreach prospects — one entry per personalized `/for/[slug]` page. This is
 * the whole authoring cost the mechanic asks for: a slug, the business name,
 * and (optionally) a first name for the closing line. Everything else —
 * layout, motion, copy structure — is the same Dispersion engine the
 * homepage uses (components/motion/Dispersion.tsx), just pinned to one name
 * instead of dispersed across three verticals.
 *
 * These pages are intentionally not linked from the site and are excluded
 * from the sitemap/robots (see app/robots.ts) — they exist for a cold send,
 * not for browsing.
 */

export type Prospect = {
  slug: string;
  businessName: string;
  contactFirstName?: string;
};

export const PROSPECTS: Prospect[] = [
  {
    slug: "example",
    businessName: "Example Med Spa",
  },
];

export function getProspect(slug: string): Prospect | undefined {
  return PROSPECTS.find((p) => p.slug === slug);
}

export function prospectSlugs(): string[] {
  return PROSPECTS.map((p) => p.slug);
}
