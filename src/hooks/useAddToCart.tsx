import { toast } from "sonner";
import { cartItemFromProduct, useCartStore } from "@/src/store";
import { useI18n } from "@/src/i18n";
import type { Product } from "@/src/types";

/** Shared "add to cart + toast" behavior used by cards and detail pages. */
export function useAddToCart() {
  const addItem = useCartStore((state) => state.addItem);
  const { t } = useI18n();

  return (product: Product, quantity = 1) => {
    addItem(cartItemFromProduct(product, quantity));
    toast.success(t("common.addedToCart"), {
      description: product.name.vi,
    });
  };
}
