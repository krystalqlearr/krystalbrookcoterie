-- ============================================================================
-- KBC — Client intake & proposal system  (initial schema)
-- Tables: leads · discovery_responses · proposals · proposal_events
-- ============================================================================
-- SECURITY MODEL — "server-side service role" (chosen deliberately)
-- ----------------------------------------------------------------------------
-- RLS is ON for every table, and every table DENIES BY DEFAULT: with RLS on and
-- no policy for a role, that role can do nothing. From that baseline:
--
--   • anon (the browser's public key) has NO policies anywhere → it can read and
--     write NOTHING directly. The unguessable token is never trusted by the
--     database; it is enforced by our server code. (The /discovery and /proposal
--     pages are server components + server actions — the browser never queries
--     these tables, so it needs no access.)
--
--   • service_role (server only, never shipped to the browser) BYPASSES RLS. It
--     is what inserts leads, and what the client pages use to look a row up
--     `where token = $1` and return only that one row.
--
--   • authenticated (your future admin login) gets one full-access policy per
--     table. "Admin = any authenticated user" because you're the only person who
--     will ever log in; tighten later by replacing `true` with an email check.
--
-- Each policy below has a plain-English comment describing what it PERMITS and
-- what it BLOCKS, so the model can be audited without reading SQL.
-- ============================================================================

-- gen_random_uuid() is built into Postgres 15 (Supabase) — no extension needed.

-- updated_at helper -----------------------------------------------------------
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ===========================================================================
-- leads — inbound enquiries. Columns mirror the existing EnquiryForm fields
-- EXACTLY (name, brand_name, email, link, industry, investment, timing, vision)
-- so app/api/enquiry can persist without renaming anything.
-- ===========================================================================
create table public.leads (
  id           uuid primary key default gen_random_uuid(),
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now(),
  name         text not null,
  brand_name   text,
  email        text not null,
  link         text,
  industry     text,
  investment   text,
  timing       text,
  vision       text,
  source       text,
  status       text not null default 'new' check (status in
                 ('new','qualified','discovery_sent','proposal_sent',
                  'won','lost','archived')),
  notes        text
);

create index leads_status_idx     on public.leads (status);
create index leads_created_at_idx on public.leads (created_at desc);

create trigger leads_set_updated_at
  before update on public.leads
  for each row execute function public.set_updated_at();

-- ===========================================================================
-- discovery_responses — Phase 01 questionnaire, one row per lead
-- ===========================================================================
create table public.discovery_responses (
  id           uuid primary key default gen_random_uuid(),
  lead_id      uuid not null references public.leads (id) on delete cascade,
  token        uuid not null unique default gen_random_uuid(),  -- URL: /discovery/[token]
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now(),
  submitted_at timestamptz,               -- null until final submit
  current_step integer not null default 0,-- 0-indexed; resume point
  answers      jsonb not null default '{}'::jsonb
);

create index discovery_lead_id_idx on public.discovery_responses (lead_id);
create index discovery_token_idx   on public.discovery_responses (token);

create trigger discovery_set_updated_at
  before update on public.discovery_responses
  for each row execute function public.set_updated_at();

-- ===========================================================================
-- proposals — one considered offer per engagement
-- ===========================================================================
create table public.proposals (
  id             uuid primary key default gen_random_uuid(),
  lead_id        uuid not null references public.leads (id) on delete cascade,
  token          uuid not null unique default gen_random_uuid(),  -- URL: /proposal/[token]
  created_at     timestamptz not null default now(),
  sent_at        timestamptz,
  viewed_at      timestamptz,
  accepted_at    timestamptz,
  declined_at    timestamptz,
  decline_reason text,
  status         text not null default 'draft' check (status in
                   ('draft','sent','viewed','accepted','declined','expired')),
  phases         jsonb not null default '[]'::jsonb,  -- [{key,title,description,deliverables[],price_cents,optional?}]
  total_cents    integer,
  deposit_cents  integer,
  payment_terms  text,
  revision_rounds integer not null default 2,
  timeline_weeks integer,
  expires_at     timestamptz,
  signed_name    text,
  notes          text
);

create index proposals_lead_id_idx    on public.proposals (lead_id);
create index proposals_status_idx     on public.proposals (status);
create index proposals_token_idx      on public.proposals (token);
create index proposals_created_at_idx on public.proposals (created_at desc);

-- ===========================================================================
-- proposal_events — lightweight analytics on the client's proposal view
-- ===========================================================================
create table public.proposal_events (
  id           uuid primary key default gen_random_uuid(),
  proposal_id  uuid not null references public.proposals (id) on delete cascade,
  created_at   timestamptz not null default now(),
  event_type   text not null check (event_type in
                 ('viewed','section_expanded','accepted','declined')),
  metadata     jsonb not null default '{}'::jsonb
);

create index proposal_events_proposal_id_idx on public.proposal_events (proposal_id);

-- ===========================================================================
-- ROW LEVEL SECURITY
-- ===========================================================================
alter table public.leads               enable row level security;
alter table public.discovery_responses enable row level security;
alter table public.proposals           enable row level security;
alter table public.proposal_events     enable row level security;

-- NOTE ON ANONYMOUS ACCESS: there are deliberately NO anon/public policies on
-- any table. With RLS enabled and no matching policy, the anon key is blocked
-- from every row and every column. All client-facing reads/writes (discovery
-- load + autosave, proposal view/accept/decline, event logging) run on the
-- server with the service_role key, which bypasses RLS and filters by token.
-- service_role is never exposed to the browser.

-- PERMITS: your signed-in admin to read and write every lead.
-- BLOCKS:  anonymous visitors entirely (no anon policy exists).
create policy "leads: admin full access"
  on public.leads for all to authenticated
  using (true) with check (true);

-- PERMITS: admin to read/manage every discovery response.
-- BLOCKS:  anonymous visitors from direct table access — the client's
--          /discovery/[token] page reads and autosaves via a server action
--          under service_role, matching the token in the query, not here.
create policy "discovery: admin full access"
  on public.discovery_responses for all to authenticated
  using (true) with check (true);

-- PERMITS: admin to read/manage every proposal.
-- BLOCKS:  anonymous visitors from direct table access — the client's
--          /proposal/[token] page (view / accept / decline) runs server-side
--          under service_role with an explicit `where token = …`.
create policy "proposals: admin full access"
  on public.proposals for all to authenticated
  using (true) with check (true);

-- PERMITS: admin to read the event log in the pipeline.
-- BLOCKS:  anonymous visitors — event rows (viewed/accepted/…) are written by
--          the server under service_role when the proposal page loads or acts.
create policy "proposal_events: admin full access"
  on public.proposal_events for all to authenticated
  using (true) with check (true);
