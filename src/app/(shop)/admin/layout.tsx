import { getSession } from "@/src/lib/get-session";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLoggedIn, user } = await getSession();

  if (!isLoggedIn || user?.role !== "admin") {
    redirect("/auth/login");
  }

  return <>{children}</>;
}
