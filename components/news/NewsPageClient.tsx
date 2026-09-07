"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Radio } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { NewsCard } from "@/components/cards";
import { EmptyState, ErrorState } from "@/components/shared/states";

import { useI18n } from "@/src/i18n";
import { PATHS } from "@/src/lib/paths";
import type { NewsArticle, NewsCategory } from "@/src/types";

type NewsPageClientProps = {
  locale: string;
  news: {
    items: NewsArticle[];
    total: number;
    totalPages: number;
  };
  category: NewsCategory | "all";
  page: number;
};

const ALL = "all" as const;

export default function NewsPageClient({
  news,
  category,
  page,
}: NewsPageClientProps) {
  const { t } = useI18n();

  const router = useRouter();
  const searchParams = useSearchParams();

  const totalPages = Math.max(1, news.totalPages);

  function updateQuery(
    nextCategory: NewsCategory | typeof ALL,
    nextPage: number,
  ) {
    const params = new URLSearchParams(searchParams.toString());

    if (nextCategory === ALL) {
      params.delete("category");
    } else {
      params.set("category", nextCategory);
    }

    if (nextPage <= 1) {
      params.delete("page");
    } else {
      params.set("page", String(nextPage));
    }

    const query = params.toString();

    router.push(query ? `?${query}` : window.location.pathname);
  }

  function handleCategoryChange(value: NewsCategory | typeof ALL) {
    updateQuery(value, 1);
  }

  function handlePageChange(nextPage: number) {
    updateQuery(category, nextPage);
  }

  return (
    <div className="container-app py-10">
      <header className="mb-8 border-b pb-6">
        <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-destructive">
          <Radio className="h-4 w-4" aria-hidden="true" />

          {t("news.kicker")}
        </p>

        <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
          {t("news.title")}
        </h1>

        <p className="mt-2 max-w-2xl text-muted-foreground">
          {t("news.subtitle")}
        </p>
      </header>

      <div className="mb-8 flex flex-wrap items-center gap-3">
        <Select
          value={category}
          onValueChange={(value) =>
            handleCategoryChange(value as NewsCategory | typeof ALL)
          }
        >
          <SelectTrigger className="w-47.5" aria-label={t("blog.category")}>
            <SelectValue />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value={ALL}>{t("blog.allCategories")}</SelectItem>

            <SelectItem value="iot">{t("newsCategories.iot")}</SelectItem>

            <SelectItem value="technology">
              {t("newsCategories.technology")}
            </SelectItem>

            <SelectItem value="esp32">{t("newsCategories.esp32")}</SelectItem>

            <SelectItem value="ai-iot">{t("newsCategories.ai-iot")}</SelectItem>

            <SelectItem value="products">
              {t("newsCategories.products")}
            </SelectItem>
          </SelectContent>
        </Select>

        <span className="ml-auto text-sm text-muted-foreground">
          {t("news.newsCount", {
            count: news.total,
          })}
        </span>
      </div>

      {news.items.length === 0 ? (
        <EmptyState
          title={t("news.emptyTitle")}
          description={t("news.emptyDesc")}
          icon={
            <Radio
              className="h-6 w-6 text-muted-foreground"
              aria-hidden="true"
            />
          }
          action={
            <Button variant="outline" onClick={() => handleCategoryChange(ALL)}>
              {t("shop.clearFilters")}
            </Button>
          }
        />
      ) : (
        <>
          <div className="space-y-5">
            {news.items.map((article) => (
              <NewsCard
                key={article.id}
                article={article}
                link={PATHS.newsDetail(article.slug)}
              />
            ))}
          </div>

          {totalPages > 1 && (
            <nav
              className="mt-10 flex items-center justify-center gap-2"
              aria-label="Pagination"
            >
              <Button
                variant="outline"
                size="sm"
                disabled={page <= 1}
                onClick={() => handlePageChange(Math.max(1, page - 1))}
              >
                {t("common.prev")}
              </Button>

              <span className="px-3 text-sm text-muted-foreground">
                {t("common.page", {
                  current: page,
                  total: totalPages,
                })}
              </span>

              <Button
                variant="outline"
                size="sm"
                disabled={page >= totalPages}
                onClick={() => handlePageChange(Math.min(totalPages, page + 1))}
              >
                {t("common.next")}
              </Button>
            </nav>
          )}
        </>
      )}
    </div>
  );
}
