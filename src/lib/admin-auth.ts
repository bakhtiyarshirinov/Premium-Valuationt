import { createHash } from "crypto";

export const ADMIN_COOKIE = "pq_admin";

/**
 * Derives a session token from ADMIN_PASSWORD.
 * If the env var changes, all existing sessions are automatically invalidated.
 */
export function createAdminToken(): string {
  const password = process.env.ADMIN_PASSWORD ?? "";
  return createHash("sha256")
    .update(`pq-admin-v1::${password}`)
    .digest("hex");
}

export function verifyAdminToken(token: string): boolean {
  if (!process.env.ADMIN_PASSWORD) return false;
  return token === createAdminToken();
}

/** Extracts the admin cookie from a raw Request (for API route handlers). */
export function isAdminRequest(request: Request): boolean {
  const cookieHeader = request.headers.get("cookie") ?? "";
  const match = cookieHeader.match(new RegExp(`${ADMIN_COOKIE}=([^;]+)`));
  const token = match?.[1] ?? "";
  return verifyAdminToken(decodeURIComponent(token));
}
