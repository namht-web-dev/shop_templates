import type { ReactNode } from "react";

import { AdminShell } from "@/components/admin/AdminShell";
import { requireAdmin } from "@/lib/auth";

interface AdminLayoutProps {
  children: ReactNode;
  params: Promise<{
    locale: string;
  }>;
}

export default async function AdminLayout({
  children,
  params,
}: AdminLayoutProps) {
  const { locale } = await params;

  const user = await requireAdmin(locale);

  return <AdminShell user={user}>{children}</AdminShell>;
}
