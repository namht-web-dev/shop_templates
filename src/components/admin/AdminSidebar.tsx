"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpenText,
  LayoutDashboard,
  Newspaper,
  Package,
  ShoppingCart,
  Users,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { PATHS } from "@/lib/paths";
import { useI18n, withLocale } from "@/i18n";
import type { User } from "@/types";
import Image from "next/image";
import { siteConfig } from "@/config/site";

const NAV_ITEMS = [
  {
    key: "dashboard",
    href: PATHS.admin,
    icon: LayoutDashboard,
  },
  {
    key: "products",
    href: `${PATHS.admin}/products`,
    icon: Package,
  },
  {
    key: "knowledge",
    href: `${PATHS.admin}/knowledge`,
    icon: BookOpenText,
  },
  {
    key: "news",
    href: `${PATHS.admin}/news`,
    icon: Newspaper,
  },
  {
    key: "orders",
    href: `${PATHS.admin}/orders`,
    icon: ShoppingCart,
  },
  {
    key: "users",
    href: `${PATHS.admin}/users`,
    icon: Users,
  },
] as const;

type AdminSidebarProps = {
  user: User;
  onNavigate?: () => void;
};

export function AdminSidebar({ user, onNavigate }: AdminSidebarProps) {
  const pathname = usePathname();
  const { locale, t } = useI18n();

  return (
    <aside className="flex h-full min-h-0 w-full flex-col bg-sidebar text-sidebar-foreground">
      <div className="flex h-16 shrink-0 items-center border-b border-sidebar-border px-5">
        <Link
          href={withLocale(PATHS.admin, locale)}
          onClick={onNavigate}
          className="flex min-w-0 items-center gap-3 mx-auto"
        >
          <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-sidebar-primary text-sm font-bold text-sidebar-primary-foreground">
            <Image
              src={`${siteConfig.logo}`}
              alt="SmartIoTVN"
              width={48}
              height={48}
              className="w-auto h-auto object-contain"
            />
          </span>

          <span className="min-w-0">
            <span className="block truncate text-sm font-semibold">
              Smart IoT VN
            </span>

            <span className="block text-xs text-muted-foreground">
              {t("admin.panel")}
            </span>
          </span>
        </Link>
      </div>
      {/* Navigation */}
      <div className="flex-1 overflow-y-auto p-3">
        {/* <p className="mb-2 px-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
          {t("admin.navigation")}
        </p> */}

        <nav className="space-y-1" aria-label={t("admin.navigation")}>
          {NAV_ITEMS.map((item) => {
            const href = withLocale(item.href, locale);

            const active =
              item.href === PATHS.admin
                ? pathname === href
                : pathname === href || pathname.startsWith(`${href}/`);

            return (
              <Link
                key={item.key}
                href={href}
                onClick={onNavigate}
                className={cn(
                  "flex h-10 items-center gap-3 rounded-lg px-3 text-sm font-medium transition-colors",
                  active
                    ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                )}
              >
                <item.icon className="size-4 shrink-0" aria-hidden="true" />

                <span>{t(`admin.nav.${item.key}`)}</span>
              </Link>
            );
          })}
        </nav>
      </div>
      {/* Admin user */}
      <div className="border-t border-sidebar-border p-3">
        <div className="flex min-w-0 items-center gap-3 rounded-lg bg-sidebar-accent/60 px-3 py-2.5">
          <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-sidebar-primary/15 text-xs font-semibold text-sidebar-primary">
            {user.name.slice(0, 1).toUpperCase()}
          </div>

          <div className="min-w-0">
            <p className="truncate text-sm font-medium">{user.name}</p>

            <p className="truncate text-xs text-muted-foreground">
              {user.email}
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}
