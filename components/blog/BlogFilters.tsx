"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

import type { BlogCategory } from "@/src/types";
import { usePathname, useRouter } from "next/navigation";

const ALL = "all" as const;

interface BlogFiltersProps {
  search: string;
  category: string;
  categories: BlogCategory[];
  total: number;
  page: number;
  totalPages: number;
}

export function BlogFilters({
  search,
  category,
  categories,
  total,
  page,
  totalPages,
}: BlogFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();

  const [searchInput, setSearchInput] = useState(search);

  useEffect(() => {
    const timer = setTimeout(() => {
      const value = searchInput.trim();

      if (value === search) {
        return;
      }

      updateQuery({
        search: value || undefined,
        page: 1,
      });
    }, 350);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchInput, search]);

  function updateQuery(updates: Record<string, string | number | undefined>) {
    const params = new URLSearchParams();

    if (updates.search !== undefined) {
      if (updates.search) {
        params.set("search", String(updates.search));
      }
    } else if (search) {
      params.set("search", search);
    }

    if (updates.category !== undefined) {
      if (updates.category !== ALL) {
        params.set("category", String(updates.category));
      }
    } else if (category !== ALL) {
      params.set("category", category);
    }

    const nextPage = updates.page !== undefined ? Number(updates.page) : page;

    if (nextPage > 1) {
      params.set("page", String(nextPage));
    }

    const query = params.toString();

    router.push(query ? `${pathname}?${query}` : pathname);
  }

  function handleCategoryChange(value: string) {
    updateQuery({
      category: value,
      page: 1,
    });
  }

  function handleClear() {
    setSearchInput("");

    router.push(pathname);
  }

  return (
    <div className="mb-8 flex flex-wrap items-center gap-3">
      {/* Search */}
      <Input
        value={searchInput}
        onChange={(event) => setSearchInput(event.target.value)}
        placeholder="Search..."
        className="max-w-xs"
      />

      {/* Category */}
      <Select value={category} onValueChange={handleCategoryChange}>
        <SelectTrigger className="w-47.5" aria-label="Category">
          <SelectValue />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value={ALL}>All categories</SelectItem>

          {categories.map((cat) => (
            <SelectItem key={cat} value={cat}>
              {cat}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Count */}
      <span className="ml-auto text-sm text-muted-foreground">
        {total} articles
      </span>

      {/* Pagination */}
      {totalPages > 1 && (
        <nav
          className="flex w-full items-center justify-center gap-2 pt-6"
          aria-label="Pagination"
        >
          <Button
            variant="outline"
            size="sm"
            disabled={page <= 1}
            onClick={() =>
              updateQuery({
                page: Math.max(1, page - 1),
              })
            }
          >
            Previous
          </Button>

          <span className="px-3 text-sm text-muted-foreground">
            {page} / {totalPages}
          </span>

          <Button
            variant="outline"
            size="sm"
            disabled={page >= totalPages}
            onClick={() =>
              updateQuery({
                page: Math.min(totalPages, page + 1),
              })
            }
          >
            Next
          </Button>
        </nav>
      )}
    </div>
  );
}
