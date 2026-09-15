/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Loader2, CheckCircle2, XCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { AuthShell } from "@/components/auth/AuthShell";
import { verifyEmailAction } from "@/actions/auth.action";
import { PATHS } from "@/lib/paths";
import { localePathNavigateHelper } from "@/utils";
import { useI18n } from "@/i18n";

export default function VerifyEmailPage() {
  const { t, locale } = useI18n();
  const searchParams = useSearchParams();

  const token = searchParams.get("token");
  const calledRef = useRef(false);

  // Khởi tạo state: Nếu không có token, loading mặc định là false
  const [loading, setLoading] = useState<boolean>(Boolean(token));
  const [success, setSuccess] = useState<boolean>(false);
  const [message, setMessage] = useState<string>(
    token ? "" : t("auth.invalidToken"),
  );

  const getPath = (path: string) => localePathNavigateHelper(locale, path);

  useEffect(() => {
    // Nếu không có token hoặc đã gọi rồi thì dừng
    if (!token || calledRef.current) return;
    calledRef.current = true;

    const verify = async () => {
      try {
        const res = await verifyEmailAction(token);

        setSuccess(res.success);
        const errorKey = res?.error;

        const msg = errorKey ? t(`auth.${errorKey}`) : null;

        setMessage(
          msg ||
            (res.success ? t("auth.verifySuccess") : t("auth.verifyFailed")),
        );
      } catch (err: any) {
        setSuccess(false);
        const errorKey = err?.message;
        setMessage(
          t(errorKey ? t(`auth.${errorKey}`) : t("common.errorDescription")),
        );
      } finally {
        setLoading(false);
      }
    };

    verify();
  }, [token, t]);

  return (
    <AuthShell title={t("auth.verifyTitle")} subtitle={t("auth.verifyDesc")}>
      <div className="flex flex-col items-center justify-center space-y-4 py-6 text-center">
        {loading && (
          <div className="flex flex-col items-center gap-3">
            <Loader2 className="h-10 w-10 animate-spin text-primary" />
            <p className="text-sm text-muted-foreground">
              {t("auth.verifyLoading")}
            </p>
          </div>
        )}

        {!loading && success && (
          <div className="flex flex-col items-center gap-3">
            <CheckCircle2 className="h-12 w-12 text-green-500" />
            <p className="text-sm font-medium text-foreground">{message}</p>
            <Button className="mt-4 w-full" asChild>
              <Link href={getPath(PATHS.login)}>{t("auth.signInNow")}</Link>
            </Button>
          </div>
        )}

        {!loading && !success && (
          <div className="flex flex-col items-center gap-3">
            <XCircle className="h-12 w-12 text-destructive" />
            <p className="text-sm font-medium text-destructive">{message}</p>

            <div className="mt-4 grid w-full gap-2">
              <Button variant="outline" asChild>
                <Link href={getPath(PATHS.login)}>
                  {t("auth.signInInstead")}
                </Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </AuthShell>
  );
}
