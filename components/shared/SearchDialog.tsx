"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Loader2, Search, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { SearchService } from "@/src/services";
import type { GlobalSearchResult } from "@/src/api";
import { useI18n } from "@/src/i18n";
import { PATHS } from "@/src/lib/paths";

interface SearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SearchDialog({ open, onOpenChange }: SearchDialogProps) {
  const { t, l } = useI18n();

  const [query, setQuery] = useState("");
  const [results, setResults] = useState<GlobalSearchResult | null>(null);
  const [searching, setSearching] = useState(false);

  const trimmedQuery = query.trim();
  const hasQuery = trimmedQuery.length >= 2;

  useEffect(() => {
    if (!open || !hasQuery) {
      return;
    }

    let cancelled = false;

    const timer = setTimeout(() => {
      setSearching(true);

      SearchService.search(trimmedQuery, 4)
        .then((res) => {
          if (!cancelled) {
            setResults(res);
          }
        })
        .catch(() => {
          if (!cancelled) {
            setResults(null);
          }
        })
        .finally(() => {
          if (!cancelled) {
            setSearching(false);
          }
        });
    }, 300);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [open, trimmedQuery, hasQuery]);

  const groups: {
    key: keyof GlobalSearchResult;
    label: string;
    pathFor: (slug: string) => string;
  }[] = [
    {
      key: "products",
      label: t("search.products"),
      pathFor: (slug) => PATHS.shopProduct(slug),
    },
    {
      key: "news",
      label: t("search.news"),
      pathFor: (slug) => PATHS.newsDetail(slug),
    },
  ];

  const titleFor = (
    item:
      | { title: { vi: string; en: string } }
      | { name: { vi: string; en: string } },
  ): string => ("title" in item ? l(item.title) : l(item.name));

  const totalResults = results
    ? Object.values(results).reduce((sum, list) => sum + list.length, 0)
    : 0;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl gap-0 overflow-hidden p-0">
        <DialogHeader className="sr-only">
          <DialogTitle>{t("search.label")}</DialogTitle>
        </DialogHeader>

        <div className="flex items-center gap-2 border-b px-4">
          <Search
            className="h-4 w-4 shrink-0 text-muted-foreground"
            aria-hidden="true"
          />

          <input
            autoFocus
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);

              if (event.target.value.trim().length < 2) {
                setResults(null);
              }
            }}
            placeholder={t("search.placeholder")}
            className="h-12 w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            aria-label={t("search.label")}
          />

          {searching && (
            <Loader2
              className="h-4 w-4 animate-spin text-muted-foreground"
              aria-hidden="true"
            />
          )}

          {query && !searching && (
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setResults(null);
              }}
              className="rounded p-1 text-muted-foreground hover:bg-accent"
              aria-label="Clear"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          )}
        </div>

        <div className="max-h-[60vh] overflow-y-auto p-2">
          {!hasQuery ? (
            <p className="px-3 py-8 text-center text-sm text-muted-foreground">
              {t("search.emptyQuery")}
            </p>
          ) : searching && !results ? (
            <p className="flex items-center justify-center gap-2 px-3 py-8 text-sm text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              {t("search.searching")}
            </p>
          ) : results && totalResults === 0 ? (
            <p className="px-3 py-8 text-center text-sm text-muted-foreground">
              {t("common.noResults")}
            </p>
          ) : (
            results &&
            groups.map((group) => {
              const items = results[group.key];

              if (!items || items.length === 0) {
                return null;
              }

              return (
                <div key={group.key} className="mb-2">
                  <p className="px-3 pb-1 pt-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    {group.label}
                  </p>

                  <ul>
                    {items.map((item) => {
                      const slug = (item as { slug: string }).slug;
                      const image = "image" in item ? item.image : undefined;

                      return (
                        <li key={slug}>
                          <Link
                            href={group.pathFor(slug)}
                            onClick={() => onOpenChange(false)}
                            className="flex items-center gap-3 rounded-md px-3 py-2 transition-colors hover:bg-accent"
                          >
                            {image && (
                              <div className="relative h-10 w-14 shrink-0 overflow-hidden rounded">
                                <Image
                                  src={image}
                                  alt=""
                                  fill
                                  sizes="56px"
                                  className="object-cover"
                                />
                              </div>
                            )}

                            <span className="line-clamp-1 text-sm font-medium">
                              {titleFor(item)}
                            </span>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            })
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
