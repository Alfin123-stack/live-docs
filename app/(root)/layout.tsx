export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#0a0a0a] via-[#111] to-[#1a1a1a] text-white">
      {children}
    </main>
  );
}
