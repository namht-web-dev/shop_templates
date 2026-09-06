"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useI18n } from "@/src/i18n";

export function NewsletterForm() {
  const { t } = useI18n();
  const [email, setEmail] = useState("");

  const handleSubscribe = (event: React.FormEvent) => {
    event.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email.trim())) {
      toast.error(t("home.newsletterInvalid"));
      return;
    }
    setEmail("");
    toast.success(t("home.newsletterSuccess"));
  };

  return (
    <form
      onSubmit={handleSubscribe}
      className="mx-auto mt-6 flex max-w-md gap-2"
    >
      <Input
        type="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        placeholder={t("home.newsletterPlaceholder")}
        aria-label={t("home.newsletterPlaceholder")}
      />
      <Button type="submit" className="shrink-0 gap-2">
        <Send className="h-4 w-4" aria-hidden="true" />
        {t("home.newsletterButton")}
      </Button>
    </form>
  );
}
