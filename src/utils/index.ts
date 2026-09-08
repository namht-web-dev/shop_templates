import { SITE_DEFAULT_LOCALE } from "@/src/config/site";
import { Locale } from "@/src/types";

export function isLocale(value: string): value is Locale {
  return value === "vi" || value === "en";
}
export const localePathNavigateHelper = (locale: string, path: string) => {
  return locale === SITE_DEFAULT_LOCALE ? path : `/${locale}${path}`;
};
