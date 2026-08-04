import { createBrowserClient } from "@supabase/ssr";

/**
 * Creates a client-side Supabase browser client for Next.js App Router
 */
export function createClient() {
  const url =
    process.env.NEXT_PUBLIC_SUPABASE_URL ||
    process.env.SUPABASE_URL ||
    "https://puhttyyxvilnkcqmsgjo.supabase.co";

  const anonKey =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    process.env.SUPABASE_PUBLISHABLE_KEY ||
    "sb_publishable_YKS5aIQOfP0biCh6CIGCWw_ia5CzZsk";

  return createBrowserClient(url, anonKey);
}
