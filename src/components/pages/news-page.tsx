"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { PageHero } from "@/components/page-hero";
import { NewsCard } from "@/components/news-card";
import { StaggerGroup, StaggerItem } from "@/components/section-reveal";
import { CtaBanner } from "@/components/sections/cta-banner";
import { useLocale } from "@/components/locale-provider";

export function NewsPage() {
  const { t } = useLocale();

  return (
    <>
      <Navbar />
      <main className="flex-1">
        <PageHero title={t.pages.news.heroTitle} subtitle={t.pages.news.heroSubtitle} />

        <section className="py-24 md:py-28 bg-offwhite">
          <div className="container">
            <StaggerGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
              {t.news.map((article) => (
                <StaggerItem key={article.slug}>
                  <NewsCard article={article} readMoreLabel={t.newsSection.readMore} />
                </StaggerItem>
              ))}
            </StaggerGroup>
          </div>
        </section>

        <CtaBanner />
      </main>
      <Footer />
    </>
  );
}
