import Link from "next/link";

import { ProductForm } from "@/components/admin/products/product-form";
import { Button } from "@/components/ui/button";

export default async function NewProductPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <div className="mx-auto w-full max-w-5xl space-y-6 p-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Thêm sản phẩm</h1>
          <p className="text-sm text-muted-foreground">
            Tạo sản phẩm mới cho cửa hàng.
          </p>
        </div>

        <Button asChild variant="outline">
          <Link href={`/${locale}/admin/products`}>Quay lại</Link>
        </Button>
      </div>

      <ProductForm locale={locale} />
    </div>
  );
}
