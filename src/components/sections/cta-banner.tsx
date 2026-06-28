"use client";

import { useLocale } from "@/components/locale-provider";
import { SectionReveal } from "@/components/section-reveal";
import { Button } from "@/components/ui/button";

export function CtaBanner() {
  const { t } = useLocale();

  return (
    <section className="relative bg-navy-gradient py-20 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(201,162,39,0.15),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(201,162,39,0.1),transparent_50%)]" />
      <div className="container relative z-10 text-center max-w-2xl">
        <SectionReveal>
          <h2 className="font-display font-bold text-white text-3xl md:text-4xl leading-tight mb-4">
            {t.ctaBanner.title}
          </h2>
          <p className="text-white/70 text-base md:text-lg mb-8">{t.ctaBanner.subtitle}</p>
          <Button asChild variant="gold" size="lg">
            <a href="#contact">{t.ctaBanner.cta}</a>
          </Button>
        </SectionReveal>
      </div>
    </section>
  );
}
