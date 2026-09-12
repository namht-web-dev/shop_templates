import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { NewsService } from "@/services";
import { PAGE_SIZE, siteConfig } from "@/config/site";
import type { Locale, NewsCategory } from "@/types";

import { isLocale, routing } from "@/i18n/routing";
import NewsPageClient from "@/components/news/NewsPageClient";

type NewsPageProps = {
  params: Promise<{
    locale: string;
  }>;
  searchParams: Promise<{
    category?: string;
    page?: string;
  }>;
};

const NEWS_CATEGORIES: NewsCategory[] = [
  "iot",
  "technology",
  "esp32",
  "ai-iot",
  "products",
];

function parseCategory(value?: string): NewsCategory | "all" {
  if (!value || value === "all") {
    return "all";
  }

  return NEWS_CATEGORIES.includes(value as NewsCategory)
    ? (value as NewsCategory)
    : "all";
}

function parsePage(value?: string) {
  const page = Number(value);

  return Number.isInteger(page) && page > 0 ? page : 1;
}

export async function generateMetadata({
  params,
}: NewsPageProps): Promise<Metadata> {
  const { locale: rawLocale } = await params;

  const locale: Locale = isLocale(rawLocale)
    ? rawLocale
    : routing.defaultLocale;
  const t = await getTranslations({ locale, namespace: "seo" });

  return {
    title: t("newsTitle"),
    description: t("newsDesc"),
    alternates: {
      canonical: `${siteConfig.url}/${locale}/news`,
    },
  };
}

export default async function NewsPage({
  params,
  searchParams,
}: NewsPageProps) {
  const { locale } = await params;
  const search = await searchParams;

  const category = parseCategory(search.category);
  const page = parsePage(search.page);

  const news = await NewsService.getNews({
    category,
    page,
    pageSize: PAGE_SIZE,
  });

  return (
    <NewsPageClient
      locale={locale}
      news={news}
      category={category}
      page={page}
    />
  );
}
