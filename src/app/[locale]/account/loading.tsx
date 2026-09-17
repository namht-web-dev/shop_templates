export default function Loading() {
  return (
    <div className="container-app py-10">
      {/* Header skeleton */}
      <header className="mb-8">
        <div className="h-9 w-48 animate-pulse rounded-md bg-muted" />
        <div className="mt-3 h-5 w-72 animate-pulse rounded-md bg-muted" />
      </header>

      <div className="grid gap-8 lg:grid-cols-[220px_1fr]">
        {/* Sidebar skeleton */}
        <aside>
          <nav className="flex gap-1 overflow-hidden rounded-xl border p-2 lg:flex-col">
            {[1, 2, 3, 4, 5].map((item) => (
              <div
                key={item}
                className="h-9 w-24 shrink-0 animate-pulse rounded-lg bg-muted lg:w-full"
              />
            ))}
          </nav>
        </aside>

        {/* Content skeleton */}
        <main className="min-w-0">
          <div className="rounded-xl border p-6">
            <div className="h-7 w-40 animate-pulse rounded-md bg-muted" />

            <div className="mt-6 space-y-4">
              <div className="h-5 w-full animate-pulse rounded-md bg-muted" />
              <div className="h-5 w-5/6 animate-pulse rounded-md bg-muted" />
              <div className="h-5 w-4/6 animate-pulse rounded-md bg-muted" />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
