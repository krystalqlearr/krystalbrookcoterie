import type { MetadataRoute } from "next";

const SITE_URL = "https://krystalbrookcoterie.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/styleguide"], // internal system reference — keep out of the index
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
