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

    const safePageSize = Math.max(1, pageSize);
    const safePage = Math.max(1, page);

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

    // 3. Lọc giá thực tế trước khi count và phân trang
    const priceConditions: any[] = [];

    if (minPrice !== undefined) {
      priceConditions.push({
        OR: [
          { salePrice: { gte: minPrice } },
          {
            salePrice: null,
            price: { gte: minPrice },
          },
        ],
      });
    }

    if (maxPrice !== undefined) {
      priceConditions.push({
        OR: [
          { salePrice: { lte: maxPrice } },
          {
            salePrice: null,
            price: { lte: maxPrice },
          },
        ],
      });
    }

    if (priceConditions.length > 0) {
      where.AND = [...(where.AND ?? []), ...priceConditions];
    }

    // 4. Sắp xếp (Sorting)
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

    const totalPages = Math.max(1, Math.ceil(total / safePageSize));

    // Đảm bảo page không vượt quá tổng số trang
    const actualPage = Math.min(safePage, totalPages);

    // Nếu page vượt giới hạn, query lại đúng trang cuối
    const products =
      actualPage === safePage
        ? rawProducts
        : await prisma.product.findMany({
            where,
            orderBy,
            skip: (actualPage - 1) * safePageSize,
            take: safePageSize,
          });

    return {
      items: products as unknown as Product[],
      total,
      page: actualPage,
      pageSize: safePageSize,
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
