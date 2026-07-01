import type { MetadataRoute } from "next";
import { listNews } from "@/lib/news-store";

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

  const news = await listNews();
  const newsRoutes = news.map((article) => ({
    url: `${baseUrl}/xeberler/${article.slug}`,
    lastModified: new Date(article.publishedAt),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  return [homeRoute, ...staticRoutes, ...newsRoutes];
}
