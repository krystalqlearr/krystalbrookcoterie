/** @type {import('next').NextConfig} */
const nextConfig = {
  // Two `next dev` instances (Krystal's kbc-dev on 3000, plus kbc-dev-claude on
  // 3100-or-auto — see .claude/launch.json) run against the same checkout at
  // once. Sharing one .next/ makes them clobber each other's chunks (missing
  // page.js 404s, stale CSS, EBUSY locks on Windows), so anything NOT on 3000
  // gets its own dist dir. Keyed on "not 3000" rather than "is 3100" because
  // autoPort moves the second server whenever 3100 is taken (2026-09-07).
  distDir: process.env.PORT && process.env.PORT !== "3000" ? ".next-claude" : ".next",

  // Published client deliverables are self-contained documents with their own
  // type system and their own CSS — they cannot live inside the site's layout
  // without the two stylesheets fighting. They ship as static files under
  // /public/brand and get a real, hierarchical URL here, so nothing on the site
  // ever links a visitor to a host that isn't ours.
  //
  // These are `afterFiles` rewrites (a plain array), which run only when no page
  // matched. `/work/[slug]` is a single segment, so it never sees this two-segment
  // path and the route tree is untouched.
  async rewrites() {
    return [
      {
        source: "/work/glowtoure/brand-system",
        destination: "/brand/glowtoure-brand-system.html",
      },
    ];
  },
};

export default nextConfig;
