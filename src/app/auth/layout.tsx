export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
