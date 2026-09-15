import { siteConfig } from "@/config/site";
import { Locale } from "@/types";
import nodemailer from "nodemailer";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_EMAIL,
    pass: process.env.SMTP_PASSWORD,
  },
});

export const sendVerificationEmail = async (
  email: string,
  token: string,
  serverLocale: Locale,
) => {
  const locale = (serverLocale || siteConfig.defaultLocale) as Locale;
  const content = siteConfig.emailContent[locale] ?? siteConfig.emailContent.vi;

  // Giữ locale khi người dùng click link xác thực
  const confirmLink = `${APP_URL}/${locale}/auth/verify-email?token=${encodeURIComponent(token)}`;

  try {
    await transporter.sendMail({
      from: `"SmartIoT" <${process.env.SMTP_EMAIL}>`,
      to: email,
      subject: content.subject,
      text: `${content.title}\n\n${content.greeting}\n\n${content.description}\n\n${confirmLink}\n\n${content.expiry}`,
      html: `
<!DOCTYPE html>
<html lang="${locale}">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />

  <title>${content.title}</title>

  <style>
    body {
      margin: 0;
      padding: 0;
      background: #f8fafc;
      font-family:
        -apple-system,
        BlinkMacSystemFont,
        "Segoe UI",
        Roboto,
        Helvetica,
        Arial,
        sans-serif;
      color: #0f172a;
    }

    .wrapper {
      width: 100%;
      padding: 40px 16px;
      box-sizing: border-box;
    }

    .container {
      max-width: 560px;
      margin: 0 auto;
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 16px;
      overflow: hidden;
    }

    .header {
      padding: 28px 32px;
      text-align: center;
      border-bottom: 1px solid #f1f5f9;
    }

    .logo {
      display: inline-block;
      font-size: 22px;
      font-weight: 700;
      letter-spacing: -0.5px;
      color: #0f172a;
      text-decoration: none;
    }

    .logo-mark {
      display: inline-block;
      width: 34px;
      height: 34px;
      line-height: 34px;
      margin-right: 8px;
      vertical-align: middle;
      border-radius: 9px;
      background: #2563eb;
      color: #ffffff;
      font-size: 16px;
      font-weight: 700;
    }

    .content {
      padding: 40px 40px 32px;
      text-align: center;
    }

    .icon {
      width: 64px;
      height: 64px;
      line-height: 64px;
      margin: 0 auto 24px;
      border-radius: 50%;
      background: #eff6ff;
      color: #2563eb;
      font-size: 28px;
    }

    h1 {
      margin: 0 0 16px;
      font-size: 28px;
      line-height: 1.25;
      letter-spacing: -0.5px;
      color: #0f172a;
    }

    .greeting {
      margin: 0 0 12px;
      font-size: 16px;
      font-weight: 600;
      color: #334155;
    }

    .description {
      margin: 0 auto;
      max-width: 440px;
      font-size: 15px;
      line-height: 1.7;
      color: #64748b;
    }

    .button-wrapper {
      margin: 30px 0;
    }

    .button {
      display: inline-block;
      padding: 14px 28px;
      border-radius: 9px;
      background: #2563eb;
      color: #ffffff !important;
      text-decoration: none;
      font-size: 15px;
      font-weight: 600;
    }

    .link-box {
      margin-top: 24px;
      padding: 14px;
      border-radius: 8px;
      background: #f8fafc;
      word-break: break-all;
      text-align: left;
      font-size: 12px;
      line-height: 1.5;
      color: #64748b;
    }

    .notice {
      margin-top: 24px;
      padding: 16px;
      border-radius: 8px;
      background: #f8fafc;
      font-size: 13px;
      line-height: 1.6;
      color: #64748b;
    }

    .footer {
      padding: 24px 32px;
      border-top: 1px solid #f1f5f9;
      text-align: center;
    }

    .footer-brand {
      margin-bottom: 6px;
      font-size: 13px;
      font-weight: 600;
      color: #334155;
    }

    .copyright {
      margin: 0;
      font-size: 12px;
      color: #94a3b8;
    }

    @media only screen and (max-width: 600px) {
      .wrapper {
        padding: 20px 10px;
      }

      .header {
        padding: 22px 20px;
      }

      .content {
        padding: 32px 22px 28px;
      }

      h1 {
        font-size: 24px;
      }

      .button {
        display: block;
        padding: 14px 20px;
      }

      .footer {
        padding: 20px;
      }
    }
  </style>
</head>

<body>
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;">
    ${content.preheader}
  </div>

  <div class="wrapper">
    <div class="container">

      <!-- Header -->
      <div class="header">
        <a href="${APP_URL}" class="logo">
          <span class="logo-mark">S</span>
          SmartIoT
        </a>
      </div>

      <!-- Content -->
      <div class="content">

        <div class="icon">
          ✓
        </div>

        <h1>${content.title}</h1>

        <p class="greeting">
          ${content.greeting}
        </p>

        <p class="description">
          ${content.description}
        </p>

        <div class="button-wrapper">
          <a
            href="${confirmLink}"
            class="button"
          >
            ${content.button}
          </a>
        </div>


        <div class="notice">
          ${content.expiry}<br /><br />
          ${content.ignore}
        </div>

      </div>

      <!-- Footer -->
      <div class="footer">
        <div class="footer-brand">
          ${content.footer}
        </div>

        <p class="copyright">
          ${content.copyright}
        </p>
      </div>

    </div>
  </div>
</body>
</html>
      `,
    });
  } catch (error) {
    console.error("Failed to send verification email:", error);
    throw error;
  }
};
