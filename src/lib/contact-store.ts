import { getSql } from "@/lib/db";

export interface ContactSubmission {
  id: number;
  name: string;
  phone: string;
  email: string | null;
  service: string | null;
  message: string | null;
  locale: string;
  submittedAt: string; // ISO 8601
}

type Row = {
  id: number;
  name: string;
  phone: string;
  email: string | null;
  service: string | null;
  message: string | null;
  locale: string;
  submitted_at: Date | string;
};

function toSubmission(row: Row): ContactSubmission {
  return {
    id: row.id,
    name: row.name,
    phone: row.phone,
    email: row.email,
    service: row.service,
    message: row.message,
    locale: row.locale,
    submittedAt: new Date(row.submitted_at).toISOString(),
  };
}

export async function saveContact(data: {
  name: string;
  phone: string;
  email?: string;
  service?: string;
  message?: string;
  locale: string;
}): Promise<void> {
  const sql = getSql();
  await sql`
    INSERT INTO contact_submissions (name, phone, email, service, message, locale)
    VALUES (
      ${data.name},
      ${data.phone},
      ${data.email ?? null},
      ${data.service ?? null},
      ${data.message ?? null},
      ${data.locale}
    )
  `;
}

export async function listContacts(): Promise<ContactSubmission[]> {
  const sql = getSql();
  const rows = await sql`
    SELECT * FROM contact_submissions ORDER BY submitted_at DESC
  ` as Row[];
  return rows.map(toSubmission);
}
