import { Footer, Sidebar, TopMenu } from "@/src/components";
import { Toaster } from "sonner";

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="flex flex-col min-h-screen"
      style={{ backgroundColor: "var(--color-bg-surface)" }}
    >
      <TopMenu />
      <Sidebar />

      <main className="flex flex-col flex-1">{children}</main>
      <Footer />

      <Toaster
        position="top-right"
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
