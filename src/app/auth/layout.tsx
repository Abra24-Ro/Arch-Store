import { auth } from "@/src/auth";
import { redirect } from "next/navigation";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (session?.user) {
    redirect("/");
  }

  return (
    <main
      className="flex flex-col flex-1"
      style={{
        backgroundColor: "var(--color-bg)",
        backgroundImage:
          "radial-gradient(circle, #C8A882 1px, transparent 1px)",
        backgroundSize: "24px 24px",
      }}
    >
      {children}
    </main>
  );
}
