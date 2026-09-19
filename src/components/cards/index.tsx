"use client";

import Image from "next/image";
import Link from "next/link";
import { Clock, ShoppingCart } from "lucide-react";

import { Badge, RatingStars } from "@/components/shared/primitives";
import { cn } from "@/lib/utils";
import { useI18n } from "@/i18n";
import type { BlogPost, NewsArticle, Product } from "@/types";
import { localePathNavigateHelper } from "@/utils";

/* ------------------------------- ProductCard ------------------------------ */

export function ProductCard({
  product,
  link: productLink,
  onAddToCart,
}: {
  product: Product;
  link: string;
  onAddToCart?: (product: Product) => void;
  onQuickView?: (product: Product) => void;
}) {
  const { t, l, locale, formatPrice } = useI18n();

  const onSale =
    product.salePrice !== undefined &&
    product.salePrice !== null &&
    product.salePrice < product.price;

  const discount = onSale
    ? Math.round((1 - product.salePrice! / product.price) * 100)
    : 0;

  const link = localePathNavigateHelper(
    locale,
    `${productLink}/${product.slug}`,
  );

  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-xl border bg-card shadow-sm transition-shadow hover:shadow">
      <Link
        href={link}
        aria-label={l(product.name)}
        className="relative block overflow-hidden bg-muted/40"
      >
        <Image
          src={product.image}
          alt={l(product.name)}
          width={600}
          height={600}
          className="aspect-square w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {onSale && (
          <span className="absolute left-3 top-3 rounded-full bg-destructive px-2.5 py-0.5 text-xs font-semibold text-destructive-foreground">
            -{discount}%
          </span>
        )}

        {product.stock === 0 && (
          <span className="absolute inset-0 flex items-center justify-center bg-background/70 text-sm font-semibold">
            {t("common.outOfStock")}
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-center justify-between gap-2">
          <RatingStars rating={product.rating} showValue />

          <span className="text-xs text-muted-foreground">
            {product.stock > 0 ? t("common.inStock") : t("common.outOfStock")}
          </span>
        </div>

        <Link
          href={link}
          className="line-clamp-2 font-medium leading-snug hover:underline"
        >
          {l(product.name)}
        </Link>

        <p className="line-clamp-2 text-sm text-muted-foreground">
          {l(product.shortDescription)}
        </p>

        <div className="mt-auto flex items-baseline gap-2 pt-1 mx-auto">
          <span className="text-lg font-semibold text-primary">
            {formatPrice(product.salePrice ?? product.price)}
          </span>

          {onSale && (
            <span className="text-sm text-muted-foreground line-through tabular-nums">
              {formatPrice(product.price)}
            </span>
          )}
        </div>

        <div className="flex pt-1">
          <button
            type="button"
            disabled={product.stock === 0}
            onClick={() => onAddToCart?.(product)}
            className="inline-flex h-9 flex-1 items-center justify-center gap-1.5 rounded-md bg-primary text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:pointer-events-none disabled:opacity-50"
          >
            <ShoppingCart className="h-4 w-4" aria-hidden="true" />
            {t("common.addToCart")}
          </button>

          {/* <Link
            href={link}
            onClick={(event) => {
              if (onQuickView) {
                event.preventDefault();
                onQuickView(product);
              }
            }}
            className="inline-flex h-9 items-center justify-center rounded-md border px-3 text-sm font-medium transition-colors hover:bg-accent"
          >
            {t("common.quickView")}
          </Link> */}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------- CourseCard ------------------------------- */

/* -------------------------------- BlogCard -------------------------------- */

export function BlogCard({
  post,
  link,
  featured = false,
}: {
  post: BlogPost;
  link: string;
  featured?: boolean;
}) {
  const { t, l, formatDate } = useI18n();

  return (
    <article
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-xl border bg-card shadow-sm transition-shadow hover:shadow",
        featured && "md:col-span-2 md:grid md:grid-cols-2",
      )}
    >
      <Link
        href={link}
        aria-label={l(post.title)}
        className={cn(
          "relative block overflow-hidden",
          featured && "md:h-full",
        )}
      >
        <Image
          src={post.cover}
          alt={l(post.title)}
          width={800}
          height={450}
          className={cn(
            "w-full object-cover transition-transform duration-300 group-hover:scale-105",
            featured ? "h-48 md:h-full" : "aspect-video",
          )}
        />

        {featured && (
          <span className="absolute left-3 top-3">
            <Badge>{t("common.featured")}</Badge>
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col gap-2 p-5">
        <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
          <span className="font-medium text-primary">
            {t(`blogCategories.${post.category}`)}
          </span>

          <span aria-hidden="true">·</span>

          <time dateTime={post.publishedAt}>
            {formatDate(post.publishedAt)}
          </time>

          <span aria-hidden="true">·</span>

          <span className="inline-flex items-center gap-1">
            <Clock className="h-3 w-3" aria-hidden="true" />
            {`${post.readingTime} ${t("common.minRead")}`}
          </span>
        </div>

        <Link
          href={link}
          className={cn(
            "font-semibold leading-snug hover:underline",
            featured ? "text-xl" : "line-clamp-2",
          )}
        >
          {l(post.title)}
        </Link>

        <p
          className={cn(
            "text-sm text-muted-foreground",
            featured ? "line-clamp-3" : "line-clamp-2",
          )}
        >
          {l(post.excerpt)}
        </p>

        <div className="mt-auto flex items-center justify-between pt-2 text-sm">
          <span className="text-muted-foreground">
            {t("blog.byAuthor")} {post.author}
          </span>

          <Link
            href={link}
            className="font-medium text-primary hover:underline"
          >
            {t("common.readMore")}
          </Link>
        </div>
      </div>
    </article>
  );
}

/* -------------------------------- NewsCard -------------------------------- */

export function NewsCard({
  article,
  link,
}: {
  article: NewsArticle;
  link: string;
}) {
  const { t, l, formatDate } = useI18n();

  return (
    <article className="group flex h-full gap-4 overflow-hidden rounded-xl border bg-card p-4 shadow-sm transition-shadow hover:shadow">
      <Link
        href={link}
        aria-label={l(article.title)}
        className="hidden shrink-0 overflow-hidden rounded-lg sm:block"
      >
        <Image
          src={article.image}
          alt={l(article.title)}
          width={144}
          height={96}
          className="h-24 w-36 object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </Link>

      <div className="flex min-w-0 flex-1 flex-col gap-1.5">
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="rounded bg-sky-600/10 px-2 py-0.5 font-semibold text-sky-700 dark:text-sky-400">
            {t(`newsCategories.${article.category}`)}
          </span>

          <span className="text-muted-foreground">
            {t("news.source")}: {article.source}
          </span>
        </div>

        <Link
          href={link}
          className="line-clamp-2 font-semibold leading-snug hover:underline"
        >
          {l(article.title)}
        </Link>

        <p className="line-clamp-2 text-sm text-muted-foreground">
          {l(article.excerpt)}
        </p>

        <div className="mt-auto flex items-center gap-2 text-xs text-muted-foreground">
          <time dateTime={article.publishedAt}>
            {formatDate(article.publishedAt)}
          </time>

          <span aria-hidden="true">·</span>

          <span className="inline-flex items-center gap-1">
            <Clock className="h-3 w-3" aria-hidden="true" />
            {`${article.readingTime} ${t("common.minRead")}`}
          </span>
        </div>
      </div>
    </article>
  );
}
