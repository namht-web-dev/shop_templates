import nodemailer from "nodemailer";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

// Khởi tạo Transporter dùng SMTP Gmail
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_EMAIL,
    pass: process.env.SMTP_PASSWORD,
  },
});

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${APP_URL}/auth/verify-email?token=${token}`;

  try {
    await transporter.sendMail({
      from: `"SmartIoT" <${process.env.SMTP_EMAIL}>`,
      to: email,
      subject: "SmartIoT - Xác thực địa chỉ email của bạn",
      html: `
        <div style="font-family: sans-serif; max-width: 500px; margin: 0 auto; padding: 20px;">
          <h2>Xác thực tài khoản SmartIoT</h2>
          <p>Cảm ơn bạn đã đăng ký. Vui lòng nhấp vào liên kết bên dưới để hoàn tất xác thực:</p>
          <p style="margin: 24px 0;">
            <a href="${confirmLink}" style="background-color: #2563eb; color: #fff; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
              Xác thực ngay
            </a>
          </p>
          <p style="color: #666; font-size: 14px;">Liên kết này sẽ hết hạn trong 24 giờ.</p>
        </div>
      `,
    });
  } catch (error) {
    console.error("Lỗi gửi email bằng Gmail SMTP:", error);
    throw error;
  }
};
