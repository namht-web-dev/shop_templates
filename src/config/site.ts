import { Locale } from "../types";

export const SITE_DEFAULT_LOCALE = "vi" as const;
export const SITE_LOCALES_SUPPORT = ["vi", "en"];
export const PAGE_SIZE = 8;

export const SITE_OPEN_GRAPH_LOCALES: Record<Locale, string> = {
  vi: "vi_VN",
  en: "en_US",
};

export const siteConfig = {
  // =========================
  // Site identity
  // =========================
  url: "https://example.com",
  logo: "/logoRounded512.png",
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
      name: "Smart IoT Việt Nam",
      title: "Smart IoT Việt Nam - Kiến thức, Khóa học & Linh kiện IoT",
      description:
        "Nền tảng IoT cung cấp kiến thức, khóa học, hướng dẫn dự án và linh kiện ESP32, Arduino cùng các thiết bị điện tử cho người mới bắt đầu và lập trình viên.",
      keywords: [
        "iot",
        "internet of things",
        "smart iot",
        "iot việt nam",
        "học iot",
        "khóa học iot",
        "lập trình iot",
        "esp32",
        "arduino",
        "lập trình esp32",
        "lập trình arduino",
        "linh kiện điện tử",
        "thiết bị iot",
        "dự án iot",
        "kiến thức iot",
        "hướng dẫn iot",
      ],
    },

    en: {
      name: "Smart IoT Vietnam",
      title: "Smart IoT Vietnam - IoT Courses, Knowledge & Components",
      description:
        "An IoT platform providing tutorials, courses, project guides, ESP32 and Arduino components, and electronics resources for beginners and developers.",
      keywords: [
        "iot",
        "internet of things",
        "smart iot",
        "iot vietnam",
        "iot courses",
        "learn iot",
        "iot tutorials",
        "iot programming",
        "esp32",
        "arduino",
        "esp32 programming",
        "arduino programming",
        "electronics components",
        "iot devices",
        "iot projects",
        "iot knowledge",
        "iot guides",
      ],
    },
  },
  storeTranslations: {
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
