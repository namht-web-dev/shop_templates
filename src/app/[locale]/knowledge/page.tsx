import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { BlogService } from "@/services";
import { PATHS } from "@/lib/paths";

import { BlogFilters } from "@/components/blog/BlogFilters";
import { BlogCard } from "@/components/cards";
import { EmptyState } from "@/components/shared/states";
import { Newspaper } from "lucide-react";
import { PAGE_SIZE } from "@/config/site";
import { BLOG_CATEGORIES, BlogCategory, Locale } from "@/types";
import Image from "next/image";
import { isLocale, routing } from "@/i18n/routing";

interface BlogPageProps {
  params: Promise<{
    locale: string;
  }>;
  searchParams: Promise<{
    search?: string;
    category?: string;
    page?: string;
  }>;
}

function parseBlogCategory(value: string | undefined): BlogCategory | "all" {
  if (!value || value === "all") {
    return "all";
  }

  if (BLOG_CATEGORIES.includes(value as BlogCategory)) {
    return value as BlogCategory;
  }

  return "all";
}

export async function generateMetadata({
  params,
}: BlogPageProps): Promise<Metadata> {
  const { locale } = await params;

  const t = await getTranslations({
    locale,
    namespace: "seo",
  });

  return {
    title: t("blogTitle"),
    description: t("blogDesc"),
  };
}

export default async function BlogPage({
  params,
  searchParams,
}: BlogPageProps) {
  const { locale: rawLocale } = await params;

  const locale: Locale = isLocale(rawLocale)
    ? rawLocale
    : routing.defaultLocale;
  const query = await searchParams;

  const t = await getTranslations({
    locale,
    namespace: "blog",
  });

  const commonT = await getTranslations({
    locale,
    namespace: "common",
  });

  const search = query.search?.trim() ?? "";
  const category = parseBlogCategory(query.category);

  const page = Math.max(1, Number.parseInt(query.page ?? "1", 10) || 1);

  const [categories, posts, featuredPosts] = await Promise.all([
    BlogService.getCategoriesInUse(),

    BlogService.getPosts({
      search,
      category,
      page,
      pageSize: PAGE_SIZE,
    }),

    page === 1 && !search && category === "all"
      ? BlogService.getFeaturedPosts(1)
      : Promise.resolve([]),
  ]);

  const featured = featuredPosts[0];

  const totalPages = Math.max(1, posts.totalPages);

  return (
    <div className="container-app py-10">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          {t("title")}
        </h1>

        <p className="mt-2 max-w-2xl text-muted-foreground">{t("subtitle")}</p>
      </header>

      {/* Featured */}
      {featured && (
        <a
          href={`/${locale}${PATHS.knowledgePost(featured.slug)}`}
          className="group mb-10 grid overflow-hidden rounded-xl border shadow-sm transition-shadow hover:shadow-md md:grid-cols-2"
        >
          <div className="overflow-hidden">
            <Image
              src={featured.cover}
              alt={featured.title[locale]}
              width={1280}
              height={720}
              className="aspect-video h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              priority
            />
          </div>

          <div className="flex flex-col justify-center gap-3 p-6 sm:p-8">
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">
              {t("featured")}
            </span>

            <h2 className="text-xl font-bold leading-snug transition-colors group-hover:text-primary sm:text-2xl">
              {featured.title[locale]}
            </h2>

            <p className="line-clamp-3 text-sm text-muted-foreground">
              {featured.excerpt[locale]}
            </p>

            <span className="text-sm text-muted-foreground">
              {t("byAuthor")} {featured.author} · {featured.readingTime}{" "}
              {commonT("minRead")}
            </span>
          </div>
        </a>
      )}

      {/* Filters */}
      <BlogFilters
        search={search}
        category={category}
        categories={categories}
        total={posts.total}
        page={page}
        totalPages={totalPages}
      />

      {/* Empty */}
      {posts.items.length === 0 && (
        <EmptyState
          title={t("emptyTitle")}
          description={t("emptyDesc")}
          icon={
            <Newspaper
              className="h-6 w-6 text-muted-foreground"
              aria-hidden="true"
            />
          }
        />
      )}

      {/* Posts */}
      {posts.items.length > 0 && (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.items.map((post) => (
            <BlogCard
              key={post.id}
              post={post}
              link={`/${locale}${PATHS.knowledgePost(post.slug)}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
