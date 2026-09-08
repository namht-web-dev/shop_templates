"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
} from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { Locale, LocalizedString } from "@/src/types";
import vi from "../messages/vi.json";
import en from "../messages/en.json";
import { SITE_DEFAULT_LOCALE } from "../config/site";

type Messages = { [key: string]: string | Messages };

const dictionaries: Record<Locale, Messages> = { vi, en };

export const LOCALES: Locale[] = ["vi", "en"];
const LOCALE_STORAGE_KEY = "smartiot-locale";

function isLocale(value: string | undefined): value is Locale {
  return value === "vi" || value === "en";
}

function resolveMessage(dict: Messages, path: string): string | undefined {
  let node: string | Messages | undefined = dict;
  for (const segment of path.split(".")) {
    if (typeof node === "string") return undefined;
    node = node[segment];
  }
  return typeof node === "string" ? node : undefined;
}

function interpolate(
  template: string,
  vars?: Record<string, string | number>,
): string {
  if (!vars) return template;
  return template.replace(/\{(\w+)\}/g, (_match, key: string) =>
    key in vars ? String(vars[key]) : `{${key}}`,
  );
}

/** Extracts the locale prefix from a pathname, or null when absent. */
export function localeFromPathname(pathname: string): Locale | null {
  const first = pathname.split("/")[1];
  return isLocale(first) ? first : null;
}

/** Replaces (or injects) the locale prefix of a pathname. */
export function withLocale(pathname: string, locale: Locale): string {
  const [, first, ...rest] = pathname.split("/");
  const base = isLocale(first) ? rest : [first, ...rest].filter(Boolean);
  const suffix = base.length > 0 ? `/${base.join("/")}` : "";
  return `/${locale}${suffix}`;
}

interface I18nContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (path: string, vars?: Record<string, string | number>) => string;
  /** Picks the current language value from a bilingual entity field. */
  l: (value: LocalizedString) => string;
  formatPrice: (thousandsVnd: number) => string;
  formatDate: (isoDate: string) => string;
}

const I18nContext = createContext<I18nContextValue | null>(null);

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const pathnameLocale = localeFromPathname(pathname);
  const locale: Locale = pathnameLocale ?? SITE_DEFAULT_LOCALE;

  useEffect(() => {
    try {
      window.localStorage.setItem(LOCALE_STORAGE_KEY, locale);
    } catch {
      /* storage unavailable — ignore */
    }
    document.documentElement.lang = locale;
  }, [locale]);

  const setLocale = useCallback(
    (next: Locale) => {
      const search = searchParams.toString();
      const query = search ? `?${search}` : "";
      // 3. Dùng router.push của Next.js
      router.push(withLocale(pathname, next) + query);
    },
    [pathname, searchParams, router],
  );

  const t = useCallback(
    (path: string, vars?: Record<string, string | number>) => {
      const message =
        resolveMessage(dictionaries[locale], path) ??
        resolveMessage(dictionaries.en, path);
      return interpolate(message ?? path, vars);
    },
    [locale],
  );

  const l = useCallback((value: LocalizedString) => value[locale], [locale]);

  const formatPrice = useCallback(
    (thousandsVnd: number) =>
      `${new Intl.NumberFormat("vi-VN").format(thousandsVnd * 1000)}₫`,
    [],
  );

  const formatDate = useCallback(
    (isoDate: string) =>
      new Intl.DateTimeFormat(locale === "vi" ? "vi-VN" : "en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }).format(new Date(isoDate)),
    [locale],
  );

  const value = useMemo<I18nContextValue>(
    () => ({ locale, setLocale, t, l, formatPrice, formatDate }),
    [locale, setLocale, t, l, formatPrice, formatDate],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nContextValue {
  const context = useContext(I18nContext);
  if (!context) throw new Error("useI18n must be used within LocaleProvider");
  return context;
}

/** Builds a locale-prefixed href, e.g. link('/shop') -> '/vi/shop'. */
