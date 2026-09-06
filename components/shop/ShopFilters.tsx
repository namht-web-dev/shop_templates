"use client";

import { useState, useEffect, useTransition } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Filter, SlidersHorizontal, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { useI18n } from "@/src/i18n";

type ShopFiltersProps = {
  categories: string[];
  bounds: { min: number; max: number };
  currentSearch: string;
  currentCategory: string;
  currentMaxPrice?: number;
};

export function ShopFilters({
  categories,
  bounds,
  currentSearch,
  currentCategory,
  currentMaxPrice,
}: ShopFiltersProps) {
  const { t, formatPrice } = useI18n();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();

  const [searchInput, setSearchInput] = useState(currentSearch);
  const [mobileOpen, setMobileOpen] = useState(false);

  const effectiveMax = currentMaxPrice ?? bounds.max;

  const updateParams = (newParams: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", "1");

    Object.entries(newParams).forEach(([key, value]) => {
      if (value === null || value === "" || value === "all") {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    });

    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`);
    });
  };

  // Debounce đẩy từ khóa lên URL khi user gõ
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchInput !== currentSearch) {
        updateParams({ search: searchInput });
      }
    }, 350);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchInput, currentSearch]);

  const clearFilters = () => {
    setSearchInput("");
    startTransition(() => {
      router.push(pathname);
    });
  };

  const content = (
    <div className="space-y-6">
      <div>
        <h3 className="mb-3 text-sm font-semibold">
          {t("shop.searchPlaceholder")}
        </h3>
        <Input
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder={t("shop.searchPlaceholder")}
        />
      </div>

      <div>
        <h3 className="mb-3 text-sm font-semibold">{t("shop.category")}</h3>
        <div className="space-y-1">
          <button
            type="button"
            onClick={() => updateParams({ category: "all" })}
            className={`block w-full rounded-md px-3 py-1.5 text-left text-sm transition-colors ${
              currentCategory === "all"
                ? "bg-accent font-medium text-primary"
                : "hover:bg-accent"
            }`}
          >
            {t("shop.allCategories")}
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => updateParams({ category: cat })}
              className={`block w-full rounded-md px-3 py-1.5 text-left text-sm transition-colors ${
                currentCategory === cat
                  ? "bg-accent font-medium text-primary"
                  : "hover:bg-accent"
              }`}
            >
              {t(`productCategories.${cat}`)}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="mb-3 text-sm font-semibold">{t("shop.priceRange")}</h3>
        <Slider
          min={bounds.min}
          max={bounds.max}
          step={10}
          value={[effectiveMax]}
          onValueChange={(values) =>
            updateParams({ maxPrice: values[0].toString() })
          }
        />
        <p className="mt-2 text-sm text-muted-foreground tabular-nums">
          {formatPrice(bounds.min)} {t("shop.priceTo")}{" "}
          {formatPrice(effectiveMax)}
        </p>
      </div>

      <Button
        variant="ghost"
        size="sm"
        onClick={clearFilters}
        className="w-full"
      >
        {t("shop.clearFilters")}
      </Button>
    </div>
  );

  return (
    <>
      <div className="mb-4 flex items-center gap-2 text-sm font-semibold">
        <Filter className="h-4 w-4" aria-hidden="true" />
        {t("shop.filters")}
      </div>

      {content}

      <Button
        variant="outline"
        size="sm"
        className="gap-2 lg:hidden"
        onClick={() => setMobileOpen(true)}
      >
        <SlidersHorizontal className="h-4 w-4" />
        {t("shop.filters")}
      </Button>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute inset-y-0 left-0 w-80 max-w-[85vw] overflow-y-auto border-r bg-background p-5">
            <div className="mb-4 flex items-center justify-between">
              <span className="font-semibold">{t("shop.filters")}</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setMobileOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            {content}
          </div>
        </div>
      )}
    </>
  );
}
