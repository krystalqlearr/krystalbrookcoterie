import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { createSupabaseServiceClient } from "@/lib/supabase/server";
import DiscoveryForm from "./DiscoveryForm";

// Loaded per token at request time; never statically generated or cached.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Discovery",
  robots: { index: false, follow: false }, // private, token-gated
};

export default async function DiscoveryPage({ params }: { params: { token: string } }) {
  const db = createSupabaseServiceClient();
  const { data, error } = await db
    .from("discovery_responses")
    .select("token, current_step, answers, submitted_at")
    .eq("token", params.token)
    .maybeSingle();

  if (error || !data) notFound();

  if (data.submitted_at) {
    return (
      <section className="container flex min-h-[70svh] max-w-measure flex-col justify-center py-section">
        <p className="font-sans text-meta font-semibold uppercase text-flare-deep">
          Phase 01 · Complete
        </p>
        <h1 className="mt-6 font-display text-fluid-2xl font-normal text-ink">
          Received. <span className="text-neon">Thank you.</span>
        </h1>
        <p className="mt-6 font-sans text-fluid-lg leading-normal text-ink/70">
          Your answers are already in. I read every one before a single design decision gets made —
          that is the point of asking. You will hear from me next.
        </p>
      </section>
    );
  }

  return (
    <DiscoveryForm
      token={data.token}
      initialStep={data.current_step ?? 0}
      initialAnswers={(data.answers as Record<string, unknown>) ?? {}}
    />
  );
}
