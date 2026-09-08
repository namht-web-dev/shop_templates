import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarDays, Clock, ExternalLink } from "lucide-react";

import { getTranslations } from "next-intl/server";

import { Badge } from "@/components/ui/badge";
import { SectionHeading } from "@/components/shared/primitives";
import { NewsService } from "@/src/services";

import { PATHS } from "@/src/lib/paths";

interface NewsArticlePageProps {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
}

export async function generateMetadata({
  params,
}: NewsArticlePageProps): Promise<Metadata> {
  const { locale, slug } = await params;

  const t = await getTranslations({
    locale,
    namespace: "news",
  });

  const article = await NewsService.getArticleBySlug(slug);

  if (!article) {
    return {
      title: t("title"),
    };
  }

  const title = article.title[locale as keyof typeof article.title];
  const description = article.excerpt[locale as keyof typeof article.excerpt];

  return {
    title: `${title} | SmartIoTVN`,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      images: article.image
        ? [
            {
              url: article.image,
              alt: title,
            },
          ]
        : undefined,
    },
  };
}

export default async function NewsArticlePage({
  params,
}: NewsArticlePageProps) {
  const { locale, slug } = await params;

  const t = await getTranslations({
    locale,
    namespace: "news",
  });
  const tCategories = await getTranslations({
    locale,
    namespace: "newsCategories",
  });

  const commonT = await getTranslations({
    locale,
    namespace: "common",
  });

  const navT = await getTranslations({
    locale,
    namespace: "nav",
  });

  const article = await NewsService.getArticleBySlug(slug);
  if (!article) {
    notFound();
  }

  const relatedNews = await NewsService.getRelated(article, 3);

  const localizedTitle = article.title[locale as keyof typeof article.title];

  const localizedExcerpt =
    article.excerpt[locale as keyof typeof article.excerpt];

  const localePath = (path: string) => `/${locale}${path}`;

  const newsPath = PATHS.news;

  const newsDetailPath = (articleSlug: string) => PATHS.newsDetail(articleSlug);

  const formatDate = (date: string | Date) => {
    return new Intl.DateTimeFormat(locale, {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(new Date(date));
  };

  return (
    <article className="container-app py-10">
      {/* Back */}
      <nav className="mb-6 text-sm text-muted-foreground">
        <Link
          href={localePath(newsPath)}
          className="inline-flex items-center gap-1.5 hover:text-foreground hover:underline"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />

          {navT("news")}
        </Link>
      </nav>

      {/* Header */}
      <header className="mx-auto max-w-3xl border-b pb-6">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-destructive">
          {t("kicker")}
        </p>

        <h1 className="mt-3 text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
          {localizedTitle}
        </h1>

        <p className="mt-4 text-lg text-muted-foreground">{localizedExcerpt}</p>

        <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
          {/* Category */}
          <Badge variant="outline">{tCategories(`${article.category}`)}</Badge>

          {/* Date */}
          <span className="inline-flex items-center gap-1.5">
            <CalendarDays className="h-4 w-4" aria-hidden="true" />

            {formatDate(article.publishedAt)}
          </span>

          {/* Reading time */}
          <span className="inline-flex items-center gap-1.5">
            <Clock className="h-4 w-4" aria-hidden="true" />
            {article.readingTime} {commonT("minRead")}
          </span>

          {/* Source */}
          <span className="inline-flex items-center gap-1.5">
            <ExternalLink className="h-4 w-4" aria-hidden="true" />
            {t("source")}: {article.source}
          </span>
        </div>
      </header>

      {/* Hero image */}
      <figure className="mx-auto mt-8 max-w-3xl">
        <div className="overflow-hidden rounded-xl border shadow-sm">
          <Image
            src={article.image}
            alt={localizedTitle}
            width={1280}
            height={720}
            className="aspect-video w-full object-cover"
            priority
          />
        </div>

        <figcaption className="mt-2 text-center text-xs text-muted-foreground">
          {article.source}
        </figcaption>
      </figure>

      {/* Article content */}
      <div className="mx-auto mt-10 max-w-3xl space-y-8">
        {article.content.map((section, index) => {
          const heading =
            section.heading[locale as keyof typeof section.heading];

          return (
            <section key={index}>
              <h2 className="text-xl font-semibold sm:text-2xl">{heading}</h2>

              <div className="mt-3 space-y-3 leading-relaxed text-muted-foreground">
                {section.paragraphs.map((paragraph, paragraphIndex) => {
                  const text = paragraph[locale as keyof typeof paragraph];

                  return <p key={paragraphIndex}>{text}</p>;
                })}
              </div>
            </section>
          );
        })}
      </div>

      {/* Related news */}
      {relatedNews.length > 0 && (
        <section className="mt-16 border-t pt-10">
          <SectionHeading title={t("relatedNews")} />

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {relatedNews.map((related) => {
              const relatedTitle =
                related.title[locale as keyof typeof related.title];

              const relatedExcerpt =
                related.excerpt[locale as keyof typeof related.excerpt];

              return (
                <Link
                  key={related.id}
                  href={localePath(newsDetailPath(related.slug))}
                  className="group overflow-hidden rounded-xl border shadow-sm transition-shadow hover:shadow-md"
                >
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src={related.image}
                      alt={relatedTitle}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>

                  <div className="space-y-2 p-4">
                    <p className="text-xs font-bold uppercase tracking-wider text-destructive">
                      {tCategories(`${related.category}`)}
                    </p>

                    <h3 className="line-clamp-2 font-semibold leading-snug transition-colors group-hover:text-primary">
                      {relatedTitle}
                    </h3>

                    <p className="line-clamp-2 text-sm text-muted-foreground">
                      {relatedExcerpt}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      )}
    </article>
  );
}
