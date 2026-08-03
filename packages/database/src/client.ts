import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { createClient } from "@supabase/supabase-js";
import * as schema from "./schema";

export { eq, and, or, sql } from "drizzle-orm";

/**
 * Environment Variable Helper with Warning Notifications
 */
function getEnvVar(key: string, fallback: string): string {
  const value = process.env[key];
  if (!value && typeof window === "undefined") {
    console.warn(`[Al-Arabi DB Config] Warning: Environment variable '${key}' is missing. Using default fallback.`);
  }
  return value || fallback;
}

const connectionString = getEnvVar(
  "DATABASE_URL",
  "postgres://postgres:postgres@127.0.0.1:5432/alarabi"
);

const supabaseUrl = getEnvVar(
  "NEXT_PUBLIC_SUPABASE_URL",
  "https://demo.supabase.co"
);

const supabaseAnonKey = getEnvVar(
  "NEXT_PUBLIC_SUPABASE_ANON_KEY",
  "demo-anon-key"
);

/**
 * PostgreSQL Connection Pool for Drizzle ORM
 */
const queryClient = postgres(connectionString, { max: 10, idle_timeout: 20 });
export const db = drizzle(queryClient, { schema });

/**
 * Supabase Auth & Storage Client (Free Tier Hosted / Self-Hosted)
 */
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
