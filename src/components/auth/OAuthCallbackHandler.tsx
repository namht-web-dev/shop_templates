"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useAuthStore } from "@/store";

export function OAuthCallbackHandler() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const isSuccess = searchParams.get("oauth_success");
    const email = searchParams.get("email");
    const name = searchParams.get("name");

    if (isSuccess === "true" && email && name) {
      // Cập nhật Zustand Store
      useAuthStore.getState().login(name, email);

      // Làm sạch URL
      router.replace("/");
    }
  }, [searchParams, router]);

  return null;
}
