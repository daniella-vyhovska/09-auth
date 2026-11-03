import { checkSession } from "@/lib/api/serverApi";
import { redirect } from "next/navigation";

export default async function PrivateLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal?: React.ReactNode;
}) {
  const session = await checkSession();

  if (!session) {
    redirect("/sign-in");
  }

  return (
    <>
      {children}
      {modal}
    </>
  );
}