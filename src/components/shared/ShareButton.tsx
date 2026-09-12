"use client";

import { Link2 } from "lucide-react";
import { toast } from "sonner";

type ShareButtonProps = {
  label: string;
  successMessage: string;
  errorMessage: string;
};

export default function ShareButton({
  label,
  successMessage,
  errorMessage,
}: ShareButtonProps) {
  async function handleShare() {
    try {
      await navigator.clipboard.writeText(window.location.href);

      toast.success(successMessage);
    } catch {
      toast.error(errorMessage);
    }
  }

  return (
    <button
      type="button"
      onClick={handleShare}
      className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 transition-colors hover:bg-accent hover:text-foreground"
    >
      <Link2 className="h-4 w-4" aria-hidden="true" />

      {label}
    </button>
  );
}
