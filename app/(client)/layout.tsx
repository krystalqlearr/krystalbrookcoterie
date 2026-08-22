import Link from "next/link";
import Logo from "@/components/Logo";

/**
 * Distraction-free chrome for token-based client pages (/discovery, /proposal).
 * Logo top-left, generous space, a single meta footer line — no nav, no marketing
 * header/footer, no custom cursor (hidden globally via RouteChrome). SmoothScroll
 * stays; it lives in the root layout.
 */
export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-milk">
      <header className="container flex items-center pt-10 md:pt-14">
        <Link
          href="/"
          aria-label="Krystal Brook Coterie — home"
          className="focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
        >
          <Logo variant="horizontal" color="ink" size="1rem" />
        </Link>
      </header>
      <div className="flex-1">{children}</div>
      <footer className="container py-10">
        <p className="font-sans text-xs font-semibold uppercase tracking-[0.13em] text-ink/70">
          Krystal Brook Coterie · Web Design Studio
        </p>
      </footer>
    </div>
  );
}
