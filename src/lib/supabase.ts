import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Service-role Supabase client.
 *
 * This client uses the SUPABASE_SERVICE_ROLE_KEY, which bypasses RLS and has
 * full read/write access to every table. It MUST only ever be used from
 * server-side code (route handlers, server actions, server components) — never
 * shipped to the browser.
 *
 * The dashboard intentionally uses ONLY the service role because the public
 * anon key has no policies granted on these tables (see supabase/schema.sql).
 */
let cachedAdminClient: SupabaseClient | null = null;

export function getSupabaseAdmin(): SupabaseClient {
  if (cachedAdminClient) return cachedAdminClient;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceKey) {
    throw new Error(
      "Missing Supabase env vars. Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY."
    );
  }

  cachedAdminClient = createClient(url, serviceKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
  return cachedAdminClient;
}

/** Returns true if all required Supabase env vars are present. */
export function hasSupabaseConfig(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.SUPABASE_SERVICE_ROLE_KEY
  );
}
