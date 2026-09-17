// app/[locale]/login/page.tsx

import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { PATHS } from "@/lib/paths";
import RegisterForm from "@/components/register/RegisterForm";

export default async function RegisterPage() {
  const user = await getCurrentUser();

  if (user) {
    redirect(PATHS.account);
  }

  return <RegisterForm user={user} />;
}
