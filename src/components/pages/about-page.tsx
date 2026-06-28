"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { PageHero } from "@/components/page-hero";
import { SectionReveal, StaggerGroup, StaggerItem } from "@/components/section-reveal";
import { CtaBanner } from "@/components/sections/cta-banner";
import { useLocale } from "@/components/locale-provider";

export function AboutPage() {
  const { t } = useLocale();

  return (
    <>
      <Navbar />
      <main className="flex-1">
        <PageHero title={t.pages.about.heroTitle} subtitle={t.pages.about.heroSubtitle} />

        <section className="py-24 md:py-28 bg-white">
          <div className="container max-w-3xl text-center">
            <SectionReveal>
              <p className="text-muted text-base md:text-lg leading-relaxed">
                {t.about.paragraph}
              </p>
            </SectionReveal>
          </div>
        </section>

        <section className="py-20 bg-offwhite">
          <div className="container grid grid-cols-1 md:grid-cols-2 gap-8">
            <SectionReveal className="bg-white rounded-2xl p-8 md:p-10 border border-navy/5 shadow-navy-lg">
              <h2 className="font-display text-2xl font-bold text-navy mb-4">
                {t.pages.about.missionTitle}
              </h2>
              <p className="text-muted leading-relaxed">{t.pages.about.mission}</p>
            </SectionReveal>
            <SectionReveal delay={0.1} className="bg-navy-gradient rounded-2xl p-8 md:p-10 shadow-navy-lg">
              <h2 className="font-display text-2xl font-bold text-gold mb-4">
                {t.pages.about.visionTitle}
              </h2>
              <p className="text-white/75 leading-relaxed">{t.pages.about.vision}</p>
            </SectionReveal>
          </div>
        </section>

        <section className="py-24 md:py-28 bg-white">
          <div className="container">
            <SectionReveal className="text-center max-w-2xl mx-auto mb-14">
              <h2 className="font-display font-bold text-navy text-3xl md:text-4xl">
                {t.pages.about.valuesTitle}
              </h2>
            </SectionReveal>
            <StaggerGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {t.pages.about.values.map((v, i) => (
                <StaggerItem key={v.title}>
                  <div className="text-center p-6 rounded-2xl bg-offwhite h-full">
                    <div className="w-12 h-12 mx-auto rounded-full bg-navy-gradient flex items-center justify-center font-display font-bold text-gold mb-4">
                      {i + 1}
                    </div>
                    <h3 className="font-display font-semibold text-navy mb-2">{v.title}</h3>
                    <p className="text-muted text-sm leading-relaxed">{v.desc}</p>
                  </div>
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
