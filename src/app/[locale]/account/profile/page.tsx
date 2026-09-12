"use client";

/**
 * Profile page: view + update display name (fake auth store), read-only email
 * and role. Persisted via the auth store's localStorage.
 */

import { useEffect, useState } from "react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthStore } from "@/store";
import { useI18n } from "@/i18n";

export default function AccountProfilePage() {
  const { t } = useI18n();

  const user = useAuthStore((state) => state.user);
  const updateProfile = useAuthStore((state) => state.updateProfile);

  const [name, setName] = useState(user?.name ?? "");

  useEffect(() => {
    if (user) {
      setName(user.name);
    }
  }, [user?.name]);

  if (!user) {
    return null;
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedName = name.trim();

    if (!trimmedName) {
      return;
    }

    updateProfile(trimmedName);
    toast.success(t("account.saved"));
  };

  return (
    <section className="rounded-xl border bg-card p-6">
      <h2 className="font-semibold">{t("account.profile")}</h2>

      <p className="mt-1 text-sm text-muted-foreground">
        {t("account.profileDesc")}
      </p>

      <form onSubmit={handleSubmit} className="mt-6 max-w-md space-y-4">
        <div className="grid gap-2">
          <Label htmlFor="profile-name">{t("account.nameLabel")}</Label>

          <Input
            id="profile-name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder={t("auth.namePlaceholder")}
            autoComplete="name"
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="profile-email">{t("account.emailLabel")}</Label>

          <Input id="profile-email" value={user.email} disabled />
        </div>

        <div className="flex items-center gap-2 text-sm">
          <span className="text-muted-foreground">{t("account.role")}:</span>

          <Badge variant="destructive">{user.role}</Badge>
        </div>

        <Button
          type="submit"
          disabled={!name.trim() || name.trim() === user.name}
        >
          {t("account.save")}
        </Button>
      </form>
    </section>
  );
}
