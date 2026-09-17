/* eslint-disable @typescript-eslint/no-explicit-any */
// seed: npm install -D tsx
// prisma/seed.ts npx prisma db seed

import { NEWS_ARTICLES } from "@/mocks";
import { prisma } from "../src/db";
import { BLOG_POSTS } from "../src/mocks/blogs";

// async function main() {
//   console.log("Seeding blog posts...");

//   for (const post of BLOG_POSTS) {
//     await prisma.blogPost.upsert({
//       where: { slug: post.slug },
//       update: {},
//       create: {
//         id: post.id,
//         slug: post.slug,
//         category: post.category,
//         cover: post.cover,
//         author: post.author,
//         publishedAt: new Date(post.publishedAt),
//         readingTime: post.readingTime,
//         featured: post.featured,
//         tags: post.tags,
//         title: post.title as any,
//         excerpt: post.excerpt as any,
//         content: post.content as any,
//       },
//     });
//   }

//   console.log("Seeding completed!");
// }

// main()
//   .catch((e) => console.error(e))
//   .finally(async () => await prisma.$disconnect());

/* eslint-disable @typescript-eslint/no-explicit-any */
// prisma/seed.ts

import { PRODUCTS } from "../src/mocks/products"; // <-- Import mock products

async function main() {
  console.log("🌱 Bắt đầu seed dữ liệu User...");

  // Tạo User test khớp với ID "user-001" của FakeUser trong Zustand Store
  await prisma.user.upsert({
    where: { email: "aadu@gmail.com" },
    update: {},
    create: {
      id: "user-001",
      name: "Nguyen Van A",
      email: "nguyen.van.a@gmail.com",
      role: "USER",
      provider: "PASSWORD",
    },
  });
  console.log("🌱 Seeding blog posts...");
  for (const post of BLOG_POSTS) {
    await prisma.blogPost.upsert({
      where: { slug: post.slug },
      update: {},
      create: {
        id: post.id,
        slug: post.slug,
        category: post.category,
        cover: post.cover,
        author: post.author,
        publishedAt: new Date(post.publishedAt),
        readingTime: post.readingTime,
        featured: post.featured,
        tags: post.tags,
        title: post.title as any,
        excerpt: post.excerpt as any,
        content: post.content as any,
      },
    });
  }

  console.log("🌱 Seeding products...");
  for (const product of PRODUCTS) {
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: {},
      create: {
        id: product.id,
        slug: product.slug,
        brand: product.brand,
        category: product.category,
        price: product.price,
        salePrice: product.salePrice ?? null,
        stock: product.stock ?? 0,
        rating: product.rating ?? 0,
        reviewCount: product.reviewCount ?? 0,
        featured: product.featured ?? false,
        image: product.image,
        gallery: product.gallery ?? [],
        name: product.name as any,
        shortDescription: product.shortDescription as any,
        description: product.description as any,
        specs: product.specs as any,
        createdAt: product.createdAt ? new Date(product.createdAt) : undefined,
      },
    });
  }

  console.log("🌱 Seeding news articles...");
  for (const news of NEWS_ARTICLES) {
    const newsData = {
      id: news.id,
      slug: news.slug,
      category: news.category,
      image: news.image,
      source: news.source,
      publishedAt: new Date(news.publishedAt),
      readingTime: news.readingTime ?? 0,
      title: news.title as any,
      excerpt: news.excerpt as any,
      content: news.content as any,
    };

    await prisma.newsArticle.upsert({
      where: { slug: news.slug },
      update: newsData,
      create: newsData,
    });
  }

  console.log("✅ All seeds completed!");
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
