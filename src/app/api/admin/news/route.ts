import { isAdminRequest } from "@/lib/admin-auth";
import {
  listNews,
  createNews,
  updateNews,
  deleteNews,
} from "@/lib/news-store";

function unauth() {
  return Response.json({ error: "Unauthorized" }, { status: 401 });
}

export async function GET(request: Request) {
  if (!isAdminRequest(request)) return unauth();
  return Response.json(await listNews());
}

/** Body: { titleAz, titleRu, excerptAz, excerptRu, bodyAz, bodyRu, publishedAt } */
export async function POST(request: Request) {
  if (!isAdminRequest(request)) return unauth();
  const body = await request.json();
  const { titleAz, titleRu, excerptAz, excerptRu, bodyAz, bodyRu, publishedAt } = body;
  if (!titleAz || !titleRu || !excerptAz || !excerptRu || !bodyAz || !bodyRu || !publishedAt) {
    return Response.json({ error: "All fields required" }, { status: 400 });
  }
  const post = await createNews({ titleAz, titleRu, excerptAz, excerptRu, bodyAz, bodyRu, publishedAt });
  return Response.json(post, { status: 201 });
}

/** Body: { id, titleAz, titleRu, excerptAz, excerptRu, bodyAz, bodyRu, publishedAt } */
export async function PUT(request: Request) {
  if (!isAdminRequest(request)) return unauth();
  const body = await request.json();
  const { id, titleAz, titleRu, excerptAz, excerptRu, bodyAz, bodyRu, publishedAt } = body;
  if (!id || !titleAz || !titleRu || !excerptAz || !excerptRu || !bodyAz || !bodyRu || !publishedAt) {
    return Response.json({ error: "All fields required" }, { status: 400 });
  }
  const post = await updateNews(Number(id), { titleAz, titleRu, excerptAz, excerptRu, bodyAz, bodyRu, publishedAt });
  if (!post) return Response.json({ error: "Not found" }, { status: 404 });
  return Response.json(post);
}

/** ?id=123 */
export async function DELETE(request: Request) {
  if (!isAdminRequest(request)) return unauth();
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id) return Response.json({ error: "Missing id" }, { status: 400 });
  const deleted = await deleteNews(Number(id));
  if (!deleted) return Response.json({ error: "Not found" }, { status: 404 });
  return new Response(null, { status: 204 });
}
