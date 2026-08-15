// ============================================================================
// Database types — hand-authored to match
// supabase/migrations/20260807143000_init_intake_proposal.sql exactly.
// Once a project is linked, regenerate from the source of truth:
//   supabase gen types typescript --linked > lib/supabase/types.ts
//
// Enums are text + CHECK in the DB (not native pg enums), so they appear here as
// string-literal unions rather than under Database["public"]["Enums"].
// ============================================================================

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type LeadStatus =
  | "new"
  | "qualified"
  | "discovery_sent"
  | "proposal_sent"
  | "won"
  | "lost"
  | "archived";
export type ProposalStatus = "draft" | "sent" | "viewed" | "accepted" | "declined" | "expired";
export type ProposalEventType = "viewed" | "section_expanded" | "accepted" | "declined";

// Shape of one entry in proposals.phases (stored untyped as jsonb).
export type ProposalPhase = {
  key: string;
  title: string;
  description: string;
  deliverables: string[];
  price_cents: number;
  optional?: boolean;
};

export interface Database {
  public: {
    Tables: {
      leads: {
        Row: {
          id: string;
          created_at: string;
          updated_at: string;
          name: string;
          brand_name: string | null;
          email: string;
          link: string | null;
          industry: string | null;
          investment: string | null;
          timing: string | null;
          vision: string | null;
          source: string | null;
          status: LeadStatus;
          notes: string | null;
        };
        Insert: {
          id?: string;
          created_at?: string;
          updated_at?: string;
          name: string;
          brand_name?: string | null;
          email: string;
          link?: string | null;
          industry?: string | null;
          investment?: string | null;
          timing?: string | null;
          vision?: string | null;
          source?: string | null;
          status?: LeadStatus;
          notes?: string | null;
        };
        Update: Partial<Database["public"]["Tables"]["leads"]["Insert"]>;
        Relationships: [];
      };
      discovery_responses: {
        Row: {
          id: string;
          lead_id: string;
          token: string;
          created_at: string;
          updated_at: string;
          submitted_at: string | null;
          current_step: number;
          answers: Json;
        };
        Insert: {
          id?: string;
          lead_id: string;
          token?: string;
          created_at?: string;
          updated_at?: string;
          submitted_at?: string | null;
          current_step?: number;
          answers?: Json;
        };
        Update: Partial<Omit<Database["public"]["Tables"]["discovery_responses"]["Insert"], "lead_id">> & {
          lead_id?: string;
        };
        Relationships: [];
      };
      proposals: {
        Row: {
          id: string;
          lead_id: string;
          token: string;
          created_at: string;
          sent_at: string | null;
          viewed_at: string | null;
          accepted_at: string | null;
          declined_at: string | null;
          decline_reason: string | null;
          status: ProposalStatus;
          phases: Json;
          total_cents: number | null;
          deposit_cents: number | null;
          payment_terms: string | null;
          revision_rounds: number;
          timeline_weeks: number | null;
          expires_at: string | null;
          signed_name: string | null;
          notes: string | null;
        };
        Insert: {
          id?: string;
          lead_id: string;
          token?: string;
          created_at?: string;
          sent_at?: string | null;
          viewed_at?: string | null;
          accepted_at?: string | null;
          declined_at?: string | null;
          decline_reason?: string | null;
          status?: ProposalStatus;
          phases?: Json;
          total_cents?: number | null;
          deposit_cents?: number | null;
          payment_terms?: string | null;
          revision_rounds?: number;
          timeline_weeks?: number | null;
          expires_at?: string | null;
          signed_name?: string | null;
          notes?: string | null;
        };
        Update: Partial<Database["public"]["Tables"]["proposals"]["Insert"]>;
        Relationships: [];
      };
      proposal_events: {
        Row: {
          id: string;
          proposal_id: string;
          created_at: string;
          event_type: ProposalEventType;
          metadata: Json;
        };
        Insert: {
          id?: string;
          proposal_id: string;
          created_at?: string;
          event_type: ProposalEventType;
          metadata?: Json;
        };
        Update: Partial<Database["public"]["Tables"]["proposal_events"]["Insert"]>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}

export type Lead = Database["public"]["Tables"]["leads"]["Row"];
export type DiscoveryResponse = Database["public"]["Tables"]["discovery_responses"]["Row"];
export type Proposal = Database["public"]["Tables"]["proposals"]["Row"];
export type ProposalEvent = Database["public"]["Tables"]["proposal_events"]["Row"];
