"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { PageHero } from "@/components/page-hero";
import { ContactSection } from "@/components/sections/contact-section";
import { useLocale } from "@/components/locale-provider";

export function ContactPage() {
  const { t } = useLocale();

  return (
    <>
      <Navbar />
      <main className="flex-1">
        <PageHero title={t.pages.contact.heroTitle} subtitle={t.pages.contact.heroSubtitle} />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
