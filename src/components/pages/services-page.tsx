"use client";

import { CheckCircle2 } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { PageHero } from "@/components/page-hero";
import { ServiceIcon } from "@/components/service-icon";
import { SectionReveal } from "@/components/section-reveal";
import { CtaBanner } from "@/components/sections/cta-banner";
import { useLocale } from "@/components/locale-provider";

export function ServicesPage() {
  const { t } = useLocale();

  return (
    <>
      <Navbar />
      <main className="flex-1">
        <PageHero title={t.pages.services.heroTitle} subtitle={t.pages.services.heroSubtitle} />

        <section className="py-24 md:py-28 bg-offwhite">
          <div className="container space-y-16">
            {t.services.map((service, i) => (
              <SectionReveal key={service.id}>
                <div
                  id={service.id}
                  className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start bg-white rounded-3xl p-8 md:p-12 border border-navy/5 shadow-navy-lg scroll-mt-28"
                >
                  <div className="lg:col-span-2">
                    <div className="w-16 h-16 rounded-2xl bg-navy-gradient flex items-center justify-center mb-6 shadow-navy-lg">
                      <ServiceIcon icon={service.icon} size={30} className="text-gold" />
                    </div>
                    <span className="text-gold font-bold text-sm">0{i + 1}</span>
                    <h2 className="font-display text-2xl md:text-3xl font-bold text-navy mt-2 mb-4">
                      {service.title}
                    </h2>
                    <p className="text-muted leading-relaxed">{service.longDesc}</p>
                  </div>

                  <div className="lg:col-span-3">
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {service.bullets.map((b) => (
                        <li key={b} className="flex gap-3 items-start p-4 rounded-xl bg-offwhite">
                          <CheckCircle2 className="text-gold shrink-0 mt-0.5" size={20} />
                          <span className="text-sm text-ink">{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>
        </section>

        <CtaBanner />
      </main>
      <Footer />
    </>
  );
}
