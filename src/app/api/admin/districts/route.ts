import { isAdminRequest } from "@/lib/admin-auth";
import {
  getDistricts,
  createDistrict,
  updateDistrict,
  deleteDistrict,
} from "@/lib/districts-store";

function unauth() {
  return Response.json({ error: "Unauthorized" }, { status: 401 });
}

export async function GET(request: Request) {
  if (!isAdminRequest(request)) return unauth();
  return Response.json(await getDistricts());
}

/** Body: { labelAz, labelRu, pricePerSqm } */
export async function POST(request: Request) {
  if (!isAdminRequest(request)) return unauth();
  const { labelAz, labelRu, pricePerSqm } = await request.json();
  if (!labelAz || !labelRu || !pricePerSqm) {
    return Response.json({ error: "Missing fields" }, { status: 400 });
  }
  try {
    const record = await createDistrict({ labelAz, labelRu, pricePerSqm: Number(pricePerSqm) });
    return Response.json(record, { status: 201 });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Error";
    return Response.json({ error: msg }, { status: 409 });
  }
}

/** Body: { id, labelAz, labelRu, pricePerSqm } */
export async function PUT(request: Request) {
  if (!isAdminRequest(request)) return unauth();
  const { id, labelAz, labelRu, pricePerSqm } = await request.json();
  if (!id || !labelAz || !labelRu || !pricePerSqm) {
    return Response.json({ error: "Missing fields" }, { status: 400 });
  }
  const record = await updateDistrict(id, { labelAz, labelRu, pricePerSqm: Number(pricePerSqm) });
  if (!record) return Response.json({ error: "Not found" }, { status: 404 });
  return Response.json(record);
}

/** ?id=xxx */
export async function DELETE(request: Request) {
  if (!isAdminRequest(request)) return unauth();
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id) return Response.json({ error: "Missing id" }, { status: 400 });
  const deleted = await deleteDistrict(id);
  if (!deleted) return Response.json({ error: "Not found" }, { status: 404 });
  return new Response(null, { status: 204 });
}
