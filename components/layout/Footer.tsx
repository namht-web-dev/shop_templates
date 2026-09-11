"use client";

/**
 * App footer: brand, link columns, contact and demo notice.
 */
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";

import { useI18n } from "@/src/i18n";
import { PATHS } from "@/src/lib/paths";
import { siteConfig } from "@/src/config/site";
import Image from "next/image";

export function Footer() {
  const { t, locale } = useI18n();

  const exploreLinks = siteConfig.navigation.header
    .filter((item) => item.enabled && item.group === "main")
    .map((item) => ({
      ...item,
      label: t(`nav.${item.key}`),
    }))
    .filter((link) => link.enabled);

  const knowledgeLinks = siteConfig.navigation.header
    .filter((item) => item.enabled && item.group === "news")
    .map((item) => ({
      ...item,
      label: t(`nav.${item.key}`),
    }))
    .filter((link) => link.enabled);

  const supportLinks = [
    {
      key: "login",
      label: t("auth.loginButton"),
      path: `/${locale}${PATHS.login}`,
      enabled: siteConfig.features.authentication,
    },
    {
      key: "about",
      label: t("footer.aboutLink"),
      path: `/${locale}${PATHS.about}`,
      enabled: true,
    },
    {
      key: "faq",
      label: t("footer.faq"),
      path: `/${locale}${PATHS.about}`,
      enabled: true,
    },
    {
      key: "shipping",
      label: t("footer.shipping"),
      path: `/${locale}${PATHS.about}`,
      enabled: siteConfig.features.shop,
    },
    {
      key: "privacy",
      label: t("footer.privacy"),
      path: `/${locale}${PATHS.about}`,
      enabled: true,
    },
  ].filter((link) => link.enabled);

  const site = siteConfig.translations[locale];

  return (
    <footer className="border-t bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand & Contact */}
          <div className="lg:col-span-2">
            <Link href={PATHS.home} className="flex items-center gap-2">
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

            <p className="mt-3 max-w-sm text-sm text-muted-foreground">
              {t("footer.tagline")}
            </p>

            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 shrink-0" aria-hidden="true" />
                {t("about.addressValue")}
              </li>

              {siteConfig.contact.email && (
                <li className="flex items-center gap-2">
                  <Mail className="h-4 w-4 shrink-0" aria-hidden="true" />
                  <a
                    href={`mailto:${siteConfig.contact.email}`}
                    className="transition-colors hover:text-foreground"
                  >
                    {siteConfig.contact.email}
                  </a>
                </li>
              )}

              {siteConfig.contact.phone && (
                <li className="flex items-center gap-2">
                  <Phone className="h-4 w-4 shrink-0" aria-hidden="true" />
                  <a
                    href={`tel:${siteConfig.contact.phone}`}
                    className="transition-colors hover:text-foreground"
                  >
                    {siteConfig.contact.phone}
                  </a>
                </li>
              )}
            </ul>
          </div>

          {/* Explore */}
          <nav aria-label={t("footer.explore")}>
            <h3 className="text-sm font-semibold">{t("footer.explore")}</h3>

            <ul className="mt-3 space-y-2 text-sm">
              {exploreLinks.map((link) => (
                <li key={link.key}>
                  <Link
                    href={`/${locale}${link.path}`}
                    className="text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Knowledge */}
          <nav aria-label={t("footer.knowledge")}>
            <h3 className="text-sm font-semibold">{t("footer.knowledge")}</h3>

            <ul className="mt-3 space-y-2 text-sm">
              {knowledgeLinks.map((link) => (
                <li key={link.key}>
                  <Link
                    href={`/${locale}${link.path}`}
                    className="text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Support */}
          <nav aria-label={t("footer.support")}>
            <h3 className="text-sm font-semibold">{t("footer.support")}</h3>

            <ul className="mt-3 space-y-2 text-sm">
              {supportLinks.map((link) => (
                <li key={link.key}>
                  <Link
                    href={`${link.path}`}
                    className="text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Copyright */}
        <div className="mt-10 flex flex-col items-start justify-between gap-2 border-t pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center">
          <p>{t("footer.rights")}</p>
          <p>{t("footer.demoNotice")}</p>
        </div>
      </div>
    </footer>
  );
}
