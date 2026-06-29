"use client";

import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, Instagram, Facebook, Linkedin } from "lucide-react";
import { useLocale } from "@/components/locale-provider";
import { companyInfo } from "@/lib/content";

export function Footer() {
  const { t } = useLocale();

  return (
    <footer className="bg-navy-deep text-white">
      <div className="container py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        <div>
          <Image
            src="/logo-white.svg"
            alt="Premium Qiymətləndirmə MMC"
            width={200}
            height={55}
            className="h-12 w-auto mb-4"
          />
          <p className="text-white/60 text-sm leading-relaxed">{t.footer.tagline}</p>
          <div className="flex gap-3 mt-5">
            {[Instagram, Facebook, Linkedin].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center hover:bg-gold hover:border-gold hover:text-navy-deep transition-colors"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-display text-lg font-semibold text-gold mb-4">
            {t.footer.quickLinksTitle}
          </h4>
          <ul className="space-y-2 text-sm text-white/70">
            <li><Link href="/" className="hover:text-gold transition-colors">{t.nav.home}</Link></li>
            <li><Link href="/xidmetler" className="hover:text-gold transition-colors">{t.nav.services}</Link></li>
            <li><Link href="/haqqimizda" className="hover:text-gold transition-colors">{t.nav.about}</Link></li>
            <li><Link href="/xeberler" className="hover:text-gold transition-colors">{t.nav.news}</Link></li>
            <li><Link href="/estimate" className="hover:text-gold transition-colors">{t.nav.calculator}</Link></li>
            <li><Link href="/elaqe" className="hover:text-gold transition-colors">{t.nav.contact}</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-lg font-semibold text-gold mb-4">
            {t.footer.servicesTitle}
          </h4>
          <ul className="space-y-2 text-sm text-white/70">
            {t.services.map((s) => (
              <li key={s.id}>
                <Link href={`/xidmetler#${s.id}`} className="hover:text-gold transition-colors">
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-display text-lg font-semibold text-gold mb-4">
            {t.footer.contactTitle}
          </h4>
          <ul className="space-y-3 text-sm text-white/70">
            <li className="flex gap-2">
              <MapPin size={18} className="text-gold shrink-0 mt-0.5" />
              <span>{companyInfo.address}</span>
            </li>
            {companyInfo.phoneLinks.map((p, i) => (
              <li key={p} className="flex gap-2 items-center">
                <Phone size={16} className="text-gold shrink-0" />
                <a href={`tel:${p}`} className="hover:text-gold transition-colors">
                  {companyInfo.phones[i]}
                </a>
              </li>
            ))}
            <li className="flex gap-2 items-center">
              <Mail size={16} className="text-gold shrink-0" />
              <a href={`mailto:${companyInfo.email}`} className="hover:text-gold transition-colors break-all">
                {companyInfo.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 py-6">
        <p className="container text-center text-xs text-white/50">{t.footer.rights}</p>
      </div>
    </footer>
  );
}
