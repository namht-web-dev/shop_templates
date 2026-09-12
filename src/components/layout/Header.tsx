"use client";

/**
 * App header: brand, main navigation, global search, language switcher,
 * theme toggle, cart and account shell for Next.js App Router.
 */
import { useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  ChevronDown,
  Globe,
  LogOut,
  Menu,
  Moon,
  Search,
  Settings,
  ShoppingBag,
  ShoppingCart,
  Sun,
  User,
  X,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SearchDialog } from "@/components/shared/SearchDialog";
import { LoginDialog } from "@/components/shared/LoginDialog";
import { useCartStore, useAuthStore, selectCartCount } from "@/store";
import { useI18n } from "@/i18n";
import { useTheme } from "@/lib/theme";
import { PATHS } from "@/lib/paths";
import { cn } from "@/lib/utils";
import type { Locale } from "@/types";
import { SITE_DEFAULT_LOCALE, siteConfig } from "@/config/site";
import Image from "next/image";

// Hook chuẩn kiểm tra mounted không dùng useEffect/setState
const emptySubscribe = () => () => {};
function useHasMounted() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true, // Client-side
    () => false, // Server-side (SSR)
  );
}

export function Header() {
  const { t, locale, setLocale } = useI18n();
  const router = useRouter();
  const pathname = usePathname();

  const { theme, toggleTheme } = useTheme();

  // 1. Kiểm tra mounted an toàn bằng useSyncExternalStore
  const mounted = useHasMounted();

  const cartCount = useCartStore(selectCartCount);
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  const [searchOpen, setSearchOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);

  // 2. Tự động reset mobileOpen khi pathname thay đổi (Không dùng useEffect)
  const [mobileOpen, setMobileOpen] = useState(false);
  const [prevPathname, setPrevPathname] = useState(pathname);

  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setMobileOpen(false); // React cho phép điều chỉnh state trực tiếp trong render loop khi phát hiện prop/state khác thay đổi
  }

  const navItems = siteConfig.navigation.header
    .filter((item) => item.enabled)
    .map((item) => ({
      ...item,
      label: t(`nav.${item.key}`),
    }));

  const handleLogout = () => {
    logout();
    router.push(`/${locale}${PATHS.home}`);
  };

  const isLinkActive = (path: string) => {
    const fullPath = `${locale === SITE_DEFAULT_LOCALE ? "" : "/" + locale}${path}`;
    if (path === PATHS.home) {
      return pathname === fullPath;
    }
    return pathname === fullPath;
  };
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/85 backdrop-blur supports-backdrop-filter:bg-background/70">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6 lg:px-8">
        {/* Brand */}
        <Link
          href={
            locale === SITE_DEFAULT_LOCALE
              ? PATHS.home
              : `/${locale}${PATHS.home}`
          }
          className="flex shrink-0 items-center gap-2"
        >
          <div className="flex items-center gap-2">
            <Image
              src={`${siteConfig.logo}`}
              alt="SmartIoTVN"
              width={40}
              height={40}
              className="h-10 w-10 object-contain"
            />

            <span className="hidden text-lg font-bold tracking-tight sm:block">
              Smart<span className="text-primary">IoT</span>VN
            </span>
          </div>
        </Link>

        {/* Desktop navigation */}
        <nav
          aria-label="Main"
          className="hidden flex-1 items-center gap-1 lg:flex"
        >
          {navItems.map((item) => {
            const href = item.path;
            const localizedHref =
              locale === SITE_DEFAULT_LOCALE ? href : `/${locale}${href}`;

            const active = isLinkActive(item.path);

            return (
              <Link
                key={`/${locale}${item.path}`}
                href={localizedHref}
                className={cn(
                  "rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                  active ? "text-primary font-semibold" : "text-foreground/80",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Actions */}
        <div className="ml-auto flex items-center gap-1">
          {/* Global Search Button */}
          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-md transition-colors hover:bg-accent"
            aria-label={t("header.search")}
          >
            <Search className="h-4.5 w-4.5" aria-hidden="true" />
          </button>

          {/* Language switcher */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                className="inline-flex h-9 items-center gap-1 rounded-md px-2 text-sm font-medium transition-colors hover:bg-accent"
                aria-label={t("header.language")}
              >
                <Globe className="h-4.5 w-4.5" aria-hidden="true" />
                <span className="hidden sm:inline">{locale.toUpperCase()}</span>
                <ChevronDown
                  className="h-3.5 w-3.5 text-muted-foreground"
                  aria-hidden="true"
                />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {(["vi", "en"] as Locale[]).map((lng) => (
                <DropdownMenuItem
                  key={lng}
                  onClick={() => setLocale(lng)}
                  className={cn(locale === lng && "bg-accent font-medium")}
                >
                  {lng === "vi" ? "VN Tiếng Việt" : "US English"}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Theme toggle */}
          <button
            type="button"
            onClick={toggleTheme}
            className="inline-flex h-9 w-9 items-center justify-center rounded-md transition-colors hover:bg-accent"
            aria-label={t("header.theme")}
          >
            {mounted ? (
              theme === "dark" ? (
                <Sun className="h-4.5 w-4.5" aria-hidden="true" />
              ) : (
                <Moon className="h-4.5 w-4.5" aria-hidden="true" />
              )
            ) : (
              <span className="h-4.5 w-4.5" />
            )}
          </button>

          {/* Cart */}
          <Link
            href={`/${locale}${PATHS.cart}`}
            className="relative inline-flex h-9 w-9 items-center justify-center rounded-md transition-colors hover:bg-accent"
            aria-label={t("header.cart")}
          >
            <ShoppingCart className="h-4.5 w-4.5" aria-hidden="true" />
            {mounted && cartCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-primary-foreground">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Account */}
          {mounted && user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  type="button"
                  className="inline-flex h-9 items-center gap-1.5 rounded-md px-2 text-sm font-medium transition-colors hover:bg-accent"
                  aria-label={t("header.account")}
                >
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                    {user.name.charAt(0).toUpperCase()}
                  </span>
                  <span className="hidden max-w-24 truncate md:inline">
                    {user.name}
                  </span>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuLabel className="truncate">
                  {user.email}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => router.push(`/${locale}${PATHS.account}`)}
                >
                  <User className="h-4 w-4 mr-2" aria-hidden="true" />
                  {t("account.profile")}
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() =>
                    router.push(`/${locale}${PATHS.accountCourses}`)
                  }
                >
                  <ShoppingBag className="h-4 w-4 mr-2" aria-hidden="true" />
                  {t("account.myCourses")}
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() =>
                    router.push(`/${locale}${PATHS.accountOrders}`)
                  }
                >
                  <ShoppingCart className="h-4 w-4 mr-2" aria-hidden="true" />
                  {t("account.myOrders")}
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() =>
                    router.push(`/${locale}${PATHS.accountSettings}`)
                  }
                >
                  <Settings className="h-4 w-4 mr-2" aria-hidden="true" />
                  {t("account.settings")}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="text-destructive focus:text-destructive"
                >
                  <LogOut className="h-4 w-4 mr-2" aria-hidden="true" />
                  {t("header.logout")}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <button
              type="button"
              onClick={() => setLoginOpen(true)}
              className="inline-flex h-9 items-center gap-1.5 rounded-md ml-2 bg-primary px-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              <User className="h-4 w-4" aria-hidden="true" />
              <span className="hidden sm:inline">{t("header.login")}</span>
            </button>
          )}

          {/* Mobile menu toggle */}
          <button
            type="button"
            onClick={() => setMobileOpen((open) => !open)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-md transition-colors hover:bg-accent lg:hidden"
            aria-label="Menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile navigation */}
      {mobileOpen && (
        <nav aria-label="Mobile" className="border-t bg-background lg:hidden">
          <div className="mx-auto grid max-w-7xl gap-1 px-4 py-3 sm:px-6">
            {navItems.map((item) => {
              const href = item.path;
              const localizedHref =
                locale === SITE_DEFAULT_LOCALE ? href : `/${locale}${href}`;

              const active = isLinkActive(item.path);

              return (
                <Link
                  key={item.path}
                  href={localizedHref}
                  className={cn(
                    "rounded-md px-3 py-2.5 text-sm font-medium transition-colors hover:bg-accent",
                    active
                      ? "bg-accent text-primary font-semibold"
                      : "text-foreground/80",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </nav>
      )}

      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
      <LoginDialog open={loginOpen} onOpenChange={setLoginOpen} />
    </header>
  );
}
