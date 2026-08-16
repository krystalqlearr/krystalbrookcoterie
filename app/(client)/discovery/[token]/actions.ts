"use server";

import { createSupabaseServiceClient } from "@/lib/supabase/server";
import { sendDiscoverySubmission } from "@/lib/email";
import type { Json } from "@/lib/supabase/types";

/**
 * Discovery server actions. All run under the service role and scope every write
 * to the row's token — the browser never touches the tables directly. Autosave and
 * submit guard on `submitted_at is null` so a finished questionnaire can't be
 * silently overwritten.
 */

export async function saveDiscoveryProgress(
  token: string,
  answers: Record<string, unknown>,
  currentStep: number,
): Promise<{ ok: boolean }> {
  try {
    const db = createSupabaseServiceClient();
    const { error } = await db
      .from("discovery_responses")
      .update({ answers: answers as Json, current_step: currentStep })
      .eq("token", token)
      .is("submitted_at", null);
    if (error) throw error;
    return { ok: true };
  } catch (e) {
    console.error("[discovery] save failed:", e);
    return { ok: false };
  }
}

export async function submitDiscovery(
  token: string,
  answers: Record<string, unknown>,
): Promise<{ ok: boolean }> {
  try {
    const db = createSupabaseServiceClient();
    const { data, error } = await db
      .from("discovery_responses")
      .update({ answers: answers as Json, submitted_at: new Date().toISOString() })
      .eq("token", token)
      .is("submitted_at", null)
      .select("lead_id")
      .maybeSingle();
    if (error) throw error;

    if (data?.lead_id) {
      const { data: lead } = await db
        .from("leads")
        .select("name, brand_name, email")
        .eq("id", data.lead_id)
        .maybeSingle();
      if (lead) await sendDiscoverySubmission({ lead, answers }); // fail-soft
      await db
        .from("leads")
        .update({ status: "qualified" })
        .eq("id", data.lead_id)
        .in("status", ["new", "discovery_sent"]);
    }
    return { ok: true };
  } catch (e) {
    console.error("[discovery] submit failed:", e);
    return { ok: false };
  }
}

export async function uploadDiscoveryAudio(
  formData: FormData,
): Promise<{ ok: boolean; path?: string }> {
  try {
    const token = String(formData.get("token") || "");
    const questionId = String(formData.get("questionId") || "");
    const file = formData.get("file");
    if (!token || !questionId || !(file instanceof File) || file.size === 0) return { ok: false };

    const db = createSupabaseServiceClient();
    // Confirm the token maps to a real, unsubmitted response before accepting an upload.
    const { data: row } = await db
      .from("discovery_responses")
      .select("id, submitted_at")
      .eq("token", token)
      .maybeSingle();
    if (!row || row.submitted_at) return { ok: false };

    const ext = (file.name.split(".").pop() || "webm").toLowerCase().replace(/[^a-z0-9]/g, "");
    const path = `${token}/${questionId}.${ext}`;
    const { error } = await db.storage
      .from("discovery-audio")
      .upload(path, file, { upsert: true, contentType: file.type || "audio/webm" });
    if (error) throw error;
    return { ok: true, path };
  } catch (e) {
    console.error("[discovery] audio upload failed:", e);
    return { ok: false };
  }
}
