import Link from "next/link";
import { redirect } from "next/navigation";
import {
  Activity,
  BookOpenText,
  Newspaper,
  Package,
  ShoppingCart,
  Users,
  Wallet,
  ArrowUpRight,
} from "lucide-react";

import { prisma } from "@/db";
import { getCurrentUser } from "@/lib/auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type AdminPageProps = {
  params: Promise<{ locale: string }>;
};

const currency = new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",
  maximumFractionDigits: 0,
});

const dateFormatter = new Intl.DateTimeFormat("vi-VN", {
  dateStyle: "short",
  timeStyle: "short",
});

const statusLabels: Record<string, string> = {
  PENDING: "Chờ xử lý",
  PROCESSING: "Đang xử lý",
  SHIPPED: "Đang giao",
  DELIVERED: "Đã giao",
  CANCELLED: "Đã hủy",
};

const statusStyles: Record<string, string> = {
  PENDING: "bg-yellow-100 text-yellow-800",
  PROCESSING: "bg-blue-100 text-blue-800",
  SHIPPED: "bg-violet-100 text-violet-800",
  DELIVERED: "bg-green-100 text-green-800",
  CANCELLED: "bg-red-100 text-red-800",
};

export default async function AdminPage({ params }: AdminPageProps) {
  const { locale } = await params;

  // Server-side authentication and authorization.
  const user = await getCurrentUser();

  if (!user) {
    redirect(`/${locale}/login`);
  }

  if (user.role !== "ADMIN") {
    redirect(`/${locale}`);
  }

  const now = new Date();

  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);

  const [
    userCount,
    productCount,
    blogCount,
    newsCount,
    orderCount,
    pendingOrders,
    monthlyOrders,
    recentOrders,
    recentBlogs,
    recentNews,
  ] = await Promise.all([
    prisma.user.count(),

    prisma.product.count(),

    prisma.blogPost.count(),

    prisma.newsArticle.count(),

    prisma.order.count(),

    prisma.order.count({
      where: {
        status: "PENDING",
      },
    }),

    prisma.order.findMany({
      where: {
        createdAt: {
          gte: monthStart,
        },
        status: {
          not: "CANCELLED",
        },
      },
      select: {
        total: true,
      },
    }),

    prisma.order.findMany({
      take: 6,
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        code: true,
        customerName: true,
        customerEmail: true,
        total: true,
        status: true,
        createdAt: true,
      },
    }),

    prisma.blogPost.findMany({
      take: 4,
      orderBy: {
        updatedAt: "desc",
      },
      select: {
        id: true,
        slug: true,
        title: true,
        updatedAt: true,
      },
    }),

    prisma.newsArticle.findMany({
      take: 4,
      orderBy: {
        updatedAt: "desc",
      },
      select: {
        id: true,
        slug: true,
        title: true,
        updatedAt: true,
      },
    }),
  ]);

  const monthlyRevenue = monthlyOrders.reduce(
    (sum, order) => sum + order.total,
    0,
  );

  const stats = [
    {
      title: "Người dùng",
      value: userCount.toLocaleString("vi-VN"),
      description: "Tổng tài khoản",
      icon: Users,
      href: `/${locale}/admin/users`,
    },
    {
      title: "Sản phẩm",
      value: productCount.toLocaleString("vi-VN"),
      description: "Sản phẩm trong hệ thống",
      icon: Package,
      href: `/${locale}/admin/products`,
    },
    {
      title: "Đơn hàng",
      value: orderCount.toLocaleString("vi-VN"),
      description: `${pendingOrders} đơn đang chờ xử lý`,
      icon: ShoppingCart,
      href: `/${locale}/admin/orders`,
    },
    {
      title: "Doanh thu tháng",
      value: currency.format(monthlyRevenue),
      description: "Đơn không bị hủy, theo ngày tạo",
      icon: Wallet,
      href: `/${locale}/admin/orders`,
    },
    {
      title: "Bài kiến thức",
      value: blogCount.toLocaleString("vi-VN"),
      description: "Tổng bài chia sẻ",
      icon: BookOpenText,
      href: `/${locale}/admin/knowledge`,
    },
    {
      title: "Tin tức",
      value: newsCount.toLocaleString("vi-VN"),
      description: "Tổng bài tin tức",
      icon: Newspaper,
      href: `/${locale}/admin/news`,
    },
  ];

  const getTitle = (title: unknown): string => {
    if (title && typeof title === "object" && !Array.isArray(title)) {
      const localized = title as Record<string, unknown>;

      const value = localized[locale] ?? localized.vi ?? localized.en;

      return typeof value === "string" ? value : "Chưa có tiêu đề";
    }

    return typeof title === "string" ? title : "Chưa có tiêu đề";
  };

  return (
    <div className="mx-auto w-full max-w-7xl space-y-6">
      {/* Page heading */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Tổng quan</h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Xin chào {user.name}, đây là tình hình hoạt động của Smart IoT VN.
          </p>
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Activity className="size-4" />
          <span>Cập nhật: {dateFormatter.format(now)}</span>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <Link key={stat.title} href={stat.href} className="group">
              <Card className="h-full transition-colors hover:border-primary/40">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </CardTitle>

                  <Icon className="size-5 text-muted-foreground transition-colors group-hover:text-primary" />
                </CardHeader>

                <CardContent>
                  <div className="wrap-break-word text-2xl font-bold tracking-tight">
                    {stat.value}
                  </div>

                  <p className="mt-1 text-xs text-muted-foreground">
                    {stat.description}
                  </p>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>

      {/* Recent orders */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Đơn hàng gần đây</CardTitle>
            <p className="mt-1 text-sm text-muted-foreground">
              Những đơn hàng mới được tạo
            </p>
          </div>

          <Link
            href={`/${locale}/admin/orders`}
            className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
          >
            Xem tất cả
            <ArrowUpRight className="size-4" />
          </Link>
        </CardHeader>

        <CardContent>
          {recentOrders.length === 0 ? (
            <div className="rounded-lg border border-dashed p-8 text-center text-sm text-muted-foreground">
              Chưa có đơn hàng nào.
            </div>
          ) : (
            <div className="w-full overflow-x-auto">
              <table className="w-full min-w-170 text-sm">
                <thead>
                  <tr className="border-b text-left text-muted-foreground">
                    <th className="pb-3 pr-4 font-medium">Mã đơn</th>
                    <th className="pb-3 pr-4 font-medium">Khách hàng</th>
                    <th className="pb-3 pr-4 font-medium">Ngày đặt</th>
                    <th className="pb-3 pr-4 text-right font-medium">
                      Tổng tiền
                    </th>
                    <th className="pb-3 text-right font-medium">Trạng thái</th>
                  </tr>
                </thead>

                <tbody>
                  {recentOrders.map((order) => (
                    <tr key={order.id} className="border-b last:border-0">
                      <td className="py-4 pr-4 font-medium">{order.code}</td>

                      <td className="py-4 pr-4">
                        <div className="max-w-48">
                          <p className="truncate font-medium">
                            {order.customerName || "Khách vãng lai"}
                          </p>
                        </div>
                      </td>

                      <td className="whitespace-nowrap py-4 pr-4 text-muted-foreground">
                        {dateFormatter.format(order.createdAt)}
                      </td>

                      <td className="whitespace-nowrap py-4 pr-4 text-right font-medium">
                        {currency.format(order.total)}
                      </td>

                      <td className="py-4 text-right">
                        <span
                          className={`inline-flex whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-medium ${
                            statusStyles[order.status] ??
                            "bg-muted text-muted-foreground"
                          }`}
                        >
                          {statusLabels[order.status] ?? order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Recent content */}
      <div className="grid gap-6 xl:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Bài kiến thức cập nhật</CardTitle>

            <Link
              href={`/${locale}/admin/knowledge`}
              className="text-sm font-medium text-primary hover:underline"
            >
              Quản lý
            </Link>
          </CardHeader>

          <CardContent>
            {recentBlogs.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                Chưa có bài kiến thức.
              </p>
            ) : (
              <div className="space-y-4">
                {recentBlogs.map((post) => (
                  <div
                    key={post.id}
                    className="flex min-w-0 items-start justify-between gap-4 border-b pb-3 last:border-0 last:pb-0"
                  >
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium">
                        {getTitle(post.title)}
                      </p>

                      <p className="mt-1 text-xs text-muted-foreground">
                        Cập nhật {dateFormatter.format(post.updatedAt)}
                      </p>
                    </div>

                    <Link
                      href={`/${locale}/blog/${post.slug}`}
                      className="shrink-0 text-xs text-primary hover:underline"
                    >
                      Xem bài
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Tin tức cập nhật</CardTitle>

            <Link
              href={`/${locale}/admin/news`}
              className="text-sm font-medium text-primary hover:underline"
            >
              Quản lý
            </Link>
          </CardHeader>

          <CardContent>
            {recentNews.length === 0 ? (
              <p className="text-sm text-muted-foreground">Chưa có tin tức.</p>
            ) : (
              <div className="space-y-4">
                {recentNews.map((article) => (
                  <div
                    key={article.id}
                    className="flex min-w-0 items-start justify-between gap-4 border-b pb-3 last:border-0 last:pb-0"
                  >
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium">
                        {getTitle(article.title)}
                      </p>

                      <p className="mt-1 text-xs text-muted-foreground">
                        Cập nhật {dateFormatter.format(article.updatedAt)}
                      </p>
                    </div>

                    <Link
                      href={`/${locale}/news/${article.slug}`}
                      className="shrink-0 text-xs text-primary hover:underline"
                    >
                      Xem tin
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
