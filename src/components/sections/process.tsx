"use client";

import { useLocale } from "@/components/locale-provider";
import { SectionReveal, StaggerGroup, StaggerItem } from "@/components/section-reveal";

export function Process() {
  const { t } = useLocale();

  return (
    <section className="py-24 md:py-32 bg-white relative overflow-hidden">
      <div className="container">
        <SectionReveal className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-gold font-semibold tracking-[0.2em] uppercase text-sm mb-3">
            {t.process.eyebrow}
          </p>
          <h2 className="font-display font-bold text-navy text-3xl md:text-4xl lg:text-5xl">
            {t.process.title}
          </h2>
          <p className="mt-4 text-muted text-base md:text-lg">{t.process.subtitle}</p>
        </SectionReveal>

        <StaggerGroup className="relative grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-6">
          <div className="hidden md:block absolute top-7 left-0 right-0 h-px">
            <div className="h-full w-full bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
          </div>

          {t.process.steps.map((step, i) => (
            <StaggerItem key={step.title} className="relative text-center md:text-left">
              <div className="relative inline-flex items-center justify-center w-14 h-14 rounded-full bg-navy-gradient text-gold font-display font-bold text-xl shadow-navy-lg mb-5 md:mb-6 mx-auto md:mx-0">
                {i + 1}
              </div>
              <h3 className="font-display text-lg font-semibold text-navy mb-2">{step.title}</h3>
              <p className="text-muted text-sm leading-relaxed">{step.desc}</p>
              <span className="inline-block mt-3 text-xs font-bold text-gold uppercase tracking-wide">
                {step.time}
              </span>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
