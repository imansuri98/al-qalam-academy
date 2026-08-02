import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { createClient } from "@supabase/supabase-js";
import * as schema from "./schema";

// Default local environment variable fallbacks
const connectionString =
  process.env.DATABASE_URL || "postgres://postgres:postgres@127.0.0.1:5432/alarabi";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://demo.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "demo-anon-key";

/**
 * PostgreSQL Connection Pool for Drizzle ORM
 */
const queryClient = postgres(connectionString, { max: 10, idle_timeout: 20 });
export const db = drizzle(queryClient, { schema });

/**
 * Supabase Auth & Storage Client (Free Tier Hosted / Self-Hosted)
 * Supports Google OAuth, Sign in with Apple, and Email/Password
 */
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
