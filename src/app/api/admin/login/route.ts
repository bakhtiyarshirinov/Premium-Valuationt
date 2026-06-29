import { createAdminToken, ADMIN_COOKIE } from "@/lib/admin-auth";

/** POST { password } → sets httpOnly session cookie on success. */
export async function POST(request: Request) {
  if (!process.env.ADMIN_PASSWORD) {
    return new Response(
      JSON.stringify({ error: "ADMIN_PASSWORD env var not set on server" }),
      { status: 503, headers: { "Content-Type": "application/json" } }
    );
  }

  const { password } = (await request.json()) as { password?: string };
  if (password !== process.env.ADMIN_PASSWORD) {
    return new Response(JSON.stringify({ error: "Invalid password" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  const token = createAdminToken();
  const cookieValue = `${ADMIN_COOKIE}=${token}; Path=/; HttpOnly; SameSite=Strict; Max-Age=86400`;

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Set-Cookie": cookieValue,
    },
  });
}
