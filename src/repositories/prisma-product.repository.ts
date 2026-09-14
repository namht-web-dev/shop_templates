/* eslint-disable @typescript-eslint/no-explicit-any */
// src/repositories/prisma-product.repository.ts

import { prisma } from "@/db"; // Hoặc đường dẫn import instance PrismaClient của bạn
import type { ProductRepository } from "@/repositories";
import type {
  Paginated,
  Product,
  ProductCategory,
  ProductQuery,
} from "@/types";

export class PrismaProductRepository implements ProductRepository {
  private effectivePriceSql(p: Product): number {
    return p.salePrice ?? p.price;
  }

  async getProducts(query: ProductQuery): Promise<Paginated<Product>> {
    const {
      search = "",
      category = "all",
      minPrice,
      maxPrice,
      sort = "popular",
      page = 1,
      pageSize = 9,
    } = query;

    const where: any = {};

    // 1. Lọc theo Danh mục
    if (category !== "all") {
      where.category = category;
    }

    // 2. Tìm kiếm tên, mô tả ngắn, thương hiệu
    if (search.trim()) {
      const q = search.trim();
      where.OR = [
        { name: { path: ["vi"], string_contains: q } },
        { name: { path: ["en"], string_contains: q } },
        { shortDescription: { path: ["vi"], string_contains: q } },
        { shortDescription: { path: ["en"], string_contains: q } },
        { brand: { contains: q, mode: "insensitive" } },
      ];
    }

    // 3. Sắp xếp (Sorting)
    let orderBy: any = {};
    switch (sort) {
      case "price-asc":
        orderBy = { price: "asc" };
        break;
      case "price-desc":
        orderBy = { price: "desc" };
        break;
      case "rating":
        orderBy = { rating: "desc" };
        break;
      case "newest":
        orderBy = { createdAt: "desc" };
        break;
      default: // popular
        orderBy = { reviewCount: "desc" };
        break;
    }

    // Lấy dữ liệu và đếm số lượng
    const [total, rawProducts] = await prisma.$transaction([
      prisma.product.count({ where }),
      prisma.product.findMany({
        where,
        orderBy,
        skip: (Math.max(1, page) - 1) * pageSize,
        take: pageSize,
      }),
    ]);

    let products = rawProducts as unknown as Product[];

    // Lọc theo khoảng giá (minPrice, maxPrice) dựa trên giá bán thực tế (salePrice || price)
    if (minPrice !== undefined || maxPrice !== undefined) {
      products = products.filter((p) => {
        const price = this.effectivePriceSql(p);
        if (minPrice !== undefined && price < minPrice) return false;
        if (maxPrice !== undefined && price > maxPrice) return false;
        return true;
      });
    }

    const totalPages = Math.max(1, Math.ceil(total / pageSize));
    const safePage = Math.min(Math.max(1, page), totalPages);

    return {
      items: products,
      total,
      page: safePage,
      pageSize,
      totalPages,
    };
  }

  async getProductBySlug(slug: string): Promise<Product | null> {
    const product = await prisma.product.findUnique({
      where: { slug },
    });
    return product ? (product as unknown as Product) : null;
  }

  async getProductsBySlugs(slugs: string[]): Promise<Product[]> {
    const products = await prisma.product.findMany({
      where: { slug: { in: slugs } },
    });
    return products as unknown as Product[];
  }

  async getFeaturedProducts(limit = 4): Promise<Product[]> {
    const products = await prisma.product.findMany({
      where: { featured: true },
      take: limit,
    });
    return products as unknown as Product[];
  }

  async getRelatedProducts(product: Product, limit = 4): Promise<Product[]> {
    const sameCategory = await prisma.product.findMany({
      where: {
        id: { not: product.id },
        category: product.category,
      },
      take: limit,
    });

    if (sameCategory.length >= limit) {
      return sameCategory as unknown as Product[];
    }

    const remaining = limit - sameCategory.length;
    const sameCategoryIds = sameCategory.map((p) => p.id);

    const others = await prisma.product.findMany({
      where: {
        id: { notIn: [product.id, ...sameCategoryIds] },
      },
      take: remaining,
    });

    return [...sameCategory, ...others] as unknown as Product[];
  }

  async getCategoriesInUse(): Promise<ProductCategory[]> {
    const categories = await prisma.product.findMany({
      select: { category: true },
      distinct: ["category"],
    });
    return categories.map((c) => c.category as ProductCategory);
  }

  async getPriceBounds(): Promise<{ min: number; max: number }> {
    const aggregate = await prisma.product.aggregate({
      _min: { price: true },
      _max: { price: true },
    });

    return {
      min: aggregate._min.price ?? 0,
      max: aggregate._max.price ?? 0,
    };
  }
}
