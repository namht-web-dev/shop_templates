import { SITE_DEFAULT_LOCALE } from "@/src/config/site";

export const localePathNavigateHelper = (locale: string, path: string) => {
  return locale === SITE_DEFAULT_LOCALE ? path : `/${locale}${path}`;
};
