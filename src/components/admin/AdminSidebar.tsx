"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpenText,
  LayoutDashboard,
  Newspaper,
  Package,
  PanelLeftClose,
  PanelLeftOpen,
  PanelsTopLeft,
  ShoppingCart,
  Users,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { PATHS } from "@/lib/paths";
import { useI18n, withLocale } from "@/i18n";
import type { User } from "@/types";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import { Button } from "../ui/button";

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
  collapsed?: boolean;
  onToggleCollapse?: () => void;
};

export function AdminSidebar({
  user,
  onNavigate,
  collapsed = false,
  onToggleCollapse,
}: AdminSidebarProps) {
  const pathname = usePathname();
  const { locale, t } = useI18n();

  return (
    <aside className="flex h-full min-h-0 w-full flex-col bg-sidebar text-sidebar-foreground">
      {/* Logo */}
      <div
        className={cn(
          "flex h-16 shrink-0 items-center border-b border-sidebar-border",
          collapsed ? "justify-center px-2" : "px-4",
        )}
      >
        {!collapsed && (
          <Link
            href={withLocale(PATHS.admin, locale)}
            onClick={onNavigate}
            title={collapsed ? "Smart IoT VN" : undefined}
            className={cn(
              "flex min-w-0 items-center",
              collapsed ? "justify-center" : "gap-3",
            )}
          >
            <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-sidebar-primary text-sm font-bold text-sidebar-primary-foreground">
              <Image
                src={siteConfig.logo}
                alt="SmartIoTVN"
                width={48}
                height={48}
                className="h-auto w-auto object-contain"
              />
            </span>

            {!collapsed && (
              <span className="min-w-0">
                <span className="block truncate text-sm font-semibold">
                  Smart IoT VN
                </span>

                <span className="block text-xs text-muted-foreground">
                  {t("admin.panel")}
                </span>
              </span>
            )}
          </Link>
        )}
        <Button
          variant="ghost"
          size="icon"
          className="mt-2 ml-auto"
          onClick={onToggleCollapse}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? (
            <PanelLeftOpen className="size-4" />
          ) : (
            <PanelLeftClose className="size-4" />
          )}
        </Button>
      </div>

      {/* Navigation */}
      <div className="min-h-0 flex-1 overflow-y-auto p-2">
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
                title={collapsed ? t(`admin.nav.${item.key}`) : undefined}
                aria-label={collapsed ? t(`admin.nav.${item.key}`) : undefined}
                className={cn(
                  "flex h-10 items-center rounded-lg text-sm font-medium transition-colors",
                  collapsed ? "justify-center px-0" : "gap-3 px-3",
                  active
                    ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                )}
              >
                <item.icon className="size-4 shrink-0" aria-hidden="true" />

                {!collapsed && (
                  <span className="truncate">{t(`admin.nav.${item.key}`)}</span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* User */}
      <div className="shrink-0 border-t border-sidebar-border p-2">
        <div
          className={cn(
            "flex min-w-0 items-center rounded-lg bg-sidebar-accent/60 py-2.5",
            collapsed ? "justify-center px-0" : "gap-3 px-3",
          )}
          title={collapsed ? user.name : undefined}
        >
          <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-sidebar-primary/15 text-xs font-semibold text-sidebar-primary">
            {user.name.slice(0, 1).toUpperCase()}
          </div>

          {!collapsed && (
            <div className="min-w-0">
              <p className="truncate text-sm font-medium">{user.name}</p>

              <p className="truncate text-xs text-muted-foreground">
                {user.email}
              </p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
