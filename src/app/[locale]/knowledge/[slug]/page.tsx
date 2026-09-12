import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { ArrowLeft, CalendarDays, Clock, ListTree, User } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BlogCard } from "@/components/cards";
import { SectionHeading } from "@/components/shared/primitives";
import ShareButton from "@/components/shared/ShareButton";

import { BlogService } from "@/services";
import { PATHS } from "@/lib/paths";
import { siteConfig } from "@/config/site";
import type { LocalizedString } from "@/types";

type BlogPostPageProps = {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
};

function localized(value: LocalizedString, locale: string): string {
  return value[locale as keyof LocalizedString] ?? value.en ?? "";
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { locale, slug } = await params;

  const t = await getTranslations({
    locale,
    namespace: "blog",
  });

  const post = await BlogService.getPostBySlug(slug);

  if (!post) {
    return {
      title: t("title"),
    };
  }

  const title = localized(post.title, locale);
  const description = localized(post.excerpt, locale);

  return {
    title: `${title} | SmartIoTVN`,
    description,
    authors: [
      {
        name: post.author,
      },
    ],
    openGraph: {
      title,
      description,
      type: "article",
      images: post.cover
        ? [
            {
              url: post.cover,
              alt: title,
            },
          ]
        : undefined,
    },
    alternates: {
      canonical: `${siteConfig.url}/${locale}${PATHS.knowledgePost(slug)}`,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { locale, slug } = await params;

  const t = await getTranslations({
    locale,
  });

  const post = await BlogService.getPostBySlug(slug);

  if (!post) {
    return (
      <div className="container-app py-16 text-center">
        <h1 className="text-2xl font-bold">{t("common.noResults")}</h1>

        <Button asChild className="mt-6">
          <Link href={`/${locale}${PATHS.knowledge}`}>
            {t("common.backToList")}
          </Link>
        </Button>
      </div>
    );
  }

  const relatedPosts = await BlogService.getRelatedPosts(post, 3);

  const title = localized(post.title, locale);
  const excerpt = localized(post.excerpt, locale);

  return (
    <article className="container-app py-10">
      {/* Back */}
      <nav className="mb-6 text-sm text-muted-foreground">
        <Link
          href={`/${locale}${PATHS.knowledge}`}
          className="inline-flex items-center gap-1.5 hover:text-foreground hover:underline"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />

          {t("nav.knowledge")}
        </Link>
      </nav>

      {/* Header */}
      <header className="mx-auto max-w-3xl">
        <Badge variant="outline">{t(`blogCategories.${post.category}`)}</Badge>

        <h1 className="mt-4 text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
          {title}
        </h1>

        <p className="mt-4 text-lg text-muted-foreground">{excerpt}</p>

        <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <User className="h-4 w-4" aria-hidden="true" />
            {t("blog.byAuthor")} {post.author}
          </span>

          <span className="inline-flex items-center gap-1.5">
            <CalendarDays className="h-4 w-4" aria-hidden="true" />
            {t("common.publishedOn")}{" "}
            {new Intl.DateTimeFormat(locale, {
              dateStyle: "medium",
            }).format(new Date(post.publishedAt))}
          </span>

          <span className="inline-flex items-center gap-1.5">
            <Clock className="h-4 w-4" aria-hidden="true" />
            {post.readingTime} {t("common.minRead")}
          </span>

          <ShareButton
            label={t("common.share")}
            successMessage={t("common.copied")}
            errorMessage={t("common.errorDescription")}
          />
        </div>
      </header>

      {/* Cover */}
      {post.cover && (
        <div className="mx-auto mt-8 max-w-3xl overflow-hidden rounded-xl border shadow-sm">
          <Image
            src={post.cover}
            alt={title}
            width={1200}
            height={675}
            priority
            className="aspect-video w-full object-cover"
          />
        </div>
      )}

      {/* Content */}
      <div className="mx-auto mt-10 grid max-w-5xl gap-10 lg:grid-cols-[240px_1fr]">
        {/* Table of contents */}
        <aside className="hidden lg:block">
          <div className="sticky top-24 rounded-xl border bg-muted/30 p-4">
            <p className="flex items-center gap-2 text-sm font-semibold">
              <ListTree className="h-4 w-4 text-primary" aria-hidden="true" />

              {t("blog.tableOfContents")}
            </p>

            <ol className="mt-3 space-y-2 text-sm text-muted-foreground">
              {post.content.map((section, index) => (
                <li key={index}>
                  <a
                    href={`#section-${index}`}
                    className="transition-colors hover:text-foreground hover:underline"
                  >
                    {index + 1}. {localized(section.heading, locale)}
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </aside>

        {/* Article content */}
        <div className="min-w-0">
          <div className="space-y-8">
            {post.content.map((section, index) => (
              <section
                key={index}
                id={`section-${index}`}
                className="scroll-mt-24"
              >
                <h2 className="text-xl font-semibold sm:text-2xl">
                  {localized(section.heading, locale)}
                </h2>

                <div className="mt-3 space-y-3 leading-relaxed text-muted-foreground">
                  {section.paragraphs.map((paragraph, paragraphIndex) => (
                    <p key={paragraphIndex}>{localized(paragraph, locale)}</p>
                  ))}
                </div>
              </section>
            ))}
          </div>

          {/* Tags */}
          {post.tags.length > 0 && (
            <div className="mt-10 flex flex-wrap gap-2 border-t pt-6">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="destructive">
                  #{tag}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Related posts */}
      {relatedPosts.length > 0 && (
        <section className="mt-16">
          <SectionHeading title={t("blog.relatedArticles")} />

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {relatedPosts.map((related) => (
              <BlogCard
                key={related.id}
                post={related}
                link={`/${locale}${PATHS.knowledgePost(related.slug)}`}
              />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
