import type { Metadata } from "next";
import { content } from "@/lib/content";
import { ServicesPage } from "@/components/pages/services-page";

export const metadata: Metadata = {
  title: content.az.pages.services.title,
  description: content.az.pages.services.description,
};

export default function Page() {
  return <ServicesPage />;
}
