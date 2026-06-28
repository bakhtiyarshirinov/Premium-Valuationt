import type { Metadata } from "next";
import { content } from "@/lib/content";
import { ContactPage } from "@/components/pages/contact-page";

export const metadata: Metadata = {
  title: content.az.pages.contact.title,
  description: content.az.pages.contact.description,
};

export default function Page() {
  return <ContactPage />;
}
