/** @type {import('next').NextConfig} */
const nextConfig = {
  // Two `next dev` instances (Krystal's kbc-dev on 3000, plus kbc-dev-claude on
  // 3100-or-auto — see .claude/launch.json) run against the same checkout at
  // once. Sharing one .next/ makes them clobber each other's chunks (missing
  // page.js 404s, stale CSS, EBUSY locks on Windows), so anything NOT on 3000
  // gets its own dist dir. Keyed on "not 3000" rather than "is 3100" because
  // autoPort moves the second server whenever 3100 is taken (2026-09-07).
  distDir: process.env.PORT && process.env.PORT !== "3000" ? ".next-claude" : ".next",
};

export default nextConfig;
