"use client";

import { useState, type FormEvent } from "react";

/**
 * Enquiry form — the studio's single most important conversion surface.
 *
 * Submission: composes a mailto to the studio so it works with ZERO backend today.
 * For production, swap `onSubmit` to POST to a Route Handler wired to Resend (and a
 * Notion "Inquiries" record) per the ops plan — the field shape is already correct.
 *
 * No financial fields are ever collected here. "Investment" is a qualifying range,
 * not a payment. Accessible: real labels, required validation, visible ink focus.
 */

const STUDIO_EMAIL = "hello@krystalbrookcoterie.com";

const INDUSTRIES = ["Beauty", "Med-spa", "Wellness", "Bridal", "Luxury lifestyle", "Other"];
// These MUST match the tiers on /services exactly — this is the list a prospect
// actually submits, and it was still offering the retired "Launch" and "Atelier
// Custom" names long after the tiers were renamed.
const INVESTMENT = [
  "The Edit — $4,500",
  "Signature — $9,800",
  "Atelier — $22,000+",
  "Private Commission — $32,000+",
  "Not sure yet",
];
const TIMING = ["As soon as possible", "Within 1–3 months", "In 3–6 months", "Just exploring"];

const fieldBase =
  "mt-2 w-full rounded-[1px] border border-ink/20 bg-stone px-4 py-3 font-sans text-fluid-base text-ink placeholder:text-ink/70 transition-colors focus:border-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-ink";
const labelBase = "type-meta text-ink/70";

export default function EnquiryForm() {
  const [submitted, setSubmitted] = useState(false);

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
    };

    // Preferred: deliver via the API (Resend). Falls back to a mailto compose if the
    // endpoint isn't configured yet or the request fails — so the form always works.
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
      <div className="max-w-measure border-t border-flare pt-8">
        <p className="type-display text-fluid-2xl text-ink">Thank you.</p>
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
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelBase}>
            Your name <span className="text-ink/70">*</span>
          </label>
          <input id="name" name="name" type="text" required autoComplete="name" className={fieldBase} />
        </div>
        <div>
          <label htmlFor="brand" className={labelBase}>
            Brand
          </label>
          <input id="brand" name="brand" type="text" autoComplete="organization" className={fieldBase} />
        </div>
        <div>
          <label htmlFor="email" className={labelBase}>
            Email <span className="text-ink/70">*</span>
          </label>
          <input id="email" name="email" type="email" required autoComplete="email" className={fieldBase} />
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
            The vision <span className="text-ink/70">*</span>
          </label>
          <textarea
            id="vision"
            name="vision"
            required
            rows={5}
            placeholder="Tell me about the brand, what you’ve outgrown, and what you want the site to do."
            className={`${fieldBase} resize-y`}
          />
        </div>
      </div>

      <button
        type="submit"
        className="mt-8 inline-flex items-center justify-center rounded-[1px] border border-ink bg-ink px-8 py-4 font-sans text-meta-lg font-semibold uppercase text-bone transition duration-400 ease-editorial hover:border-flare-deep hover:bg-flare-deep focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
      >
        Submit your inquiry
      </button>
    </form>
  );
}
