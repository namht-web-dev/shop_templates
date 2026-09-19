"use client";

/**
 * Cart page:
 * - Update quantity
 * - Remove item
 * - Clear cart
 * - Order summary
 * - Login gating
 * - Fake checkout
 * - Navigate to My Orders after success
 */
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Lock, ShoppingCart, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { LoginDialog } from "@/components/shared/LoginDialog";
import { EmptyState } from "@/components/shared/states";

import {
  selectCartSubtotal,
  storedItemUnitPrice,
  useAuthStore,
  useCartStore,
  useOrdersStore,
} from "@/store";

import { useI18n, withLocale } from "@/i18n";
import { PATHS } from "@/lib/paths";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { PreviousAddress, Province, Ward } from "@/types";
import { PHONE_REGEX } from "@/config/site";
import { SearchableSelect } from "@/components/ui/searchable-select";

const FAKE_PREVIOUS_ADDRESSES: PreviousAddress[] = [
  {
    id: "address-1",
    name: "Nguyễn Văn A",
    phone: "0912345678",
    provinceCode: 1,
    wardCode: 4,
    addressLine: "Số 10, phố ABC",
  },
  {
    id: "address-2",
    name: "Nguyễn Văn A",
    phone: "0987654321",
    provinceCode: 79,
    wardCode: 26734,
    addressLine: "123 Nguyễn Trãi",
  },
];

export default function CartPage() {
  const { t, l, formatPrice, locale } = useI18n();
  const router = useRouter();

  /* -------------------------------------------------------------------------- */
  /* Store                                                                      */
  /* -------------------------------------------------------------------------- */

  const items = useCartStore((state) => state.items);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const clearCart = useCartStore((state) => state.clear);

  const user = useAuthStore((state) => state.user);

  const placeOrder = useOrdersStore((state) => state.placeOrder);

  /* -------------------------------------------------------------------------- */
  /* Local state                                                                */
  /* -------------------------------------------------------------------------- */

  const [loginOpen, setLoginOpen] = useState(false);
  const [checkingOut, setCheckingOut] = useState(false);

  /* -------------------------------------------------------------------------- */
  /* Derived values                                                             */
  /* -------------------------------------------------------------------------- */

  const subtotal = useCartStore(selectCartSubtotal);

  const itemCount = items.reduce((total, item) => total + item.quantity, 0);

  /* -------------------------------------------------------------------------- */
  /* Actions                                                                    */
  /* -------------------------------------------------------------------------- */

  const handleCheckout = async () => {
    if (!user) {
      setLoginOpen(true);
      return;
    }

    if (items.length === 0) {
      return;
    }
    const phone = customerPhone.trim();

    if (!customerName.trim()) {
      toast.error("Vui lòng nhập tên người nhận.");
      return;
    }

    if (!PHONE_REGEX.test(phone)) {
      setPhoneError(t("cart.checkout.phoneInvalid"));
      toast.error(t("cart.checkout.phoneRequired"));
      return;
    }

    if (!selectedProvince) {
      toast.error(t("cart.checkout.provinceRequired"));
      return;
    }

    if (!selectedWard) {
      toast.error(t("cart.checkout.wardRequired"));
      return;
    }

    if (!shippingAddress) {
      toast.error(t("cart.checkout.detailAddressRequired"));
      return;
    }

    if (!addressLine) {
      setAddressLineError(t("cart.checkout.detailAddressRequired"));
      toast.error(t("cart.checkout.detailAddressRequired"));
      return;
    }

    setCheckingOut(true);

    try {
      const order = await placeOrder(
        items.map((item) => ({
          productId: item.productId,
          nameVi: item.nameVi,
          nameEn: item.nameEn,
          image: item.image,
          price: storedItemUnitPrice(item),
          quantity: item.quantity,
        })),
        subtotal,
        {
          name: user.name,
          email: user.email,
          phone: customerPhone,
          shippingAddress: shippingAddress,
          note: note,
        },
      );

      clearCart();

      toast.success(`${t("cart.orderPlaced")} (${order.id})`);

      router.push(PATHS.accountOrders);
    } catch {
      toast.error(t("common.errorDescription"));
    } finally {
      setCheckingOut(false);
    }
  };

  /* -------------------------------------------------------------------------- */
  /* Empty state                                                                */
  /* -------------------------------------------------------------------------- */
  const [customerName, setCustomerName] = useState(user?.name ?? "");
  const [customerPhone, setCustomerPhone] = useState("");
  const [provinceCode, setProvinceCode] = useState("");
  const [wardCode, setWardCode] = useState("");
  const [addressLine, setAddressLine] = useState("");
  const [note, setNote] = useState("");
  const [previousAddressId, setPreviousAddressId] = useState("");

  const [provinces, setProvinces] = useState<Province[]>([]);
  const [wards, setWards] = useState<Ward[]>([]);

  const [loadingProvinces, setLoadingProvinces] = useState(false);
  const [loadingWards, setLoadingWards] = useState(false);

  const [provinceError, setProvinceError] = useState("");
  const [wardError, setWardError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [addressLineError, setAddressLineError] = useState("");

  const selectedProvince = provinces.find(
    (p) => String(p.code) === provinceCode,
  );

  const selectedWard = wards.find((w) => String(w.code) === wardCode);

  const isPhoneValid = PHONE_REGEX.test(customerPhone.trim());

  const isShippingValid =
    customerName.trim().length > 0 &&
    isPhoneValid &&
    !!selectedProvince &&
    !!selectedWard;

  const shippingAddress = [
    addressLine.trim(),
    selectedWard?.name,
    selectedProvince?.name,
  ]
    .filter(Boolean)
    .join(", ");

  useEffect(() => {
    const fetchProvinces = async () => {
      setLoadingProvinces(true);
      setProvinceError("");

      try {
        const response = await fetch("https://provinces.open-api.vn/api/v2/");

        if (!response.ok) {
          throw new Error("Không thể tải tỉnh/thành phố");
        }

        const data: Province[] = await response.json();
        setProvinces(data);
      } catch {
        setProvinceError("Không thể tải danh sách tỉnh/thành phố.");
      } finally {
        setLoadingProvinces(false);
      }
    };

    fetchProvinces();
  }, []);

  useEffect(() => {
    if (!provinceCode) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setWards([]);
      setWardCode("");
      return;
    }

    const controller = new AbortController();

    const fetchWards = async () => {
      setLoadingWards(true);
      setWardError("");
      setWards([]);
      setWardCode("");

      try {
        const response = await fetch(
          `https://provinces.open-api.vn/api/v2/p/${provinceCode}?depth=2`,
          { signal: controller.signal },
        );

        if (!response.ok) {
          throw new Error("Không thể tải phường/xã");
        }

        const data: Province = await response.json();
        setWards(data.wards ?? []);
      } catch (error) {
        if (!controller.signal.aborted) {
          setWardError("Không thể tải danh sách phường/xã.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoadingWards(false);
        }
      }
    };

    fetchWards();

    return () => controller.abort();
  }, [provinceCode]);

  const handlePreviousAddressChange = (id: string) => {
    setPreviousAddressId(id);

    const address = FAKE_PREVIOUS_ADDRESSES.find((item) => item.id === id);

    if (!address) return;

    setCustomerName(address.name);
    setCustomerPhone(address.phone);
    setProvinceCode(String(address.provinceCode));
    setWardCode(String(address.wardCode));
    setAddressLine(address.addressLine);

    setPhoneError("");
  };

  if (items.length === 0) {
    return (
      <>
        <div className="container-app py-16">
          <EmptyState
            title={t("cart.emptyTitle")}
            description={t("cart.emptyDesc")}
            icon={
              <ShoppingCart
                className="h-6 w-6 text-muted-foreground"
                aria-hidden="true"
              />
            }
            action={
              <Button asChild>
                <Link href={withLocale(PATHS.shop, locale)}>
                  {t("cart.continueShopping")}
                </Link>
              </Button>
            }
          />
        </div>

        <LoginDialog
          open={loginOpen}
          onOpenChange={setLoginOpen}
          onSuccess={handleCheckout}
        />
      </>
    );
  }

  return (
    <>
      <div className="container-app py-10">
        {/* Header */}
        <header className="mb-8 flex flex-wrap items-center justify-between gap-3">
          <h1 className="text-3xl font-bold tracking-tight">
            {t("cart.title")}
          </h1>

          <span className="text-sm text-muted-foreground">
            {t("cart.itemsCount", {
              count: itemCount,
            })}
          </span>
        </header>

        <div className="grid gap-10 lg:grid-cols-[1fr_340px]">
          {/* ---------------------------------------------------------------- */}
          {/* Cart items                                                       */}
          {/* ---------------------------------------------------------------- */}

          <div className="space-y-4">
            {items.map((item) => {
              const unitPrice = storedItemUnitPrice(item);

              const totalPrice = unitPrice * item.quantity;

              return (
                <div
                  key={item.productId}
                  className="flex gap-4 rounded-xl border p-4"
                >
                  {/* Product image */}
                  <Link
                    href={withLocale(PATHS.shopProduct(item.slug), locale)}
                    className="shrink-0"
                  >
                    <Image
                      src={item.image}
                      alt={l({
                        vi: item.nameVi,
                        en: item.nameEn,
                      })}
                      width={96}
                      height={96}
                      className="h-20 w-20 rounded-lg border object-cover sm:h-24 sm:w-24"
                    />
                  </Link>

                  <div className="flex min-w-0 flex-1 flex-col justify-between gap-2">
                    {/* Product name + remove */}
                    <div className="flex items-start justify-between gap-3">
                      <Link
                        href={withLocale(PATHS.shopProduct(item.slug), locale)}
                        className="line-clamp-2 font-medium hover:text-primary hover:underline"
                      >
                        {l({
                          vi: item.nameVi,
                          en: item.nameEn,
                        })}
                      </Link>

                      <button
                        type="button"
                        onClick={() => removeItem(item.productId)}
                        className="shrink-0 rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                        aria-label={t("cart.removeItem")}
                      >
                        <Trash2 className="h-4 w-4" aria-hidden="true" />
                      </button>
                    </div>

                    {/* Quantity + price */}
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div className="inline-flex items-center rounded-md border">
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(item.productId, item.quantity - 1)
                          }
                          className="flex h-8 w-8 items-center justify-center transition-colors hover:bg-accent"
                          aria-label="Decrease quantity"
                        >
                          −
                        </button>

                        <span className="w-10 text-center text-sm font-medium tabular-nums">
                          {item.quantity}
                        </span>

                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(item.productId, item.quantity + 1)
                          }
                          className="flex h-8 w-8 items-center justify-center transition-colors hover:bg-accent"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>

                      <span className="font-semibold tabular-nums">
                        {formatPrice(totalPrice)}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Clear cart */}
            <div className="flex justify-end">
              <Button
                variant="ghost"
                size="sm"
                className="gap-2 text-muted-foreground hover:text-destructive"
                onClick={clearCart}
              >
                <Trash2 className="h-4 w-4" aria-hidden="true" />

                {t("cart.clearCart")}
              </Button>
            </div>
          </div>

          {/* ---------------------------------------------------------------- */}
          {/* Order summary                                                     */}
          {/* ---------------------------------------------------------------- */}

          <aside>
            <div className="sticky top-24 rounded-xl border bg-card p-5">
              <h2 className="font-semibold">{t("cart.total")}</h2>

              <div className="mt-4 space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    {t("cart.subtotal")}
                  </span>

                  <span className="tabular-nums">{formatPrice(subtotal)}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    {t("cart.freeShipping")}
                  </span>

                  <span className="font-medium text-emerald-700 dark:text-emerald-400">
                    0₫
                  </span>
                </div>

                <Separator />

                <div className="flex justify-between text-base font-bold">
                  <span>{t("cart.total")}</span>

                  <span className="tabular-nums text-primary">
                    {formatPrice(subtotal)}
                  </span>
                </div>
              </div>
              <div className="mt-6 space-y-4">
                <h3 className="font-semibold">
                  {t("cart.checkout.shippingInformation")}
                </h3>

                {/* Địa chỉ đã giao trước đây */}
                <div className="space-y-2">
                  <Label>{t("cart.checkout.savedAddress")}</Label>

                  <Select
                    value={previousAddressId}
                    onValueChange={handlePreviousAddressChange}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue
                        placeholder={t("cart.checkout.selectSavedAddress")}
                      />
                    </SelectTrigger>

                    <SelectContent>
                      {FAKE_PREVIOUS_ADDRESSES.map((address) => (
                        <SelectItem key={address.id} value={address.id}>
                          {address.name} - {address.phone}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Tên người nhận */}
                <div className="space-y-2">
                  <Label htmlFor="customerName">
                    {t("cart.checkout.recipientName")} *
                  </Label>
                  <Input
                    id="customerName"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder={t("cart.checkout.recipientNamePlaceholder")}
                    required
                  />
                </div>

                {/* Số điện thoại */}
                <div className="space-y-2">
                  <Label htmlFor="customerPhone">
                    {t("cart.checkout.phone")} *
                  </Label>
                  <Input
                    id="customerPhone"
                    value={customerPhone}
                    onChange={(e) => {
                      setCustomerPhone(e.target.value);
                      setPhoneError("");
                    }}
                    onBlur={() => {
                      if (!PHONE_REGEX.test(customerPhone.trim())) {
                        setPhoneError(t("cart.checkout.phoneInvalid"));
                      }
                    }}
                    placeholder={t("cart.checkout.phonePlaceholder")}
                    inputMode="tel"
                    required
                  />

                  {phoneError && (
                    <p className="text-sm text-destructive">{phoneError}</p>
                  )}
                </div>

                {/* Tỉnh/thành phố */}
                <div className="space-y-2">
                  <Label>{t("cart.checkout.phone")} *</Label>

                  <Select
                    value={provinceCode}
                    onValueChange={(value) => {
                      setProvinceCode(value);
                      setPreviousAddressId("");
                    }}
                    disabled={loadingProvinces}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue
                        placeholder={
                          loadingProvinces
                            ? t("cart.checkout.loadingProvinces")
                            : t("cart.checkout.provincePlaceholder")
                        }
                      />
                    </SelectTrigger>

                    <SelectContent>
                      {provinces.map((province) => (
                        <SelectItem
                          key={province.code}
                          value={String(province.code)}
                        >
                          {province.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {provinceError && (
                    <p className="text-sm text-destructive">{provinceError}</p>
                  )}
                </div>

                {/* Phường/xã */}
                <div className="space-y-2">
                  <Label>{t("cart.checkout.ward")} *</Label>

                  <SearchableSelect
                    options={wards.map((ward) => ({
                      label: ward.name,
                      value: String(ward.code),
                    }))}
                    value={wardCode}
                    onChange={setWardCode}
                    placeholder={t("cart.checkout.wardPlaceholder")}
                    searchPlaceholder={t("cart.checkout.searchWard")}
                    emptyMessage={t("cart.checkout.noWardFound")}
                    disabled={!provinceCode || loadingWards}
                  />

                  {wardError && (
                    <p className="text-sm text-destructive">{wardError}</p>
                  )}
                </div>

                {/* Địa chỉ chi tiết tùy chọn */}
                <div className="space-y-2">
                  <Label htmlFor="addressLine">
                    {t("cart.checkout.detailAddress")} *
                  </Label>

                  <Textarea
                    id="addressLine"
                    value={addressLine}
                    placeholder={t("cart.checkout.detailAddressPlaceholder")}
                    rows={2}
                    onChange={(e) => {
                      setAddressLine(e.target.value);
                      setAddressLineError("");
                    }}
                    onBlur={() => {
                      if (!addressLine) {
                        setAddressLineError(
                          t("cart.checkout.detailAddressRequired"),
                        );
                      }
                    }}
                  />
                  {addressLineError && (
                    <p className="text-sm text-destructive">
                      {addressLineError}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="note">{t("cart.checkout.note")}</Label>

                  <Textarea
                    id="note"
                    value={note}
                    placeholder={t("cart.checkout.notePlaceholder")}
                    rows={2}
                    onChange={(e) => {
                      setNote(e.target.value);
                    }}
                  />
                </div>
              </div>
              {/* Checkout */}
              <Button
                size="lg"
                className="mt-5 w-full gap-2"
                onClick={handleCheckout}
                disabled={
                  checkingOut ||
                  !isShippingValid ||
                  loadingProvinces ||
                  loadingWards
                }
              >
                <Lock className="h-4 w-4" aria-hidden="true" />

                {user ? t("cart.checkout.title") : t("cart.loginToCheckout")}
              </Button>

              <Button asChild variant="ghost" className="mt-4 w-full">
                <Link href={withLocale(PATHS.shop, locale)}>
                  <ArrowLeft className="mr-2 h-4 w-4" aria-hidden="true" />

                  {t("cart.continueShopping")}
                </Link>
              </Button>
            </div>
          </aside>
        </div>
      </div>

      <LoginDialog
        open={loginOpen}
        onOpenChange={setLoginOpen}
        onSuccess={handleCheckout}
      />
    </>
  );
}
