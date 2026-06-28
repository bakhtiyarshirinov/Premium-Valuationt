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
  metadataBase: new URL("https://premiumqiymetlendirme.az"),
  title: {
    default: "Premium Qiymətləndirmə MMC | Daşınmaz Əmlak və Biznes Qiymətləndirilməsi",
    template: "%s | Premium Qiymətləndirmə MMC",
  },
  description:
    "Premium Qiymətləndirmə MMC — Bakıda peşəkar daşınmaz əmlak, daşınar əmlak, biznes və qeyri-maddi aktivlərin qiymətləndirilməsi xidmətləri. Dəqiq, etibarlı, beynəlxalq metodologiya.",
  keywords: [
    "qiymətləndirmə",
    "daşınmaz əmlak qiymətləndirmə",
    "biznes qiymətləndirmə",
    "əmlak ekspertizası",
    "Bakı qiymətləndirmə şirkəti",
  ],
  authors: [{ name: "Premium Qiymətləndirmə MMC" }],
  openGraph: {
    title: "Premium Qiymətləndirmə MMC",
    description:
      "Daşınmaz əmlak, biznes və aktivlərin dəqiq, etibarlı və sürətli qiymətləndirilməsi.",
    url: "https://premiumqiymetlendirme.az",
    siteName: "Premium Qiymətləndirmə MMC",
    images: [{ url: "/logo.svg", width: 512, height: 512 }],
    locale: "az_AZ",
    type: "website",
  },
  icons: {
    icon: "/logo.svg",
  },
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
        <LocaleProvider>{children}</LocaleProvider>
      </body>
    </html>
  );
}
