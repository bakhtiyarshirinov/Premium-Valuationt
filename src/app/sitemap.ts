import type { MetadataRoute } from "next";
import { listNews } from "@/lib/news-store";

export const dynamic = "force-dynamic";

const baseUrl = "https://premiumqiymetlendirime.az";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const homeRoute = {
    url: baseUrl,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 1.0,
  };

  const staticRoutes = ["/xidmetler", "/haqqimizda", "/xeberler", "/estimate", "/elaqe"].map(
    (path) => ({
      url: `${baseUrl}${path}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })
  );

  let newsRoutes: MetadataRoute.Sitemap = [];
  try {
    const news = await listNews();
    newsRoutes = news.map((article) => ({
      url: `${baseUrl}/xeberler/${article.slug}`,
      lastModified: new Date(article.publishedAt),
      changeFrequency: "weekly" as const,
      priority: 0.6,
    }));
  } catch (err) {
    console.error("sitemap: failed to load news from DB, falling back to static routes only", err);
  }

  return [homeRoute, ...staticRoutes, ...newsRoutes];
}
