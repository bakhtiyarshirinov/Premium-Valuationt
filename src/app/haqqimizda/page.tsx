import type { Metadata } from "next";
import { content } from "@/lib/content";
import { AboutPage } from "@/components/pages/about-page";

export const metadata: Metadata = {
  title: content.az.pages.about.title,
  description: content.az.pages.about.description,
};

export default function Page() {
  return <AboutPage />;
}
