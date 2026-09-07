import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import {
  GraduationCap,
  HeartHandshake,
  Mail,
  MapPin,
  Microscope,
  Phone,
  type LucideIcon,
} from "lucide-react";

import { SectionHeading } from "@/components/shared/primitives";
import { PATHS } from "@/src/lib/paths";
import { siteConfig } from "@/src/config/site";

type AboutPageProps = {
  params: Promise<{
    locale: string;
  }>;
};

type AboutValue = {
  icon: LucideIcon;
  title: string;
  text: string;
};

export async function generateMetadata({
  params,
}: AboutPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({
    locale,
    namespace: "seo",
  });

  const path = `/${locale}${PATHS.about}`;

  return {
    title: t("aboutTitle"),
    description: t("aboutDesc"),
    alternates: {
      canonical: `${siteConfig.url}${path}`,
    },
  };
}

export default async function AboutPage({ params }: AboutPageProps) {
  const { locale } = await params;

  const t = await getTranslations({
    locale,
    namespace: "about",
  });

  const values: AboutValue[] = [
    {
      icon: Microscope,
      title: t("value1Title"),
      text: t("value1Text"),
    },
    {
      icon: HeartHandshake,
      title: t("value2Title"),
      text: t("value2Text"),
    },
    {
      icon: GraduationCap,
      title: t("value3Title"),
      text: t("value3Text"),
    },
  ];

  return (
    <div className="container-app py-10">
      <header className="mx-auto max-w-3xl text-center">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          {t("title")}
        </h1>

        <p className="mt-3 text-lg text-muted-foreground">{t("subtitle")}</p>
      </header>

      <section
        className="mx-auto mt-12 max-w-3xl rounded-xl border bg-muted/30 p-8 text-center"
        aria-labelledby="mission-title"
      >
        <h2 id="mission-title" className="text-xl font-semibold">
          {t("missionTitle")}
        </h2>

        <p className="mt-3 leading-relaxed text-muted-foreground">
          {t("missionText")}
        </p>
      </section>

      <section className="mt-14" aria-labelledby="values-title">
        <SectionHeading title={t("valuesTitle")} />

        <div className="mt-6 grid gap-6 sm:grid-cols-3">
          {values.map((value) => {
            const Icon = value.icon;

            return (
              <div
                key={value.title}
                className="rounded-xl border p-6 text-center"
              >
                <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-primary/10">
                  <Icon className="h-5 w-5 text-primary" aria-hidden="true" />
                </span>

                <h3 className="mt-3 font-semibold">{value.title}</h3>

                <p className="mt-1.5 text-sm text-muted-foreground">
                  {value.text}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      <section
        className="mx-auto mt-14 max-w-3xl rounded-xl border p-8"
        aria-labelledby="contact-title"
      >
        <h2 id="contact-title" className="text-xl font-semibold">
          {t("contactTitle")}
        </h2>

        <p className="mt-2 text-muted-foreground">{t("contactDesc")}</p>

        <dl className="mt-5 grid gap-4 text-sm sm:grid-cols-3">
          <div className="flex items-start gap-2.5">
            <MapPin
              className="mt-0.5 h-4 w-4 shrink-0 text-primary"
              aria-hidden="true"
            />

            <div>
              <dt className="font-medium">{t("addressLabel")}</dt>

              <dd className="mt-0.5 text-muted-foreground">
                {t("addressValue")}
              </dd>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <Mail
              className="mt-0.5 h-4 w-4 shrink-0 text-primary"
              aria-hidden="true"
            />

            <div>
              <dt className="font-medium">{t("emailLabel")}</dt>

              <dd className="mt-0.5 text-muted-foreground">
                {siteConfig.contact.email}
              </dd>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <Phone
              className="mt-0.5 h-4 w-4 shrink-0 text-primary"
              aria-hidden="true"
            />

            <div>
              <dt className="font-medium">{t("phoneLabel")}</dt>

              <dd className="mt-0.5 text-muted-foreground">
                {siteConfig.contact.phone}
              </dd>
            </div>
          </div>
        </dl>
      </section>
    </div>
  );
}
