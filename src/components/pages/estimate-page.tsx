"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { PageHero } from "@/components/page-hero";
import { SectionReveal } from "@/components/section-reveal";
import { PropertyEstimator } from "@/components/property-estimator";
import { useLocale } from "@/components/locale-provider";

const i18n = {
  az: {
    heroTitle: "Əmlak Qiymət Kalkulyatoru",
    heroSubtitle: "Anında ilkin qiymət alın — rayon, sahə və vəziyyətə görə",
    sectionEyebrow: "Kalkulyator",
    sectionTitle: "Əmlakınızın Təxmini Dəyərini Hesablayın",
    sectionSubtitle:
      "Bu alət ilkin istiqamətlər üçündür. Dəqiq qiymət üçün akkreditasiya olunmuş ekspertimizlə əlaqə saxlayın.",
  },
  ru: {
    heroTitle: "Калькулятор стоимости недвижимости",
    heroSubtitle: "Мгновенная предварительная оценка — по площади, району и состоянию",
    sectionEyebrow: "Калькулятор",
    sectionTitle: "Рассчитайте примерную стоимость вашего объекта",
    sectionSubtitle:
      "Инструмент для первичного ориентира. Для точной оценки свяжитесь с нашим аккредитованным экспертом.",
  },
};

export function EstimatePage() {
  const { locale } = useLocale();
  const t = i18n[locale];

  return (
    <>
      <Navbar />
      <main className="flex-1">
        <PageHero title={t.heroTitle} subtitle={t.heroSubtitle} />

        <section className="py-24 md:py-32 bg-offwhite">
          <div className="container max-w-3xl">
            <SectionReveal className="text-center mb-12">
              <p className="text-gold font-semibold tracking-[0.2em] uppercase text-sm mb-3">
                {t.sectionEyebrow}
              </p>
              <h2 className="font-display font-bold text-navy text-3xl md:text-4xl">
                {t.sectionTitle}
              </h2>
              <p className="mt-4 text-muted text-base md:text-lg">{t.sectionSubtitle}</p>
            </SectionReveal>

            <SectionReveal delay={0.1}>
              <PropertyEstimator />
            </SectionReveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
