import { Locale } from "../types";

export const SITE_DEFAULT_LOCALE = "vi" as const;
export const SITE_LOCALES_SUPPORT = ["vi", "en"];
export const PAGE_SIZE = 10;

export const SITE_OPEN_GRAPH_LOCALES: Record<Locale, string> = {
  vi: "vi_VN",
  en: "en_US",
};

export const siteConfig = {
  // =========================
  // Site identity
  // =========================
  url: "https://example.com",
  logo: "/logo.png",
  ogImage: "/og-image.png",

  // =========================
  // Localization
  // =========================
  locales: ["vi", "en"] as const,
  defaultLocale: SITE_DEFAULT_LOCALE,

  // =========================
  // Contact
  // =========================
  contact: {
    email: "smartiotvn.contact@gmail.com",
    phone: "+84987894774",
  },

  // =========================
  // Social
  // =========================
  social: {
    facebook: "",
    youtube: "",
    instagram: "",
    tiktok: "",
  },

  // =========================
  // Features / Modules
  // =========================
  features: {
    shop: true,
    courses: true,
    knowledge: true,
    projects: true,
    news: true,

    cart: true,
    authentication: true,
    globalSearch: true,
  },

  // =========================
  // Header
  // =========================
  header: {
    showSearch: true,
    showLanguageSwitcher: true,
    showThemeToggle: true,
    showCart: true,
    showAccount: true,
  },

  // =========================
  // Footer
  // =========================
  footer: {
    showSocialLinks: true,
    showNewsletter: true,
  },

  // =========================
  // Navigation
  // =========================
  navigation: {
    header: [
      {
        key: "home",
        path: "/",
        enabled: true,
        group: "main",
      },
      {
        key: "shop",
        path: "/shop",
        enabled: true,
        group: "main",
      },
      {
        key: "courses",
        path: "/courses",
        enabled: false,
        group: "main",
      },
      {
        key: "knowledge",
        path: "/knowledge",
        enabled: true,
        group: "news",
      },
      {
        key: "projects",
        path: "/projects",
        enabled: false,
        group: "main",
      },
      {
        key: "news",
        path: "/news",
        enabled: true,
        group: "news",
      },
      {
        key: "about",
        path: "/about",
        enabled: true,
        group: "main",
      },
    ],
  },

  // =========================
  // Theme
  // =========================
  theme: {
    defaultMode: "system" as const,
  },

  // =========================
  // SEO / Content
  // =========================
  translations: {
    vi: {
      name: "Cửa hàng IoT",
      title: "Cửa hàng linh kiện IoT chính hãng",
      description:
        "Mua linh kiện ESP32, Arduino và các thiết bị IoT chất lượng cao.",
      keywords: ["cửa hàng iot", "esp32", "arduino", "linh kiện điện tử"],
    },
    en: {
      name: "IoT Store",
      title: "Quality IoT Components & Devices",
      description: "Shop ESP32, Arduino components and quality IoT devices.",
      keywords: ["iot store", "esp32", "arduino", "electronics components"],
    },
  },
};
