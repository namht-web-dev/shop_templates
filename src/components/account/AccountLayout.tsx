"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  BookOpen,
  LogOut,
  Package,
  Settings,
  User as UserIcon,
} from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store";
import { useI18n } from "@/i18n";
import { PATHS } from "@/lib/paths";
import { cn } from "@/lib/utils";
import { SITE_DEFAULT_LOCALE } from "@/config/site";
import { User } from "@/types";
import { logoutAction } from "@/lib/auth";

const NAV_ITEMS = [
  {
    to: PATHS.accountProfile,
    labelKey: "account.profile",
    icon: UserIcon,
    end: true,
  },
  {
    to: PATHS.accountCourses,
    labelKey: "account.myCourses",
    icon: BookOpen,
    end: false,
  },
  {
    to: PATHS.accountOrders,
    labelKey: "account.myOrders",
    icon: Package,
    end: false,
  },
  {
    to: PATHS.accountSettings,
    labelKey: "account.settings",
    icon: Settings,
    end: false,
  },
] as const;

type AccountLayoutProps = {
  user: User;
  children: React.ReactNode;
};

export function AccountLayout({ user, children }: AccountLayoutProps) {
  const { t, locale } = useI18n();
  const pathname = usePathname();
  const router = useRouter();
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = async () => {
    await logoutAction();
    logout();
    toast.success(t("auth.loggedOut"));
    router.push(`/${locale}${PATHS.home}`);
  };

  const isActive = (path: string, end: boolean) => {
    const comparePath =
      locale === SITE_DEFAULT_LOCALE ? path : `/${locale}${path}`;
    return pathname === comparePath;
  };

  if (!user) {
    return (
      <div className="container-app py-20">
        <div className="mx-auto flex max-w-md flex-col items-center rounded-xl border border-dashed bg-muted/20 px-6 py-14 text-center">
          <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-muted">
            <UserIcon
              className="h-6 w-6 text-muted-foreground"
              aria-hidden="true"
            />
          </span>

          <h1 className="font-semibold">{t("account.loginRequired")}</h1>

          <p className="mt-1 text-sm text-muted-foreground">
            {t("auth.loginDesc")}
          </p>

          <Button
            size="lg"
            className="mt-6"
            onClick={() => router.push(`/${locale}${PATHS.login}`)}
          >
            {t("auth.loginButton")}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container-app py-10">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">
          {t("account.title")}
        </h1>

        <p className="mt-1.5 text-muted-foreground">
          {user.name} · {user.email}
        </p>
      </header>

      <div className="grid gap-8 lg:grid-cols-[220px_1fr]">
        <aside>
          <nav className="flex gap-1 overflow-x-auto rounded-xl border p-2 lg:flex-col lg:overflow-visible">
            {NAV_ITEMS.map((item) => {
              const href = `/${locale}${item.to}`;
              const active = isActive(item.to, item.end);

              return (
                <Link
                  key={item.to}
                  href={href}
                  className={cn(
                    "flex shrink-0 items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    active
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-accent hover:text-foreground",
                  )}
                >
                  <item.icon className="h-4 w-4" aria-hidden="true" />

                  {t(item.labelKey)}
                </Link>
              );
            })}

            <button
              type="button"
              onClick={handleLogout}
              className="flex shrink-0 items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
            >
              <LogOut className="h-4 w-4" aria-hidden="true" />

              {t("account.logout")}
            </button>
          </nav>
        </aside>

        <main className="min-w-0">{children}</main>
      </div>
    </div>
  );
}
