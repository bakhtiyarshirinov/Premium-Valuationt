"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { PageHero } from "@/components/page-hero";
import { NewsCard } from "@/components/news-card";
import { StaggerGroup, StaggerItem } from "@/components/section-reveal";
import { CtaBanner } from "@/components/sections/cta-banner";
import { useLocale } from "@/components/locale-provider";
import { postToArticle, type DbNewsPost } from "@/lib/news-store";
import { Newspaper } from "lucide-react";

export function NewsPage({ posts }: { posts: DbNewsPost[] }) {
  const { t, locale } = useLocale();
  const articles = posts.map((p) => postToArticle(p, locale));

  return (
    <>
      <Navbar />
      <main className="flex-1">
        <PageHero title={t.pages.news.heroTitle} subtitle={t.pages.news.heroSubtitle} />

        <section className="py-24 md:py-28 bg-offwhite">
          <div className="container">
            {articles.length === 0 ? (
              <div className="flex flex-col items-center py-20 gap-4 text-center">
                <Newspaper size={40} className="text-muted" />
                <p className="text-muted">
                  {locale === "az" ? "Hələ xəbər yoxdur." : "Новостей пока нет."}
                </p>
              </div>
            ) : (
              <StaggerGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
                {articles.map((article) => (
                  <StaggerItem key={article.slug}>
                    <NewsCard article={article} readMoreLabel={t.newsSection.readMore} />
                  </StaggerItem>
                ))}
              </StaggerGroup>
            )}
          </div>
        </section>

        <CtaBanner />
      </main>
      <Footer />
    </>
  );
}
