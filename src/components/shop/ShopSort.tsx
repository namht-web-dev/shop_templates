"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useI18n } from "@/i18n";

export function ShopSort({ currentSort }: { currentSort: string }) {
  const { t } = useI18n();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleSortChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("sort", value);
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <Select value={currentSort} onValueChange={handleSortChange}>
      <SelectTrigger className="w-50">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="popular">{t("shop.sortPopular")}</SelectItem>
        <SelectItem value="price-asc">{t("shop.sortPriceAsc")}</SelectItem>
        <SelectItem value="price-desc">{t("shop.sortPriceDesc")}</SelectItem>
        <SelectItem value="rating">{t("shop.sortRating")}</SelectItem>
        <SelectItem value="newest">{t("shop.sortNewest")}</SelectItem>
      </SelectContent>
    </Select>
  );
}
