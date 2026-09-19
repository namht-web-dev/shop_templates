"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Prisma } from "@/generated/prisma";
import { prisma } from "@/db";
import { requireAdmin } from "@/lib/auth";

type Locale = "vi" | "en";

type ProductInput = {
  name: {
    vi: string;
    en: string;
  };
  slug: string;
  brand: string;
  category: string;
  price: number;
  salePrice: number | null;
  stock: number;
  featured: boolean;
  image: string;
  gallery: string[];
  shortDescription: {
    vi: string;
    en: string;
  };
  description: {
    vi: string;
    en: string;
  };
};

type ActionResult = {
  success: boolean;
  message: string;
  errors?: Record<string, string>;
};

function normalizeSlug(value: string) {
  return value
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function validateProduct(input: ProductInput): string | null {
  if (!input.name.vi.trim() || !input.name.en.trim()) {
    return "Vui lòng nhập tên sản phẩm bằng tiếng Việt và tiếng Anh.";
  }

  if (!input.slug.trim()) {
    return "Slug không được để trống.";
  }

  if (!input.category.trim()) {
    return "Vui lòng chọn danh mục.";
  }

  if (!Number.isFinite(input.price) || input.price < 0) {
    return "Giá sản phẩm không hợp lệ.";
  }

  if (
    input.salePrice !== null &&
    (!Number.isFinite(input.salePrice) ||
      input.salePrice < 0 ||
      input.salePrice > input.price)
  ) {
    return "Giá khuyến mãi phải nằm trong khoảng từ 0 đến giá gốc.";
  }

  if (!Number.isInteger(input.stock) || input.stock < 0) {
    return "Tồn kho phải là số nguyên không âm.";
  }

  if (!input.image.trim()) {
    return "Vui lòng nhập ảnh chính.";
  }

  return null;
}

function toProductData(input: ProductInput) {
  const slug = normalizeSlug(input.slug);

  return {
    slug,
    brand: input.brand.trim(),
    category: input.category.trim(),
    price: input.price,
    salePrice: input.salePrice,
    stock: input.stock,
    featured: input.featured,
    image: input.image.trim(),
    gallery: input.gallery.map((url) => url.trim()).filter(Boolean),

    name: {
      vi: input.name.vi.trim(),
      en: input.name.en.trim(),
    } as Prisma.InputJsonValue,

    shortDescription: {
      vi: input.shortDescription.vi.trim(),
      en: input.shortDescription.en.trim(),
    } as Prisma.InputJsonValue,

    description: {
      vi: input.description.vi.trim(),
      en: input.description.en.trim(),
    } as Prisma.InputJsonValue,
  };
}

export async function createProduct(
  input: ProductInput,
  locale: Locale = "vi",
): Promise<ActionResult> {
  await requireAdmin(locale);

  const error = validateProduct(input);

  if (error) {
    return { success: false, message: error };
  }

  const data = toProductData(input);

  const existing = await prisma.product.findUnique({
    where: { slug: data.slug },
    select: { id: true },
  });

  if (existing) {
    return {
      success: false,
      message: "Slug đã tồn tại. Vui lòng sử dụng slug khác.",
    };
  }

  await prisma.product.create({
    data,
  });

  revalidatePath(`/${locale}/admin/products`);
  revalidatePath(`/${locale}`);

  return {
    success: true,
    message: "Tạo sản phẩm thành công.",
  };
}

export async function updateProduct(
  id: string,
  input: ProductInput,
  locale: Locale = "vi",
): Promise<ActionResult> {
  await requireAdmin(locale);

  if (!id.trim()) {
    return { success: false, message: "ID sản phẩm không hợp lệ." };
  }

  const error = validateProduct(input);

  if (error) {
    return { success: false, message: error };
  }

  const data = toProductData(input);

  const existing = await prisma.product.findUnique({
    where: { id },
    select: { id: true },
  });

  if (!existing) {
    return { success: false, message: "Không tìm thấy sản phẩm." };
  }

  const slugOwner = await prisma.product.findUnique({
    where: { slug: data.slug },
    select: { id: true },
  });

  if (slugOwner && slugOwner.id !== id) {
    return {
      success: false,
      message: "Slug đã được sản phẩm khác sử dụng.",
    };
  }

  await prisma.product.update({
    where: { id },
    data,
  });

  revalidatePath(`/${locale}/admin/products`);
  revalidatePath(`/${locale}`);

  return {
    success: true,
    message: "Cập nhật sản phẩm thành công.",
  };
}

export async function deleteProduct(
  id: string,
  locale: Locale = "vi",
): Promise<ActionResult> {
  await requireAdmin(locale);

  if (!id.trim()) {
    return { success: false, message: "ID sản phẩm không hợp lệ." };
  }

  const product = await prisma.product.findUnique({
    where: { id },
    select: { id: true },
  });

  if (!product) {
    return { success: false, message: "Không tìm thấy sản phẩm." };
  }

  await prisma.product.delete({
    where: { id },
  });

  revalidatePath(`/${locale}/admin/products`);
  revalidatePath(`/${locale}`);

  return {
    success: true,
    message: "Xóa sản phẩm thành công.",
  };
}
