



export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex flex-col flex-1 items-center justify-center bg-red-500">
      <h1>AuthLayout</h1>
      {children}
    </main>
  );
}