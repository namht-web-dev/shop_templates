"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ExternalLink, LogOut, Menu, Moon, Sun } from "lucide-react";
import { toast } from "sonner";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useI18n, withLocale } from "@/i18n";
import { PATHS } from "@/lib/paths";
import { logoutAction } from "@/lib/auth";
import { useAuthStore } from "@/store";
import { useTheme } from "@/lib/theme";
import type { User } from "@/types";

interface AdminHeaderProps {
  user: User;
  onMenuClick: () => void;
}

export function AdminHeader({ user, onMenuClick }: AdminHeaderProps) {
  const { locale, t } = useI18n();
  const router = useRouter();
  const pathname = usePathname();

  const { theme, toggleTheme } = useTheme();

  const clearAuth = useAuthStore((state) => state.logout);

  const segment = pathname.split("/").filter(Boolean).at(-1) ?? "admin";
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);
  const pageTitle =
    segment === "admin" ? t("admin.dashboard") : t(`admin.nav.${segment}`);

  const handleLogout = async () => {
    await logoutAction();

    clearAuth();

    toast.success(t("auth.loggedOut"));

    router.push(withLocale(PATHS.home, locale));

    router.refresh();
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center justify-between border-b bg-background/95 px-3 backdrop-blur supports-backdrop-filter:bg-background/80 sm:px-5">
      {/* Left */}
      <div className="flex min-w-0 items-center gap-2 sm:gap-3">
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={onMenuClick}
          aria-label={t("admin.openMenu")}
        >
          <Menu />
        </Button>

        <div className="min-w-0">
          <h1 className="truncate text-base font-semibold sm:text-lg">
            {pageTitle}
          </h1>

          <p className="hidden text-xs text-muted-foreground sm:block">
            {t("admin.subtitle")}
          </p>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-1 sm:gap-2">
        {/* Theme */}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          aria-label={t("admin.toggleTheme")}
        >
          {mounted ? (
            theme === "dark" ? (
              <Sun />
            ) : (
              <Moon />
            )
          ) : (
            <span className="h-4 w-4" />
          )}
        </Button>

        {/* Website */}
        <Button
          variant="ghost"
          size="icon"
          asChild
          className="hidden sm:inline-flex"
        >
          <Link
            href={withLocale(PATHS.home, locale)}
            aria-label={t("admin.viewWebsite")}
          >
            <ExternalLink />
          </Link>
        </Button>

        {/* User */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-9 gap-2 px-1.5 sm:px-2">
              <Avatar size="sm">
                {user.avatar ? (
                  <AvatarImage src={user.avatar} alt={user.name} />
                ) : null}

                <AvatarFallback className="w-full bg-transparent">
                  {user.name.slice(0, 1).toUpperCase()}
                </AvatarFallback>
              </Avatar>

              <span className="hidden max-w-32 truncate text-sm font-medium md:block">
                {user.name}
              </span>
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel className="font-normal">
              <p className="truncate text-sm font-medium">{user.name}</p>

              <p className="truncate text-xs text-muted-foreground">
                {user.email}
              </p>
            </DropdownMenuLabel>

            <DropdownMenuSeparator />

            <DropdownMenuItem asChild>
              <Link href={withLocale(PATHS.home, locale)}>
                <ExternalLink />
                {t("admin.viewWebsite")}
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem variant="destructive" onClick={handleLogout}>
              <LogOut />
              {t("account.logout")}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
