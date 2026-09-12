/**
 * Small reusable presentational primitives — routing-free (no react-router
 * imports) so they survive a Next.js migration unchanged.
 */
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

export function RatingStars({
  rating,
  size = "sm",
  showValue = false,
  className,
}: {
  rating: number;
  size?: "sm" | "md";
  showValue?: boolean;
  className?: string;
}) {
  const dimension = size === "sm" ? "h-3.5 w-3.5" : "h-4.5 w-4.5";
  return (
    <span className={cn("inline-flex items-center gap-1", className)}>
      <span className="inline-flex" aria-hidden="true">
        {[1, 2, 3, 4, 5].map((i) => (
          <Star
            key={i}
            className={cn(
              dimension,
              i <= Math.round(rating)
                ? "fill-amber-400 text-amber-400"
                : "fill-muted text-muted-foreground/30",
            )}
          />
        ))}
      </span>
      {showValue && (
        <span className="text-sm font-medium tabular-nums">
          {rating.toFixed(1)}
        </span>
      )}
      <span className="sr-only">{`${rating} / 5`}</span>
    </span>
  );
}

export function Badge({
  children,
  variant = "default",
  className,
}: {
  children: React.ReactNode;
  variant?: "default" | "sale" | "outline" | "success" | "muted";
  className?: string;
}) {
  const variants: Record<string, string> = {
    default: "bg-primary text-primary-foreground",
    sale: "bg-destructive text-destructive-foreground",
    outline: "border border-border text-foreground",
    success: "bg-emerald-600/10 text-emerald-700 dark:text-emerald-400",
    muted: "bg-muted text-muted-foreground",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        variants[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}

export function SectionHeading({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
      <div className="max-w-2xl">
        <h2 className="text-2xl font-semibold tracking-tight text-balance sm:text-3xl">
          {title}
        </h2>
        {description && (
          <p className="mt-2 text-muted-foreground">{description}</p>
        )}
      </div>
      {action}
    </div>
  );
}
