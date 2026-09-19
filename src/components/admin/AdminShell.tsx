"use client";

import { useState } from "react";
import { X } from "lucide-react";

import { AdminHeader } from "@/components/admin/AdminHeader";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";

import type { User } from "@/types";

interface AdminShellProps {
  user: User;
  children: React.ReactNode;
}

export function AdminShell({ user, children }: AdminShellProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);

  const sidebarWidth = sidebarCollapsed ? "lg:w-16" : "lg:w-64";
  const mainMargin = sidebarCollapsed ? "lg:ml-16" : "lg:ml-64";

  return (
    <div className="flex h-dvh min-h-0 w-full overflow-hidden bg-muted/20">
      {/* Desktop sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 hidden overflow-y-auto border-r bg-background transition-[width] duration-200 lg:block ${sidebarWidth}`}
      >
        <AdminSidebar
          user={user}
          collapsed={sidebarCollapsed}
          onToggleCollapse={() => {
            setSidebarCollapsed((prev) => !prev);
          }}
        />
      </aside>

      {/* Mobile sidebar */}
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent
          side="left"
          showCloseButton={false}
          className="w-70 p-0 sm:max-w-70"
        >
          <div className="relative h-full">
            <AdminSidebar user={user} onNavigate={() => setMobileOpen(false)} />

            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-3"
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
            >
              <X />
            </Button>
          </div>
        </SheetContent>
      </Sheet>

      {/* Main */}
      <div
        className={`flex h-full min-h-0 min-w-0 flex-1 flex-col overflow-hidden transition-[margin] duration-200 ${mainMargin}`}
      >
        <AdminHeader user={user} onMenuClick={() => setMobileOpen(true)} />

        <main className="min-h-0 min-w-0 flex-1 overflow-x-hidden overflow-y-auto overscroll-contain p-32 sm:p-6 lg:p-8 mt-16">
          {children}
        </main>
      </div>
    </div>
  );
}
