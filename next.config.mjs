import { PHASE_DEVELOPMENT_SERVER } from "next/constants.js";

/**
 * Config is in FUNCTION form so it receives `phase`. The object form cannot tell
 * a build from a dev server — `process.env.NEXT_PHASE` is undefined in Next 14
 * (verified 2026-09-10, after a guard written against it silently never fired).
 *
 * DIST DIRS — only a dev server may use `.next` or `.next-claude`.
 * Two `next dev` instances run against this checkout: Krystal's on 3000 and a
 * second on 3100-or-auto (.claude/launch.json). Sharing one .next/ makes them
 * clobber each other — missing page.js 404s, stale CSS, EBUSY locks on Windows —
 * so anything not on 3000 gets .next-claude.
 *
 * Every OTHER local phase — build, lint, start — gets `.next-build`. History:
 * the old object-form rule keyed on "PORT is not 3000", which also captured a
 * BUILD that had a PORT in its environment; `PORT=3200 next build` wrote into
 * .next-claude and tore the chunks out of the running dev server on 3100
 * ("Cannot find module './vendor-chunks/lenis.js'"). The first fix THREW on a
 * local build without KBC_DIST — and broke `next lint`, which loads this config
 * under the production-build phase too (caught by `npm run verify` on its first
 * real run). A safe default beats a refusal: collision is impossible by
 * construction, and no command breaks.
 *
 * Vercel is authoritative: no dev server there, `.next` is expected.
 */
export default function config(phase) {
  let distDir;
  if (process.env.VERCEL) {
    distDir = ".next";
  } else if (phase === PHASE_DEVELOPMENT_SERVER) {
    distDir = process.env.PORT && process.env.PORT !== "3000" ? ".next-claude" : ".next";
  } else {
    distDir = process.env.KBC_DIST || ".next-build";
  }

  return {
    distDir,

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
}
