import { getSql } from "@/lib/db";
import { slugify } from "@/lib/slugify";
import type { NewsArticle } from "@/lib/content";

export interface DbNewsPost {
  id: number;
  slug: string;
  titleAz: string;
  titleRu: string;
  excerptAz: string;
  excerptRu: string;
  /** Paragraphs joined by \n\n */
  bodyAz: string;
  /** Paragraphs joined by \n\n */
  bodyRu: string;
  publishedAt: string; // YYYY-MM-DD
  createdAt: string;
  updatedAt: string;
}

type Row = {
  id: number;
  slug: string;
  title_az: string;
  title_ru: string;
  excerpt_az: string;
  excerpt_ru: string;
  body_az: string;
  body_ru: string;
  published_at: Date | string;
  created_at: Date | string;
  updated_at: Date | string;
};

function toPost(row: Row): DbNewsPost {
  return {
    id: row.id,
    slug: row.slug,
    titleAz: row.title_az,
    titleRu: row.title_ru,
    excerptAz: row.excerpt_az,
    excerptRu: row.excerpt_ru,
    bodyAz: row.body_az,
    bodyRu: row.body_ru,
    publishedAt: String(row.published_at).slice(0, 10), // YYYY-MM-DD
    createdAt: new Date(row.created_at).toISOString(),
    updatedAt: new Date(row.updated_at).toISOString(),
  };
}

/** Maps a DB post to the NewsArticle shape that existing components expect. */
export function postToArticle(post: DbNewsPost, locale: "az" | "ru"): NewsArticle {
  return {
    slug: post.slug,
    date: post.publishedAt,
    title: locale === "az" ? post.titleAz : post.titleRu,
    excerpt: locale === "az" ? post.excerptAz : post.excerptRu,
    body: (locale === "az" ? post.bodyAz : post.bodyRu).split("\n\n").filter(Boolean),
  };
}

export async function listNews(): Promise<DbNewsPost[]> {
  const sql = getSql();
  const rows = await sql`
    SELECT * FROM news_posts ORDER BY published_at DESC, created_at DESC
  ` as Row[];
  return rows.map(toPost);
}

export async function getNewsBySlug(slug: string): Promise<DbNewsPost | null> {
  const sql = getSql();
  const rows = await sql`
    SELECT * FROM news_posts WHERE slug = ${slug} LIMIT 1
  ` as Row[];
  return rows[0] ? toPost(rows[0]) : null;
}

export async function createNews(data: {
  titleAz: string;
  titleRu: string;
  excerptAz: string;
  excerptRu: string;
  bodyAz: string;
  bodyRu: string;
  publishedAt: string;
}): Promise<DbNewsPost> {
  const sql = getSql();
  const baseSlug = slugify(data.titleAz);
  // Ensure unique slug by appending id suffix if needed
  const rows = await sql`
    INSERT INTO news_posts (slug, title_az, title_ru, excerpt_az, excerpt_ru, body_az, body_ru, published_at)
    VALUES (
      ${baseSlug},
      ${data.titleAz}, ${data.titleRu},
      ${data.excerptAz}, ${data.excerptRu},
      ${data.bodyAz}, ${data.bodyRu},
      ${data.publishedAt}
    )
    ON CONFLICT (slug) DO UPDATE
      SET slug = news_posts.slug || '-' || (RANDOM() * 9999)::int::text
    RETURNING *
  ` as Row[];
  return toPost(rows[0]);
}

export async function updateNews(
  id: number,
  data: {
    titleAz: string;
    titleRu: string;
    excerptAz: string;
    excerptRu: string;
    bodyAz: string;
    bodyRu: string;
    publishedAt: string;
  }
): Promise<DbNewsPost | null> {
  const sql = getSql();
  const rows = await sql`
    UPDATE news_posts
    SET title_az = ${data.titleAz},
        title_ru = ${data.titleRu},
        excerpt_az = ${data.excerptAz},
        excerpt_ru = ${data.excerptRu},
        body_az = ${data.bodyAz},
        body_ru = ${data.bodyRu},
        published_at = ${data.publishedAt},
        updated_at = NOW()
    WHERE id = ${id}
    RETURNING *
  ` as Row[];
  return rows[0] ? toPost(rows[0]) : null;
}

export async function deleteNews(id: number): Promise<boolean> {
  const sql = getSql();
  const rows = await sql`DELETE FROM news_posts WHERE id = ${id} RETURNING id` as { id: number }[];
  return rows.length > 0;
}
