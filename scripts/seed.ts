/**
 * Seed script — run with:  npm run seed   (alias for `tsx scripts/seed.ts`)
 *
 * Creates two leads against a real Supabase project so the UI can be built on
 * realistic data:
 *   • Vikkilynn  — a SUBMITTED discovery response  → /discovery/[token]
 *   • Renata     — a SENT proposal                 → /proposal/[token]
 *
 * Uses the SERVICE ROLE key (bypasses RLS). Reads NEXT_PUBLIC_SUPABASE_URL and
 * SUPABASE_SERVICE_ROLE_KEY from the environment or from .env.local. Re-runnable:
 * it deletes the two fixed lead ids first (cascade clears their children).
 */
import { readFileSync } from "node:fs";
import { createClient } from "@supabase/supabase-js";
import type { Database, ProposalPhase } from "../lib/supabase/types";

// --- minimal .env.local loader (no dotenv dependency) -----------------------
try {
  const raw = readFileSync(new URL("../.env.local", import.meta.url), "utf8");
  for (const line of raw.split("\n")) {
    const m = line.match(/^\s*([\w.-]+)\s*=\s*(.*)\s*$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
  }
} catch {
  /* no .env.local — rely on the ambient environment */
}

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !serviceKey) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY.");
  process.exit(1);
}

const db = createClient<Database>(url, serviceKey, {
  auth: { persistSession: false, autoRefreshToken: false },
});

// Fixed ids/tokens so the dev URLs are stable across re-seeds.
const LEAD_A = "11111111-1111-4111-8111-111111111111";
const LEAD_B = "22222222-2222-4222-8222-222222222222";
const DISCOVERY_TOKEN = "aaaaaaaa-1111-4111-8111-aaaaaaaaaaaa";
const PROPOSAL_TOKEN = "bbbbbbbb-2222-4222-8222-bbbbbbbbbbbb";

const phases: ProposalPhase[] = [
  { key: "position", title: "Position", price_cents: 180000, description: "Define who the studio is for and why it wins.", deliverables: ["Brand strategy", "Positioning statement", "Voice & messaging"] },
  { key: "direct", title: "Direct", price_cents: 220000, description: "Set the visual direction before a pixel is designed.", deliverables: ["Art direction", "Type & colour system", "Reference direction"] },
  { key: "design", title: "Design", price_cents: 320000, description: "Design the full editorial site, mobile-first.", deliverables: ["Full site design", "Responsive layouts", "Booking flow design"] },
  { key: "build", title: "Build", price_cents: 420000, description: "Hand-built in code — fast, owned, yours.", deliverables: ["Custom Next.js build", "CMS", "Booking integration"] },
  { key: "release", title: "Release", price_cents: 140000, description: "Launch, index, and hand over the keys.", deliverables: ["Launch", "SEO & performance", "Handover & care"] },
];

async function main() {
  // Clean slate for the two fixed leads (cascade removes discovery + proposals).
  await db.from("leads").delete().in("id", [LEAD_A, LEAD_B]);

  const { error: leadsErr } = await db.from("leads").insert([
    {
      id: LEAD_A,
      name: "Vikkilynn Reyes",
      brand_name: "Lash & Loom Studio",
      email: "vikki@lashandloom.example",
      link: "instagram.com/lashandloomstudio",
      industry: "Beauty",
      investment: "Signature — $9,800",
      timing: "Within 1–3 months",
      vision: "I took my whole site down last month — it stopped feeling like the room I built. I want something that matches the work.",
      source: "Referral",
      status: "discovery_sent",
      notes: "Referred by a Glowtoure client. Decisive.",
    },
    {
      id: LEAD_B,
      name: "Renata Cole",
      brand_name: "Maison Renata",
      email: "hello@maisonrenata.example",
      link: "instagram.com/maisonrenata",
      industry: "Luxury lifestyle",
      investment: "Atelier — $22,000+",
      timing: "Within 1–3 months",
      vision: "The brand is right; the site lets it down. I want it to feel like the boutique.",
      source: "Instagram",
      status: "proposal_sent",
    },
  ]);
  if (leadsErr) throw leadsErr;

  const { error: discErr } = await db.from("discovery_responses").insert({
    lead_id: LEAD_A,
    token: DISCOVERY_TOKEN,
    current_step: 6,
    submitted_at: new Date().toISOString(),
    answers: {
      took_down: "It looked like a template every other lash tech in town uses. It cheapened what I charge.",
      favorite_client: "A 34-year-old planner who books three fills ahead and never asks the price.",
      three_words_want: "Considered, warm, exact.",
      three_words_hate: "Girly, trendy, cheap.",
      the_room: "Warm concrete, one big mirror, low light, no clutter.",
      keep_name: "Yes — Lash & Loom stays.",
      sad_to_lose: "The deep oxblood on my current signage.",
      still_want_it: "Yes. The 30% is the point, but I want to be proud of it too.",
    },
  });
  if (discErr) throw discErr;

  const total = phases.reduce((sum, p) => sum + p.price_cents, 0);
  const { error: propErr } = await db.from("proposals").insert({
    lead_id: LEAD_B,
    token: PROPOSAL_TOKEN,
    status: "sent",
    sent_at: new Date().toISOString(),
    phases,
    total_cents: total,
    deposit_cents: Math.round(total * 0.4),
    payment_terms: "40% deposit to begin, 30% at Design approval, 30% before launch.",
    revision_rounds: 2,
    timeline_weeks: 8,
    expires_at: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
    notes: "Atelier scope, held to one number; add-ons offered separately.",
  });
  if (propErr) throw propErr;

  console.log("Seed complete.");
  console.log(`  Discovery → /discovery/${DISCOVERY_TOKEN}`);
  console.log(`  Proposal  → /proposal/${PROPOSAL_TOKEN}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
