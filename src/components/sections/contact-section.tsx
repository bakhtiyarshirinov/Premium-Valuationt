"use client";

import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { useLocale } from "@/components/locale-provider";
import { SectionReveal } from "@/components/section-reveal";
import { RequestForm } from "@/components/request-form";
import { companyInfo } from "@/lib/content";

export function ContactSection() {
  const { t } = useLocale();

  return (
    <section id="contact" className="py-24 md:py-32 bg-offwhite">
      <div className="container">
        <SectionReveal className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-gold font-semibold tracking-[0.2em] uppercase text-sm mb-3">
            {t.contact.eyebrow}
          </p>
          <h2 className="font-display font-bold text-navy text-3xl md:text-4xl lg:text-5xl">
            {t.contact.title}
          </h2>
          <p className="mt-4 text-muted text-base md:text-lg">{t.contact.subtitle}</p>
        </SectionReveal>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          <SectionReveal className="lg:col-span-2 flex flex-col gap-6">
            <div className="rounded-2xl overflow-hidden border border-navy/10 shadow-navy-lg h-64">
              <iframe
                src={companyInfo.mapEmbedSrc}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                title="Premium Qiymətləndirmə MMC - Xəritə"
              />
            </div>

            <div className="bg-white rounded-2xl p-6 border border-navy/5 space-y-4">
              <div className="flex gap-3">
                <MapPin className="text-gold shrink-0" size={20} />
                <div>
                  <p className="text-xs font-semibold text-muted uppercase tracking-wide">
                    {t.contact.addressLabel}
                  </p>
                  <p className="text-sm text-ink">{companyInfo.address}</p>
                </div>
              </div>
              <div className="flex gap-3">
                <Phone className="text-gold shrink-0" size={20} />
                <div>
                  <p className="text-xs font-semibold text-muted uppercase tracking-wide">
                    {t.contact.phoneLabel}
                  </p>
                  {companyInfo.phoneLinks.map((p, i) => (
                    <a key={p} href={`tel:${p}`} className="block text-sm text-ink hover:text-gold">
                      {companyInfo.phones[i]}
                    </a>
                  ))}
                </div>
              </div>
              <div className="flex gap-3">
                <Mail className="text-gold shrink-0" size={20} />
                <div>
                  <p className="text-xs font-semibold text-muted uppercase tracking-wide">
                    {t.contact.emailLabel}
                  </p>
                  <a href={`mailto:${companyInfo.email}`} className="text-sm text-ink hover:text-gold break-all">
                    {companyInfo.email}
                  </a>
                </div>
              </div>
              <div className="flex gap-3">
                <Clock className="text-gold shrink-0" size={20} />
                <div>
                  <p className="text-xs font-semibold text-muted uppercase tracking-wide">
                    {t.contact.hoursLabel}
                  </p>
                  <p className="text-sm text-ink">{t.contact.hoursValue}</p>
                </div>
              </div>
            </div>
          </SectionReveal>

          <SectionReveal delay={0.1} className="lg:col-span-3 bg-white rounded-2xl p-7 md:p-9 border border-navy/5 shadow-navy-lg">
            <RequestForm />
          </SectionReveal>
        </div>
      </div>
    </section>
  );
}
