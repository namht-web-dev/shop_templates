/**
 * Service layer — the ONLY entry point UI components use for data access.
 * Components never import repositories, the fake API, or mock data directly.
 * Rebind the singleton repositories here when the real backend arrives.
 */
import {
  blogRepository,
  newsRepository,
  productRepository,
  searchRepository,
} from "@/src/repositories";
import type { BlogQuery } from "@/src/repositories";

import type {
  BlogCategory,
  BlogPost,
  NewsArticle,
  NewsCategory,
  Paginated,
  Product,
  ProductCategory,
  ProductQuery,
} from "@/src/types";
import type { GlobalSearchResult } from "@/src/api";

export const ProductService = {
  getProducts: (query: ProductQuery): Promise<Paginated<Product>> =>
    productRepository.getProducts(query),
  getProductBySlug: (slug: string): Promise<Product | null> =>
    productRepository.getProductBySlug(slug),
  getProductsBySlugs: (slugs: string[]): Promise<Product[]> =>
    productRepository.getProductsBySlugs(slugs),
  getFeaturedProducts: (limit?: number): Promise<Product[]> =>
    productRepository.getFeaturedProducts(limit),
  getRelatedProducts: (product: Product, limit?: number): Promise<Product[]> =>
    productRepository.getRelatedProducts(product, limit),
  getCategoriesInUse: (): Promise<ProductCategory[]> =>
    productRepository.getCategoriesInUse(),
  getPriceBounds: (): Promise<{ min: number; max: number }> =>
    productRepository.getPriceBounds(),
};

export const NewsService = {
  getNews: (query?: {
    category?: NewsCategory | "all";
    page?: number;
    pageSize?: number;
  }) => newsRepository.getNews(query),
  getArticleBySlug: (slug: string): Promise<NewsArticle | null> =>
    newsRepository.getArticleBySlug(slug),
  getLatest: (limit?: number): Promise<NewsArticle[]> =>
    newsRepository.getLatest(limit),
  getRelated: (article: NewsArticle, limit?: number): Promise<NewsArticle[]> =>
    newsRepository.getRelated(article, limit),
};

export const SearchService = {
  search: (
    query: string,
    limitPerGroup?: number,
  ): Promise<GlobalSearchResult> =>
    searchRepository.search(query, limitPerGroup),
};

export const BlogService = {
  getPosts: (query?: BlogQuery): Promise<Paginated<BlogPost>> =>
    blogRepository.getPosts(query),
  getPostBySlug: (slug: string): Promise<BlogPost | null> =>
    blogRepository.getPostBySlug(slug),
  getFeaturedPosts: (limit?: number): Promise<BlogPost[]> =>
    blogRepository.getFeaturedPosts(limit),
  getRelatedPosts: (post: BlogPost, limit?: number): Promise<BlogPost[]> =>
    blogRepository.getRelatedPosts(post, limit),
  getCategoriesInUse: (): Promise<BlogCategory[]> =>
    blogRepository.getCategoriesInUse(),
};

export type { GlobalSearchResult };
