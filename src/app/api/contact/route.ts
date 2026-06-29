/**
 * POST /api/contact — saves a contact form submission to the DB.
 * Called in parallel with the existing WhatsApp/email behaviour;
 * does NOT replace it.
 */
import { saveContact } from "@/lib/contact-store";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, email, service, message, locale } = body as {
      name?: string;
      phone?: string;
      email?: string;
      service?: string;
      message?: string;
      locale?: string;
    };

    if (!name?.trim() || !phone?.trim()) {
      return Response.json({ error: "name and phone are required" }, { status: 400 });
    }

    await saveContact({
      name: name.trim(),
      phone: phone.trim(),
      email: email?.trim() || undefined,
      service: service?.trim() || undefined,
      message: message?.trim() || undefined,
      locale: locale ?? "az",
    });

    return Response.json({ ok: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("[POST /api/contact]", message);
    return Response.json({ ok: false, error: message }, { status: 500 });
  }
}
