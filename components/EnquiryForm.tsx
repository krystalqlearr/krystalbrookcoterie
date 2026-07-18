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

export default function EnquiryForm() {
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const get = (k: string) => String(data.get(k) ?? "").trim();

    const subject = `New enquiry — ${get("brand") || get("name")}`;
    const body = [
      `Name: ${get("name")}`,
      `Brand: ${get("brand")}`,
      `Email: ${get("email")}`,
      `Website / Instagram: ${get("link")}`,
      `Industry: ${get("industry")}`,
      `Investment: ${get("investment")}`,
      `Timing: ${get("timing")}`,
      "",
      "Vision:",
      get("vision"),
    ].join("\n");

    window.location.href = `mailto:${STUDIO_EMAIL}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="max-w-measure border-t border-camel pt-8">
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
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelBase}>
            Your name <span className="text-ink/50">*</span>
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
            Email <span className="text-ink/50">*</span>
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
            The vision <span className="text-ink/50">*</span>
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
        className="mt-8 inline-flex items-center justify-center rounded-[1px] border border-ink bg-ink px-7 py-3.5 font-sans text-xs font-medium uppercase tracking-[0.14em] text-bone transition hover:bg-ink/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
      >
        Send enquiry
      </button>
    </form>
  );
}
