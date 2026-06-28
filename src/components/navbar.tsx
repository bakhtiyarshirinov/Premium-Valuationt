"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useLocale } from "@/components/locale-provider";
import { Button } from "@/components/ui/button";
import { companyInfo } from "@/lib/content";
import { cn } from "@/lib/utils";

export function Navbar() {
  const { locale, setLocale, t } = useLocale();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 40);
    }
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "/", label: t.nav.home },
    { href: "/xidmetler", label: t.nav.services },
    { href: "/haqqimizda", label: t.nav.about },
    { href: "/xeberler", label: t.nav.news },
    { href: "/elaqe", label: t.nav.contact },
  ];

  const whatsappHref = `https://wa.me/${companyInfo.whatsappNumber}`;

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled ? "bg-white/95 backdrop-blur-md shadow-md py-3" : "bg-transparent py-5"
      )}
    >
      <div className="container flex items-center justify-between">
        <Link href="/" className="flex items-center shrink-0">
          <Image
            src={scrolled ? "/logo.svg" : "/logo-white.svg"}
            alt="Premium Qiymətləndirmə MMC"
            width={200}
            height={55}
            priority
            className="h-10 w-auto md:h-12"
          />
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-semibold transition-colors hover:text-gold",
                scrolled ? "text-navy" : "text-white"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-4">
          <div
            className={cn(
              "flex items-center rounded-full border text-xs font-bold overflow-hidden",
              scrolled ? "border-navy/20" : "border-white/40"
            )}
          >
            <button
              onClick={() => setLocale("az")}
              className={cn(
                "px-3 py-1.5 transition-colors",
                locale === "az"
                  ? "bg-gold text-navy-deep"
                  : scrolled
                  ? "text-navy"
                  : "text-white"
              )}
            >
              AZ
            </button>
            <button
              onClick={() => setLocale("ru")}
              className={cn(
                "px-3 py-1.5 transition-colors",
                locale === "ru"
                  ? "bg-gold text-navy-deep"
                  : scrolled
                  ? "text-navy"
                  : "text-white"
              )}
            >
              RU
            </button>
          </div>
          <Button asChild variant="gold" size="sm">
            <a href={whatsappHref} target="_blank" rel="noopener noreferrer">
              {t.nav.cta}
            </a>
          </Button>
        </div>

        <button
          className={cn("lg:hidden p-2", scrolled ? "text-navy" : "text-white")}
          onClick={() => setOpen((o) => !o)}
          aria-label="Menu"
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-white border-t border-navy/10 overflow-hidden"
          >
            <div className="container flex flex-col gap-4 py-6">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="text-base font-semibold text-navy"
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={() => setLocale("az")}
                  className={cn(
                    "px-4 py-1.5 rounded-full text-xs font-bold border border-navy/20",
                    locale === "az" ? "bg-gold text-navy-deep" : "text-navy"
                  )}
                >
                  AZ
                </button>
                <button
                  onClick={() => setLocale("ru")}
                  className={cn(
                    "px-4 py-1.5 rounded-full text-xs font-bold border border-navy/20",
                    locale === "ru" ? "bg-gold text-navy-deep" : "text-navy"
                  )}
                >
                  RU
                </button>
              </div>
              <Button asChild variant="gold" className="mt-2 w-full">
                <a href={whatsappHref} target="_blank" rel="noopener noreferrer">
                  {t.nav.cta}
                </a>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
