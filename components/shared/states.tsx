/**
 * Shared loading / empty / error states used by every async data surface.
 */
import { AlertTriangle, Inbox, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useI18n } from "@/src/i18n";

export function LoadingSpinner({ className }: { className?: string }) {
  const { t } = useI18n();
  return (
    <div
      className={`flex items-center justify-center py-16 ${className ?? ""}`}
      role="status"
    >
      <Loader2
        className="h-8 w-8 animate-spin text-primary"
        aria-hidden="true"
      />
      <span className="sr-only">{t("common.loading")}</span>
    </div>
  );
}

export function EmptyState({
  title,
  description,
  action,
  icon,
}: {
  title: string;
  description?: string;
  action?: React.ReactNode;
  icon?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed bg-muted/20 px-6 py-16 text-center">
      <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-muted">
        {icon ?? (
          <Inbox className="h-6 w-6 text-muted-foreground" aria-hidden="true" />
        )}
      </span>
      <h3 className="font-semibold">{title}</h3>
      {description && (
        <p className="mt-1 max-w-sm text-sm text-muted-foreground">
          {description}
        </p>
      )}
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}

export function ErrorState({ onRetry }: { onRetry: () => void }) {
  const { t } = useI18n();
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-destructive/30 bg-destructive/5 px-6 py-16 text-center">
      <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10">
        <AlertTriangle
          className="h-6 w-6 text-destructive"
          aria-hidden="true"
        />
      </span>
      <h3 className="font-semibold">{t("common.errorTitle")}</h3>
      <p className="mt-1 max-w-sm text-sm text-muted-foreground">
        {t("common.errorDescription")}
      </p>
      <Button variant="outline" className="mt-6" onClick={onRetry}>
        {t("common.retry")}
      </Button>
    </div>
  );
}

export function CardGridSkeleton({
  count = 8,
  aspect = "square",
}: {
  count?: number;
  aspect?: "square" | "video";
}) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="overflow-hidden rounded-xl border">
          <Skeleton
            className={
              aspect === "square"
                ? "aspect-square w-full"
                : "aspect-video w-full"
            }
          />
          <div className="space-y-2.5 p-4">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-9 w-full" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function ListSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="flex gap-4 rounded-xl border p-4">
          <Skeleton className="h-24 w-36 shrink-0 rounded-lg" />
          <div className="flex-1 space-y-2.5 py-1">
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        </div>
      ))}
    </div>
  );
}
