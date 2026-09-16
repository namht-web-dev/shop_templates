// app/[locale]/login/page.tsx

import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { PATHS } from "@/lib/paths";
import LoginForm from "@/components/login/LoginForm";

export default async function LoginPage() {
  const user = await getCurrentUser();

  if (user) {
    redirect(PATHS.account);
  }

  return <LoginForm user={user} />;
}
