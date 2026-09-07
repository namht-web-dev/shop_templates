import type { Metadata } from "next";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Compass } from "lucide-react";

import { Button } from "@/components/ui/button";
import { PATHS } from "@/src/lib/paths";

type NotFoundPageProps = {
  params: Promise<{
    locale: string;
  }>;
};

export async function generateMetadata({
  params,
}: NotFoundPageProps): Promise<Metadata> {
  const { locale } = await params;

  const t = await getTranslations({
    locale,
    namespace: "notFound",
  });

  return {
    title: t("title"),
    description: t("desc"),
  };
}

export default async function NotFoundPage({ params }: NotFoundPageProps) {
  return (
    <div className="container-app flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <span className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-accent">
        <Compass className="h-8 w-8 text-primary" aria-hidden="true" />
      </span>

      <p className="text-sm font-semibold uppercase tracking-widest text-primary">
        404
      </p>

      <h1 className="mt-2 text-3xl font-bold tracking-tight">
        Không tìm thấy trang
      </h1>

      <p className="mt-3 max-w-md text-muted-foreground">
        Trang bạn tìm không tồn tại hoặc đã được di chuyển.
      </p>

      <Button asChild className="mt-8">
        <Link href={`${PATHS.home}`}>Về trang chủ</Link>
      </Button>
    </div>
  );
}
