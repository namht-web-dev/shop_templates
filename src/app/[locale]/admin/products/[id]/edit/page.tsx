import { notFound } from "next/navigation";

import { prisma } from "@/db";
import { ProductForm } from "@/components/admin/products/product-form";
import { requireAdmin } from "@/lib/auth";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;

  await requireAdmin(locale);

  const product = await prisma.product.findUnique({
    where: { id },
  });

  if (!product) {
    notFound();
  }

  const getLocaleText = (value: unknown, lang: "vi" | "en"): string => {
    if (value && typeof value === "object" && lang in value) {
      return String((value as Record<string, unknown>)[lang] ?? "");
    }

    return "";
  };

  return (
    <div className="mx-auto w-full max-w-5xl space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-bold">Chỉnh sửa sản phẩm</h1>
        <p className="text-sm text-muted-foreground">
          Cập nhật thông tin sản phẩm.
        </p>
      </div>

      <ProductForm
        locale={locale}
        product={{
          id: product.id,
          slug: product.slug,
          brand: product.brand,
          category: product.category,
          price: product.price,
          salePrice: product.salePrice,
          stock: product.stock,
          image: product.image,
          gallery: product.gallery,
          featured: product.featured,
          name: {
            vi: getLocaleText(product.name, "vi"),
            en: getLocaleText(product.name, "en"),
          },
          shortDescription: {
            vi: getLocaleText(product.shortDescription, "vi"),
            en: getLocaleText(product.shortDescription, "en"),
          },
          description: {
            vi: getLocaleText(product.description, "vi"),
            en: getLocaleText(product.description, "en"),
          },
        }}
      />
    </div>
  );
}
