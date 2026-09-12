"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Minus,
  Package,
  Plus,
  ShieldCheck,
  ShoppingCart,
  Truck,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { ProductCard } from "@/components/cards";
import { RatingStars, SectionHeading } from "@/components/shared/primitives";

import { useAddToCart } from "@/hooks/useAddToCart";
import { useI18n } from "@/i18n";
import { PATHS } from "@/lib/paths";
import { cn } from "@/lib/utils";
import { Product } from "@/types";

type ProductDetailClientProps = {
  locale: string;
  product: Product | null;
  relatedProducts: Product[];
};

// Nếu project đã có Product type trong @/types,
// import type { Product } from "@/types";
// và xóa type Product ở trên.

export default function ProductDetailClient({
  locale,
  product,
  relatedProducts,
}: ProductDetailClientProps) {
  const { t, l, formatPrice } = useI18n();

  const addToCart = useAddToCart();

  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);

  if (!product) {
    return (
      <div className="container-app py-16 text-center">
        <h1 className="text-2xl font-bold">{t("common.noResults")}</h1>

        <Button asChild className="mt-6">
          <Link href={`/${locale}${PATHS.shop}`}>
            <ArrowLeft className="mr-2 h-4 w-4" aria-hidden="true" />

            {t("common.backToList")}
          </Link>
        </Button>
      </div>
    );
  }

  const onSale =
    product.salePrice !== undefined && product.salePrice < product.price;

  const discount = onSale
    ? Math.round((1 - product.salePrice! / product.price) * 100)
    : 0;

  const gallery =
    product.gallery.length > 0 ? product.gallery : [product.image];

  const maxQuantity = product.stock || 99;

  function previousImage() {
    setActiveImage(
      (current) => (current - 1 + gallery.length) % gallery.length,
    );
  }

  function nextImage() {
    setActiveImage((current) => (current + 1) % gallery.length);
  }

  function decreaseQuantity() {
    setQuantity((current) => Math.max(1, current - 1));
  }

  function increaseQuantity() {
    setQuantity((current) => Math.min(maxQuantity, current + 1));
  }

  return (
    <div className="container-app py-10">
      {/* Breadcrumb */}
      <nav
        className="mb-6 text-sm text-muted-foreground"
        aria-label="Breadcrumb"
      >
        <Link
          href={`/${locale}${PATHS.shop}`}
          className="hover:text-foreground hover:underline"
        >
          {t("nav.shop")}
        </Link>

        <span className="mx-2" aria-hidden="true">
          /
        </span>

        <span className="text-foreground">{l(product.name)}</span>
      </nav>

      {/* Product */}
      <div className="grid gap-10 lg:grid-cols-2">
        {/* Gallery */}
        <div>
          <div className="relative overflow-hidden rounded-xl border bg-muted/30">
            <Image
              src={gallery[activeImage]}
              alt={l(product.name)}
              width={1000}
              height={1000}
              priority
              className="aspect-square w-full object-cover"
            />

            {onSale && (
              <span className="absolute left-4 top-4 rounded-full bg-destructive px-3 py-1 text-sm font-semibold text-destructive-foreground">
                -{discount}% {t("common.off")}
              </span>
            )}

            {gallery.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={previousImage}
                  className="absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-background/85 shadow backdrop-blur transition-colors hover:bg-background"
                  aria-label={t("common.prev")}
                >
                  <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                </button>

                <button
                  type="button"
                  onClick={nextImage}
                  className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-background/85 shadow backdrop-blur transition-colors hover:bg-background"
                  aria-label={t("common.next")}
                >
                  <ChevronRight className="h-5 w-5" aria-hidden="true" />
                </button>
              </>
            )}
          </div>

          {/* Thumbnails */}
          {gallery.length > 1 && (
            <div className="mt-3 flex gap-3">
              {gallery.map((image, index) => (
                <button
                  key={image}
                  type="button"
                  onClick={() => setActiveImage(index)}
                  className={cn(
                    "overflow-hidden rounded-lg border-2 transition-colors",
                    index === activeImage
                      ? "border-primary"
                      : "border-transparent hover:border-border",
                  )}
                  aria-label={`${t("product.description")} ${index + 1}`}
                  aria-current={index === activeImage}
                >
                  <Image
                    src={image}
                    alt=""
                    width={64}
                    height={64}
                    className="h-16 w-16 object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product info */}
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="outline">
              {t(`productCategories.${product.category}`)}
            </Badge>

            <Badge variant="destructive">{product.brand}</Badge>
          </div>

          <h1 className="mt-3 text-3xl font-bold tracking-tight">
            {l(product.name)}
          </h1>

          <div className="mt-3 flex items-center gap-3">
            <RatingStars rating={product.rating} showValue size="md" />

            <span className="text-sm text-muted-foreground">
              ({product.reviewCount} {t("common.reviews")})
            </span>
          </div>

          {/* Price */}
          <div className="mt-5 flex items-baseline gap-3">
            <span className="text-3xl font-bold text-primary">
              {formatPrice(product.salePrice ?? product.price)}
            </span>

            {onSale && (
              <span className="text-lg text-muted-foreground line-through tabular-nums">
                {formatPrice(product.price)}
              </span>
            )}
          </div>

          {onSale && (
            <p className="mt-1 text-sm text-destructive">
              {t("product.saleEnds")}
            </p>
          )}

          <p className="mt-4 leading-relaxed text-muted-foreground">
            {l(product.shortDescription)}
          </p>

          {/* Quantity + Cart */}
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center rounded-md border">
              <button
                type="button"
                onClick={decreaseQuantity}
                className="flex h-10 w-10 items-center justify-center rounded-l-md transition-colors hover:bg-accent"
                aria-label="Decrease quantity"
              >
                <Minus className="h-4 w-4" aria-hidden="true" />
              </button>

              <span className="w-12 text-center text-sm font-medium tabular-nums">
                {quantity}
              </span>

              <button
                type="button"
                onClick={increaseQuantity}
                className="flex h-10 w-10 items-center justify-center rounded-r-md transition-colors hover:bg-accent"
                aria-label="Increase quantity"
              >
                <Plus className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>

            <Button
              size="lg"
              className="flex-1 gap-2 sm:flex-none sm:px-10"
              disabled={product.stock === 0}
              onClick={() => addToCart(product, quantity)}
            >
              <ShoppingCart className="h-5 w-5" aria-hidden="true" />

              {product.stock === 0
                ? t("common.outOfStock")
                : t("common.addToCart")}
            </Button>
          </div>

          {/* Stock */}
          <p className="mt-3 text-sm text-muted-foreground">
            {product.stock > 0 ? (
              <span className="inline-flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400">
                <Package className="h-4 w-4" aria-hidden="true" />

                {t("common.inStock")}
              </span>
            ) : (
              t("common.outOfStock")
            )}
          </p>

          {/* Shipping */}
          <div className="mt-6 grid gap-3 rounded-xl border bg-muted/30 p-4 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-2">
              <Truck className="h-4 w-4 text-primary" aria-hidden="true" />

              {t("cart.freeShipping")}
            </span>

            <span className="inline-flex items-center gap-2">
              <ShieldCheck
                className="h-4 w-4 text-primary"
                aria-hidden="true"
              />

              {t("cart.secureDemo")}
            </span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="description" className="mt-14">
        <TabsList>
          <TabsTrigger value="description">
            {t("product.description")}
          </TabsTrigger>

          <TabsTrigger value="specs">{t("product.specifications")}</TabsTrigger>

          <TabsTrigger value="reviews">{t("product.reviewsTab")}</TabsTrigger>
        </TabsList>

        <TabsContent
          value="description"
          className="mt-6 max-w-3xl leading-relaxed text-muted-foreground"
        >
          <p className="whitespace-pre-line">{l(product.description)}</p>
        </TabsContent>

        <TabsContent value="specs" className="mt-6">
          <div className="max-w-2xl overflow-hidden rounded-xl border">
            <table className="w-full text-sm">
              <tbody>
                {product.specs.map((spec, index) => (
                  <tr
                    key={index}
                    className={index % 2 === 1 ? "bg-muted/40" : undefined}
                  >
                    <th
                      scope="row"
                      className="w-1/3 px-4 py-3 text-left font-medium"
                    >
                      {l(spec.label)}
                    </th>

                    <td className="px-4 py-3 text-muted-foreground">
                      {l(spec.value)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TabsContent>

        <TabsContent value="reviews" className="mt-6">
          {product.reviewCount === 0 ? (
            <p className="text-muted-foreground">{t("product.noReviews")}</p>
          ) : (
            <div className="max-w-3xl space-y-4">
              {Array.from({
                length: Math.min(3, product.reviewCount),
              }).map((_, index) => (
                <div key={index} className="rounded-xl border p-4">
                  <div className="flex items-center justify-between">
                    <RatingStars rating={product.rating} />

                    <span className="text-xs text-muted-foreground">
                      {product.reviewCount} {t("common.reviews")}
                    </span>
                  </div>

                  <p className="mt-2 text-sm text-muted-foreground">
                    {l(product.shortDescription)}
                  </p>
                </div>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Related products */}
      {relatedProducts.length > 0 && (
        <section className="mt-16">
          <SectionHeading title={t("common.relatedProducts")} />

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {relatedProducts.map((related) => (
              <ProductCard
                key={related.id}
                product={related}
                link={`/${locale}${PATHS.shopProduct(related.slug)}`}
                onAddToCart={addToCart}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
