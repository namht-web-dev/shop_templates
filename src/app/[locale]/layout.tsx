import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import {
  SITE_DEFAULT_LOCALE,
  SITE_OPEN_GRAPH_LOCALES,
  siteConfig,
} from "@/src/config/site";
import { Locale } from "@/src/types";
import { ThemeProvider } from "@/src/lib/theme";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { LocaleProvider } from "@/src/i18n";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

type Props = {
  children: React.ReactNode;
  params: Promise<{
    locale: Locale;
  }>;
};

function isLocale(value: string): value is Locale {
  return value === "vi" || value === "en";
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : SITE_DEFAULT_LOCALE;

  const content = siteConfig.translations[locale];

  return {
    metadataBase: new URL(siteConfig.url),

    title: {
      default: content.title,
      template: `%s | ${content.name}`, // Tự động nối tên trang: "Giỏ hàng | Cửa hàng IoT"
    },

    description: content.description,
    keywords: content.keywords,

    alternates: {
      canonical: `/${locale}`,
      languages: {
        vi: "/vi",
        en: "/en",
        "x-default": `/${SITE_DEFAULT_LOCALE}`,
      },
    },

    openGraph: {
      type: "website",
      locale: SITE_OPEN_GRAPH_LOCALES[locale],
      url: `/${locale}`,
      siteName: content.name,
      title: content.title,
      description: content.description,
      images: [
        {
          url: siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: content.name,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: content.title,
      description: content.description,
      images: [siteConfig.ogImage],
    },

    robots: {
      index: true,
      follow: true,
    },

    icons: {
      icon: siteConfig.logo,
    },
  };
}

export default async function RootLayout({ children, params }: Props) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : SITE_DEFAULT_LOCALE;

  return (
    <html
      suppressHydrationWarning
      lang={locale}
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      data-scroll-behavior="smooth"
      translate="no"
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <LocaleProvider>
          <ThemeProvider>
            <Header />
            {children}
            <Footer />
          </ThemeProvider>
        </LocaleProvider>
      </body>
    </html>
  );
}
