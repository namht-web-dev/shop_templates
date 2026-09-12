/**
 * Repository layer: interfaces (contracts) + Fake implementations.
 *
 * UI → Services → THIS LAYER → Fake API → Mock Data
 *
 * To migrate to a real backend, implement each interface as an Api*Repository
 * calling REST endpoints; services and UI components stay untouched.
 */
import * as api from "@/api";
import type { GlobalSearchResult } from "@/api";
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

/* ------------------------------ Product repo ------------------------------ */

export interface ProductRepository {
  getProducts(query: ProductQuery): Promise<Paginated<Product>>;
  getProductBySlug(slug: string): Promise<Product | null>;
  getProductsBySlugs(slugs: string[]): Promise<Product[]>;
  getFeaturedProducts(limit?: number): Promise<Product[]>;
  getRelatedProducts(product: Product, limit?: number): Promise<Product[]>;
  getCategoriesInUse(): Promise<ProductCategory[]>;
  getPriceBounds(): Promise<{ min: number; max: number }>;
}

export class FakeProductRepository implements ProductRepository {
  getProducts(query: ProductQuery): Promise<Paginated<Product>> {
    return api.apiGetProducts(query);
  }
  getProductBySlug(slug: string): Promise<Product | null> {
    return api.apiGetProductBySlug(slug);
  }
  getProductsBySlugs(slugs: string[]): Promise<Product[]> {
    return api.apiGetProductsBySlugs(slugs);
  }
  getFeaturedProducts(limit?: number): Promise<Product[]> {
    return api.apiGetFeaturedProducts(limit);
  }
  getRelatedProducts(product: Product, limit?: number): Promise<Product[]> {
    return api.apiGetRelatedProducts(product, limit);
  }
  getCategoriesInUse(): Promise<ProductCategory[]> {
    return api.apiGetProductCategoriesInUse();
  }
  getPriceBounds(): Promise<{ min: number; max: number }> {
    return api.apiGetPriceBounds();
  }
}

/* ------------------------------ Course repo ------------------------------- */

/* ------------------------------- Blog repo -------------------------------- */

export interface BlogQuery {
  search?: string;
  category?: BlogCategory | "all";
  page?: number;
  pageSize?: number;
}

export interface BlogRepository {
  getPosts(query?: BlogQuery): Promise<Paginated<BlogPost>>;
  getPostBySlug(slug: string): Promise<BlogPost | null>;
  getFeaturedPosts(limit?: number): Promise<BlogPost[]>;
  getRelatedPosts(post: BlogPost, limit?: number): Promise<BlogPost[]>;
  getCategoriesInUse(): Promise<BlogCategory[]>;
}

export class FakeBlogRepository implements BlogRepository {
  getPosts(query?: BlogQuery): Promise<Paginated<BlogPost>> {
    return api.apiGetBlogPosts(query);
  }
  getPostBySlug(slug: string): Promise<BlogPost | null> {
    return api.apiGetBlogPostBySlug(slug);
  }
  getFeaturedPosts(limit?: number): Promise<BlogPost[]> {
    return api.apiGetFeaturedBlogPosts(limit);
  }
  getRelatedPosts(post: BlogPost, limit?: number): Promise<BlogPost[]> {
    return api.apiGetRelatedBlogPosts(post, limit);
  }
  getCategoriesInUse(): Promise<BlogCategory[]> {
    return api.apiGetBlogCategoriesInUse();
  }
}

/* ------------------------------- News repo -------------------------------- */

export interface NewsQuery {
  category?: NewsCategory | "all";
  page?: number;
  pageSize?: number;
}

export interface NewsRepository {
  getNews(query?: NewsQuery): Promise<Paginated<NewsArticle>>;
  getArticleBySlug(slug: string): Promise<NewsArticle | null>;
  getLatest(limit?: number): Promise<NewsArticle[]>;
  getRelated(article: NewsArticle, limit?: number): Promise<NewsArticle[]>;
}

export class FakeNewsRepository implements NewsRepository {
  getNews(query?: NewsQuery): Promise<Paginated<NewsArticle>> {
    return api.apiGetNews(query);
  }
  getArticleBySlug(slug: string): Promise<NewsArticle | null> {
    return api.apiGetNewsBySlug(slug);
  }
  getLatest(limit?: number): Promise<NewsArticle[]> {
    return api.apiGetLatestNews(limit);
  }
  getRelated(article: NewsArticle, limit?: number): Promise<NewsArticle[]> {
    return api.apiGetRelatedNews(article, limit);
  }
}

/* ------------------------------ Project repo ------------------------------ */

/* ------------------------------ Search repo ------------------------------- */

export interface SearchRepository {
  search(query: string, limitPerGroup?: number): Promise<GlobalSearchResult>;
}

export class FakeSearchRepository implements SearchRepository {
  search(query: string, limitPerGroup?: number): Promise<GlobalSearchResult> {
    return api.apiGlobalSearch({ query, limitPerGroup });
  }
}

/* --------------------- Singleton instances (composition root) ------------- */

export const productRepository: ProductRepository = new FakeProductRepository();
export const newsRepository: NewsRepository = new FakeNewsRepository();
export const blogRepository: BlogRepository = new FakeBlogRepository();
export const searchRepository: SearchRepository = new FakeSearchRepository();
