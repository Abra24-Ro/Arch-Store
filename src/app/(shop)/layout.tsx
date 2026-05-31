import { Footer, Sidebar, TopMenu } from "@/src/components";
import { getSession } from "@/src/lib/get-session";
import { Toaster } from "sonner";

export default async function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLoggedIn, user, isAdmin } = await getSession(); 

  return (
    <div
      className="flex flex-col min-h-screen"
      style={{ backgroundColor: "var(--color-bg-surface)" }}
    >
      <TopMenu />
      <Sidebar isLoggedIn={isLoggedIn} userEmail={user?.email} isAdmin={isAdmin} /> 

      <main className="flex flex-col flex-1">{children}</main>
      <Footer />

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
    </div>
  );
}