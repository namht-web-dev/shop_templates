"use client";

/**
 * Cart page:
 * - Update quantity
 * - Remove item
 * - Clear cart
 * - Order summary
 * - Login gating
 * - Fake checkout
 * - Navigate to My Orders after success
 */

import { useState } from "react";
import { ArrowLeft, Lock, ShoppingCart, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { LoginDialog } from "@/components/shared/LoginDialog";
import { EmptyState } from "@/components/shared/states";

import {
  selectCartSubtotal,
  storedItemUnitPrice,
  useAuthStore,
  useCartStore,
  useOrdersStore,
} from "@/src/store";

import { useI18n } from "@/src/i18n";
import { PATHS } from "@/src/lib/paths";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function CartPage() {
  const { t, l, formatPrice } = useI18n();
  const router = useRouter();

  /* -------------------------------------------------------------------------- */
  /* Store                                                                      */
  /* -------------------------------------------------------------------------- */

  const items = useCartStore((state) => state.items);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const clearCart = useCartStore((state) => state.clear);

  const user = useAuthStore((state) => state.user);

  const placeOrder = useOrdersStore((state) => state.placeOrder);

  /* -------------------------------------------------------------------------- */
  /* Local state                                                                */
  /* -------------------------------------------------------------------------- */

  const [loginOpen, setLoginOpen] = useState(false);
  const [checkingOut, setCheckingOut] = useState(false);

  /* -------------------------------------------------------------------------- */
  /* Derived values                                                             */
  /* -------------------------------------------------------------------------- */

  const subtotal = useCartStore(selectCartSubtotal);

  const itemCount = items.reduce((total, item) => total + item.quantity, 0);

  /* -------------------------------------------------------------------------- */
  /* Actions                                                                    */
  /* -------------------------------------------------------------------------- */

  const handleCheckout = () => {
    if (!user) {
      setLoginOpen(true);
      return;
    }

    if (items.length === 0) {
      return;
    }

    setCheckingOut(true);

    try {
      const order = placeOrder(
        items.map((item) => ({
          productId: item.productId,
          nameVi: item.nameVi,
          nameEn: item.nameEn,
          image: item.image,
          price: storedItemUnitPrice(item),
          quantity: item.quantity,
        })),
        subtotal,
      );

      clearCart();

      toast.success(`${t("cart.orderPlaced")} (${order.id})`);

      router.push(PATHS.accountOrders);
    } catch {
      toast.error(t("common.errorDescription"));
    } finally {
      setCheckingOut(false);
    }
  };

  /* -------------------------------------------------------------------------- */
  /* Empty state                                                                */
  /* -------------------------------------------------------------------------- */

  if (items.length === 0) {
    return (
      <>
        <div className="container-app py-16">
          <EmptyState
            title={t("cart.emptyTitle")}
            description={t("cart.emptyDesc")}
            icon={
              <ShoppingCart
                className="h-6 w-6 text-muted-foreground"
                aria-hidden="true"
              />
            }
            action={
              <Button asChild>
                <Link href={PATHS.shop}>{t("cart.continueShopping")}</Link>
              </Button>
            }
          />
        </div>

        <LoginDialog
          open={loginOpen}
          onOpenChange={setLoginOpen}
          onSuccess={handleCheckout}
        />
      </>
    );
  }

  return (
    <>
      <div className="container-app py-10">
        {/* Header */}
        <header className="mb-8 flex flex-wrap items-center justify-between gap-3">
          <h1 className="text-3xl font-bold tracking-tight">
            {t("cart.title")}
          </h1>

          <span className="text-sm text-muted-foreground">
            {t("cart.itemsCount", {
              count: itemCount,
            })}
          </span>
        </header>

        <div className="grid gap-10 lg:grid-cols-[1fr_340px]">
          {/* ---------------------------------------------------------------- */}
          {/* Cart items                                                       */}
          {/* ---------------------------------------------------------------- */}

          <div className="space-y-4">
            {items.map((item) => {
              const unitPrice = storedItemUnitPrice(item);

              const totalPrice = unitPrice * item.quantity;

              return (
                <div
                  key={item.productId}
                  className="flex gap-4 rounded-xl border p-4"
                >
                  {/* Product image */}
                  <Link
                    href={PATHS.shopProduct(item.slug)}
                    className="shrink-0"
                  >
                    <img
                      src={item.image}
                      alt={l({
                        vi: item.nameVi,
                        en: item.nameEn,
                      })}
                      className="h-20 w-20 rounded-lg border object-cover sm:h-24 sm:w-24"
                    />
                  </Link>

                  <div className="flex min-w-0 flex-1 flex-col justify-between gap-2">
                    {/* Product name + remove */}
                    <div className="flex items-start justify-between gap-3">
                      <Link
                        href={PATHS.shopProduct(item.slug)}
                        className="line-clamp-2 font-medium hover:text-primary hover:underline"
                      >
                        {l({
                          vi: item.nameVi,
                          en: item.nameEn,
                        })}
                      </Link>

                      <button
                        type="button"
                        onClick={() => removeItem(item.productId)}
                        className="shrink-0 rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                        aria-label={t("cart.removeItem")}
                      >
                        <Trash2 className="h-4 w-4" aria-hidden="true" />
                      </button>
                    </div>

                    {/* Quantity + price */}
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div className="inline-flex items-center rounded-md border">
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(item.productId, item.quantity - 1)
                          }
                          className="flex h-8 w-8 items-center justify-center transition-colors hover:bg-accent"
                          aria-label="Decrease quantity"
                        >
                          −
                        </button>

                        <span className="w-10 text-center text-sm font-medium tabular-nums">
                          {item.quantity}
                        </span>

                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(item.productId, item.quantity + 1)
                          }
                          className="flex h-8 w-8 items-center justify-center transition-colors hover:bg-accent"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>

                      <span className="font-semibold tabular-nums">
                        {formatPrice(totalPrice)}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Clear cart */}
            <div className="flex justify-end">
              <Button
                variant="ghost"
                size="sm"
                className="gap-2 text-muted-foreground hover:text-destructive"
                onClick={clearCart}
              >
                <Trash2 className="h-4 w-4" aria-hidden="true" />

                {t("cart.clearCart")}
              </Button>
            </div>
          </div>

          {/* ---------------------------------------------------------------- */}
          {/* Order summary                                                     */}
          {/* ---------------------------------------------------------------- */}

          <aside>
            <div className="sticky top-24 rounded-xl border bg-card p-5">
              <h2 className="font-semibold">{t("cart.total")}</h2>

              <div className="mt-4 space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    {t("cart.subtotal")}
                  </span>

                  <span className="tabular-nums">{formatPrice(subtotal)}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    {t("cart.freeShipping")}
                  </span>

                  <span className="font-medium text-emerald-700 dark:text-emerald-400">
                    0₫
                  </span>
                </div>

                <Separator />

                <div className="flex justify-between text-base font-bold">
                  <span>{t("cart.total")}</span>

                  <span className="tabular-nums text-primary">
                    {formatPrice(subtotal)}
                  </span>
                </div>
              </div>

              {/* Checkout */}
              <Button
                size="lg"
                className="mt-5 w-full gap-2"
                onClick={handleCheckout}
                disabled={checkingOut}
              >
                <Lock className="h-4 w-4" aria-hidden="true" />

                {user ? t("cart.checkout") : t("cart.loginToCheckout")}
              </Button>

              <p className="mt-3 text-center text-xs text-muted-foreground">
                {t("cart.secureDemo")}
              </p>

              <Button asChild variant="ghost" className="mt-2 w-full">
                <Link href={PATHS.shop}>
                  <ArrowLeft className="mr-2 h-4 w-4" aria-hidden="true" />

                  {t("cart.continueShopping")}
                </Link>
              </Button>
            </div>
          </aside>
        </div>
      </div>

      <LoginDialog
        open={loginOpen}
        onOpenChange={setLoginOpen}
        onSuccess={handleCheckout}
      />
    </>
  );
}
