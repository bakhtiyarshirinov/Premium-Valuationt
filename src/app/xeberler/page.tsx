import type { Metadata } from "next";
import { content } from "@/lib/content";
import { listNews } from "@/lib/news-store";
import { NewsPage } from "@/components/pages/news-page";

export const dynamic = "force-dynamic"; // always fetch fresh from DB

export const metadata: Metadata = {
  title: content.az.pages.news.title,
  description: content.az.pages.news.description,
};

export default async function Page() {
  const posts = await listNews();
  return <NewsPage posts={posts} />;
}
