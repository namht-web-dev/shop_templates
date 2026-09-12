/**
 * Mock data barrel — the single import point for all seed data.
 * The fake API layer is the only consumer.
 */
export { PRODUCTS } from "./products";
export { NEWS_ARTICLES } from "./news";

/**
 * Course slugs pre-seeded as "owned" on first login so learning flows
 * (progress, continue-watching, lesson gating) are demonstrable instantly.
 */
export const FAKE_OWNED_COURSES: string[] = [
  "iot-for-beginners",
  "esp32-bootcamp",
];
