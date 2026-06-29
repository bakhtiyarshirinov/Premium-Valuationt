import { listNews } from "@/lib/news-store";

export const dynamic = "force-dynamic";

/** Public — returns all news posts ordered newest first. */
export async function GET() {
  const posts = await listNews();
  return Response.json(posts);
}
