import type { ReactNode } from "react";

import { AccountLayout } from "@/components/account/AccountLayout";

type AccountLayoutProps = {
  children: ReactNode;
};

export default function AccountRouteLayout({ children }: AccountLayoutProps) {
  return <AccountLayout>{children}</AccountLayout>;
}
