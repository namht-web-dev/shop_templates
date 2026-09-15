/**
 * Auth service — single swap point for authentication.
 */

import type { Locale, User } from "@/types";
import { useAuthStore } from "@/store";
import { loginAction, registerAction } from "@/actions/auth.action";

/* -------------------------------------------------------------------------- */
/* Environment                                                                */
/* -------------------------------------------------------------------------- */

const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

export function isGoogleOAuthConfigured(): boolean {
  return Boolean(GOOGLE_CLIENT_ID);
}

export function buildGoogleAuthorizeUrl(
  redirectPath = "/api/auth/callback/google",
): string {
  if (!GOOGLE_CLIENT_ID) {
    throw new Error("Google OAuth is not configured");
  }

  if (typeof window === "undefined") {
    throw new Error("buildGoogleAuthorizeUrl must be called in the browser");
  }

  const redirectUri = new URL(redirectPath, window.location.origin).toString();

  const params = new URLSearchParams({
    client_id: GOOGLE_CLIENT_ID,
    redirect_uri: redirectUri,
    response_type: "code",
    scope: "openid email profile",
    access_type: "offline",
    prompt: "select_account",
  });

  return `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
}

export const EMAIL_PATTERN = /^\S+@\S+\.\S+$/;

/* -------------------------------------------------------------------------- */
/* Types & Helpers                                                            */
/* -------------------------------------------------------------------------- */

export interface PasswordCredentials {
  email: string;
  password: string;
  remember: boolean;
}

export interface RegisterInput {
  name: string;
  email: string;
  password: string;
}

export type OAuthProvider = "google";

export interface AuthProvider {
  id: "real-auth";
  signInWithPassword(
    credentials: PasswordCredentials,
    locale: Locale,
  ): Promise<User>;
  signUp(input: RegisterInput, locale: Locale): Promise<User>;
  signInWithOAuth(provider: OAuthProvider): Promise<User>;
  requestPasswordReset(email: string): Promise<void>;
}

/* -------------------------------------------------------------------------- */
/* Real Provider                                                              */
/* -------------------------------------------------------------------------- */

export const RealAuthProvider: AuthProvider = {
  id: "real-auth",

  async signInWithPassword({ email, password, remember }, locale) {
    const res = await loginAction({ email, password, remember }, locale);

    if (!res.success || !res.user) {
      throw new Error(res.error || "systemError");
    }

    // Zustand chỉ phục vụ UI
    useAuthStore.setState({
      user: res.user,
    });

    return res.user;
  },

  async signUp({ name, email, password }, locale) {
    if (!password || password.length < 8) {
      throw new Error("passwordTooShort");
    }

    const res = await registerAction({ name, email, password }, locale);

    if (!res.success) {
      throw new Error(res.error || "Registration failed");
    }

    return {
      id: "pending",
      name,
      email,
      avatar: null,
      role: "user",
      provider: "password",
    };
  },

  async signInWithOAuth(provider) {
    if (provider === "google") {
      if (!isGoogleOAuthConfigured()) {
        throw new Error("Google OAuth chưa được cấu hình.");
      }

      // Chuyển hướng trình duyệt tới trang đăng nhập của Google
      const googleAuthUrl = buildGoogleAuthorizeUrl(
        "/api/auth/callback/google",
      );
      window.location.href = googleAuthUrl;

      return new Promise(() => {});
    }

    throw new Error(`Unsupported OAuth provider: ${provider}`);
  },

  async requestPasswordReset(email) {
    void email;
  },
};

/* -------------------------------------------------------------------------- */
/* Auth Service Export                                                        */
/* -------------------------------------------------------------------------- */

export const AuthService = {
  provider: RealAuthProvider,
};
