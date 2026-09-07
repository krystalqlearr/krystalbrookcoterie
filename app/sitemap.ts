import type { MetadataRoute } from "next";
import { serviceSlugs } from "@/lib/services";
import { caseStudySlugs } from "@/lib/work";

const SITE_URL = "https://krystalbrookcoterie.com";

// Public routes, ranked by priority. Case-study routes are appended from lib/work
// so the sitemap stays in sync as new case studies ship.
export default function sitemap(): MetadataRoute.Sitemap {
  const routes: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
    { path: "/", priority: 1, changeFrequency: "monthly" },
    { path: "/work", priority: 0.9, changeFrequency: "monthly" },
    ...caseStudySlugs().map((slug) => ({
      path: `/work/${slug}`,
      priority: 0.8,
      changeFrequency: "yearly" as const,
    })),
    { path: "/services", priority: 0.9, changeFrequency: "monthly" },
    ...serviceSlugs().map((slug) => ({
      path: `/services/${slug}`,
      priority: 0.8,
      changeFrequency: "monthly" as const,
    })),
    { path: "/process", priority: 0.7, changeFrequency: "yearly" },
    { path: "/about", priority: 0.7, changeFrequency: "yearly" },
    { path: "/begin", priority: 0.8, changeFrequency: "yearly" },
    { path: "/journal", priority: 0.5, changeFrequency: "weekly" },
    { path: "/privacy", priority: 0.2, changeFrequency: "yearly" },
    { path: "/terms", priority: 0.2, changeFrequency: "yearly" },
  ];

  return routes.map((r) => ({
    url: `${SITE_URL}${r.path}`,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
