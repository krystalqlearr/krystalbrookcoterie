/**
 * `npm run verify` — the one command that checks this site.
 *
 * It exists because verification kept being hand-rolled, and hand-rolled
 * verification is where the mistakes came from. Every check below is here
 * because it FAILED to catch something real at least once:
 *
 *   tsc / lint       lint silently skipped for weeks — the worktree's
 *                    .eslintrc.json had no "root": true, so ESLint climbed into
 *                    the parent checkout, hit a duplicate-plugin conflict and
 *                    refused to run. Three Vercel deploys failed on unused
 *                    constants that should have been caught locally.
 *   build            `PORT=3200 next build` once shared .next-claude with the dev
 *                    server on 3100 and destroyed its chunks. next.config.mjs now
 *                    gives every non-dev phase `.next-build`, so a build cannot
 *                    touch a running server. (An earlier fix that THREW instead
 *                    broke `next lint` — this script's first run caught it.)
 *   routes           "no route may 404 at launch" is a rule with no teeth
 *                    unless something walks them.
 *   flare budget     counted by hand once and reported 10 touches on /services
 *                    that were really 2 — the checker has to know the carve-outs
 *                    (IndexMeta numbers, the ArrowLink glyph, the tier flag) or
 *                    it invents violations.
 *   contrast         a background walker that only climbs ANCESTORS reports
 *                    milk-on-milk at ratio 1.0 for text sitting over an
 *                    absolutely-positioned sibling. A ratio of exactly 1.00 is a
 *                    bug in the checker, never a finding — so it is asserted.
 *
 * Usage:
 *   npm run verify              static checks only (tsc, lint, build)
 *   npm run verify -- --live    also walk a running server (default :3100)
 *   npm run verify -- --live --base https://krystalbrookcoterie.com
 */
import { execFileSync } from "node:child_process";

const args = process.argv.slice(2);
const LIVE = args.includes("--live");
const BASE = (args[args.indexOf("--base") + 1] || "").startsWith("http")
  ? args[args.indexOf("--base") + 1]
  : "http://localhost:3100";

// Fail in one second, not after a three-minute build. The live half first
// shipped importing puppeteer-core only AFTER the static checks, from a package
// that wasn't in package.json — it only ever worked from a scratch install.
if (LIVE) {
  try {
    await import("puppeteer-core");
  } catch {
    console.error("\n  --live needs puppeteer-core (a devDependency). Run `npm install` first.\n");
    process.exit(1);
  }
}

const results = [];
const step = (name, fn) => {
  process.stdout.write(`  ${name} … `);
  try {
    const detail = fn();
    console.log("ok" + (detail ? ` — ${detail}` : ""));
    results.push({ name, ok: true });
  } catch (e) {
    console.log("FAIL");
    console.log("     " + String(e.message || e).split("\n").slice(0, 6).join("\n     "));
    results.push({ name, ok: false });
  }
};

const run = (cmd, cmdArgs, env = {}) =>
  execFileSync(cmd, cmdArgs, {
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
    env: { ...process.env, ...env },
    shell: process.platform === "win32",
  });

console.log("\nStatic\n");
step("typecheck", () => { run("npx", ["tsc", "--noEmit"]); });
step("lint", () => {
  const out = run("npx", ["next", "lint"]);
  if (/couldn't determine the plugin|Plugin .* was conflicted/i.test(out))
    throw new Error("ESLint did not actually run — check \"root\": true in .eslintrc.json");
  return "actually ran";
});
step("build", () => {
  const out = run("npx", ["next", "build"], { KBC_DIST: ".next-build" });
  const m = out.match(/Generating static pages \((\d+)\/(\d+)\)/g);
  return m ? m[m.length - 1].replace("Generating static pages ", "") : "compiled";
});

if (!LIVE) {
  console.log("\n(static only — pass --live to walk a running site)\n");
} else {
  console.log(`\nLive — ${BASE}\n`);
  const puppeteer = (await import("puppeteer-core")).default;
  const browser = await puppeteer.launch({
    executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
    headless: true,
    args: ["--hide-scrollbars", "--autoplay-policy=no-user-gesture-required"],
  });

  const { ROUTES, auditPage } = await import("./verify-live.mjs");
  const pages = [];
  for (const route of ROUTES) {
    const page = await browser.newPage();
    pages.push(await auditPage(page, BASE, route));
    await page.close();
  }
  await browser.close();

  // 304 is a success: the resource exists and is unchanged. Treating it as a
  // failure bites the moment a route is fetched twice in one browser — it did,
  // in the determinism harness, on the static brand book.
  step("every route 200", () => {
    const bad = pages.filter((p) => p.status !== 200 && p.status !== 304);
    if (bad.length) throw new Error(bad.map((p) => `${p.route} → ${p.status}`).join("\n"));
    return `${pages.length} routes`;
  });
  // Content checks run only on pages that actually loaded. Chrome's own error
  // page has an <h1>, so these once reported "ok" against "This site can't be
  // reached". Pages that didn't load already fail the route check above; here
  // they are named as NOT CHECKED instead of being silently passed.
  const loaded = pages.filter((p) => p.status === 200 || p.status === 304);
  const notChecked = pages.length - loaded.length;
  const coverage = (extra = "") =>
    [extra, notChecked ? `${notChecked} page(s) did not load, not checked` : ""].filter(Boolean).join(" · ");

  step("exactly one h1 per page", () => {
    const bad = loaded.filter((p) => p.h1s !== 1);
    if (bad.length) throw new Error(bad.map((p) => `${p.route} has ${p.h1s}`).join("\n"));
    return coverage();
  });
  // One line per route. A React hydration warning is a multi-line stack, and the
  // first version printed it whole: two routes' traces used up the report and
  // hid every other route that was failing.
  step("no console errors", () => {
    const bad = pages.filter((p) => p.consoleErrors.length);
    if (bad.length)
      throw new Error(bad.map((p) =>
        `${p.route}: ${p.consoleErrors.length} error(s), first: ${String(p.consoleErrors[0]).split("\n")[0].slice(0, 110)}`).join("\n"));
  });
  step("no failed requests", () => {
    const bad = pages.filter((p) => p.failed.length);
    if (bad.length) throw new Error(bad.map((p) => `${p.route}: ${p.failed[0]}`).join("\n"));
  });
  step("no mobile overflow", () => {
    const bad = loaded.filter((p) => p.mobileOverflow);
    if (bad.length) throw new Error(bad.map((p) => p.route).join(", "));
    return coverage();
  });
  step("flare budget ≤ 2 decorative per page", () => {
    const bad = loaded.filter((p) => p.flareDecorative > 2 && p.route !== "/styleguide");
    if (bad.length)
      throw new Error(bad.map((p) => `${p.route}: ${p.flareDecorative} — ${p.flareDetail.join(", ")}`).join("\n"));
    return coverage("carve-outs excluded");
  });
  step("contrast (AA)", () => {
    const impossible = pages.flatMap((p) =>
      p.contrast.filter((c) => c.ratio === 1).map((c) => `${p.route} "${c.text}"`));
    if (impossible.length)
      throw new Error("checker bug, not a finding — ratio 1.00 means the ground was\n" +
        "resolved wrong (text over an absolutely-positioned sibling):\n" + impossible.join("\n"));
    // CLIENT DOCUMENTS are hosted on this domain but designed in the CLIENT'S
    // palette, so their contrast is the client's decision, not a regression in
    // this site. Still audited and reported (grouped by colour pairing), never
    // gated. Glowtoure's specified muted text — Taupe on Pearl — is 2.71 across
    // ~20 label styles: systemic, and theirs to change.
    const CLIENT_DOCS = ["/work/glowtoure/brand-system"];

    // KNOWN, ACKNOWLEDGED findings on THIS site — each waiting on a decision that
    // isn't ours to make alone. A permanently red gate gets ignored, so these are
    // named (with why) while anything NEW still fails the run. Delete an entry
    // the moment its fix ships; a stale entry is reported.
    // Empty on purpose: the one entry, the /styleguide flare-band credit line
    // (milk/70, 3.74), was fixed to full milk (6.48) on her approval, 2026-09-11.
    const KNOWN_CONTRAST = [];

    const all = pages.flatMap((p) => p.contrast.map((c) => ({ route: p.route, ...c })));
    const isClient = (f) => CLIENT_DOCS.includes(f.route);
    const isKnown = (f) => KNOWN_CONTRAST.some((k) => k.route === f.route && f.text.startsWith(k.text));

    // One line per route + colour pairing, so a real regression reads as a
    // handful of lines instead of being cut off after six.
    const group = (list) => {
      const m = new Map();
      for (const f of list) {
        const key = `${f.route}  ${f.ratio} < ${f.need}  ${f.color} on ${f.ground}`;
        const g = m.get(key) || { key, n: 0, eg: [] };
        g.n++;
        if (g.eg.length < 3) g.eg.push(`"${f.text}"`);
        m.set(key, g);
      }
      return [...m.values()].map((g) => `${g.key}  x${g.n}  e.g. ${g.eg.join(", ")}`);
    };

    const fresh = all.filter((f) => !isClient(f) && !isKnown(f));
    if (fresh.length) throw new Error(`${fresh.length} finding(s) on this site:\n` + group(fresh).join("\n"));

    const known = all.filter((f) => !isClient(f) && isKnown(f));
    const client = all.filter(isClient);
    const stale = KNOWN_CONTRAST.filter((k) => !all.some((f) => f.route === k.route && f.text.startsWith(k.text)));
    return [
      known.length ? `${known.length} known, acknowledged` : "",
      stale.length ? `STALE baseline, remove: ${stale.map((k) => `${k.route} "${k.text}"`).join(", ")}` : "",
      client.length ? `client documents, informational:\n       ${group(client).join("\n       ")}` : "",
    ].filter(Boolean).join(" · ");
  });
}

const failed = results.filter((r) => !r.ok);
console.log(failed.length ? `\n${failed.length} check(s) failed.\n` : "\nAll checks passed.\n");
process.exit(failed.length ? 1 : 0);
