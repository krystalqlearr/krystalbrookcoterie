"use client";

import { useState, type FormEvent } from "react";

/**
 * Enquiry form — the studio's single most important conversion surface.
 *
 * Submission: composes a mailto to the studio so it works with ZERO backend today.
 * For production, swap `onSubmit` to POST to a Route Handler wired to Resend (and a
 * Notion "Inquiries" record) per the ops plan — the field shape is already correct.
 *
 * No financial fields are ever collected here, and since 2026-09-13 no monetary
 * ones either: the budget dropdown (four dollar ranges) is gone with the rest of
 * the figures on the site — a visitor is asked what they are planning, not what
 * they will spend, and the quote follows the conversation.
 * Accessible: real labels, required validation, visible ink focus.
 */

const STUDIO_EMAIL = "hello@krystalbrookcoterie.com";

const INDUSTRIES = ["Beauty", "Med-spa", "Wellness", "Bridal", "Luxury lifestyle", "Other"];
const TIMING = ["As soon as possible", "Within 1–3 months", "In 3–6 months", "Just exploring"];

const fieldBase =
  // Fields are LIFTED off the milk in white with a hairline — not an inset beige
  // tint (retired 2026-09-07, see SectionShell). White is the sheet above the canvas.
  "mt-2 w-full rounded-[1px] border border-ink/20 bg-white px-4 py-3 font-sans text-fluid-base text-ink placeholder:text-ink/70 transition-colors duration-400 focus:border-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-ink";
const labelBase = "type-meta text-ink/70";

export default function EnquiryForm() {
  /**
   * THREE OUTCOMES, NOT TWO (2026-10-03). This was one boolean, and BOTH paths
   * set it — so a visitor whose message never left saw the same "Thank you." as
   * one whose did. The fallback hands the enquiry to the visitor's own mail app,
   * and most people reading mail in a browser tab have no mail app registered:
   * nothing opened, nothing sent, and the form said thank you. The most
   * important page on the site was telling people something untrue.
   */
  const [status, setStatus] = useState<"idle" | "sent" | "unsent">("idle");
  /** The enquiry as plain text, so an unsent visitor can still carry it over. */
  const [draft, setDraft] = useState("");
  const [copied, setCopied] = useState(false);

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
        setStatus("sent");
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
      `Timing: ${payload.timing}`,
      "",
      "Vision:",
      payload.vision,
    ].join("\n");
    // Still TRY the mail app — for the minority who have one it is the shortest
    // path. But never report success on the strength of it: `mailto` gives the
    // page no way to know whether anything opened, so the state it leads to has
    // to be honest about the uncertainty.
    setDraft(`To: ${STUDIO_EMAIL}
Subject: ${subject}

${body}`);
    setStatus("unsent");
    window.location.href = `mailto:${STUDIO_EMAIL}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
  };

  const copyDraft = async () => {
    try {
      await navigator.clipboard.writeText(draft);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 4000);
    } catch {
      // Clipboard blocked (insecure context, or permission refused). The text is
      // on screen and selectable, so there is still a way through.
      setCopied(false);
    }
  };

  if (status === "sent") {
    return (
      <div className="max-w-measure border-t border-flare pt-8" role="status">
        <p className="type-display text-fluid-2xl text-ink">Thank you.</p>
        <p className="mt-4 font-sans text-fluid-base leading-relaxed text-ink/70">
          Your enquiry is with the studio. Every one is reviewed for fit, and you can
          expect a reply within two business days.
        </p>
      </div>
    );
  }

  if (status === "unsent") {
    return (
      // An ink hairline, not the flare: this is not the page's accent moment, and
      // the flare budget is one or two per PAGE (CLAUDE.md, Color).
      <div className="max-w-measure border-t border-ink pt-8" role="status">
        <p className="type-display text-fluid-2xl text-ink">Almost — one more step.</p>
        <p className="mt-4 font-sans text-fluid-base leading-relaxed text-ink/70">
          Your enquiry could not be sent from this page, and it may not have reached
          your email app either. Nothing is lost: your message is below. Send it to{" "}
          <a
            href={`mailto:${STUDIO_EMAIL}`}
            className="link-underline text-ink transition-colors duration-400 hover:text-flare-deep"
          >
            {STUDIO_EMAIL}
          </a>{" "}
          and it will be read the same day.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-6">
          <button
            type="button"
            onClick={copyDraft}
            className="inline-flex items-center justify-center rounded-[1px] border border-ink bg-ink px-8 py-4 font-sans text-meta-lg font-semibold uppercase text-milk transition duration-400 ease-editorial hover:border-flare-deep hover:bg-flare-deep focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
          >
            {copied ? "Copied" : "Copy my message"}
          </button>
          <span aria-live="polite" className="type-meta text-ink/70">
            {copied ? "Paste it into an email to the studio." : ""}
          </span>
        </div>

        {/* Readable and selectable, so the clipboard is a convenience and never a
            requirement — a blocked clipboard must not be a dead end. */}
        <pre className="mt-8 max-w-measure overflow-x-auto whitespace-pre-wrap border border-ink/15 bg-white p-6 font-sans text-fluid-sm leading-relaxed text-ink/70">
          {draft}
        </pre>
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
        className="mt-8 inline-flex items-center justify-center rounded-[1px] border border-ink bg-ink px-8 py-4 font-sans text-meta-lg font-semibold uppercase text-milk transition duration-400 ease-editorial hover:border-flare-deep hover:bg-flare-deep focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
      >
        Submit your inquiry
      </button>
    </form>
  );
}
