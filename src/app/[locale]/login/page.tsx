"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  AuthShell,
  AuthDivider,
  GoogleButton,
  PasswordField,
} from "@/components/auth/AuthShell";

import { AuthService, EMAIL_PATTERN } from "@/services/authService";
import { useAuthStore } from "@/store";
import { useI18n } from "@/i18n";
import { PATHS } from "@/lib/paths";
import { useRouter } from "next/navigation";
import Link from "next/link";

type View = "login" | "reset";

export default function LoginForm() {
  const { t, locale } = useI18n();
  const router = useRouter();

  const user = useAuthStore((state) => state.user);

  const [view, setView] = useState<View>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const validateEmail = () => {
    const trimmedEmail = email.trim();

    if (!EMAIL_PATTERN.test(trimmedEmail)) {
      setError(t("home.newsletterInvalid"));
      return false;
    }

    return true;
  };

  const handleLogin = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedEmail = email.trim();

    if (!validateEmail()) {
      return;
    }

    if (!password) {
      setError(t("auth.passwordRequired"));
      return;
    }

    setError("");
    setSubmitting(true);

    try {
      await AuthService.provider.signInWithPassword({
        email: trimmedEmail,
        password,
        remember,
      });

      toast.success(t("auth.loggedIn"));

      router.push(`/${locale}${PATHS.account}`);
    } catch {
      setError(t("common.errorDescription"));
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogle = async () => {
    setError("");
    setSubmitting(true);

    try {
      toast.info(t("auth.googleDemo"));

      await AuthService.provider.signInWithOAuth("google");

      toast.success(t("auth.loggedIn"));

      router.push(`/${locale}${PATHS.account}`);
    } catch {
      setError(t("common.errorDescription"));
    } finally {
      setSubmitting(false);
    }
  };

  const handleReset = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedEmail = email.trim();

    if (!validateEmail()) {
      return;
    }

    setError("");
    setSubmitting(true);

    try {
      await AuthService.provider.requestPasswordReset(trimmedEmail);

      toast.success(
        t("auth.resetSent", {
          email: trimmedEmail,
        }),
      );

      setView("login");
    } catch {
      setError(t("common.errorDescription"));
    } finally {
      setSubmitting(false);
    }
  };

  const switchToReset = () => {
    setView("reset");
    setError("");
  };

  const switchToLogin = () => {
    setView("login");
    setError("");
  };

  if (user) {
    return (
      <AuthShell title={t("auth.alreadyLoggedIn")} subtitle={user.email}>
        <div className="grid gap-3">
          <Button onClick={() => router.push(`/${locale}${PATHS.account}`)}>
            {t("account.title")}
          </Button>

          <Button variant="outline" asChild>
            <Link href={`/${locale}${PATHS.home}`}>{t("nav.home")}</Link>
          </Button>
        </div>
      </AuthShell>
    );
  }

  const isLoginView = view === "login";

  return (
    <AuthShell
      title={isLoginView ? t("auth.welcomeBack") : t("auth.resetTitle")}
      subtitle={isLoginView ? t("auth.welcomeBackDesc") : t("auth.resetDesc")}
    >
      {isLoginView ? (
        <form onSubmit={handleLogin} className="grid gap-4" noValidate>
          <div className="grid gap-2">
            <Label htmlFor="login-email">{t("auth.email")}</Label>

            <Input
              id="login-email"
              type="email"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
                setError("");
              }}
              placeholder={t("auth.emailPlaceholder")}
              autoComplete="email"
            />
          </div>

          <PasswordField
            id="login-password"
            label={t("auth.password")}
            placeholder={t("auth.passwordPlaceholder")}
            value={password}
            onChange={(value) => {
              setPassword(value);
              setError("");
            }}
            autoComplete="current-password"
          />

          <div className="flex items-center justify-between gap-2">
            <label className="flex cursor-pointer select-none items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={remember}
                onChange={(event) => setRemember(event.target.checked)}
                className="h-4 w-4 shrink-0 accent-primary"
              />

              {t("auth.rememberMe")}
            </label>

            <button
              type="button"
              onClick={switchToReset}
              className="text-sm font-medium text-primary hover:underline"
            >
              {t("auth.forgotPassword")}
            </button>
          </div>

          {error && <p className="text-sm text-destructive">{error}</p>}

          <Button type="submit" size="lg" disabled={submitting}>
            {submitting && (
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            )}

            {t("auth.loginButton")}
          </Button>
        </form>
      ) : (
        <form onSubmit={handleReset} className="grid gap-4" noValidate>
          <div className="grid gap-2">
            <Label htmlFor="reset-email">{t("auth.email")}</Label>

            <Input
              id="reset-email"
              type="email"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
                setError("");
              }}
              placeholder={t("auth.emailPlaceholder")}
              autoComplete="email"
            />
          </div>

          {error && <p className="text-sm text-destructive">{error}</p>}

          <Button type="submit" size="lg" disabled={submitting}>
            {submitting && (
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            )}

            {t("auth.resetButton")}
          </Button>

          <button
            type="button"
            onClick={switchToLogin}
            className="text-sm font-medium text-primary hover:underline"
          >
            {t("auth.backToLogin")}
          </button>
        </form>
      )}

      <AuthDivider label={t("auth.orDivider")} />

      <GoogleButton onClick={handleGoogle} disabled={submitting} />

      <p className="mt-6 text-center text-sm text-muted-foreground">
        {t("auth.noAccount")}{" "}
        <Link
          href={`/${locale}${PATHS.register}`}
          className="font-medium text-primary hover:underline"
        >
          {t("auth.createAccount")}
        </Link>
      </p>
    </AuthShell>
  );
}
