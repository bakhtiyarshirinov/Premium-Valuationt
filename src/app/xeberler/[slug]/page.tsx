import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { content } from "@/lib/content";
import { NewsDetailPage } from "@/components/pages/news-detail-page";

// TODO: client will provide real article content later — currently placeholder data
export function generateStaticParams() {
  return content.az.news.map((article) => ({ slug: article.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const article = content.az.news.find((a) => a.slug === params.slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.excerpt,
  };
}

export default function Page({ params }: { params: { slug: string } }) {
  const exists = content.az.news.some((a) => a.slug === params.slug);
  if (!exists) notFound();
  return <NewsDetailPage slug={params.slug} />;
}
