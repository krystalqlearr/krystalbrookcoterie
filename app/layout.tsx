import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";
import SmoothScroll from "@/components/motion/SmoothScroll";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import RouteChrome from "@/components/RouteChrome";

// ONE typeface — PP Neue Montreal carries everything. Display is Regular 400
// (the restraint is the luxury signal); Medium 500 is the wordmark; Semibold 600
// is the meta register. PP Editorial New is RETIRED — no second voice.
const neueMontreal = localFont({
  variable: "--font-sans",
  display: "swap",
  src: [
    { path: "../public/fonts/PPNeueMontreal-Regular.woff2", weight: "400", style: "normal" },
    { path: "../public/fonts/PPNeueMontreal-Italic.woff2", weight: "400", style: "italic" },
    { path: "../public/fonts/PPNeueMontreal-Medium.woff2", weight: "500", style: "normal" },
    { path: "../public/fonts/PPNeueMontreal-Semibold.woff2", weight: "600", style: "normal" },
  ],
});

const SITE_URL = "https://krystalbrookcoterie.com";
const SITE_NAME = "Krystal Brook Coterie";
const SITE_TAGLINE = "Digital identities for luxury brands";
const SITE_DESCRIPTION =
  "Distinctive digital identities for founder-led beauty, wellness, med-spa, and luxury lifestyle brands — strategy-led, custom-designed, and built to lead their category.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — ${SITE_TAGLINE}`,
    template: `%s — ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "luxury web design",
    "brand strategy",
    "beauty brand web design",
    "med-spa web design",
    "editorial web design",
    "founder-led brands",
    "digital identity studio",
  ],
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: `${SITE_NAME} — ${SITE_TAGLINE}`,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — ${SITE_TAGLINE}`,
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

// Structured data — Organization + WebSite. Helps search + AI answer surfaces
// understand who KBC is. Per-case-study CreativeWork JSON-LD lands with Phase 4.
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME,
      legalName: "Lion & Gazelle Holdings LLC",
      url: SITE_URL,
      description: SITE_DESCRIPTION,
      email: "hello@krystalbrookcoterie.com",
      slogan: "Owned, not rented.",
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      description: SITE_DESCRIPTION,
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={neueMontreal.variable}>
      <body className="page-grain">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <SmoothScroll />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[300] focus:rounded-[1px] focus:bg-ink focus:px-4 focus:py-2 focus:font-sans focus:text-meta focus:font-semibold focus:uppercase focus:text-milk"
        >
          Skip to content
        </a>
        <RouteChrome>
          <SiteHeader />
        </RouteChrome>
        <main id="main">{children}</main>
        <RouteChrome>
          <SiteFooter />
          <CustomCursor />
        </RouteChrome>
      </body>
    </html>
  );
}
