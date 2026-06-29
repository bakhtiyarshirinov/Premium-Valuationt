import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getNewsBySlug } from "@/lib/news-store";
import { NewsDetailPage } from "@/components/pages/news-detail-page";

export const dynamic = "force-dynamic"; // always fetch fresh from DB

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = await getNewsBySlug(params.slug);
  if (!post) return {};
  return {
    title: post.titleRu,     // default to RU; locale-aware title set client-side
    description: post.excerptRu,
  };
}

export default async function Page({ params }: { params: { slug: string } }) {
  const post = await getNewsBySlug(params.slug);
  if (!post) notFound();
  return <NewsDetailPage post={post} />;
}
