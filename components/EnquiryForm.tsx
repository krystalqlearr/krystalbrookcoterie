"use client";

import { useState, type FormEvent } from "react";
import Field from "./Field";

/**
 * Enquiry form — the studio's single most important conversion surface.
 *
 * Submission POSTs to /api/enquiry (validates with the shared zod schema, persists
 * the lead, then emails via Resend). Validation errors render inline; any other
 * failure (Resend unconfigured, network) falls back to a mailto compose so the form
 * always works. A hidden honeypot field ("company") deters bots.
 *
 * Field styling comes from the shared <Field> primitive so every form stays
 * visually consistent. No financial fields are collected — "Investment" is a
 * qualifying range, not a payment.
 */

const STUDIO_EMAIL = "hello@krystalbrookcoterie.com";

const INDUSTRIES = ["Beauty", "Med-spa", "Wellness", "Bridal", "Luxury lifestyle", "Other"];
const INVESTMENT = [
  "Launch — $4,500",
  "Signature — $9,800",
  "Atelier — $22,000+",
  "Atelier Custom — $32,000+",
  "Founding Client — $2,800",
  "Not sure yet",
];
const TIMING = ["As soon as possible", "Within 1–3 months", "In 3–6 months", "Just exploring"];

export default function EnquiryForm() {
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const get = (k: string) => String(data.get(k) ?? "").trim();
    const payload = {
      name: get("name"),
      brand: get("brand"),
      email: get("email"),
      link: get("link"),
      industry: get("industry"),
      investment: get("investment"),
      timing: get("timing"),
      vision: get("vision"),
      company: get("company"), // honeypot — always empty for real users
    };

    setErrors({});

    // Preferred: deliver via the API (validates + persists the lead + emails via
    // Resend). Validation errors show inline; any other failure falls through to a
    // mailto compose so the form always works.
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        setSubmitted(true);
        return;
      }
      if (res.status === 422) {
        const errBody = (await res.json().catch(() => null)) as
          | { errors?: Record<string, string> }
          | null;
        if (errBody?.errors) {
          setErrors(errBody.errors);
          const first = Object.keys(errBody.errors)[0];
          if (first) document.getElementById(first)?.focus();
          return; // stay on the form so they can fix it — no mailto
        }
      }
    } catch {
      /* network error — fall through to mailto */
    }

    const subject = `New enquiry — ${payload.brand || payload.name}`;
    const body = [
      `Name: ${payload.name}`,
      `Brand: ${payload.brand}`,
      `Email: ${payload.email}`,
      `Website / Instagram: ${payload.link}`,
      `Industry: ${payload.industry}`,
      `Investment: ${payload.investment}`,
      `Timing: ${payload.timing}`,
      "",
      "Vision:",
      payload.vision,
    ].join("\n");
    window.location.href = `mailto:${STUDIO_EMAIL}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="max-w-measure border-t border-cherry pt-8">
        <p className="font-editorial text-fluid-xl italic text-ink">Thank you.</p>
        <p className="mt-4 font-sans text-fluid-base leading-relaxed text-ink/70">
          Your email client should have opened with your enquiry ready to send. If it didn’t,
          write to{" "}
          <a href={`mailto:${STUDIO_EMAIL}`} className="text-ink underline decoration-ink/40 underline-offset-4">
            {STUDIO_EMAIL}
          </a>{" "}
          directly. Every enquiry is reviewed for fit within 48 hours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="max-w-2xl">
      {/* Honeypot — hidden from people, catches bots. Not a real field. */}
      <div aria-hidden className="pointer-events-none absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Your name" name="name" required autoComplete="name" error={errors.name} />
        <Field label="Brand" name="brand" autoComplete="organization" />
        <Field label="Email" name="email" type="email" required autoComplete="email" error={errors.email} />
        <Field label="Website or Instagram" name="link" />
        <Field as="select" label="Industry" name="industry" options={INDUSTRIES} />
        <Field as="select" label="Investment" name="investment" options={INVESTMENT} />
        <Field as="select" label="Timing" name="timing" options={TIMING} className="sm:col-span-2" />
        <Field
          as="textarea"
          label="The vision"
          name="vision"
          required
          rows={5}
          placeholder="Tell me about the brand, what you’ve outgrown, and what you want the site to do."
          error={errors.vision}
          className="sm:col-span-2"
        />
      </div>

      <button
        type="submit"
        className="mt-8 inline-flex items-center justify-center rounded-[1px] border border-ink bg-ink px-7 py-3.5 font-sans text-xs font-medium uppercase tracking-[0.14em] text-bone transition hover:bg-ink/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
      >
        Submit your inquiry
      </button>
    </form>
  );
}
