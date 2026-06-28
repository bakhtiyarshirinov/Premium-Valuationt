import type { MetadataRoute } from "next";
import { content } from "@/lib/content";

const baseUrl = "https://premiumqiymetlendirme.az";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/xidmetler", "/haqqimizda", "/xeberler", "/elaqe"].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
  }));

  const newsRoutes = content.az.news.map((article) => ({
    url: `${baseUrl}/xeberler/${article.slug}`,
    lastModified: new Date(article.date),
  }));

  return [...staticRoutes, ...newsRoutes];
}
