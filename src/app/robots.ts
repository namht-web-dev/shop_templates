import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site"; // Hoặc đường dẫn file config URL của bạn

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/account/", "/api/"], // Các trang bạn không muốn Google cào dữ liệu
    },
    // Thay đổi domain thật của bạn ở đây:
    sitemap: `${siteConfig.url}/sitemap.xml`,
    // Hoặc viết trực tiếp: 'https://domain-cua-ban.com/sitemap.xml'
  };
}
