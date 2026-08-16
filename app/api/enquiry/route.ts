import { NextResponse } from "next/server";
import { enquirySchema, fieldErrors } from "@/lib/schemas";
import { createSupabaseServiceClient } from "@/lib/supabase/server";

/**
 * Enquiry endpoint. Order of operations:
 *   1. honeypot  → silently accept bots
 *   2. rate limit → 429 (5 / rolling hour / IP, in-memory best-effort)
 *   3. validate  → 422 with field-level errors for inline display
 *   4. persist   → insert the lead (fail-open: a down DB must never lose an enquiry)
 *   5. email     → Resend raw fetch (reply_to = enquirer). 501 + mailto fallback
 *                  when RESEND_API_KEY is absent; the lead is already saved.
 */

const TO = process.env.ENQUIRY_TO_EMAIL || "hello@krystalbrookcoterie.com";
const FROM =
  process.env.ENQUIRY_FROM_EMAIL ||
  "Krystal Brook Coterie <enquiries@send.krystalbrookcoterie.com>";

// In-memory IP rate limit — best-effort (per serverless instance), no captcha.
const WINDOW_MS = 60 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_PER_WINDOW;
}

function clientIp(req: Request): string {
  const fwd = req.headers.get("x-forwarded-for");
  return (fwd ? fwd.split(",")[0] : req.headers.get("x-real-ip"))?.trim() || "unknown";
}

export async function POST(req: Request) {
  let raw: Record<string, unknown>;
  try {
    raw = await req.json();
  } catch {
    return NextResponse.json({ ok: false, reason: "bad_request" }, { status: 400 });
  }

  // 1. Honeypot — a hidden field real users never fill. If it has content, this
  // is a bot: pretend success so it gets no signal, and do nothing else.
  if (typeof raw.company === "string" && raw.company.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  // 2. Rate limit.
  if (rateLimited(clientIp(req))) {
    return NextResponse.json({ ok: false, reason: "rate_limited" }, { status: 429 });
  }

  // 3. Validate (same schema the form uses).
  const parsed = enquirySchema.safeParse(raw);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, reason: "invalid", errors: fieldErrors(parsed.error) },
      { status: 422 },
    );
  }
  const data = parsed.data;

  // 4. Persist first — fail-open. If Supabase is down we log and still try email,
  // so an enquiry is never lost.
  let leadSaved = false;
  try {
    const db = createSupabaseServiceClient();
    const { error } = await db.from("leads").insert({
      name: data.name,
      brand_name: data.brand || null,
      email: data.email,
      link: data.link || null,
      industry: data.industry || null,
      investment: data.investment || null,
      timing: data.timing || null,
      vision: data.vision,
      source: "begin_form",
    });
    if (error) throw error;
    leadSaved = true;
  } catch (e) {
    console.error("[enquiry] lead insert failed:", e);
  }

  // 5. Email. Keep the 501 + mailto fallback when Resend isn't configured.
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    return NextResponse.json({ ok: false, reason: "not_configured", leadSaved }, { status: 501 });
  }

  const subject = `New enquiry — ${data.brand || data.name}`;
  const text = [
    `Name: ${data.name}`,
    `Brand: ${data.brand}`,
    `Email: ${data.email}`,
    `Website / Instagram: ${data.link}`,
    `Industry: ${data.industry}`,
    `Investment: ${data.investment}`,
    `Timing: ${data.timing}`,
    "",
    "Vision:",
    data.vision,
  ].join("\n");

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from: FROM, to: [TO], reply_to: data.email, subject, text }),
    });
    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      console.error("[enquiry] resend failed:", res.status, detail);
      // Lead is already saved → report success. If it wasn't, let the client
      // fall back to a mailto compose so the enquiry still reaches the studio.
      return leadSaved
        ? NextResponse.json({ ok: true, emailFailed: true })
        : NextResponse.json({ ok: false, reason: "send_failed" }, { status: 502 });
    }
  } catch (e) {
    console.error("[enquiry] resend threw:", e);
    return leadSaved
      ? NextResponse.json({ ok: true, emailFailed: true })
      : NextResponse.json({ ok: false, reason: "send_failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
