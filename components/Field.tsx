"use client";

import { type ReactNode } from "react";

/**
 * Form field primitive — the single source of truth for field styling across every
 * form (extracted from EnquiryForm so the forms can't drift). Supports input,
 * textarea, select, and radio group, each with label, optional hint, inline error,
 * and a required marker. Accessible: label tied to control, aria-invalid +
 * aria-describedby wired to the hint/error.
 */

export const fieldBase =
  "mt-2 w-full rounded-[1px] border border-ink/20 bg-stone px-4 py-3 font-sans text-fluid-base text-ink placeholder:text-ink/40 transition-colors focus:border-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-ink";
export const labelBase = "font-sans text-xs font-medium uppercase tracking-[0.16em] text-ink/65";
export const errorText = "mt-2 font-sans text-xs text-cherry";
const hintText = "mt-1.5 font-editorial text-xs italic leading-snug text-ink/60";

type Common = {
  label: string;
  name: string;
  id?: string;
  hint?: string;
  error?: string;
  required?: boolean;
  className?: string;
};

type Props =
  | (Common & { as?: "input"; type?: string; autoComplete?: string; placeholder?: string; defaultValue?: string })
  | (Common & { as: "textarea"; rows?: number; placeholder?: string; defaultValue?: string })
  | (Common & { as: "select"; options: readonly string[]; placeholder?: string; defaultValue?: string })
  | (Common & { as: "radio"; options: readonly { label: string; value: string }[]; defaultValue?: string });

export default function Field(props: Props) {
  const { label, name, hint, error, required, className = "" } = props;
  const id = props.id ?? name;
  const describedBy =
    [hint ? `${id}-hint` : null, error ? `${id}-error` : null].filter(Boolean).join(" ") || undefined;
  const invalid = error ? true : undefined;

  const Marker = required ? <span className="text-ink/50"> *</span> : null;
  const Hint = hint ? (
    <p id={`${id}-hint`} className={hintText}>
      {hint}
    </p>
  ) : null;
  const Err = error ? (
    <p id={`${id}-error`} className={errorText}>
      {error}
    </p>
  ) : null;

  // Radio: a fieldset/legend rather than a single label-for-control.
  if (props.as === "radio") {
    return (
      <fieldset className={className}>
        <legend className={labelBase}>
          {label}
          {Marker}
        </legend>
        {Hint}
        <div className="mt-3 flex flex-col gap-2">
          {props.options.map((o) => (
            <label key={o.value} className="flex items-center gap-3 font-sans text-fluid-base text-ink">
              <input
                type="radio"
                name={name}
                value={o.value}
                defaultChecked={props.defaultValue === o.value}
                required={required}
                className="h-4 w-4 accent-ink"
              />
              {o.label}
            </label>
          ))}
        </div>
        {Err}
      </fieldset>
    );
  }

  let control: ReactNode;
  if (props.as === "textarea") {
    control = (
      <textarea
        id={id}
        name={name}
        required={required}
        rows={props.rows}
        placeholder={props.placeholder}
        defaultValue={props.defaultValue}
        className={`${fieldBase} resize-y`}
        aria-invalid={invalid}
        aria-describedby={describedBy}
      />
    );
  } else if (props.as === "select") {
    control = (
      <select
        id={id}
        name={name}
        required={required}
        defaultValue={props.defaultValue ?? ""}
        className={fieldBase}
        aria-invalid={invalid}
        aria-describedby={describedBy}
      >
        <option value="" disabled>
          {props.placeholder ?? "Select…"}
        </option>
        {props.options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    );
  } else {
    control = (
      <input
        id={id}
        name={name}
        type={props.type ?? "text"}
        required={required}
        autoComplete={props.autoComplete}
        placeholder={props.placeholder}
        defaultValue={props.defaultValue}
        className={fieldBase}
        aria-invalid={invalid}
        aria-describedby={describedBy}
      />
    );
  }

  return (
    <div className={className}>
      <label htmlFor={id} className={labelBase}>
        {label}
        {Marker}
      </label>
      {Hint}
      {control}
      {Err}
    </div>
  );
}
