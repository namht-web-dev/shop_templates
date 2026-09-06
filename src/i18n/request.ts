import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

export default getRequestConfig(async ({ locale }) => {
  // Đảm bảo validLocale luôn là một string hợp lệ bằng fallback kiểu dữ liệu
  const requestedLocale = locale ?? routing.defaultLocale;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const validLocale = routing.locales.includes(requestedLocale as any)
    ? requestedLocale
    : routing.defaultLocale;

  return {
    locale: validLocale, // TypeScript hiện tại đã nhận diện chính xác đây là string
    messages: (await import(`../messages/${validLocale}.json`)).default,
  };
});
