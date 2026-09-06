import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";
import { SITE_DEFAULT_LOCALE } from "../config/site";

export const routing = defineRouting({
  locales: ["vi", "en"],
  defaultLocale: SITE_DEFAULT_LOCALE,
  localeDetection: false,
  localePrefix: "as-needed",
});

export const { Link, redirect, usePathname, useRouter } =
  createNavigation(routing);
