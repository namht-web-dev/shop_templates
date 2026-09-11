import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Cpu,
  Layers,
  Radio,
  Wifi,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { BlogCard, NewsCard } from "@/components/cards";
import { SectionHeading } from "@/components/shared/primitives";
import { NewsletterForm } from "@/components/home/NewsletterForm";
import { ProductCardWrapper } from "@/components/home/ProductCardWrapper";
import { BlogService, NewsService, ProductService } from "@/src/services";
import { PATHS } from "@/src/lib/paths";
import { IMG } from "@/src/lib/images";
import { BlogPost, Locale, Product } from "@/src/types";
import { getTranslations } from "next-intl/server";
import { localePathNavigateHelper } from "@/src/utils";

const PATH_ICONS = [BookOpen, Zap, Cpu, Radio, Wifi, Layers, CheckCircle2];

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;

  const [productsRes, articles, news] = await Promise.all([
    ProductService.getProducts({ sort: "popular", pageSize: 8 }),
    BlogService.getFeaturedPosts(3),
    NewsService.getLatest(3),
  ]);
  const t = await getTranslations({
    locale,
  });

  const products = productsRes.items;

  // Tính toán dữ liệu thống kê

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b">
        <Image
          src={IMG.heroSmartCity}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-linear-to-r from-background via-background/85 to-background/40" />
        <div className="circuit-grid absolute inset-0" aria-hidden="true" />
        <div className="container-app relative py-20 sm:py-28">
          <div className="max-w-2xl">
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border bg-background/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary backdrop-blur">
              <Radio className="h-3.5 w-3.5" aria-hidden="true" />
              {t("home.heroKicker")}
            </p>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              {t("home.heroTitle")
                .split(".")
                .filter(Boolean)
                .map((word: string, i: number) => (
                  <span key={i} className={i === 1 ? "text-gradient" : ""}>
                    {word.trim()}
                    {i < 2 ? ". " : ""}
                  </span>
                ))}
            </h1>
            <p className="mt-5 max-w-xl text-lg text-muted-foreground">
              {t("home.heroSubtitle")}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="gap-2">
                <Link
                  href={`${localePathNavigateHelper(locale, PATHS.courses)}`}
                >
                  {t("home.exploreCourses")}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="gap-2 bg-background/70 backdrop-blur"
              >
                <Link href={`${localePathNavigateHelper(locale, PATHS.shop)}`}>
                  <Cpu className="h-4 w-4" aria-hidden="true" />
                  {t("home.shopProducts")}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Popular products */}
      <section className="border-y bg-muted/30">
        <div className="container-app py-16">
          <SectionHeading
            title={t("home.popularProducts")}
            description={t("home.popularProductsDesc")}
            action={
              <Link
                href={`/${locale}${PATHS.shop}`}
                className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
              >
                {t("common.viewAll")}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            }
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((product: Product) => (
              <ProductCardWrapper
                key={product.id}
                product={product}
                link={`/${locale}${PATHS.shop}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Learning path */}
      <section className="container-app py-16">
        <SectionHeading
          title={t("home.learningPathTitle")}
          description={t("home.learningPathSubtitle")}
        />
        <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7">
          {PATH_ICONS.map((Icon, i) => (
            <li key={i} className="relative rounded-xl border bg-card p-4">
              <span className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                {String(i + 1).padStart(2, "0")}
              </p>
              <p className="mt-0.5 text-sm font-medium leading-snug">
                {t(`learningPath.step${i + 1}`)}
              </p>
              {i < PATH_ICONS.length - 1 && (
                <ArrowRight
                  className="absolute -right-3 top-1/2 hidden h-4 w-4 -translate-y-1/2 text-muted-foreground/50 xl:block"
                  aria-hidden="true"
                />
              )}
            </li>
          ))}
        </ol>
      </section>

      {/* Knowledge articles */}
      <section className="border-y bg-muted/30">
        <div className="container-app py-16">
          <SectionHeading
            title={t("home.featuredArticles")}
            description={t("home.featuredArticlesDesc")}
            action={
              <Link
                href={`/${locale}${PATHS.knowledgePost(PATHS.knowledge)}`}
                className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
              >
                {t("common.viewAll")}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            }
          />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((post: BlogPost) => (
              <BlogCard
                key={post.id}
                post={post}
                link={`/${locale}${PATHS.knowledgePost(post.slug)}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Latest news */}
      <section className="container-app py-16">
        <SectionHeading
          title={t("home.latestNews")}
          description={t("home.latestNewsDesc")}
          action={
            <Link
              href={`/${locale}${PATHS.knowledgePost(PATHS.news)}`}
              className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
            >
              {t("common.viewAll")}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          }
        />
        <div className="grid gap-4 lg:grid-cols-3">
          {news.map((article) => (
            <NewsCard
              key={article.id}
              article={article}
              link={`/${locale}${PATHS.knowledgePost(PATHS.newsDetail(article.slug))}`}
            />
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="container-app py-16">
        <div className="mx-auto max-w-2xl rounded-2xl border bg-card p-8 text-center shadow-sm sm:p-10">
          <h2 className="text-2xl font-semibold tracking-tight">
            {t("home.newsletterTitle")}
          </h2>
          <p className="mt-2 text-muted-foreground">
            {t("home.newsletterSubtitle")}
          </p>
          <NewsletterForm />
        </div>
      </section>
    </>
  );
}
