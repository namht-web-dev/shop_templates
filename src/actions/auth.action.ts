"use server";

import { prisma } from "@/db";
import bcrypt from "bcryptjs";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";
import { Locale, Provider, Role } from "@/types";
import { createSession } from "@/lib/auth";
import { headers } from "next/headers";

// 1. ĐĂNG KÝ
export async function registerAction(
  input: {
    name: string;
    email: string;
    password: string;
  },
  locale: Locale,
) {
  try {
    const { name, email, password } = input;

    if (!name || !email || !password) {
      return { success: false, error: "requiredFields" };
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return { success: false, error: "emailExists" };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Tạo User
    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        provider: "PASSWORD",
      },
    });

    // Tạo & gửi mail xác nhận
    const verificationToken = await generateVerificationToken(email);
    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token,
      locale,
    );

    return {
      success: true,
      message: "registerSuccess",
    };
  } catch (error) {
    console.error("registerAction error:", error);
    return { success: false, error: "systemError" };
  }
}

// 2. XÁC THỰC TOKEN TỪ EMAIL
export async function verifyEmailAction(token: string) {
  try {
    const existingToken = await prisma.verificationToken.findUnique({
      where: { token },
    });

    if (!existingToken) {
      return { success: false, error: "invalidToken" };
    }

    if (new Date(existingToken.expiresAt) < new Date()) {
      return { success: false, error: "tokenExpired" };
    }

    const existingUser = await prisma.user.findUnique({
      where: { email: existingToken.email },
    });

    if (!existingUser) {
      return { success: false, error: "userNotFound" };
    }

    // Đánh dấu email đã xác thực
    await prisma.user.update({
      where: { id: existingUser.id },
      data: {
        emailVerified: new Date(),
      },
    });

    // Xóa token
    await prisma.verificationToken.delete({
      where: { id: existingToken.id },
    });

    return {
      success: true,
      error: "verifySuccess",
    };
  } catch (error) {
    console.error("verifyEmailAction error:", error);
    return { success: false, error: "systemError" };
  }
}

// 3. ĐĂNG NHẬP (Lấy dữ liệu thật từ DB)
export async function loginAction(
  input: { email: string; password: string; remember: boolean },
  locale: Locale,
) {
  try {
    const { email, password, remember } = input;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user || !user.password) {
      return { success: false, error: "invalidCredentials" };
    }

    // Kiểm tra đã xác thực email chưa

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return { success: false, error: "invalidCredentials" };
    }

    if (!user.emailVerified) {
      // Tự động gửi lại mail xác thực
      const verificationToken = await generateVerificationToken(user.email);
      await sendVerificationEmail(
        verificationToken.email,
        verificationToken.token,
        locale,
      );

      return {
        success: false,
        error: "emailNotVerified",
      };
    }
    const clientInfo = await getClientInfo();
    await createSession(
      user.id,
      remember,
      clientInfo.ipAddress,
      clientInfo.userAgent,
    );

    return {
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        avatar: user.avatar || null,
        role: user.role.toLowerCase() as Role,
        provider: user.provider.toLowerCase() as Provider,
      },
    };
  } catch (error) {
    console.error("loginAction error:", error);
    return { success: false, error: "systemError" };
  }
}

export async function getClientInfo() {
  const headersList = await headers();

  const userAgent = headersList.get("user-agent");

  const ipAddress =
    headersList.get("x-forwarded-for")?.split(",")[0].trim() ||
    headersList.get("x-real-ip") ||
    null;

  return {
    ipAddress,
    userAgent,
  };
}
