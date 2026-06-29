import { isAdminRequest } from "@/lib/admin-auth";
import { listContacts } from "@/lib/contact-store";

export async function GET(request: Request) {
  if (!isAdminRequest(request)) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  const submissions = await listContacts();
  return Response.json(submissions);
}
