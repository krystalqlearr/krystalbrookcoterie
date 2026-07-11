import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

// Display + body/UI — PP Neue Montreal (sans). Note: this family has no 700;
// it goes Semibold 600 → Extrabold 800 → Black 900.
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

// Editorial accent (italic serif) + wordmark — PP Editorial New.
const editorialNew = localFont({
  variable: "--font-editorial",
  display: "swap",
  src: [
    { path: "../public/fonts/PPEditorialNew-Regular.woff2", weight: "400", style: "normal" },
    { path: "../public/fonts/PPEditorialNew-Italic.woff2", weight: "400", style: "italic" },
    { path: "../public/fonts/PPEditorialNew-Bold.woff2", weight: "700", style: "normal" },
    { path: "../public/fonts/PPEditorialNew-BoldItalic.woff2", weight: "700", style: "italic" },
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
    <html lang="en" className={`${neueMontreal.variable} ${editorialNew.variable}`}>
      <body>
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
        <CustomCursor />
      </body>
    </html>
  );
}
