"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { EASE, DUR } from "@/lib/motion";
import { DISCOVERY_STEPS, DISCOVERY_TOTAL_STEPS } from "@/lib/discovery";
import { fieldBase } from "@/components/Field";
import Button from "@/components/Button";
import { saveDiscoveryProgress, submitDiscovery, uploadDiscoveryAudio } from "./actions";

type Answers = Record<string, string>;

const meta = "font-sans text-meta font-semibold uppercase";

const clampStep = (s: number) => Math.max(0, Math.min(DISCOVERY_TOTAL_STEPS - 1, s));

function splitAccent(title: string, accent: string) {
  const i = title.toLowerCase().indexOf(accent.toLowerCase());
  if (i === -1) return <>{title}</>;
  return (
    <>
      {title.slice(0, i)}
      <span className="text-neon">
        {title.slice(i, i + accent.length)}
      </span>
      {title.slice(i + accent.length)}
    </>
  );
}

export default function DiscoveryForm({
  token,
  initialStep,
  initialAnswers,
}: {
  token: string;
  initialStep: number;
  initialAnswers: Record<string, unknown>;
}) {
  const reduce = useReducedMotion();

  const initAns: Answers = {};
  for (const [k, v] of Object.entries(initialAnswers)) if (typeof v === "string") initAns[k] = v;
  const hasStarted =
    (initialStep ?? 0) > 0 || Object.keys(initAns).some((k) => !k.endsWith("__audio"));

  const [step, setStep] = useState<number>(hasStarted ? clampStep(initialStep) : -1); // -1 = cover
  const [answers, setAnswers] = useState<Answers>(initAns);
  const [saveState, setSaveState] = useState<"idle" | "saving" | "saved">("idle");
  const [stepError, setStepError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const headingRef = useRef<HTMLHeadingElement>(null);
  const answersRef = useRef(answers);
  answersRef.current = answers;
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const persist = useCallback(
    async (s: number) => {
      setSaveState("saving");
      const r = await saveDiscoveryProgress(token, answersRef.current, s);
      setSaveState(r.ok ? "saved" : "idle");
    },
    [token],
  );

  const scheduleSave = useCallback(() => {
    setSaveState("saving");
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => void persist(Math.max(0, step)), 800);
  }, [persist, step]);

  // Move focus to the step heading on navigation (keyboard + screen reader).
  useEffect(() => {
    if (step >= 0) headingRef.current?.focus();
  }, [step]);

  useEffect(() => () => void (timer.current && clearTimeout(timer.current)), []);

  const setAnswer = (id: string, value: string) => {
    setAnswers((a) => ({ ...a, [id]: value }));
    setStepError(null);
    scheduleSave();
  };

  const onVoice = async (id: string, file: File | undefined) => {
    if (!file) return;
    const fd = new FormData();
    fd.set("token", token);
    fd.set("questionId", id);
    fd.set("file", file);
    setSaveState("saving");
    const r = await uploadDiscoveryAudio(fd);
    if (r.ok && r.path) {
      setAnswers((a) => ({ ...a, [`${id}__audio`]: r.path as string }));
      void persist(Math.max(0, step));
    } else {
      setSaveState("idle");
    }
  };

  const go = async (target: number) => {
    if (timer.current) clearTimeout(timer.current);
    setStep(target);
    await persist(target);
  };

  const current = step >= 0 ? DISCOVERY_STEPS[step] : null;

  const next = async () => {
    if (!current) return;
    const required = current.questions.find((q) => q.required);
    if (required && !answers[required.id]?.trim()) {
      setStepError("A sentence is enough — but this one I do need.");
      document.getElementById(required.id)?.focus();
      return;
    }
    if (step < DISCOVERY_TOTAL_STEPS - 1) await go(step + 1);
    else await onSubmit();
  };

  const back = async () => {
    if (step > 0) await go(step - 1);
  };

  const onSubmit = async () => {
    setSubmitting(true);
    if (timer.current) clearTimeout(timer.current);
    await persist(step);
    const r = await submitDiscovery(token, answersRef.current);
    setSubmitting(false);
    if (r.ok) setSubmitted(true);
    else setStepError("Something went wrong sending that. Try once more.");
  };

  // Closing screen — the studio's line about restraint.
  if (submitted) {
    return (
      <section className="container flex min-h-[70svh] max-w-measure flex-col justify-center py-section">
        <p className={`${meta} text-flare-deep`}>Phase 01 · Complete</p>
        <h1 className="mt-6 font-display text-fluid-2xl font-normal text-ink">
          That is everything <span className="text-neon">I need.</span>
        </h1>
        <p className="mt-6 max-w-measure font-sans text-fluid-lg leading-normal text-ink/70">
          Restraint is the whole discipline — knowing what to leave out. You have given me what I
          need to leave out the right things. I will be in touch within the week.
        </p>
      </section>
    );
  }

  // Cover screen (deep river).
  if (step < 0) {
    return (
      <section className="flex min-h-[80svh] items-center bg-river text-bone">
        <div className="container max-w-measure py-section">
          <p className={`${meta} text-flare-lift`}>Phase 01 · Position</p>
          <h1 className="mt-6 font-display text-fluid-3xl font-normal">
            Before the design, <span className="text-flare-lift">the truth.</span>
          </h1>
          <p className="mt-8 max-w-[46ch] font-sans text-fluid-lg leading-normal text-bone/75">
            Six short sections. Answer in a sentence or a paragraph — nothing here is graded, and
            there are no wrong answers. It saves as you go, so you can leave and come back. And if
            you would rather talk than type, every question takes a voice note.
          </p>
          <div className="mt-10">
            <button
              type="button"
              onClick={() => setStep(0)}
              className="inline-flex items-center justify-center rounded-[1px] border border-bone px-9 py-4 font-sans text-meta font-semibold uppercase text-bone transition-colors duration-300 ease-editorial hover:bg-bone hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-bone"
            >
              Begin
            </button>
          </div>
        </div>
      </section>
    );
  }

  const pct = Math.round(((step + 1) / DISCOVERY_TOTAL_STEPS) * 100);
  const isLast = step === DISCOVERY_TOTAL_STEPS - 1;

  return (
    <section className="container max-w-2xl py-section">
      <div className="flex items-baseline justify-between">
        <p className={`${meta} text-flare-deep`}>Phase 01 · {current!.eyebrow}</p>
        <p
          className={`${meta} text-ink/70`}
          aria-label={`Step ${step + 1} of ${DISCOVERY_TOTAL_STEPS}`}
        >
          {String(step + 1).padStart(2, "0")} / {String(DISCOVERY_TOTAL_STEPS).padStart(2, "0")}
        </p>
      </div>
      <div
        className="mt-4 h-px w-full bg-ink/15"
        role="progressbar"
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className="h-px bg-neon transition-[width] duration-500 ease-editorial"
          style={{ width: `${pct}%` }}
        />
      </div>

      <motion.div
        key={step}
        initial={reduce ? false : { opacity: 0, y: 16 }}
        animate={reduce ? undefined : { opacity: 1, y: 0 }}
        transition={{ duration: DUR.base, ease: EASE }}
      >
        <h2
          ref={headingRef}
          tabIndex={-1}
          className="mt-14 font-display text-fluid-2xl font-normal text-ink outline-none"
        >
          {splitAccent(current!.title, current!.accent)}
        </h2>

        <div className="mt-12 flex flex-col gap-14">
          {current!.questions.map((q) => (
            <div key={q.id}>
              <label
                htmlFor={q.id}
                className="block max-w-[42ch] font-sans text-fluid-lg leading-snug tracking-[-0.01em] text-ink"
              >
                {q.question}
              </label>
              {q.hint ? (
                <p className="mt-2 max-w-[42ch] font-sans text-xs leading-relaxed text-ink/70">
                  {q.hint}
                </p>
              ) : null}
              <AutoTextarea
                id={q.id}
                value={answers[q.id] ?? ""}
                onChange={(v) => setAnswer(q.id, v)}
                onBlur={scheduleSave}
                placeholder="Type your answer…"
              />
              <details className="mt-3">
                <summary className="cursor-pointer list-none font-sans text-xs font-semibold uppercase tracking-[0.13em] text-ink/70 transition-colors hover:text-flare-deep">
                  Prefer to talk? Record instead
                </summary>
                <div className="mt-3">
                  <input
                    type="file"
                    accept="audio/*"
                    aria-label={`Voice note for: ${q.question}`}
                    onChange={(e) => onVoice(q.id, e.target.files?.[0])}
                    className="block w-full font-sans text-xs text-ink/70 file:mr-4 file:cursor-pointer file:rounded-[1px] file:border file:border-ink/30 file:bg-transparent file:px-4 file:py-2 file:font-sans file:text-xs file:font-semibold file:uppercase file:tracking-[0.13em] file:text-ink hover:file:border-ink"
                  />
                  {answers[`${q.id}__audio`] ? (
                    <p className="mt-2 font-sans text-xs tracking-[0.04em] text-flare-deep">
                      Voice note attached.
                    </p>
                  ) : null}
                </div>
              </details>
            </div>
          ))}
        </div>

        {stepError ? (
          <p role="alert" className="mt-8 font-sans text-xs text-flare-deep">
            {stepError}
          </p>
        ) : null}

        <div className="mt-14 flex items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            {step > 0 ? (
              <button
                type="button"
                onClick={back}
                className="font-sans text-xs font-semibold uppercase tracking-[0.13em] text-ink/70 transition-colors hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
              >
                Back
              </button>
            ) : (
              <span />
            )}
            <span className={`${meta} text-ink/40`} aria-live="polite">
              {saveState === "saving" ? "Saving…" : saveState === "saved" ? "Saved" : ""}
            </span>
          </div>
          <Button
            type="button"
            variant="primary"
            size="lg"
            onClick={next}
            disabled={submitting}
            aria-label={isLast ? "Submit questionnaire" : "Continue to next step"}
          >
            {submitting ? "Sending…" : isLast ? "Submit" : "Continue"}
          </Button>
        </div>
      </motion.div>
    </section>
  );
}

function AutoTextarea({
  id,
  value,
  onChange,
  onBlur,
  placeholder,
}: {
  id: string;
  value: string;
  onChange: (v: string) => void;
  onBlur: () => void;
  placeholder?: string;
}) {
  const ref = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  }, [value]);
  return (
    <textarea
      ref={ref}
      id={id}
      name={id}
      rows={2}
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      onBlur={onBlur}
      className={`${fieldBase} resize-none overflow-hidden`}
    />
  );
}
