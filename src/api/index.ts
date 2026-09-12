/**
 * Fake API layer — the only place that touches mock data directly.
 * Every function returns a Promise and simulates network latency so loading
 * states can be tested. When the real backend lands, only this layer changes.
 */
import { BLOG_POSTS } from "@/mocks/blogs";
import { NEWS_ARTICLES } from "@/mocks/news";
import { PRODUCTS } from "@/mocks/products";
import type {
  BlogCategory,
  BlogPost,
  NewsArticle,
  NewsCategory,
  Paginated,
  Product,
  ProductCategory,
  ProductQuery,
} from "@/types";

const MIN_LATENCY = 400;
const MAX_LATENCY = 700;

function delay(min = MIN_LATENCY, max = MAX_LATENCY): Promise<void> {
  const ms = Math.floor(Math.random() * (max - min)) + min;
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/* --------------------------------- Shop ----------------------------------- */

const effectivePrice = (p: Product): number => p.salePrice ?? p.price;

export async function apiGetProducts(
  query: ProductQuery,
): Promise<Paginated<Product>> {
  await delay();
  const {
    search = "",
    category = "all",
    minPrice,
    maxPrice,
    sort = "popular",
    page = 1,
    pageSize = 9,
  } = query;

  let items = [...PRODUCTS];

  if (category !== "all") items = items.filter((p) => p.category === category);
  if (minPrice !== undefined)
    items = items.filter((p) => effectivePrice(p) >= minPrice);
  if (maxPrice !== undefined)
    items = items.filter((p) => effectivePrice(p) <= maxPrice);
  if (search.trim()) {
    const q = search.trim().toLowerCase();
    items = items.filter(
      (p) =>
        p.name.vi.toLowerCase().includes(q) ||
        p.name.en.toLowerCase().includes(q) ||
        p.shortDescription.vi.toLowerCase().includes(q) ||
        p.shortDescription.en.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q),
    );
  }

  switch (sort) {
    case "price-asc":
      items.sort((a, b) => effectivePrice(a) - effectivePrice(b));
      break;
    case "price-desc":
      items.sort((a, b) => effectivePrice(b) - effectivePrice(a));
      break;
    case "rating":
      items.sort((a, b) => b.rating - a.rating);
      break;
    case "newest":
      items.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
      break;
    default:
      items.sort((a, b) => b.reviewCount - a.reviewCount);
  }

  const total = items.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const safePage = Math.min(Math.max(1, page), totalPages);
  const start = (safePage - 1) * pageSize;

  return {
    items: items.slice(start, start + pageSize),
    total,
    page: safePage,
    pageSize,
    totalPages,
  };
}

export async function apiGetProductBySlug(
  slug: string,
): Promise<Product | null> {
  await delay();
  return PRODUCTS.find((p) => p.slug === slug) ?? null;
}

export async function apiGetProductsBySlugs(
  slugs: string[],
): Promise<Product[]> {
  await delay(150, 300);
  return slugs
    .map((slug) => PRODUCTS.find((p) => p.slug === slug))
    .filter((p): p is Product => p !== undefined);
}

export async function apiGetFeaturedProducts(limit = 4): Promise<Product[]> {
  await delay();
  return PRODUCTS.filter((p) => p.featured).slice(0, limit);
}

export async function apiGetRelatedProducts(
  product: Product,
  limit = 4,
): Promise<Product[]> {
  await delay(200, 350);
  const sameCategory = PRODUCTS.filter(
    (p) => p.id !== product.id && p.category === product.category,
  );
  const others = PRODUCTS.filter(
    (p) => p.id !== product.id && p.category !== product.category,
  );
  return [...sameCategory, ...others].slice(0, limit);
}

export async function apiGetProductCategoriesInUse(): Promise<
  ProductCategory[]
> {
  await delay(100, 200);
  return Array.from(new Set(PRODUCTS.map((p) => p.category)));
}

export async function apiGetPriceBounds(): Promise<{
  min: number;
  max: number;
}> {
  await delay(100, 200);
  const prices = PRODUCTS.map(effectivePrice);
  return { min: Math.min(...prices), max: Math.max(...prices) };
}

/* ---------------------------------- News ---------------------------------- */

export interface NewsQuery {
  category?: NewsCategory | "all";
  page?: number;
  pageSize?: number;
}

export async function apiGetNews(
  query: NewsQuery = {},
): Promise<Paginated<NewsArticle>> {
  await delay();
  const { category = "all", page = 1, pageSize = 6 } = query;

  let items = [...NEWS_ARTICLES];
  if (category !== "all") items = items.filter((n) => n.category === category);
  items.sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));

  const total = items.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const safePage = Math.min(Math.max(1, page), totalPages);
  const start = (safePage - 1) * pageSize;

  return {
    items: items.slice(start, start + pageSize),
    total,
    page: safePage,
    pageSize,
    totalPages,
  };
}

export async function apiGetNewsBySlug(
  slug: string,
): Promise<NewsArticle | null> {
  await delay();
  return NEWS_ARTICLES.find((n) => n.slug === slug) ?? null;
}

export async function apiGetLatestNews(limit = 3): Promise<NewsArticle[]> {
  await delay();
  return [...NEWS_ARTICLES]
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
    .slice(0, limit);
}

export async function apiGetRelatedNews(
  article: NewsArticle,
  limit = 3,
): Promise<NewsArticle[]> {
  await delay(200, 350);
  return NEWS_ARTICLES.filter(
    (n) => n.id !== article.id && n.category === article.category,
  ).slice(0, limit);
}

/* ---------------------------------- Blog ---------------------------------- */

export interface BlogQuery {
  search?: string;
  category?: BlogCategory | "all";
  page?: number;
  pageSize?: number;
}

export async function apiGetBlogPosts(
  query: BlogQuery = {},
): Promise<Paginated<BlogPost>> {
  await delay();
  const { search = "", category = "all", page = 1, pageSize = 6 } = query;

  let items = [...BLOG_POSTS];
  if (category !== "all") items = items.filter((p) => p.category === category);
  if (search.trim()) {
    const q = search.trim().toLowerCase();
    items = items.filter(
      (p) =>
        p.title.vi.toLowerCase().includes(q) ||
        p.title.en.toLowerCase().includes(q) ||
        p.excerpt.vi.toLowerCase().includes(q) ||
        p.excerpt.en.toLowerCase().includes(q) ||
        p.tags.some((tag) => tag.toLowerCase().includes(q)),
    );
  }
  items.sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));

  const total = items.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const safePage = Math.min(Math.max(1, page), totalPages);
  const start = (safePage - 1) * pageSize;

  return {
    items: items.slice(start, start + pageSize),
    total,
    page: safePage,
    pageSize,
    totalPages,
  };
}

export async function apiGetBlogPostBySlug(
  slug: string,
): Promise<BlogPost | null> {
  await delay();
  return BLOG_POSTS.find((p) => p.slug === slug) ?? null;
}

export async function apiGetFeaturedBlogPosts(limit = 3): Promise<BlogPost[]> {
  await delay();
  return BLOG_POSTS.filter((p) => p.featured).slice(0, limit);
}

export async function apiGetRelatedBlogPosts(
  post: BlogPost,
  limit = 3,
): Promise<BlogPost[]> {
  await delay(200, 350);
  const sameCategory = BLOG_POSTS.filter(
    (p) => p.id !== post.id && p.category === post.category,
  );
  const others = BLOG_POSTS.filter(
    (p) => p.id !== post.id && p.category !== post.category,
  );
  return [...sameCategory, ...others].slice(0, limit);
}

export async function apiGetBlogCategoriesInUse(): Promise<BlogCategory[]> {
  await delay(100, 200);
  return Array.from(new Set(BLOG_POSTS.map((p) => p.category)));
}

/* -------------------------------- Projects -------------------------------- */

/* ----------------------------- Global Search ------------------------------ */

export interface GlobalSearchQuery {
  query: string;
  limitPerGroup?: number;
}

export interface GlobalSearchResult {
  products: Product[];
  news: NewsArticle[];
  articles: BlogPost[];
}

export async function apiGlobalSearch({
  query,
  limitPerGroup = 4,
}: GlobalSearchQuery): Promise<GlobalSearchResult> {
  await delay(350, 550);
  const q = query.trim().toLowerCase();
  if (!q) {
    return { products: [], articles: [], news: [] };
  }

  const matches = (text: string): boolean => text.toLowerCase().includes(q);

  return {
    products: PRODUCTS.filter(
      (p) => matches(p.name.vi) || matches(p.name.en),
    ).slice(0, limitPerGroup),
    articles: BLOG_POSTS.filter(
      (p) => matches(p.title.vi) || matches(p.title.en),
    ).slice(0, limitPerGroup),
    news: NEWS_ARTICLES.filter(
      (n) => matches(n.title.vi) || matches(n.title.en),
    ).slice(0, limitPerGroup),
  };
}
