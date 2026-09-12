/**
 * The live half of `npm run verify` — one page audited in a real browser.
 *
 * Two things here exist purely because getting them wrong produced confident,
 * plausible, WRONG findings:
 *
 * 1. THE FLARE CARVE-OUTS. The budget is one or two DECORATIVE touches a page.
 *    IndexMeta's live numbers, the ArrowLink glyph and the tier flag are
 *    functional and explicitly exempt (CLAUDE.md, Color). A counter that does
 *    not know that reports /services at 10 when the real answer is 2.
 *
 * 2. THE BACKGROUND WALK. Text frequently sits over a ground painted by an
 *    absolutely-positioned SIBLING (the /about portrait's `bg-onyx` layer, every
 *    work-frame caption). Climbing only ancestors resolves milk-on-milk and
 *    reports ratio 1.00 — impossible for real text. So the ground is sampled
 *    from what is actually painted underneath the element's own box, and a 1.00
 *    is treated as a checker bug upstream, never as a finding.
 */

export const ROUTES = [
  "/", "/work", "/work/glowtoure", "/work/glowtoure/brand-system",
  "/services", "/services/identity", "/services/collateral", "/services/websites",
  "/services/redesign", "/services/development", "/services/search", "/services/squarespace",
  "/process", "/about", "/journal", "/begin", "/privacy", "/terms", "/styleguide",
];

const PROBE = `(() => {
  const srgb = (c) => { c /= 255; return c <= 0.03928 ? c/12.92 : Math.pow((c+0.055)/1.055, 2.4); };
  const lum = ([r,g,b]) => 0.2126*srgb(r) + 0.7152*srgb(g) + 0.0722*srgb(b);
  const parse = (s) => { const m = String(s).match(/rgba?\\(([^)]+)\\)/); if (!m) return null;
    const p = m[1].split(",").map(parseFloat); return { rgb: p.slice(0,3), a: p.length > 3 ? p[3] : 1 }; };
  const blend = (top, a, under) => top.map((c,i) => c*a + under[i]*(1-a));
  const ratio = (a,b) => { const x = lum(a), y = lum(b);
    return (Math.max(x,y)+0.05)/(Math.min(x,y)+0.05); };

  // The ground a reader actually sees under this text — found by GEOMETRY, not
  // hit-testing. elementsFromPoint() returns nothing for points outside the
  // viewport (CSSOM spec), and the reveal-waking scroll ends back at the top, so
  // the first version let every below-the-fold element fall through to an
  // ancestor-only walk and re-create the milk-on-milk 1.00 false positive.
  // Top-down: the element's OWN background first (a filled button carries its
  // own ground — the first version skipped it), then at each level up, earlier
  // absolutely/fixed-positioned siblings whose box covers this text's centre
  // (the /about portrait's bg-onyx layer), then the parent. Stops at the first
  // opaque layer, then composites upward.
  const groundOf = (el) => {
    const r = el.getBoundingClientRect();
    const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
    const covers = (b) => cx >= b.left && cx <= b.right && cy >= b.top && cy <= b.bottom;
    const layers = [];
    const take = (node) => {
      const p = parse(getComputedStyle(node).backgroundColor);
      if (p && p.a > 0) { layers.push(p); return p.a >= 1; }
      return false;
    };
    let done = take(el);
    for (let node = el; !done && node.parentElement; node = node.parentElement) {
      const parent = node.parentElement;
      const before = [];
      for (const sib of parent.children) { if (sib === node) break; before.push(sib); }
      for (let i = before.length - 1; i >= 0 && !done; i--) {
        const s = getComputedStyle(before[i]);
        if (s.position !== "absolute" && s.position !== "fixed") continue;
        if (!covers(before[i].getBoundingClientRect())) continue;
        done = take(before[i]);
      }
      if (!done) done = take(parent);
    }
    let ground = [255, 255, 255];
    const root = parse(getComputedStyle(document.documentElement).backgroundColor);
    if (root && root.a >= 1) ground = root.rgb;
    for (let i = layers.length - 1; i >= 0; i--) ground = blend(layers[i].rgb, layers[i].a, ground);
    return ground;
  };

  const FLARE = ["rgb(255, 23, 68)", "rgb(179, 16, 46)"];
  // Functional carve-outs — information, not ornament.
  const exempt = (e) =>
    !!e.closest("a.arrow-link") ||
    !!e.closest("[data-index-meta]") ||
    /^\\d{2}$/.test((e.textContent || "").trim()) ||
    /most commissioned/i.test((e.textContent || "").trim());

  const flare = [...document.querySelectorAll("*")]
    .filter((e) => FLARE.includes(getComputedStyle(e).color) && !exempt(e))
    .map((e) => (e.textContent || "").trim().slice(0, 24));

  const contrast = [];
  for (const el of document.querySelectorAll("body *")) {
    if (el.closest("[aria-hidden=true]")) continue;
    const direct = [...el.childNodes].filter(n => n.nodeType === 3 && n.textContent.trim())
      .map(n => n.textContent.trim()).join(" ");
    if (!direct) continue;
    const cs = getComputedStyle(el);
    if (cs.visibility === "hidden" || cs.display === "none") continue;
    const r = el.getBoundingClientRect(); if (!r.width || !r.height) continue;
    let oa = 1; for (let n = el; n; n = n.parentElement) oa *= parseFloat(getComputedStyle(n).opacity);
    if (oa < 0.99) continue;                       // mid-reveal, not a real state
    const f = parse(cs.color); if (!f) continue;
    const ground = groundOf(el);
    const fg = f.a < 1 ? blend(f.rgb, f.a, ground) : f.rgb;
    const px = parseFloat(cs.fontSize), w = parseInt(cs.fontWeight) || 400;
    const need = (px >= 24 || (px >= 18.66 && w >= 700)) ? 3 : 4.5;
    const cr = ratio(fg, ground);
    if (cr < need - 0.01)
      // Colour and ground travel with every finding: a ratio alone can't be
      // acted on, and can't be sanity-checked against the palette either.
      contrast.push({ text: direct.slice(0,42), px: Math.round(px), ratio: +cr.toFixed(2), need,
        color: cs.color, ground: "rgb(" + ground.map(Math.round).join(", ") + ")" });
  }

  return {
    h1s: document.querySelectorAll("h1").length,
    flareDecorative: flare.length,
    flareDetail: flare,
    contrast,
  };
})()`;

export async function auditPage(page, base, route) {
  const consoleErrors = [];
  const failed = [];
  page.on("console", (m) => { if (m.type() === "error") consoleErrors.push(m.text().slice(0, 140)); });
  page.on("pageerror", (e) => consoleErrors.push(String(e).slice(0, 140)));
  page.on("requestfailed", (r) => failed.push(`${r.url().slice(-60)} ${r.failure()?.errorText}`));
  page.on("response", (r) => { if (r.status() >= 400) failed.push(`${r.status()} ${r.url().slice(-60)}`); });

  await page.setViewport({ width: 1440, height: 900 });
  // DETERMINISTIC END STATES. Reveals are timed animations — the brand book's
  // 1.8s editorial fade, Framer Motion on the site — and the probe skips any
  // element that isn't fully opaque yet. So a slow reveal made findings appear
  // on one run and vanish on the next: Glowtoure's Taupe labels at 2.71 were
  // skipped by the first checker and caught by this one purely on timing.
  // Reduced motion makes the site render its settled state (its Reveal renders
  // plain tags); the injected style zeroes CSS transitions and animations so
  // class-toggled reveals land instantly. Set BEFORE navigating: Framer reads the
  // preference on mount.
  await page.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "reduce" }]);
  let status = 0;
  try {
    const resp = await page.goto(base + route, { waitUntil: "networkidle0", timeout: 90000 });
    status = resp?.status() ?? 0;
  } catch (e) { consoleErrors.push("NAV FAILED " + String(e).slice(0, 100)); }
  await page
    .addStyleTag({ content: "*,*::before,*::after{transition:none!important;animation:none!important}" })
    .catch(() => {});

  // A page that never loaded must not be audited. Chrome's own error page has an
  // <h1>, so "exactly one h1" once passed on "This site can't be reached" for six
  // routes whose server was down — and flare, overflow and contrast ran against
  // that error page too.
  if (status !== 200 && status !== 304) {
    return { route, status, consoleErrors, failed, mobileOverflow: false,
      h1s: 0, flareDecorative: 0, flareDetail: [], contrast: [] };
  }

  // Wake every scroll reveal, or half the page is measured mid-transition.
  await page.evaluate(async () => {
    const H = document.documentElement.scrollHeight;
    for (let y = 0; y < H; y += 700) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 90)); }
    window.scrollTo(0, 0);
  }).catch(() => {});
  await new Promise((r) => setTimeout(r, 1100));

  let probe = { h1s: 0, flareDecorative: 0, flareDetail: [], contrast: [] };
  try { probe = await page.evaluate(PROBE); } catch (e) { consoleErrors.push("probe failed " + e.message); }

  await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
  await new Promise((r) => setTimeout(r, 600));
  const mobileOverflow = await page
    .evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1)
    .catch(() => false);

  return { route, status, consoleErrors, failed, mobileOverflow, ...probe };
}
