import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

// Display — PP Editorial New (standard width, all provided weights + italics).
const editorialNew = localFont({
  variable: "--font-display",
  display: "swap",
  src: [
    { path: "../public/fonts/PPEditorialNew-Thin.woff2", weight: "100", style: "normal" },
    { path: "../public/fonts/PPEditorialNew-ThinItalic.woff2", weight: "100", style: "italic" },
    { path: "../public/fonts/PPEditorialNew-Ultralight.woff2", weight: "200", style: "normal" },
    { path: "../public/fonts/PPEditorialNew-Regular.woff2", weight: "400", style: "normal" },
    { path: "../public/fonts/PPEditorialNew-Italic.woff2", weight: "400", style: "italic" },
    { path: "../public/fonts/PPEditorialNew-Bold.woff2", weight: "700", style: "normal" },
    { path: "../public/fonts/PPEditorialNew-BoldItalic.woff2", weight: "700", style: "italic" },
    { path: "../public/fonts/PPEditorialNew-Heavy.woff2", weight: "900", style: "normal" },
    { path: "../public/fonts/PPEditorialNew-HeavyItalic.woff2", weight: "900", style: "italic" },
  ],
});

// Body / UI — PP Pangram Sans (standard width, all provided weights + italics).
const pangramSans = localFont({
  variable: "--font-sans",
  display: "swap",
  src: [
    { path: "../public/fonts/PPPangramSans-Light.woff2", weight: "300", style: "normal" },
    { path: "../public/fonts/PPPangramSans-Regular.woff2", weight: "400", style: "normal" },
    { path: "../public/fonts/PPPangramSans-RegularItalic.woff2", weight: "400", style: "italic" },
    { path: "../public/fonts/PPPangramSans-Medium.woff2", weight: "500", style: "normal" },
    { path: "../public/fonts/PPPangramSans-Semibold.woff2", weight: "600", style: "normal" },
    { path: "../public/fonts/PPPangramSans-Bold.woff2", weight: "700", style: "normal" },
    { path: "../public/fonts/PPPangramSans-Extrabold.woff2", weight: "800", style: "normal" },
    { path: "../public/fonts/PPPangramSans-ExtraboldItalic.woff2", weight: "800", style: "italic" },
  ],
});

export const metadata: Metadata = {
  title: "Krystal Brook Coterie",
  description:
    "Editorial luxury web design for founder-led beauty, med-spa, wellness, bridal, and luxury lifestyle brands.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${editorialNew.variable} ${pangramSans.variable}`}>
      <body>
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
        <CustomCursor />
      </body>
    </html>
  );
}
