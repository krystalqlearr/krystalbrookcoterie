import { NextResponse } from "next/server";

/**
 * Enquiry delivery endpoint. Sends the /begin form to the studio via Resend.
 *
 * Env vars (set in Vercel → Settings → Environment Variables):
 *   RESEND_API_KEY      — required to actually send (until set, the client falls
 *                         back to a mailto compose, so the form still works).
 *   ENQUIRY_TO_EMAIL    — where enquiries land (default hello@krystalbrookcoterie.com).
 *   ENQUIRY_FROM_EMAIL  — verified Resend sender; the default matches the domain
 *                         actually verified in Resend (see below).
 *
 * THE SENDER IS THE ROOT DOMAIN, NOT A SUBDOMAIN (2026-10-03). This defaulted to
 * `enquiries@send.krystalbrookcoterie.com` on the assumption that the `send.`
 * subdomain would be the verified identity. What was actually verified is the
 * ROOT — `krystalbrookcoterie.com` — and Resend refuses a From address outside
 * the verified domain, so the old default would have failed every send with the
 * key correctly set, which is the worst kind of wrong: configured, deployed, and
 * silent.
 *
 * `send.` still appears in DNS and that is not a contradiction: Resend puts the
 * SPF and the bounce path on that subdomain deliberately, which is why adding it
 * leaves the ROOT SPF — Zoho's, the record that makes hello@ receive — untouched.
 * One domain, two jobs: the root sends and receives, the subdomain carries the
 * return path.
 *
 * The reply-to is set to the enquirer's address, so you can reply straight from
 * your inbox. To also log to Notion later, add a second fetch here.
 */

const TO = process.env.ENQUIRY_TO_EMAIL || "hello@krystalbrookcoterie.com";
const FROM =
  process.env.ENQUIRY_FROM_EMAIL ||
  "Krystal Brook Coterie <enquiries@krystalbrookcoterie.com>";

const clean = (v: unknown) => String(v ?? "").trim();

export async function POST(req: Request) {
  const key = process.env.RESEND_API_KEY;
  // Not wired yet → tell the client to use its mailto fallback.
  if (!key) return NextResponse.json({ ok: false, reason: "not_configured" }, { status: 501 });

  let data: Record<string, unknown>;
  try {
    data = await req.json();
  } catch {
    return NextResponse.json({ ok: false, reason: "bad_request" }, { status: 400 });
  }

  const name = clean(data.name);
  const email = clean(data.email);
  const vision = clean(data.vision);
  if (!name || !email || !vision) {
    return NextResponse.json({ ok: false, reason: "missing_fields" }, { status: 422 });
  }

  const subject = `New enquiry — ${clean(data.brand) || name}`;
  const text = [
    `Name: ${name}`,
    `Brand: ${clean(data.brand)}`,
    `Email: ${email}`,
    `Website / Instagram: ${clean(data.link)}`,
    `Industry: ${clean(data.industry)}`,
    `Timing: ${clean(data.timing)}`,
    "",
    "Vision:",
    vision,
  ].join("\n");

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from: FROM, to: [TO], reply_to: email, subject, text }),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    return NextResponse.json({ ok: false, reason: "send_failed", detail }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
