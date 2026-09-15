/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
import { useAuthStore } from "@/store";
import { PATHS } from "@/lib/paths";
import { localePathNavigateHelper } from "@/utils";
import { AuthService, EMAIL_PATTERN } from "@/services/authService";
import { useI18n } from "@/i18n";

export default function RegisterPage() {
  const { t, locale } = useI18n();
  const router = useRouter();

  const user = useAuthStore((state) => state.user);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState("");

  // Helper điều hướng kèm Locale
  const getPath = (path: string) => localePathNavigateHelper(locale, path);

  const handleRegister = async (event: React.FormEvent) => {
    event.preventDefault();
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();

    if (!trimmedName) {
      setError(t("auth.nameRequired"));
      return;
    }
    if (!EMAIL_PATTERN.test(trimmedEmail)) {
      setError(t("home.newsletterInvalid"));
      return;
    }
    if (!password) {
      setError(t("auth.passwordRequired"));
      return;
    }
    if (password.length < 8) {
      setError(t("auth.passwordTooShort"));
      return;
    }
    if (password !== confirm) {
      setError(t("auth.passwordMismatch"));
      return;
    }
    if (!agreeTerms) {
      setError(t("auth.termsRequired"));
      return;
    }

    setError("");
    setSubmitting(true);

    try {
      await AuthService.provider.signUp(
        {
          name: trimmedName,
          email: trimmedEmail,
          password,
        },
        locale,
      );
      setRegisteredEmail(trimmedEmail);
      setRegistrationSuccess(true);

      toast.success(t("auth.registerSuccess"));
    } catch (err: any) {
      // Ưu tiên hiển thị message cụ thể nếu có
      const errorKey = err?.message;
      setError(errorKey ? t(`auth.${errorKey}`) : t("common.errorDescription"));
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogle = async () => {
    setSubmitting(true);
    try {
      await AuthService.provider.signInWithOAuth("google");
    } catch (err: any) {
      setError(err?.message || t("common.errorDescription"));
      setSubmitting(false);
    }
  };

  // Nếu người dùng đã đăng nhập
  if (user) {
    return (
      <AuthShell title={t("auth.alreadyLoggedIn")} subtitle={user.email}>
        <div className="grid gap-3">
          <Button onClick={() => router.push(getPath(PATHS.account))}>
            {t("account.title")}
          </Button>
          <Button variant="outline" asChild>
            <Link href={getPath(PATHS.home)}>{t("nav.home")}</Link>
          </Button>
        </div>
      </AuthShell>
    );
  }
  if (registrationSuccess) {
    return (
      <AuthShell
        title={t("auth.verifyEmailTitle")}
        subtitle={t("auth.verifyEmailDescription")}
      >
        <div className="grid gap-4">
          <div className="rounded-lg border bg-muted/30 p-4 text-center">
            <p className="text-sm text-muted-foreground">
              {t("auth.verificationEmailSent")}
            </p>

            <p className="mt-2 font-medium break-all">{registeredEmail}</p>
          </div>

          <Button onClick={() => router.push(getPath(PATHS.login))}>
            {t("auth.goToLogin")}
          </Button>

          <p className="text-center text-xs text-muted-foreground">
            {t("auth.checkSpamFolder")}
          </p>
        </div>
      </AuthShell>
    );
  }

  return (
    <AuthShell
      title={t("auth.registerTitle")}
      subtitle={t("auth.registerDesc")}
    >
      <form onSubmit={handleRegister} className="grid gap-4" noValidate>
        <div className="grid gap-2">
          <Label htmlFor="register-name">{t("auth.name")}</Label>
          <Input
            id="register-name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder={t("auth.namePlaceholder")}
            autoComplete="name"
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="register-email">{t("auth.email")}</Label>
          <Input
            id="register-email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder={t("auth.emailPlaceholder")}
            autoComplete="email"
          />
        </div>
        <PasswordField
          id="register-password"
          label={t("auth.password")}
          placeholder={t("auth.passwordPlaceholder")}
          value={password}
          onChange={setPassword}
          autoComplete="new-password"
        />
        <PasswordField
          id="register-confirm"
          label={t("auth.confirmPassword")}
          placeholder={t("auth.confirmPasswordPlaceholder")}
          value={confirm}
          onChange={setConfirm}
          autoComplete="new-password"
        />
        <label className="flex cursor-pointer select-none items-start gap-2 text-sm text-muted-foreground">
          <input
            type="checkbox"
            checked={agreeTerms}
            onChange={(event) => setAgreeTerms(event.target.checked)}
            className="mt-0.5 h-4 w-4 shrink-0 accent-primary"
          />
          <span>{t("auth.termsAgree")}</span>
        </label>

        {error && <p className="text-sm text-destructive">{error}</p>}

        <Button type="submit" size="lg" disabled={submitting}>
          {submitting && (
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
          )}
          {t("auth.registerButton")}
        </Button>
      </form>

      <AuthDivider label={t("auth.orDivider")} />
      <GoogleButton onClick={handleGoogle} disabled={submitting} />

      <p className="mt-6 text-center text-sm text-muted-foreground">
        {t("auth.haveAccount")}{" "}
        <Link
          href={getPath(PATHS.login)}
          className="font-medium text-primary hover:underline"
        >
          {t("auth.signInInstead")}
        </Link>
      </p>
    </AuthShell>
  );
}
