/**
 * Auth service — single swap point for authentication.
 *
 * The UI only communicates with AuthService.provider.
 *
 * Current:
 *   FakeAuthProvider
 *
 * Future:
 *   GoogleOAuthAuthProvider / BackendAuthProvider
 *
 * Next.js note:
 *   Vite's import.meta.env.VITE_* is replaced by
 *   process.env.NEXT_PUBLIC_* for client-accessible variables.
 */

import type { FakeUser } from "@/types";
import { useAuthStore } from "@/store";

/* -------------------------------------------------------------------------- */
/* Environment                                                                */
/* -------------------------------------------------------------------------- */

const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

/**
 * Whether Google OAuth is configured.
 */
export function isGoogleOAuthConfigured(): boolean {
  return Boolean(GOOGLE_CLIENT_ID);
}

/**
 * Builds the Google OAuth 2.0 authorization URL.
 *
 * This function must only be called in the browser because it uses
 * window.location.origin.
 */
export function buildGoogleAuthorizeUrl(
  redirectPath = "/auth/callback/google",
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

/* -------------------------------------------------------------------------- */
/* Validation                                                                 */
/* -------------------------------------------------------------------------- */

/**
 * Shared email format check for auth forms.
 */
export const EMAIL_PATTERN = /^\S+@\S+\.\S+$/;

/* -------------------------------------------------------------------------- */
/* Types                                                                      */
/* -------------------------------------------------------------------------- */

export interface PasswordCredentials {
  email: string;
  password: string;

  /**
   * When false, the session is memory-only and ends on reload.
   */
  remember: boolean;
}

export interface RegisterInput {
  name: string;
  email: string;
  password: string;
}

export type OAuthProvider = "google";

export interface AuthProvider {
  id: "fake" | "google-oauth";

  signInWithPassword(credentials: PasswordCredentials): Promise<FakeUser>;

  signUp(input: RegisterInput): Promise<FakeUser>;

  signInWithOAuth(provider: OAuthProvider): Promise<FakeUser>;

  requestPasswordReset(email: string): Promise<void>;
}

/* -------------------------------------------------------------------------- */
/* Helpers                                                                    */
/* -------------------------------------------------------------------------- */

/**
 * Simulated network latency.
 */
const wait = (ms: number) =>
  new Promise<void>((resolve) => {
    setTimeout(resolve, ms);
  });

const fakeLatency = () => wait(400 + Math.random() * 300);

/* -------------------------------------------------------------------------- */
/* Fake provider                                                              */
/* -------------------------------------------------------------------------- */

export const FakeAuthProvider: AuthProvider = {
  id: "fake",

  async signInWithPassword({ email, password, remember }) {
    await fakeLatency();

    if (!password) {
      throw new Error("passwordRequired");
    }

    return useAuthStore.getState().loginWithPassword({
      email,
      password,
      remember,
    });
  },

  async signUp({ name, email, password }) {
    await fakeLatency();

    if (!password || password.length < 8) {
      throw new Error("passwordTooShort");
    }

    return useAuthStore.getState().register({
      name,
      email,
      password,
    });
  },

  async signInWithOAuth(provider) {
    await fakeLatency();

    return useAuthStore.getState().loginWithProvider(provider);
  },

  async requestPasswordReset(email) {
    await fakeLatency();

    // Fake implementation.
    // Real provider will send a signed, expiring reset link.
    void email;
  },
};

/* -------------------------------------------------------------------------- */
/* Auth service                                                               */
/* -------------------------------------------------------------------------- */

export const AuthService = {
  /**
   * Swap this reference when the real backend is available.
   */
  provider: FakeAuthProvider,
};
