import { auth } from "@/src/auth";
import { redirect } from "next/navigation";
import { Toaster } from "sonner";

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

      <Toaster
        position="top-center"
        richColors
        toastOptions={{
          style: {
            fontFamily: "var(--font-body)",
            fontSize: "13px",
            borderRadius: "var(--radius-md)",
            border: "0.5px solid var(--color-border-medium)",
            boxShadow: "var(--shadow-md)",
          },
        }}
      />
    </main>
  );
}
