"use client";

import Link from "next/link";
import { Newspaper, ArrowUpRight } from "lucide-react";
import { NewsArticle } from "@/lib/content";
import { formatDate } from "@/lib/format-date";
import { useLocale } from "@/components/locale-provider";

export function NewsCard({ article, readMoreLabel }: { article: NewsArticle; readMoreLabel: string }) {
  const { locale } = useLocale();

  return (
    <div className="glass-card rounded-2xl overflow-hidden flex flex-col h-full hover:shadow-gold transition-all duration-300">
      {/* placeholder cover — replace with real article image later */}
      <div className="h-44 bg-navy-gradient relative flex items-center justify-center">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(201,162,39,0.25),transparent_60%)]" />
        <Newspaper size={36} className="text-gold relative z-10" />
      </div>
      <div className="p-6 flex flex-col flex-1">
        <span className="text-xs font-semibold text-gold uppercase tracking-wide">
          {formatDate(article.date, locale)}
        </span>
        <h3 className="font-display text-lg font-semibold text-navy mt-2 mb-3">
          {article.title}
        </h3>
        <p className="text-muted text-sm leading-relaxed flex-1">{article.excerpt}</p>
        <Link
          href={`/xeberler/${article.slug}`}
          className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-navy hover:text-gold transition-colors"
        >
          {readMoreLabel}
          <ArrowUpRight size={16} />
        </Link>
      </div>
    </div>
  );
}
