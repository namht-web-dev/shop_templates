import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { ProductService } from "@/src/services";
import { PATHS } from "@/src/lib/paths";
import { siteConfig } from "@/src/config/site";
import ProductDetailClient from "@/components/product/ProductDetailClient";

type ProductDetailPageProps = {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
};

export async function generateMetadata({
  params,
}: ProductDetailPageProps): Promise<Metadata> {
  const { locale, slug } = await params;

  const t = await getTranslations({
    locale,
    namespace: "shop",
  });

  const product = await ProductService.getProductBySlug(slug);

  if (!product) {
    return {
      title: t("title"),
    };
  }

  const name =
    product.name[locale as keyof typeof product.name] ?? product.name.en ?? "";

  const description =
    product.shortDescription[locale as keyof typeof product.shortDescription] ??
    product.shortDescription.en ??
    "";

  return {
    title: `${name} | SmartIoTVN`,
    description,

    openGraph: {
      title: name,
      description,
      type: "website",
      images: product.image
        ? [
            {
              url: product.image,
              alt: name,
            },
          ]
        : undefined,
    },

    alternates: {
      canonical: `${siteConfig.url}/${locale}${PATHS.shopProduct(slug)}`,
    },
  };
}

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const { locale, slug } = await params;

  const product = await ProductService.getProductBySlug(slug);

  if (!product) {
    return (
      <ProductDetailClient
        locale={locale}
        product={null}
        relatedProducts={[]}
      />
    );
  }

  const relatedProducts = await ProductService.getRelatedProducts(product, 4);

  return (
    <ProductDetailClient
      locale={locale}
      product={product}
      relatedProducts={relatedProducts}
    />
  );
}
