"use client";

import Link from "next/link";
import { Loader2, Package } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { EmptyState } from "@/components/shared/states";
import { useI18n } from "@/i18n";
import { PATHS } from "@/lib/paths";
import { Order, OrderStatus } from "@/types";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getMyOrdersAction } from "@/actions/order.action";

export default function AccountOrdersPage() {
  const { t, l, formatPrice, formatDate } = useI18n();

  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const res = await getMyOrdersAction();

        if (res.success) {
          setOrders(res.orders as Order[]);
        }
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, []);
  if (loading) {
    return (
      <div className="flex flex-col items-center gap-3">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }
  if (orders.length === 0) {
    return (
      <EmptyState
        title={t("account.ordersEmptyTitle")}
        description={t("account.ordersEmptyDesc")}
        icon={
          <Package
            className="h-6 w-6 text-muted-foreground"
            aria-hidden="true"
          />
        }
        action={
          <Button asChild>
            <Link href={PATHS.shop}>{t("account.startShopping")} </Link>
          </Button>
        }
      />
    );
  }

  return (
    <div className="space-y-4">
      {" "}
      <p className="text-sm text-muted-foreground">
        {t("account.myOrdersDesc")}{" "}
      </p>
      {orders.map((order: Order) => {
        const orderStatus = order.status.toLowerCase() as OrderStatus;
        const statusKey = {
          pending: "statusPending",
          processing: "statusProcessing",
          shipped: "statusShipped",
          delivered: "statusDelivered",
          completed: "statusCompleted",
          cancelled: "statusCancelled",
        } as const;
        return (
          <article key={order.id} className="rounded-xl border bg-card p-5">
            <header className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="font-mono text-sm font-semibold">{order.id}</p>

                <p className="mt-0.5 text-xs text-muted-foreground">
                  {formatDate(order.createdAt)}
                </p>
              </div>

              <Badge
                variant={
                  orderStatus === "cancelled" || orderStatus === "processing"
                    ? "destructive"
                    : "default"
                }
              >
                {t(`account.${statusKey[orderStatus]}`)}
              </Badge>
            </header>

            <Separator className="my-4" />

            <ul className="space-y-3">
              {order.items.map((item) => (
                <li key={item.productId} className="flex items-center gap-3">
                  <Image
                    src={item.image}
                    alt=""
                    width={48}
                    height={48}
                    className="h-12 w-12 rounded-lg border object-cover"
                  />

                  <div className="min-w-0 flex-1">
                    <p className="line-clamp-1 text-sm font-medium">
                      {l({
                        vi: item.nameVi,
                        en: item.nameEn,
                      })}
                    </p>

                    <p className="text-xs text-muted-foreground tabular-nums">
                      {formatPrice(item.price)} × {item.quantity}
                    </p>
                  </div>

                  <span className="shrink-0 text-sm font-medium tabular-nums">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-4 flex items-center justify-between border-t pt-4 text-sm">
              <span className="text-muted-foreground">
                {t("account.orderTotal")}
              </span>

              <span className="text-base font-bold tabular-nums text-primary">
                {formatPrice(order.total)}
              </span>
            </div>
          </article>
        );
      })}
    </div>
  );
}
