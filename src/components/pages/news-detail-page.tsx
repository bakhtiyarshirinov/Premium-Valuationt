"use client";

import Link from "next/link";
import { ArrowLeft, Newspaper } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { SectionReveal } from "@/components/section-reveal";
import { useLocale } from "@/components/locale-provider";
import { formatDate } from "@/lib/format-date";

export function NewsDetailPage({ slug }: { slug: string }) {
  const { t, locale } = useLocale();
  const article = t.news.find((a) => a.slug === slug) ?? t.news[0];

  return (
    <>
      <Navbar />
      <main className="flex-1">
        <section className="relative bg-navy-gradient pt-40 pb-20 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(201,162,39,0.12),transparent_55%)]" />
          <div className="container relative z-10 max-w-3xl">
            <span className="text-gold font-semibold text-sm uppercase tracking-wide">
              {formatDate(article.date, locale)}
            </span>
            <h1 className="font-display font-bold text-white text-3xl md:text-4xl lg:text-5xl mt-4">
              {article.title}
            </h1>
          </div>
        </section>

        <section className="py-20 md:py-24 bg-white">
          <div className="container max-w-3xl">
            <SectionReveal>
              <div className="h-56 md:h-72 rounded-2xl bg-navy-gradient relative flex items-center justify-center mb-10 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(201,162,39,0.25),transparent_60%)]" />
                <Newspaper size={48} className="text-gold relative z-10" />
              </div>

              <div className="space-y-5">
                {article.body.map((paragraph, i) => (
                  <p key={i} className="text-muted leading-relaxed text-base md:text-lg">
                    {paragraph}
                  </p>
                ))}
              </div>

              <Link
                href="/xeberler"
                className="mt-10 inline-flex items-center gap-1.5 text-navy font-semibold hover:text-gold transition-colors"
              >
                <ArrowLeft size={18} />
                {t.newsSection.eyebrow}
              </Link>
            </SectionReveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
