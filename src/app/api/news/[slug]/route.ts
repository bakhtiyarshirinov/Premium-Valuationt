import { getNewsBySlug } from "@/lib/news-store";

/** Public — returns a single news post by slug. */
export async function GET(_req: Request, { params }: { params: { slug: string } }) {
  const post = await getNewsBySlug(params.slug);
  if (!post) return new Response("Not found", { status: 404 });
  return Response.json(post);
}
