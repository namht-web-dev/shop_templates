// src/api/index.ts

import {
  blogRepository,
  newsRepository,
  productRepository,
} from "@/repositories";
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

/* --------------------------------- Shop ----------------------------------- */

export async function apiGetProducts(
  query: ProductQuery,
): Promise<Paginated<Product>> {
  return productRepository.getProducts(query);
}

export async function apiGetProductBySlug(
  slug: string,
): Promise<Product | null> {
  return productRepository.getProductBySlug(slug);
}

export async function apiGetProductsBySlugs(
  slugs: string[],
): Promise<Product[]> {
  return productRepository.getProductsBySlugs(slugs);
}

export async function apiGetFeaturedProducts(limit = 4): Promise<Product[]> {
  return productRepository.getFeaturedProducts(limit);
}

export async function apiGetRelatedProducts(
  product: Product,
  limit = 4,
): Promise<Product[]> {
  return productRepository.getRelatedProducts(product, limit);
}

export async function apiGetProductCategoriesInUse(): Promise<
  ProductCategory[]
> {
  return productRepository.getCategoriesInUse();
}

export async function apiGetPriceBounds(): Promise<{
  min: number;
  max: number;
}> {
  return productRepository.getPriceBounds();
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
  return newsRepository.getNews(query);
}

export async function apiGetNewsBySlug(
  slug: string,
): Promise<NewsArticle | null> {
  return newsRepository.getArticleBySlug(slug);
}

export async function apiGetLatestNews(limit = 3): Promise<NewsArticle[]> {
  return newsRepository.getLatest(limit);
}

export async function apiGetRelatedNews(
  article: NewsArticle,
  limit = 3,
): Promise<NewsArticle[]> {
  return newsRepository.getRelated(article, limit);
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
  return blogRepository.getPosts(query);
}

export async function apiGetBlogPostBySlug(
  slug: string,
): Promise<BlogPost | null> {
  return blogRepository.getPostBySlug(slug);
}

export async function apiGetFeaturedBlogPosts(limit = 3): Promise<BlogPost[]> {
  return blogRepository.getFeaturedPosts(limit);
}

export async function apiGetRelatedBlogPosts(
  post: BlogPost,
  limit = 3,
): Promise<BlogPost[]> {
  return blogRepository.getRelatedPosts(post, limit);
}

export async function apiGetBlogCategoriesInUse(): Promise<BlogCategory[]> {
  return blogRepository.getCategoriesInUse();
}

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
  const q = query.trim();
  if (!q) {
    return { products: [], articles: [], news: [] };
  }

  // Gọi trực tiếp các repositories để lấy dữ liệu kết hợp từ Prisma DB
  const [productsRes, articlesRes, newsRes] = await Promise.all([
    productRepository.getProducts({ search: q, pageSize: limitPerGroup }),
    blogRepository.getPosts({ search: q, pageSize: limitPerGroup }),
    newsRepository.getNews({ pageSize: limitPerGroup }),
  ]);

  return {
    products: productsRes.items,
    articles: articlesRes.items,
    news: newsRes.items,
  };
}
