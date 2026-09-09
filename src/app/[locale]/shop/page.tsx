import { Suspense } from "react";
import type { Metadata } from "next";
import { ProductService } from "@/src/services";
import { CardGridSkeleton, EmptyState } from "@/components/shared/states";
import { ShopFilters } from "@/components/shop/ShopFilters";
import { ShopPagination } from "@/components/shop/ShopPagination";
import { ShopSort } from "@/components/shop/ShopSort";
import type { Locale, ProductCategory, ProductSort } from "@/src/types";
import { PAGE_SIZE, SITE_DEFAULT_LOCALE, siteConfig } from "@/src/config/site";
import { getTranslations } from "next-intl/server";
import { PATHS } from "@/src/lib/paths";
import { isLocale } from "@/src/utils";
import { ProductCardWrapper } from "@/components/home/ProductCardWrapper";

type PageProps = {
  params: Promise<{
    locale: string;
  }>;
  searchParams: Promise<{
    search?: string;
    category?: string;
    sort?: string;
    page?: string;
    maxPrice?: string;
  }>;
};

// Next.js 16 SEO Metadata Standard
export async function generateMetadata({
  params: localeParams,
  searchParams,
}: PageProps): Promise<Metadata> {
  const params = await searchParams;
  const { locale: rawLocale } = await localeParams;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : SITE_DEFAULT_LOCALE;

  const content = siteConfig.storeTranslations[locale];

  const hasFilters =
    params.search || params.sort || params.page || params.maxPrice;

  return {
    title: {
      default: content.title,
      template: `%s | ${content.name}`,
    },
    description: content.description,
    robots: hasFilters
      ? {
          index: false,
          follow: true,
        }
      : {
          index: true,
          follow: true,
        },
  };
}

export default async function ShopPage({
  params: localePrams,
  searchParams,
}: PageProps) {
  // Unwrapping Async searchParams in Next.js 16
  const params = await searchParams;
  const { locale } = await localePrams;

  const search = params.search || "";
  const category = (params.category as ProductCategory) || "all";
  const sort = (params.sort as ProductSort) || "popular";
  const page = Number(params.page) || 1;
  const maxPrice = params.maxPrice ? Number(params.maxPrice) : undefined;
  const t = await getTranslations({
    locale,
    namespace: "shop",
  });

  // Parallel Data Fetching on the Server
  const [bounds, categories, products] = await Promise.all([
    ProductService.getPriceBounds(),
    ProductService.getCategoriesInUse(),
    ProductService.getProducts({
      search,
      category,
      sort,
      page,
      pageSize: PAGE_SIZE,
      maxPrice,
    }),
  ]);

  return (
    <div className="container-app py-10">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          {t("title0")}
        </h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">{t("subtitle0")}</p>
      </header>

      <div className="mb-6 flex items-center justify-between gap-3">
        <p className="text-sm text-muted-foreground">
          {t("searchResult", { total: products.total })}
        </p>
        <ShopSort currentSort={sort} />
      </div>

      <div className="flex gap-8">
        {/* Sidebar Filters */}
        <aside className="hidden w-60 shrink-0 lg:block">
          <div className="sticky top-24 rounded-xl border bg-card p-5">
            <ShopFilters
              key={search}
              categories={categories}
              bounds={bounds}
              currentSearch={search}
              currentCategory={category}
              currentMaxPrice={maxPrice}
            />
          </div>
        </aside>

        {/* Product Grid & States */}
        <div className="min-w-0 flex-1">
          <Suspense fallback={<CardGridSkeleton count={8} aspect="square" />}>
            {products.items.length === 0 ? (
              <EmptyState
                title={t("emptyTitle0")}
                description={t("emptyDesc0")}
              />
            ) : (
              <>
                <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                  {products.items.map((product) => (
                    <ProductCardWrapper
                      key={product.id}
                      product={product}
                      link={PATHS.shop}
                    />
                  ))}
                </div>

                {products.totalPages > 1 && (
                  <ShopPagination
                    currentPage={products.page}
                    totalPages={products.totalPages}
                  />
                )}
              </>
            )}
          </Suspense>
        </div>
      </div>
    </div>
  );
}
