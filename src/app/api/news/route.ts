import { listNews } from "@/lib/news-store";

/** Public — returns all news posts ordered newest first. */
export async function GET() {
  const posts = await listNews();
  return Response.json(posts);
}
