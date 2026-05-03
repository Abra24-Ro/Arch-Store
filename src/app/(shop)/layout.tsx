import { Sidebar, TopMenu } from "@/src/components";

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen" style={{ backgroundColor: "var(--color-bg-surface)" }}>
      <TopMenu />
      <Sidebar />
      <main className="flex flex-col flex-1 pt-24">
        {children}
      </main>
    </div>
  );
}