/* eslint-disable @typescript-eslint/no-explicit-any */
// src/repositories/prisma-news.repository.ts

import { prisma } from "@/db";
import type { NewsArticle, Paginated } from "@/types";
import type { NewsQuery, NewsRepository } from "./index";

export class PrismaNewsRepository implements NewsRepository {
  /**
   * Lấy danh sách tin tức có phân trang & lọc theo danh mục
   */
  async getNews(query: NewsQuery = {}): Promise<Paginated<NewsArticle>> {
    const { category = "all", page = 1, pageSize = 6 } = query;

    const where: any = {};

    if (category !== "all") {
      where.category = category;
    }

    const total = await prisma.newsArticle.count({ where });
    const totalPages = Math.max(1, Math.ceil(total / pageSize));
    const safePage = Math.min(Math.max(1, page), totalPages);
    const skip = (safePage - 1) * pageSize;

    const items = await prisma.newsArticle.findMany({
      where,
      orderBy: { publishedAt: "desc" },
      skip,
      take: pageSize,
    });

    return {
      items: items as unknown as NewsArticle[],
      total,
      page: safePage,
      pageSize,
      totalPages,
    };
  }

  /**
   * Lấy chi tiết bài viết tin tức theo Slug
   */
  async getArticleBySlug(slug: string): Promise<NewsArticle | null> {
    const article = await prisma.newsArticle.findUnique({
      where: { slug },
    });

    return (article as unknown as NewsArticle) ?? null;
  }

  /**
   * Lấy danh sách tin tức mới nhất
   */
  async getLatest(limit = 3): Promise<NewsArticle[]> {
    const items = await prisma.newsArticle.findMany({
      orderBy: { publishedAt: "desc" },
      take: limit,
    });

    return items as unknown as NewsArticle[];
  }

  /**
   * Lấy danh sách bài viết tin tức liên quan (cùng category, trừ bài viết hiện tại)
   */
  async getRelated(article: NewsArticle, limit = 3): Promise<NewsArticle[]> {
    const items = await prisma.newsArticle.findMany({
      where: {
        id: { not: article.id },
        category: article.category,
      },
      orderBy: { publishedAt: "desc" },
      take: limit,
    });

    return items as unknown as NewsArticle[];
  }
}
