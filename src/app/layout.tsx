import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import "./globals.css";
import { LocaleProvider } from "@/components/locale-provider";

const display = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const body = DM_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://premiumqiymetlendirime.az"),
  title: {
    default: "Premium Qiymətləndirmə MMC | Daşınmaz Əmlak və Biznes Qiymətləndirilməsi",
    template: "%s | Premium Qiymətləndirmə MMC",
  },
  description:
    "Premium Qiymətləndirmə MMC — Bakıda peşəkar daşınmaz əmlak, daşınar əmlak, biznes və qeyri-maddi aktivlərin qiymətləndirilməsi xidmətləri. Dəqiq, etibarlı, beynəlxalq metodologiya.",
  keywords: [
    "qiymətləndirmə",
    "daşınmaz əmlak qiymətləndirmə",
    "əmlak ekspertizası Bakı",
    "biznes qiymətləndirmə Azərbaycan",
    "əmlak qiymətləndirici",
    "mənzil qiymətləndirmə Bakı",
    "kommersiya əmlak qiymətləndirmə",
    "qiymətləndirmə şirkəti Bakı",
    "peşəkar qiymətləndirici",
    "оценка недвижимости Баку",
    "оценщик недвижимости Азербайджан",
    "оценка бизнеса Баку",
    "оценочная компания Баку",
  ],
  authors: [{ name: "Premium Qiymətləndirmə MMC" }],
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://premiumqiymetlendirime.az",
  },
  openGraph: {
    title: "Premium Qiymətləndirmə MMC",
    description:
      "Daşınmaz əmlak, biznes və aktivlərin dəqiq, etibarlı və sürətli qiymətləndirilməsi.",
    url: "https://premiumqiymetlendirime.az",
    siteName: "Premium Qiymətləndirmə MMC",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    locale: "az_AZ",
    type: "website",
  },
  icons: {
    icon: "/logo.svg",
  },
};

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Premium Qiymətləndirmə MMC",
  description: "Bakıda peşəkar daşınmaz əmlak və biznes qiymətləndirilməsi",
  url: "https://premiumqiymetlendirime.az",
  telephone: "+994503801502",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Bakı",
    addressCountry: "AZ",
  },
  areaServed: "AZ",
  serviceType: "Qiymətləndirmə xidmətləri",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="az"
      className={`${display.variable} ${body.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col font-body bg-offwhite text-ink">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
        <LocaleProvider>{children}</LocaleProvider>
      </body>
    </html>
  );
}
