"use server";

import { prisma } from "@/db";
import bcrypt from "bcryptjs";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";

// 1. ĐĂNG KÝ
export async function registerAction(input: {
  name: string;
  email: string;
  password: string;
}) {
  try {
    const { name, email, password } = input;

    if (!name || !email || !password) {
      return { success: false, error: "Vui lòng nhập đầy đủ thông tin!" };
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return { success: false, error: "Email này đã được đăng ký!" };
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
    );

    return {
      success: true,
      message:
        "Đăng ký thành công! Vui lòng kiểm tra email để xác thực tài khoản.",
    };
  } catch (error) {
    console.error("registerAction error:", error);
    return { success: false, error: "Đã có lỗi xảy ra khi đăng ký." };
  }
}

// 2. XÁC THỰC TOKEN TỪ EMAIL
export async function verifyEmailAction(token: string) {
  try {
    const existingToken = await prisma.verificationToken.findUnique({
      where: { token },
    });

    if (!existingToken) {
      return { success: false, error: "Mã xác thực không hợp lệ!" };
    }

    if (new Date(existingToken.expiresAt) < new Date()) {
      return { success: false, error: "Mã xác thực đã hết hạn!" };
    }

    const existingUser = await prisma.user.findUnique({
      where: { email: existingToken.email },
    });

    if (!existingUser) {
      return { success: false, error: "Tài khoản không tồn tại!" };
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
      message: "Xác thực email thành công! Bạn có thể đăng nhập ngay.",
    };
  } catch (error) {
    console.error("verifyEmailAction error:", error);
    return { success: false, error: "Lỗi hệ thống khi xác thực." };
  }
}

// 3. ĐĂNG NHẬP (Lấy dữ liệu thật từ DB)
export async function loginAction(input: { email: string; password: string }) {
  try {
    const { email, password } = input;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user || !user.password) {
      return { success: false, error: "Email hoặc mật khẩu không chính xác!" };
    }

    // Kiểm tra đã xác thực email chưa
    if (!user.emailVerified) {
      // Tự động gửi lại mail xác thực
      const verificationToken = await generateVerificationToken(user.email);
      await sendVerificationEmail(
        verificationToken.email,
        verificationToken.token,
      );

      return {
        success: false,
        error:
          "Tài khoản chưa được xác thực. Mã xác thực mới đã được gửi vào email của bạn!",
      };
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return { success: false, error: "Email hoặc mật khẩu không chính xác!" };
    }

    return {
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        avatar: user.avatar || null,
        role: user.role.toLowerCase() as "user" | "admin",
        provider: user.provider.toLowerCase() as "password" | "google",
      },
    };
  } catch (error) {
    console.error("loginAction error:", error);
    return { success: false, error: "Đã xảy ra lỗi khi đăng nhập." };
  }
}
