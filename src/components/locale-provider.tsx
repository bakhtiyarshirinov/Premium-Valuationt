"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { Locale, getContent } from "@/lib/content";

interface LocaleContextValue {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: ReturnType<typeof getContent>;
}

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<Locale>("az");

  useEffect(() => {
    const stored = window.localStorage.getItem("pq-locale");
    if (stored === "az" || stored === "ru") {
      setLocale(stored);
    }
  }, []);

  const handleSetLocale = (l: Locale) => {
    setLocale(l);
    window.localStorage.setItem("pq-locale", l);
  };

  return (
    <LocaleContext.Provider value={{ locale, setLocale: handleSetLocale, t: getContent(locale) }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useLocale must be used within LocaleProvider");
  return ctx;
}
