"use client";

/**
 * Shared auth page shell.
 *
 * Client Component because PasswordField uses local state
 * and authentication pages use client-side interactions.
 */

import { useState } from "react";
import Link from "next/link";
import { Check, Cpu, Eye, EyeOff } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useI18n } from "@/src/i18n";
import { PATHS } from "@/src/lib/paths";

type AuthShellProps = {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
};

type PasswordFieldProps = {
  id: string;
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  autoComplete?: string;
};

type LocalePathProps = {
  locale: string;
};

function getLocalePath(locale: string, path: string) {
  return `/${locale}${path === "/" ? "" : path}`;
}

export function AuthShell({
  title,
  subtitle,
  children,
}: AuthShellProps & LocalePathProps) {
  const { t } = useI18n();

  const sidePoints = [
    t("auth.sidePoint1"),
    t("auth.sidePoint2"),
    t("auth.sidePoint3"),
  ];

  const homePath = getLocalePath(arguments[0]?.locale ?? "vi", PATHS.home);

  return (
    <div className="container-app flex items-center justify-center py-10 lg:py-16">
      <div className="w-full max-w-5xl overflow-hidden rounded-2xl border bg-card shadow-sm lg:grid lg:grid-cols-2">
        {/* Brand / visual panel */}
        <aside className="relative hidden flex-col justify-between overflow-hidden bg-primary p-10 text-primary-foreground lg:flex">
          <img
            src="/assets/auth-visual.svg"
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-20"
          />

          <Link
            href={homePath}
            className="relative z-10 flex items-center gap-2"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-background/15 backdrop-blur">
              <Cpu className="h-5 w-5" aria-hidden="true" />
            </span>

            <span className="text-lg font-bold tracking-tight">SmartIoTVN</span>
          </Link>

          <div className="relative z-10">
            <h2 className="text-2xl font-bold leading-snug">
              {t("auth.sideTitle")}
            </h2>

            <p className="mt-2 text-sm text-primary-foreground/80">
              {t("auth.sideDesc")}
            </p>

            <ul className="mt-6 space-y-3 text-sm">
              {sidePoints.map((point) => (
                <li key={point} className="flex items-center gap-2.5">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-background/15">
                    <Check className="h-3 w-3" aria-hidden="true" />
                  </span>

                  {point}
                </li>
              ))}
            </ul>
          </div>

          <p className="relative z-10 text-xs text-primary-foreground/60">
            {t("footer.demoNotice")}
          </p>
        </aside>

        {/* Form column */}
        <div className="p-6 sm:p-10">
          <div className="mx-auto w-full max-w-sm">
            <Link
              href={homePath}
              className="mb-8 flex items-center gap-2 lg:hidden"
              aria-label="SmartIoTVN"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Cpu className="h-5 w-5" aria-hidden="true" />
              </span>

              <span className="text-lg font-bold tracking-tight">
                Smart<span className="text-primary">IoT</span>VN
              </span>
            </Link>

            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
              {title}
            </h1>

            {subtitle && (
              <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>
            )}

            <div className="mt-8">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * "OR" divider between authentication methods.
 */
export function AuthDivider({ label }: { label: string }) {
  return (
    <div className="my-6 flex items-center gap-3">
      <span className="h-px flex-1 bg-border" />

      <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
        {label}
      </span>

      <span className="h-px flex-1 bg-border" />
    </div>
  );
}

/**
 * Google authentication button.
 */
export function GoogleButton({
  onClick,
  disabled = false,
}: {
  onClick: () => void;
  disabled?: boolean;
}) {
  const { t } = useI18n();

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="inline-flex h-10 w-full items-center justify-center gap-2.5 rounded-md border bg-background px-4 text-sm font-medium transition-colors hover:bg-accent disabled:pointer-events-none disabled:opacity-50"
    >
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4.5 w-4.5">
        <path
          fill="#4285F4"
          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1Z"
        />

        <path
          fill="#34A853"
          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23Z"
        />

        <path
          fill="#FBBC05"
          d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.06H2.18A10.97 10.97 0 0 0 1 12c0 1.77.43 3.45 1.18 4.94l3.66-2.84Z"
        />

        <path
          fill="#EA4335"
          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38Z"
        />
      </svg>

      {t("auth.continueWithGoogle")}
    </button>
  );
}

/**
 * Password input with show/hide visibility toggle.
 */
export function PasswordField({
  id,
  label,
  placeholder,
  value,
  onChange,
  autoComplete,
}: PasswordFieldProps) {
  const { t } = useI18n();
  const [visible, setVisible] = useState(false);

  return (
    <div className="grid gap-2">
      <Label htmlFor={id}>{label}</Label>

      <div className="relative">
        <Input
          id={id}
          type={visible ? "text" : "password"}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          autoComplete={autoComplete}
          className="pr-10"
        />

        <button
          type="button"
          onClick={() => setVisible((current) => !current)}
          className="absolute right-2 top-1/2 inline-flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          aria-label={visible ? t("auth.hidePassword") : t("auth.showPassword")}
          aria-pressed={visible}
        >
          {visible ? (
            <EyeOff className="h-4 w-4" aria-hidden="true" />
          ) : (
            <Eye className="h-4 w-4" aria-hidden="true" />
          )}
        </button>
      </div>
    </div>
  );
}
