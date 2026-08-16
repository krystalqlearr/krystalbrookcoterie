"use client";

import { usePathname } from "next/navigation";
import { type ReactNode } from "react";

/**
 * Gates the global marketing chrome. Token-based client pages (/discovery,
 * /proposal, /project) get a distraction-free layout, so SiteHeader / SiteFooter /
 * CustomCursor are hidden on those routes. (App Router nested layouts are additive
 * — they can't remove root chrome — so we gate it here.)
 */
const HIDE_ON = ["/discovery", "/proposal", "/project"];

export default function RouteChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname() || "";
  const hidden = HIDE_ON.some((p) => pathname === p || pathname.startsWith(`${p}/`));
  return hidden ? null : <>{children}</>;
}
