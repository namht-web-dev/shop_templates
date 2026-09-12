"use client";

/**
 * Settings: theme (light/dark), language preference (VI/EN) and a demo
 * notification toggle. Theme + language persist through their own stores.
 */

import { useState } from "react";
import { Globe, Moon, Sun } from "lucide-react";

import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { useTheme } from "@/lib/theme";
import { useI18n } from "@/i18n";

function OptionButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition-colors",
        active
          ? "border-primary bg-primary text-primary-foreground"
          : "text-muted-foreground hover:bg-accent hover:text-foreground",
      )}
      aria-pressed={active}
    >
      {children}
    </button>
  );
}

export default function AccountSettingsPage() {
  const { t, locale, setLocale } = useI18n();
  const { theme, toggleTheme } = useTheme();

  const [notifications, setNotifications] = useState(false);

  return (
    <section className="rounded-xl border bg-card p-6">
      <h2 className="font-semibold">{t("account.settings")}</h2>

      <p className="mt-1 text-sm text-muted-foreground">
        {t("account.settingsDesc")}
      </p>

      <div className="mt-6 max-w-md space-y-6">
        {/* Appearance */}
        <div className="space-y-2">
          <Label>{t("account.appearance")}</Label>

          <div className="flex gap-2">
            <OptionButton
              active={theme === "light"}
              onClick={() => {
                if (theme !== "light") {
                  toggleTheme();
                }
              }}
            >
              <Sun className="h-4 w-4" aria-hidden="true" />
              {t("account.themeLight")}
            </OptionButton>

            <OptionButton
              active={theme === "dark"}
              onClick={() => {
                if (theme !== "dark") {
                  toggleTheme();
                }
              }}
            >
              <Moon className="h-4 w-4" aria-hidden="true" />
              {t("account.themeDark")}
            </OptionButton>
          </div>
        </div>

        {/* Language */}
        <div className="space-y-2">
          <Label>{t("account.languagePref")}</Label>

          <div className="flex gap-2">
            <OptionButton
              active={locale === "vi"}
              onClick={() => setLocale("vi")}
            >
              <Globe className="h-4 w-4" aria-hidden="true" />
              Tiếng Việt
            </OptionButton>

            <OptionButton
              active={locale === "en"}
              onClick={() => setLocale("en")}
            >
              <Globe className="h-4 w-4" aria-hidden="true" />
              English
            </OptionButton>
          </div>
        </div>

        {/* Notifications (demo) */}
        <div className="flex items-start justify-between gap-4 rounded-lg border p-4">
          <div>
            <Label htmlFor="notify-toggle">
              {t("account.notificationPref")}
            </Label>

            <p className="mt-1 text-xs text-muted-foreground">
              {t("account.notificationDesc")}
            </p>
          </div>

          <Switch
            id="notify-toggle"
            checked={notifications}
            onCheckedChange={setNotifications}
            aria-label={t("account.notificationPref")}
          />
        </div>
      </div>
    </section>
  );
}
