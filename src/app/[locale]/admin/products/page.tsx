import Link from "next/link";
import { prisma } from "@/db";
import { requireAdmin } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DeleteProductButton } from "@/components/admin/products/delete-product-button";

type Props = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{
    q?: string;
    page?: string;
  }>;
};

const PAGE_SIZE = 10;

const currency = new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",
  maximumFractionDigits: 0,
});

function getLocalizedText(value: unknown, locale: string): string {
  if (typeof value === "string") return value;

  if (value && typeof value === "object" && !Array.isArray(value)) {
    const localized = value as Record<string, unknown>;
    const result = localized[locale] ?? localized.vi ?? localized.en;

    return typeof result === "string" ? result : "";
  }

  return "";
}

export default async function ProductsPage({ params, searchParams }: Props) {
  const { locale } = await params;
  await requireAdmin(locale);

  const { q = "", page: pageParam = "1" } = await searchParams;

  const page = Math.max(1, Number.parseInt(pageParam, 10) || 1);
  const search = q.trim();

  const where = search
    ? {
        OR: [
          { slug: { contains: search, mode: "insensitive" as const } },
          { brand: { contains: search, mode: "insensitive" as const } },
          { category: { contains: search, mode: "insensitive" as const } },
        ],
      }
    : {};

  const [products, total] = await Promise.all([
    prisma.product.findMany({
      where,
      orderBy: { updatedAt: "desc" },
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
      select: {
        id: true,
        slug: true,
        name: true,
        brand: true,
        category: true,
        price: true,
        salePrice: true,
        stock: true,
        featured: true,
        image: true,
        updatedAt: true,
      },
    }),
    prisma.product.count({ where }),
  ]);

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  return (
    <div className="mx-auto w-full max-w-7xl space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Quản lý sản phẩm
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Tổng cộng {total} sản phẩm
          </p>
        </div>

        <Button asChild>
          <Link href={`/${locale}/admin/products/new`}>Thêm sản phẩm</Link>
        </Button>
      </div>

      <form className="flex gap-2" method="GET">
        <Input
          name="q"
          placeholder="Tìm theo slug, thương hiệu, danh mục..."
          defaultValue={search}
          className="max-w-md"
        />
        <Button type="submit" variant="outline">
          Tìm kiếm
        </Button>
      </form>

      <div className="overflow-x-auto rounded-lg border">
        <table className="w-full min-w-225 text-sm">
          <thead className="bg-muted/50">
            <tr className="border-b text-left">
              <th className="p-4">Sản phẩm</th>
              <th className="p-4">Danh mục</th>
              <th className="p-4 text-right">Giá</th>
              <th className="p-4 text-right">Tồn kho</th>
              <th className="p-4">Nổi bật</th>
              <th className="p-4 text-right">Thao tác</th>
              <th className="p-4 text-right"></th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-b last:border-0">
                <td className="p-2">
                  <p className="font-medium">
                    {getLocalizedText(product.name, locale)}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {product.slug}
                  </p>
                </td>

                <td className="p-2">
                  <p>{product.category}</p>
                  <p className="text-xs text-muted-foreground">
                    {product.brand}
                  </p>
                </td>

                <td className="p-2 text-right">
                  {product.salePrice !== null ? (
                    <div>
                      <p className="font-medium">
                        {currency.format(product.salePrice)}
                      </p>
                      <p className="text-xs text-muted-foreground line-through">
                        {currency.format(product.price)}
                      </p>
                    </div>
                  ) : (
                    currency.format(product.price)
                  )}
                </td>

                <td className="p-2 text-right">
                  <span
                    className={
                      product.stock <= 0 ? "font-medium text-destructive" : ""
                    }
                  >
                    {product.stock}
                  </span>
                </td>

                <td className="p-2">{product.featured ? "Có" : "Không"}</td>

                <td className="p-2 text-right">
                  <Button asChild variant="outline" size="sm">
                    <Link
                      href={`/${locale}/admin/products/${product.id}/edit`}
                      className="text-sm font-medium text-primary hover:underline"
                    >
                      Chỉnh sửa
                    </Link>
                  </Button>
                </td>
                <td>
                  <DeleteProductButton productId={product.id} />
                </td>
              </tr>
            ))}

            {products.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="p-10 text-center text-muted-foreground"
                >
                  Không tìm thấy sản phẩm.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex h-24 items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground">
          Trang {page} / {totalPages}
        </p>

        <div className="flex gap-2">
          {page <= 1 ? (
            <Button variant="outline" size="sm" disabled>
              Trước
            </Button>
          ) : (
            <Button asChild variant="outline" size="sm">
              <Link href={`?q=${encodeURIComponent(search)}&page=${page - 1}`}>
                Trước
              </Link>
            </Button>
          )}

          {page >= totalPages ? (
            <Button variant="outline" size="sm" disabled>
              Sau
            </Button>
          ) : (
            <Button asChild variant="outline" size="sm">
              <Link href={`?q=${encodeURIComponent(search)}&page=${page + 1}`}>
                Sau
              </Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
