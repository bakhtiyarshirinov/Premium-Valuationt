/**
 * One-time database initialization endpoint.
 * GET /api/init-db  (protected by ADMIN_PASSWORD)
 *
 * Creates tables (idempotent — safe to run multiple times) and seeds
 * the districts table with Baku district data.
 * Does NOT seed news_posts or contact_submissions.
 */
import { isAdminRequest } from "@/lib/admin-auth";
import { getSql } from "@/lib/db";

export async function GET(request: Request) {
  if (!isAdminRequest(request)) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  const sql = getSql();

  try {
    // Districts
    await sql`
      CREATE TABLE IF NOT EXISTS districts (
        id            TEXT PRIMARY KEY,
        label_az      TEXT NOT NULL,
        label_ru      TEXT NOT NULL,
        price_per_sqm INTEGER NOT NULL,
        updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )
    `;

    // Contact form submissions
    await sql`
      CREATE TABLE IF NOT EXISTS contact_submissions (
        id           SERIAL PRIMARY KEY,
        name         TEXT NOT NULL,
        phone        TEXT NOT NULL,
        email        TEXT,
        service      TEXT,
        message      TEXT,
        locale       TEXT NOT NULL DEFAULT 'az',
        submitted_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )
    `;

    // News posts
    await sql`
      CREATE TABLE IF NOT EXISTS news_posts (
        id           SERIAL PRIMARY KEY,
        slug         TEXT UNIQUE NOT NULL,
        title_az     TEXT NOT NULL,
        title_ru     TEXT NOT NULL,
        excerpt_az   TEXT NOT NULL,
        excerpt_ru   TEXT NOT NULL,
        body_az      TEXT NOT NULL,
        body_ru      TEXT NOT NULL,
        published_at DATE NOT NULL,
        created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )
    `;

    // Seed districts (ON CONFLICT = safe to re-run)
    await sql`
      INSERT INTO districts (id, label_az, label_ru, price_per_sqm) VALUES
        ('nasimi',    'Nəsimi',    'Насими',    1700),
        ('sabail',    'Səbail',    'Сабаил',    1900),
        ('narimanov', 'Nərimanov', 'Нариманов', 1350),
        ('xetai',     'Xətai',     'Хатаи',     1200),
        ('binagadi',  'Binəqədi',  'Бинагади',   950),
        ('surakhani', 'Suraxanı',  'Сураханы',   850)
      ON CONFLICT (id) DO NOTHING
    `;

    return Response.json({
      ok: true,
      message: "Tables created and districts seeded. Run once — idempotent.",
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return Response.json({ ok: false, error: message }, { status: 500 });
  }
}
