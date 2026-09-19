"use client";

import { useActionState, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { createProduct, updateProduct } from "@/actions/admin/products";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

type ProductFormData = {
  id?: string;
  slug: string;
  brand: string;
  category: string;
  price: number;
  salePrice: number | null;
  stock: number;
  image: string;
  gallery: string[];
  featured: boolean;
  name: { vi: string; en: string };
  shortDescription: { vi: string; en: string };
  description: { vi: string; en: string };
};

type ActionState = {
  success: boolean;
  message?: string;
  errors?: Record<string, string>;
};

const initialState: ActionState = {
  success: false,
};

const inputClass = "w-full";

export function ProductForm({
  locale,
  product,
}: {
  locale: string;
  product?: ProductFormData;
}) {
  const router = useRouter();
  const isEdit = Boolean(product);

  const [galleryText, setGalleryText] = useState(
    product?.gallery?.join("\n") ?? "",
  );

  const action = async (
    _prevState: ActionState,
    formData: FormData,
  ): Promise<ActionState> => {
    const gallery = galleryText
      .split("\n")
      .map((item) => item.trim())
      .filter(Boolean);

    const input = {
      slug: String(formData.get("slug") ?? ""),
      brand: String(formData.get("brand") ?? ""),
      category: String(formData.get("category") ?? ""),
      price: Number(formData.get("price")),
      salePrice:
        String(formData.get("salePrice") ?? "").trim() === ""
          ? null
          : Number(formData.get("salePrice")),
      stock: Number(formData.get("stock")),
      image: String(formData.get("image") ?? ""),
      gallery,
      featured: formData.get("featured") === "on",
      name: {
        vi: String(formData.get("name_vi") ?? ""),
        en: String(formData.get("name_en") ?? ""),
      },
      shortDescription: {
        vi: String(formData.get("shortDescription_vi") ?? ""),
        en: String(formData.get("shortDescription_en") ?? ""),
      },
      description: {
        vi: String(formData.get("description_vi") ?? ""),
        en: String(formData.get("description_en") ?? ""),
      },
    };

    const result = isEdit
      ? await updateProduct(product!.id!, input)
      : await createProduct(input);

    if (result.success) {
      toast.success(
        isEdit ? "Cập nhật sản phẩm thành công" : "Tạo sản phẩm thành công",
      );

      router.push(`/${locale}/admin/products`);
      router.refresh();

      return { success: true };
    }

    toast.error(result.message ?? "Có lỗi xảy ra");

    return {
      success: false,
      message: result.message,
      errors: result.errors,
    };
  };

  const [state, formAction, pending] = useActionState(action, initialState);

  return (
    <form action={formAction} className="space-y-8">
      {/* Thông tin cơ bản */}
      <section className="space-y-4 rounded-xl border p-5">
        <h2 className="text-lg font-semibold">Thông tin cơ bản</h2>

        <div className="grid gap-4 md:grid-cols-2">
          <Field
            label="Slug"
            name="slug"
            required
            defaultValue={product?.slug}
          />
          <Field
            label="Thương hiệu"
            name="brand"
            required
            defaultValue={product?.brand}
          />
          <Field
            label="Danh mục"
            name="category"
            required
            defaultValue={product?.category}
          />
          <Field
            label="Ảnh đại diện (URL)"
            name="image"
            required
            defaultValue={product?.image}
          />
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Field
            label="Giá"
            name="price"
            type="number"
            required
            defaultValue={product?.price}
          />
          <Field
            label="Giá khuyến mãi"
            name="salePrice"
            type="number"
            defaultValue={product?.salePrice ?? ""}
          />
          <Field
            label="Tồn kho"
            name="stock"
            type="number"
            required
            defaultValue={product?.stock ?? 0}
          />
        </div>

        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            name="featured"
            defaultChecked={product?.featured ?? false}
          />
          Sản phẩm nổi bật
        </label>
      </section>

      {/* Nội dung tiếng Việt */}
      <section className="space-y-4 rounded-xl border p-5">
        <h2 className="text-lg font-semibold">Nội dung tiếng Việt</h2>

        <Field
          label="Tên sản phẩm"
          name="name_vi"
          required
          defaultValue={product?.name?.vi}
        />

        <Field
          label="Mô tả ngắn"
          name="shortDescription_vi"
          defaultValue={product?.shortDescription?.vi}
        />

        <div className="space-y-2">
          <Label htmlFor="description_vi">Mô tả chi tiết</Label>
          <Textarea
            id="description_vi"
            name="description_vi"
            rows={6}
            defaultValue={product?.description?.vi}
          />
        </div>
      </section>

      {/* Nội dung tiếng Anh */}
      <section className="space-y-4 rounded-xl border p-5">
        <h2 className="text-lg font-semibold">English content</h2>

        <Field
          label="Product name"
          name="name_en"
          required
          defaultValue={product?.name?.en}
        />

        <Field
          label="Short description"
          name="shortDescription_en"
          defaultValue={product?.shortDescription?.en}
        />

        <div className="space-y-2">
          <Label htmlFor="description_en">Description</Label>
          <Textarea
            id="description_en"
            name="description_en"
            rows={6}
            defaultValue={product?.description?.en}
          />
        </div>
      </section>

      {/* Gallery */}
      <section className="space-y-4 rounded-xl border p-5">
        <h2 className="text-lg font-semibold">Thư viện ảnh</h2>

        <div className="space-y-2">
          <Label htmlFor="gallery">URL ảnh — mỗi dòng một URL</Label>
          <Textarea
            id="gallery"
            rows={5}
            value={galleryText}
            onChange={(event) => setGalleryText(event.target.value)}
            placeholder={"https://...\nhttps://..."}
          />
        </div>
      </section>

      {state.message && (
        <p className="text-sm text-destructive">{state.message}</p>
      )}

      <div className="flex justify-end gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
          disabled={pending}
        >
          Hủy
        </Button>

        <Button type="submit" disabled={pending}>
          {pending
            ? "Đang lưu..."
            : isEdit
              ? "Cập nhật sản phẩm"
              : "Tạo sản phẩm"}
        </Button>
      </div>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required = false,
  defaultValue,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  defaultValue?: string | number;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={name}>{label}</Label>
      <Input
        id={name}
        name={name}
        type={type}
        required={required}
        defaultValue={defaultValue}
        className={inputClass}
      />
    </div>
  );
}
