"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useLocale } from "@/components/locale-provider";
import { SectionReveal } from "@/components/section-reveal";

export function AboutSnippet() {
  const { t } = useLocale();

  return (
    <section className="py-24 md:py-28 bg-offwhite">
      <div className="container max-w-3xl text-center">
        <SectionReveal>
          <p className="text-gold font-semibold tracking-[0.2em] uppercase text-sm mb-3">
            {t.about.eyebrow}
          </p>
          <h2 className="font-display font-bold text-navy text-3xl md:text-4xl mb-6">
            {t.about.title}
          </h2>
          <p className="text-muted text-base md:text-lg leading-relaxed mb-8">
            {t.about.paragraph}
          </p>
          <Link
            href="/haqqimizda"
            className="inline-flex items-center gap-1.5 text-navy font-semibold hover:text-gold transition-colors"
          >
            {t.about.cta}
            <ArrowUpRight size={18} />
          </Link>
        </SectionReveal>
      </div>
    </section>
  );
}
