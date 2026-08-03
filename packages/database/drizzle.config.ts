import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/schema.ts",
  out: "./drizzle",
  driver: "pg",
  dbCredentials: {
    connectionString: process.env.DATABASE_URL || "postgresql://alqalam_academy_user:alqalam_academy_2026!@127.0.0.1:5432/alqalam_academy",
  },
});
