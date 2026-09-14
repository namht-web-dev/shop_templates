// src/app/api/auth/callback/google/route.ts
import { prisma } from "@/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get("code");
  const error = searchParams.get("error");

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  if (error || !code) {
    return NextResponse.redirect(`${baseUrl}/login?error=GoogleAuthFailed`);
  }

  try {
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!;
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET!;
    const redirectUri = `${baseUrl}/api/auth/callback/google`;

    // 1. Đổi authorization code lấy Access Token từ Google
    const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
        grant_type: "authorization_code",
      }),
    });

    const tokenData = await tokenResponse.json();

    if (!tokenResponse.ok) {
      throw new Error(tokenData.error_description || "Failed to fetch token");
    }

    // 2. Lấy thông tin User profile từ Google
    const userResponse = await fetch(
      "https://www.googleapis.com/oauth2/v2/userinfo",
      {
        headers: { Authorization: `Bearer ${tokenData.access_token}` },
      },
    );

    const googleUser = await userResponse.json();

    if (!googleUser.email) {
      throw new Error("Cannot get email from Google profile");
    }

    // 3. Upsert User vào Database
    let user = await prisma.user.findUnique({
      where: { email: googleUser.email },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          name: googleUser.name || "Google User",
          email: googleUser.email,
          avatar: googleUser.picture || null,
          emailVerified: new Date(),
          provider: "GOOGLE",
        },
      });
    } else if (!user.avatar && googleUser.picture) {
      user = await prisma.user.update({
        where: { id: user.id },
        data: { avatar: googleUser.picture },
      });
    }

    // 4. Redirect về Client kèm query params
    const successUrl = new URL("/", baseUrl);
    successUrl.searchParams.set("oauth_success", "true");
    successUrl.searchParams.set("email", user.email);
    successUrl.searchParams.set("name", user.name);

    return NextResponse.redirect(successUrl);
  } catch (err) {
    console.error("Google Callback Error:", err);
    return NextResponse.redirect(`${baseUrl}/login?error=GoogleAuthError`);
  }
}
