import { z } from "zod";

/**
 * Enquiry schema — mirrors the EnquiryForm fields exactly, shared by the client
 * form and the server route so client and server validation can never drift.
 * (`company` is the honeypot; it's validated/handled in the route, not here.)
 */
export const enquirySchema = z.object({
  name: z.string().trim().min(1, "Your name is required.").max(200),
  brand: z.string().trim().max(200).optional().default(""),
  email: z
    .string()
    .trim()
    .min(1, "Email is required.")
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Enter a valid email address."),
  link: z.string().trim().max(300).optional().default(""),
  industry: z.string().trim().max(100).optional().default(""),
  investment: z.string().trim().max(100).optional().default(""),
  timing: z.string().trim().max(100).optional().default(""),
  vision: z.string().trim().min(1, "A sentence or two about the vision helps.").max(5000),
});

export type EnquiryInput = z.infer<typeof enquirySchema>;

/** Flatten a ZodError into { field: firstMessage } for inline display. */
export function fieldErrors(error: z.ZodError): Record<string, string> {
  const out: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = issue.path[0];
    if (typeof key === "string" && !out[key]) out[key] = issue.message;
  }
  return out;
}
