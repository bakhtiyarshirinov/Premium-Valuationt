import type { Metadata } from "next";
import { content } from "@/lib/content";
import { NewsPage } from "@/components/pages/news-page";

export const metadata: Metadata = {
  title: content.az.pages.news.title,
  description: content.az.pages.news.description,
};

export default function Page() {
  return <NewsPage />;
}
