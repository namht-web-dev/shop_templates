/**
 * Centralized route path registry.
 * The single source of truth for navigation: components import from here and
 * combine with `useLocalePath()`; when migrating to Next.js App Router these
 * same segments map 1:1 onto the /app/[locale]/... directory structure.
 */
export const PATHS = {
  home: "/",
  shop: "/shop",
  shopProduct: (slug: string) => `/shop/${slug}`,
  courses: "/courses",
  courseDetail: (slug: string) => `/courses/${slug}`,
  learn: (courseSlug: string) => `/learn/${courseSlug}`,
  knowledge: "/knowledge",
  knowledgePost: (slug: string) => `/knowledge/${slug}`,
  news: "/news",
  newsDetail: (slug: string) => `/news/${slug}`,
  projects: "/projects",
  projectDetail: (slug: string) => `/projects/${slug}`,
  about: "/about",
  cart: "/cart",
  login: "/login",
  register: "/register",
  account: "/account",
  accountProfile: "/account/profile",
  accountCourses: "/account/courses",
  accountOrders: "/account/orders",
  accountSettings: "/account/settings",
} as const;
