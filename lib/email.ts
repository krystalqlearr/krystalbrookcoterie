import "server-only";
import { DISCOVERY_STEPS } from "@/lib/discovery";
import type { Lead } from "@/lib/supabase/types";

/**
 * Transactional email via Resend's REST API (no SDK). Fail-soft: returns
 * { ok:false } instead of throwing, so a missing key or a Resend outage never
 * takes down a request. Extracted from the enquiry route so the discovery and
 * proposal flows share one sender.
 */

const FROM =
  process.env.ENQUIRY_FROM_EMAIL ||
  "Krystal Brook Coterie <enquiries@send.krystalbrookcoterie.com>";
const STUDIO = process.env.ENQUIRY_TO_EMAIL || "hello@krystalbrookcoterie.com";

type SendArgs = { to: string; subject: string; text: string; html?: string; replyTo?: string };
export type SendResult = { ok: boolean; reason?: "not_configured" | "send_failed"; status?: number };

export async function sendEmail({ to, subject, text, html, replyTo }: SendArgs): Promise<SendResult> {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.warn("[email] RESEND_API_KEY not set — skipping send:", subject);
    return { ok: false, reason: "not_configured" };
  }
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from: FROM, to: [to], reply_to: replyTo, subject, text, html }),
    });
    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      console.error("[email] resend failed:", res.status, detail);
      return { ok: false, reason: "send_failed", status: res.status };
    }
    return { ok: true };
  } catch (e) {
    console.error("[email] resend threw:", e);
    return { ok: false, reason: "send_failed" };
  }
}

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/** Emails the studio the full discovery responses, formatted. Fail-soft. */
export async function sendDiscoverySubmission(opts: {
  lead: Pick<Lead, "name" | "brand_name" | "email">;
  answers: Record<string, unknown>;
}): Promise<SendResult> {
  const { lead, answers } = opts;
  const brand = lead.brand_name || lead.name;

  const val = (id: string) => {
    const v = answers[id];
    return typeof v === "string" && v.trim() ? v.trim() : "—";
  };
  const audio = (id: string) => {
    const a = answers[`${id}__audio`];
    return typeof a === "string" && a ? a : null;
  };

  const textLines: string[] = [`Discovery — ${brand} (${lead.email})`, ""];
  const htmlParts: string[] = [
    `<p style="font-family:Arial,sans-serif;font-size:13px;color:#6E685C;margin:0 0 8px">Discovery — ${esc(brand)} &lt;${esc(lead.email)}&gt;</p>`,
  ];

  for (const step of DISCOVERY_STEPS) {
    textLines.push(`— ${step.eyebrow} —`);
    htmlParts.push(
      `<h2 style="font-family:Georgia,serif;font-style:italic;color:#8A1F52;font-size:15px;margin:26px 0 8px">${esc(step.eyebrow)}</h2>`,
    );
    for (const q of step.questions) {
      const a = val(q.id);
      const au = audio(q.id);
      textLines.push(q.question, a, au ? `[voice note: ${au}]` : "", "");
      htmlParts.push(
        `<p style="font-family:Arial,sans-serif;font-size:12px;color:#6E685C;margin:14px 0 4px">${esc(q.question)}</p>`,
        `<p style="font-family:Arial,sans-serif;font-size:15px;color:#23201B;margin:0;white-space:pre-wrap">${esc(a)}</p>`,
        au
          ? `<p style="font-family:Arial,sans-serif;font-size:12px;color:#8A1F52;margin:4px 0 0">Voice note: ${esc(au)}</p>`
          : "",
      );
    }
  }

  const html = `<div style="max-width:640px;margin:0 auto;background:#EBE5D8;padding:32px">${htmlParts.join("")}</div>`;
  return sendEmail({
    to: STUDIO,
    replyTo: lead.email,
    subject: `Discovery submitted — ${brand}`,
    text: textLines.join("\n"),
    html,
  });
}
