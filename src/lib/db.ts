import { neon } from "@neondatabase/serverless";

/**
 * Returns a Neon SQL client.
 * Throws a clear error at runtime if DATABASE_URL is not set,
 * rather than crashing at module load (which would break `next build`).
 */
export function getSql() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error(
      "DATABASE_URL is not set. Add it to .env.local (local dev) or " +
        "Vercel Environment Variables (production). See setup instructions."
    );
  }
  return neon(url);
}
