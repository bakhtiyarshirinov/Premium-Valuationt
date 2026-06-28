"use client";

import { CheckCircle2 } from "lucide-react";
import { useLocale } from "@/components/locale-provider";
import { SectionReveal, StaggerGroup, StaggerItem } from "@/components/section-reveal";

export function WhyUs() {
  const { t } = useLocale();

  return (
    <section className="py-24 md:py-32 bg-offwhite relative">
      <div className="container">
        <SectionReveal className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-gold font-semibold tracking-[0.2em] uppercase text-sm mb-3">
            {t.whyUs.eyebrow}
          </p>
          <h2 className="font-display font-bold text-navy text-3xl md:text-4xl lg:text-5xl">
            {t.whyUs.title}
          </h2>
          <p className="mt-4 text-muted text-base md:text-lg">{t.whyUs.subtitle}</p>
        </SectionReveal>

        <StaggerGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {t.whyUs.items.map((item) => (
            <StaggerItem key={item.title}>
              <div className="flex gap-4 p-6 rounded-2xl bg-white border border-navy/5 hover:border-gold/40 hover:shadow-gold transition-all duration-300 h-full">
                <CheckCircle2 className="text-gold shrink-0 mt-0.5" size={24} />
                <div>
                  <h3 className="font-display font-semibold text-navy mb-1.5">{item.title}</h3>
                  <p className="text-muted text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
