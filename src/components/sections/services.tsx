"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useLocale } from "@/components/locale-provider";
import { GlassCard } from "@/components/glass-card";
import { ServiceIcon } from "@/components/service-icon";
import { SectionReveal, StaggerGroup, StaggerItem } from "@/components/section-reveal";

export function Services() {
  const { t } = useLocale();

  return (
    <section id="services" className="py-24 md:py-32 bg-offwhite">
      <div className="container">
        <SectionReveal className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-gold font-semibold tracking-[0.2em] uppercase text-sm mb-3">
            {t.servicesSection.eyebrow}
          </p>
          <h2 className="font-display font-bold text-navy text-3xl md:text-4xl lg:text-5xl">
            {t.servicesSection.title}
          </h2>
          <p className="mt-4 text-muted text-base md:text-lg">{t.servicesSection.subtitle}</p>
        </SectionReveal>

        <StaggerGroup className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {t.services.map((service) => (
            <StaggerItem key={service.id}>
              <GlassCard id={service.id} className="h-full flex flex-col group">
                <div className="w-14 h-14 rounded-2xl bg-navy-gradient flex items-center justify-center mb-5 shadow-navy-lg">
                  <ServiceIcon icon={service.icon} size={26} className="text-gold" />
                </div>
                <h3 className="font-display text-xl font-semibold text-navy mb-3">
                  {service.title}
                </h3>
                <p className="text-muted text-sm leading-relaxed flex-1">{service.shortDesc}</p>
                <Link
                  href={`/xidmetler#${service.id}`}
                  className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-navy group-hover:text-gold transition-colors"
                >
                  {t.servicesSection.cta}
                  <ArrowUpRight size={16} />
                </Link>
              </GlassCard>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
