/* eslint-disable @typescript-eslint/no-explicit-any */
// src/repositories/prisma-blog.repository.ts

import { prisma } from "@/db";
import type { BlogQuery, BlogRepository } from "@/repositories";
import type { BlogCategory, BlogPost, Paginated } from "@/types";

export class PrismaBlogRepository implements BlogRepository {
  async getPosts(query: BlogQuery = {}): Promise<Paginated<BlogPost>> {
    const { search = "", category = "all", page = 1, pageSize = 6 } = query;

    // Build câu điều kiện WHERE
    const where: any = {};

    if (category !== "all") {
      where.category = category;
    }

    if (search.trim()) {
      const q = search.trim();
      where.OR = [
        // Tìm kiếm trong JSON field theo chuẩn Postgres/Prisma
        { title: { path: ["vi"], string_contains: q } },
        { title: { path: ["en"], string_contains: q } },
        { excerpt: { path: ["vi"], string_contains: q } },
        { excerpt: { path: ["en"], string_contains: q } },
        { tags: { has: q } },
      ];
    }

    // Đếm tổng bản ghi và lấy danh sách phân trang trong 1 Transaction
    const [total, posts] = await prisma.$transaction([
      prisma.blogPost.count({ where }),
      prisma.blogPost.findMany({
        where,
        orderBy: { publishedAt: "desc" },
        skip: (Math.max(1, page) - 1) * pageSize,
        take: pageSize,
      }),
    ]);

    const totalPages = Math.max(1, Math.ceil(total / pageSize));
    const safePage = Math.min(Math.max(1, page), totalPages);

    return {
      items: posts as unknown as BlogPost[],
      total,
      page: safePage,
      pageSize,
      totalPages,
    };
  }

  async getPostBySlug(slug: string): Promise<BlogPost | null> {
    const post = await prisma.blogPost.findUnique({
      where: { slug },
    });
    return post ? (post as unknown as BlogPost) : null;
  }

  async getFeaturedPosts(limit = 3): Promise<BlogPost[]> {
    const posts = await prisma.blogPost.findMany({
      where: { featured: true },
      orderBy: { publishedAt: "desc" },
      take: limit,
    });
    return posts as unknown as BlogPost[];
  }

  async getRelatedPosts(post: BlogPost, limit = 3): Promise<BlogPost[]> {
    // Ưu tiên lấy cùng category, trừ post hiện tại
    const sameCategory = await prisma.blogPost.findMany({
      where: {
        id: { not: post.id },
        category: post.category,
      },
      take: limit,
    });

    if (sameCategory.length >= limit) {
      return sameCategory as unknown as BlogPost[];
    }

    // Nếu chưa đủ limit, lấy thêm bài khác category
    const remaining = limit - sameCategory.length;
    const sameCategoryIds = sameCategory.map((p) => p.id);

    const others = await prisma.blogPost.findMany({
      where: {
        id: { notIn: [post.id, ...sameCategoryIds] },
      },
      take: remaining,
    });

    return [...sameCategory, ...others] as unknown as BlogPost[];
  }

  async getCategoriesInUse(): Promise<BlogCategory[]> {
    const categories = await prisma.blogPost.findMany({
      select: { category: true },
      distinct: ["category"],
    });
    return categories.map((c) => c.category as BlogCategory);
  }
}
