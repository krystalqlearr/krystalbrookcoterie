"use client";

import { useState, type FormEvent } from "react";

/**
 * Enquiry form — the studio's single most important conversion surface.
 *
 * Submission POSTs to /api/enquiry (validates with the shared zod schema, persists
 * the lead, then emails via Resend). Validation errors render inline; any other
 * failure (Resend unconfigured, network) falls back to a mailto compose so the form
 * always works. A hidden honeypot field ("company") deters bots.
 *
 * No financial fields are ever collected here. "Investment" is a qualifying range,
 * not a payment. Accessible: real labels, required validation, visible ink focus.
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

const fieldBase =
  "mt-2 w-full rounded-[1px] border border-ink/20 bg-stone px-4 py-3 font-sans text-fluid-base text-ink placeholder:text-ink/40 transition-colors focus:border-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-ink";
const labelBase = "font-sans text-xs font-medium uppercase tracking-[0.16em] text-ink/65";
const errorText = "mt-2 font-sans text-xs text-cherry"; // in-palette; no new colors

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
        <div>
          <label htmlFor="name" className={labelBase}>
            Your name <span className="text-ink/50">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            className={fieldBase}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
          />
          {errors.name && (
            <p id="name-error" className={errorText}>
              {errors.name}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="brand" className={labelBase}>
            Brand
          </label>
          <input id="brand" name="brand" type="text" autoComplete="organization" className={fieldBase} />
        </div>
        <div>
          <label htmlFor="email" className={labelBase}>
            Email <span className="text-ink/50">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className={fieldBase}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
          />
          {errors.email && (
            <p id="email-error" className={errorText}>
              {errors.email}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="link" className={labelBase}>
            Website or Instagram
          </label>
          <input id="link" name="link" type="text" className={fieldBase} />
        </div>
        <div>
          <label htmlFor="industry" className={labelBase}>
            Industry
          </label>
          <select id="industry" name="industry" defaultValue="" className={fieldBase}>
            <option value="" disabled>
              Select…
            </option>
            {INDUSTRIES.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="investment" className={labelBase}>
            Investment
          </label>
          <select id="investment" name="investment" defaultValue="" className={fieldBase}>
            <option value="" disabled>
              Select…
            </option>
            {INVESTMENT.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="timing" className={labelBase}>
            Timing
          </label>
          <select id="timing" name="timing" defaultValue="" className={fieldBase}>
            <option value="" disabled>
              Select…
            </option>
            {TIMING.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="vision" className={labelBase}>
            The vision <span className="text-ink/50">*</span>
          </label>
          <textarea
            id="vision"
            name="vision"
            required
            rows={5}
            placeholder="Tell me about the brand, what you’ve outgrown, and what you want the site to do."
            className={`${fieldBase} resize-y`}
            aria-invalid={!!errors.vision}
            aria-describedby={errors.vision ? "vision-error" : undefined}
          />
          {errors.vision && (
            <p id="vision-error" className={errorText}>
              {errors.vision}
            </p>
          )}
        </div>
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
