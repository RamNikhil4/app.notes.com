import { Sidebar } from "@/components/Sidebar";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen w-full overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-auto relative">
        <div className="mx-auto max-w-5xl p-6 md:p-12">{children}</div>
      </main>
    </div>
  );
}
