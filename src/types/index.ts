/**
 * Domain types for SmartIoTVN.
 * All entity text is bilingual ({ vi, en }) so the mock layer mirrors
 * how a future real API would serve localized content.
 */

export type Locale = "vi" | "en";

export interface LocalizedString {
  vi: string;
  en: string;
}

/* ---------------------------------- Shop ---------------------------------- */

export type ProductCategory =
  | "esp32"
  | "arduino"
  | "stm32"
  | "sensors"
  | "modules"
  | "kits"
  | "smart-home"
  | "components";

export interface ProductSpec {
  label: LocalizedString;
  value: LocalizedString;
}

export interface Product {
  id: string;
  slug: string;
  name: LocalizedString;
  shortDescription: LocalizedString;
  description: LocalizedString;
  category: ProductCategory;
  price: number; // in thousands VND, e.g. 89 = 89.000 ₫
  salePrice?: number;
  image: string;
  gallery: string[];
  rating: number;
  reviewCount: number;
  stock: number;
  brand: string;
  specs: ProductSpec[];
  featured?: boolean;
  createdAt: string; // ISO date
}

export type ProductSort =
  | "popular"
  | "price-asc"
  | "price-desc"
  | "rating"
  | "newest";

export interface ProductQuery {
  search?: string;
  category?: ProductCategory | "all";
  minPrice?: number;
  maxPrice?: number;
  sort?: ProductSort;
  page?: number;
  pageSize?: number;
}

export interface Paginated<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

/* --------------------------------- Courses -------------------------------- */

/* ------------------------------- Blog & News ------------------------------ */

export type BlogCategory =
  | "iot-basics"
  | "esp32"
  | "arduino"
  | "stm32"
  | "embedded-c"
  | "freertos"
  | "sensors"
  | "mqtt"
  | "http"
  | "wifi"
  | "ble"
  | "lora";

export interface ArticleSection {
  heading: LocalizedString;
  paragraphs: LocalizedString[];
}

export interface BlogPost {
  id: string;
  slug: string;
  title: LocalizedString;
  excerpt: LocalizedString;
  category: BlogCategory;
  cover: string;
  author: string;
  publishedAt: string;
  readingTime: number; // minutes
  featured?: boolean;
  tags: string[];
  content: ArticleSection[];
}

export type NewsCategory =
  | "iot"
  | "technology"
  | "esp32"
  | "ai-iot"
  | "products";

export interface NewsArticle {
  id: string;
  slug: string;
  title: LocalizedString;
  excerpt: LocalizedString;
  category: NewsCategory;
  image: string;
  source: string;
  publishedAt: string;
  readingTime: number;
  content: ArticleSection[];
}

/* -------------------------------- Projects -------------------------------- */

/* ----------------------------- Cart / Orders ------------------------------ */

export interface CartItem {
  productId: string;
  quantity: number;
}

/** Cart line persisted in localStorage with a product snapshot for sync rendering. */
export interface StoredCartItem extends CartItem {
  slug: string;
  nameVi: string;
  nameEn: string;
  image: string;
  price: number;
  salePrice?: number;
  stock: number;
}

export interface OrderItem {
  productId: string;
  nameVi: string;
  nameEn: string;
  image: string;
  price: number;
  quantity: number;
}

export interface Order {
  id: string;
  createdAt: string;
  status: "processing" | "completed";
  items: OrderItem[];
  total: number;
}

/* ---------------------------------- Auth ---------------------------------- */

export interface FakeUser {
  id: string;
  name: string;
  email: string;
  avatar: null;
  role: "user" | "admin";
  /** How the session was created — enables OAuth-specific UI affordances later. */
  provider?: "password" | "google";
}

/* --------------------------------- Search --------------------------------- */

export interface GroupedSearchResults {
  products: Product[];
  articles: BlogPost[];
  news: NewsArticle[];
}
