/**
 * Put a published brand book on THIS domain.
 *
 *   node scripts/split-brand-book.mjs <source.html> [slug]
 *
 * A client brand book is authored as one self-contained HTML document with its
 * own type system and its own CSS — it cannot live inside the site's layout
 * without the two stylesheets fighting, so it ships as a static file under
 * /public/brand and gets a real URL from a rewrite in next.config.mjs.
 *
 * WHY THIS SCRIPT EXISTS RATHER THAN A COPY-PASTE. The authored document embeds
 * every font face as a base64 data URI — 447 KB of Glowtoure's 631 KB. Inlined,
 * they re-download on every visit and gzip poorly (woff2 is already compressed).
 * Split out, the document is 35 KB and the faces cache like any other asset.
 * The script also fixes the head: the authoring host wraps content in its own
 * skeleton, so the <title> lands inside <body> — valid enough that browsers
 * hoist it, but the page carries no description and no canonical, and on our
 * domain it is a real indexable page that needs all three.
 *
 * Nothing else changes. The document must have zero external references before
 * it goes anywhere near /public — the check below is not optional, because a
 * brand book that quietly phones home to another host defeats the entire point
 * of moving it here.
 *
 * Re-run this whenever the source document changes; the output is deterministic,
 * so a re-run with an unchanged source is a no-op in git.
 */
import { readFileSync, writeFileSync, mkdirSync, rmSync, statSync } from "node:fs";
import { join, resolve } from "node:path";

const [srcPath, slug = "glowtoure"] = process.argv.slice(2);
if (!srcPath) {
  console.error("usage: node scripts/split-brand-book.mjs <source.html> [slug]");
  process.exit(1);
}

const SITE_URL = "https://krystalbrookcoterie.com";
const ROOT = resolve(process.cwd());
const OUT_HTML = join(ROOT, "public/brand", `${slug}-brand-system.html`);
const OUT_FONTS = join(ROOT, "public/brand/fonts");
const CANONICAL = `${SITE_URL}/work/${slug}/brand-system`;

let html = readFileSync(resolve(srcPath), "utf8");

// 1 · Refuse anything that reaches off this domain.
const external = [...new Set([...html.matchAll(/(?:src|href)=["'](https?:\/\/[^"']+)/g)].map((m) => m[1]))];
if (external.length) {
  console.error("document reaches external hosts; inline or remove them first:\n" + external.join("\n"));
  process.exit(1);
}

// 2 · Lift the faces out to real files.
rmSync(OUT_FONTS, { recursive: true, force: true });
mkdirSync(OUT_FONTS, { recursive: true });

const slugify = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const written = [];

html = html.replace(/@font-face\s*\{[^}]*\}/g, (block) => {
  const family = (block.match(/font-family:\s*["']([^"']+)/) || [])[1];
  const weight = ((block.match(/font-weight:\s*([^;}]+)/) || [])[1] || "400").trim();
  const style = ((block.match(/font-style:\s*([^;}]+)/) || [])[1] || "normal").trim();
  const b64 = (block.match(/base64,([A-Za-z0-9+/=]+)/) || [])[1];
  if (!family || !b64) return block;

  const name = `${slugify(family)}-${weight}${style === "italic" ? "-italic" : ""}.woff2`;
  writeFileSync(join(OUT_FONTS, name), Buffer.from(b64, "base64"));
  written.push(name);

  // The whole src declaration goes: url(), any format(), any trailing semicolon.
  // Authored blocks are minified with src last, so there is no semicolon to
  // anchor on — a pattern that requires one silently matches half the value and
  // leaves a second format() behind.
  const out = block.replace(
    /src:\s*url\([^)]*\)(?:\s*format\([^)]*\))?\s*;?/,
    `src:url("/brand/fonts/${name}") format("woff2")`,
  );
  if (out === block) throw new Error(`src not rewritten for ${name}`);
  return out;
});

if (/base64,/.test(html)) throw new Error("a data: URI survived the split");
if (!written.length) throw new Error("no @font-face blocks found");
for (const block of html.match(/@font-face\{[^}]*\}/g) ?? []) {
  const urls = (block.match(/url\(/g) || []).length;
  const formats = (block.match(/format\(/g) || []).length;
  if (urls !== 1 || formats !== 1) throw new Error(`malformed face: ${block.slice(0, 160)}`);
}

// 3 · Head fixup.
const title = (html.match(/<title>([^<]*)<\/title>/i) || [])[1] ?? "Brand System";
html = html.replace(/\s*<title>[^<]*<\/title>/gi, "");
if (!/<\/head>/i.test(html)) throw new Error("no </head> to inject into");
html = html.replace(
  /<\/head>/i,
  [
    `<title>${title} — Krystal Brook Coterie</title>`,
    `<meta name="description" content="The brand system for ${title.replace(/ Brand System$/i, "")}: the locked palette, the type system and the governance that holds them. Identity, design system and art direction by Krystal Brook.">`,
    `<link rel="canonical" href="${CANONICAL}">`,
    "</head>",
  ].join(""),
);
if (/<body[\s\S]*<title>/i.test(html)) throw new Error("a <title> is still in the body");

mkdirSync(join(ROOT, "public/brand"), { recursive: true });
writeFileSync(OUT_HTML, html);

const kb = (p) => Math.round(statSync(p).size / 1024);
console.log(
  `${slug}: ${kb(OUT_HTML)} KB document + ${written.length} faces (${written.reduce(
    (a, f) => a + kb(join(OUT_FONTS, f)),
    0,
  )} KB) → ${CANONICAL}`,
);
