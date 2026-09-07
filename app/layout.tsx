import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";
import SmoothScroll from "@/components/motion/SmoothScroll";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

// The site's ONE typeface — PP Neue Montreal. It carries all three jobs:
//   DISPLAY  400  sentence-case headlines, enormous, −0.045→−0.06em
//   META     600  13px uppercase at +0.13em — eyebrows, tags, indices, CTAs
//   BODY     400  copy, with 500 for the wordmark
// Note: this family has no 700; it goes Semibold 600 → Extrabold 800 → Black 900,
// which is why META sits at 600. The 800/900 cuts are kept loaded but unused —
// nothing in the system may set them.
const neueMontreal = localFont({
  variable: "--font-sans",
  display: "swap",
  src: [
    { path: "../public/fonts/PPNeueMontreal-Hairline.woff2", weight: "100", style: "normal" },
    { path: "../public/fonts/PPNeueMontreal-Light.woff2", weight: "300", style: "normal" },
    { path: "../public/fonts/PPNeueMontreal-Regular.woff2", weight: "400", style: "normal" },
    { path: "../public/fonts/PPNeueMontreal-Italic.woff2", weight: "400", style: "italic" },
    { path: "../public/fonts/PPNeueMontreal-Medium.woff2", weight: "500", style: "normal" },
    { path: "../public/fonts/PPNeueMontreal-Semibold.woff2", weight: "600", style: "normal" },
    { path: "../public/fonts/PPNeueMontreal-Extrabold.woff2", weight: "800", style: "normal" },
    { path: "../public/fonts/PPNeueMontreal-Black.woff2", weight: "900", style: "normal" },
  ],
});

// PP Editorial New is RETIRED (2026-08). The serif-italic supporting voice and the
// serif accent word are gone: the system is one grotesk set two ways. The .woff2
// files remain in /public/fonts, so restoring it is a localFont block plus a
// `editorial` entry in tailwind's fontFamily — but nothing currently references
// it, and preloading ~150KB of unused webfont on every route is not free.

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
          className="type-meta sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[300] focus:rounded-[1px] focus:bg-ink focus:px-5 focus:py-3 focus:text-milk"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
        <CustomCursor />
      </body>
    </html>
  );
}
