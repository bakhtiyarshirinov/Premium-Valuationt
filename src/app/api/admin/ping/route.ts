/**
 * GET /api/admin/ping — lightweight auth probe used by AdminShell.
 * Returns 200 if authenticated, 401 if not. No DB call.
 */
import { isAdminRequest } from "@/lib/admin-auth";

export async function GET(request: Request) {
  if (!isAdminRequest(request)) {
    return new Response("Unauthorized", { status: 401 });
  }
  return new Response("OK", { status: 200 });
}
