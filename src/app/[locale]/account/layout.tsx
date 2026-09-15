import type { ReactNode } from "react";
import { getCurrentUser } from "@/lib/auth";

import { AccountLayout } from "@/components/account/AccountLayout";
import { redirect } from "next/navigation";
import { PATHS } from "@/lib/paths";
import { Provider, Role, User } from "@/types";

type AccountLayoutProps = {
  params: Promise<{
    locale: string;
  }>;
  children: ReactNode;
};

export default async function AccountPageLayout({
  children,
  params,
}: AccountLayoutProps) {
  const { locale } = await params;
  const user = await getCurrentUser();
  if (!user) {
    // tùy UX của bạn
    redirect(`/${locale}${PATHS.login}`);
  }
  const finalUser: User = {
    avatar: user.avatar,
    email: user.email,
    name: user.name,
    role: user.role as Role,
    id: user.id,
    provider: user.provider as Provider,
  };

  return <AccountLayout user={finalUser}>{children}</AccountLayout>;
}
