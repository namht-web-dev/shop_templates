"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Trash2 } from "lucide-react";

import { deleteProduct } from "@/actions/admin/products";
import { Button } from "@/components/ui/button";

export function DeleteProductButton({ productId }: { productId: string }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [confirming, setConfirming] = useState(false);

  const handleDelete = () => {
    startTransition(async () => {
      const result = await deleteProduct(productId);

      if (!result.success) {
        toast.error(result.message ?? "Không thể xóa sản phẩm");
        return;
      }

      toast.success("Đã xóa sản phẩm");
      setConfirming(false);
      router.refresh();
    });
  };

  if (confirming) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-sm">Xóa sản phẩm này?</span>

        <Button
          size="sm"
          variant="destructive"
          onClick={handleDelete}
          disabled={pending}
        >
          {pending ? "Đang xóa..." : "Xác nhận"}
        </Button>

        <Button
          size="sm"
          variant="outline"
          onClick={() => setConfirming(false)}
          disabled={pending}
        >
          Hủy
        </Button>
      </div>
    );
  }

  return (
    <Button
      size="icon"
      variant="ghost"
      aria-label="Xóa sản phẩm"
      onClick={() => setConfirming(true)}
    >
      <Trash2 className="size-4 text-destructive" />
    </Button>
  );
}
