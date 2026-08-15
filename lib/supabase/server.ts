import "server-only";
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "./types";

/**
 * Server Supabase clients (App Router). Two flavours:
 *
 *  - createSupabaseServerClient(): cookie-bound, carries the authenticated
 *    (admin) session. Use in admin server components / route handlers where the
 *    logged-in user's RLS applies.
 *
 *  - createSupabaseServiceClient(): SERVICE ROLE — bypasses RLS. SERVER ONLY,
 *    never import into a client component. Used to insert leads and to read/write
 *    discovery + proposal rows by their unguessable token on the public client
 *    pages. The token is enforced in the query, never trusted by the browser.
 */

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export function createSupabaseServerClient() {
  const cookieStore = cookies();
  return createServerClient<Database>(url!, anonKey!, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        // Throws when called from a Server Component (no mutable cookies there) —
        // safe to ignore; middleware/route handlers handle session refresh.
        try {
          cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options));
        } catch {
          /* noop */
        }
      },
    },
  });
}

export function createSupabaseServiceClient() {
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!serviceKey) {
    throw new Error("SUPABASE_SERVICE_ROLE_KEY is not set — service client unavailable.");
  }
  return createClient<Database>(url!, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
