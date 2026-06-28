import { Locale } from "@/lib/content";

// Manual month names — avoids server/client Intl locale mismatches (hydration errors)
// that occur with toLocaleDateString() across different ICU environments.
const monthNames: Record<Locale, string[]> = {
  az: [
    "yanvar",
    "fevral",
    "mart",
    "aprel",
    "may",
    "iyun",
    "iyul",
    "avqust",
    "sentyabr",
    "oktyabr",
    "noyabr",
    "dekabr",
  ],
  ru: [
    "января",
    "февраля",
    "марта",
    "апреля",
    "мая",
    "июня",
    "июля",
    "августа",
    "сентября",
    "октября",
    "ноября",
    "декабря",
  ],
};

export function formatDate(dateStr: string, locale: Locale = "az") {
  const [year, month, day] = dateStr.split("-").map(Number);
  return `${day} ${monthNames[locale][month - 1]} ${year}`;
}
