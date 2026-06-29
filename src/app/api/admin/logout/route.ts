import { ADMIN_COOKIE } from "@/lib/admin-auth";

/** POST → clears the admin session cookie. */
export async function POST() {
  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Set-Cookie": `${ADMIN_COOKIE}=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0`,
    },
  });
}
