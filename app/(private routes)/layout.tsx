import { checkSession } from "@/lib/api/clientApi";
import { redirect } from "next/navigation";

export default async function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await checkSession();

  if (!session) {
    redirect("/sign-in");
  }

  return <>{children}</>;
}
