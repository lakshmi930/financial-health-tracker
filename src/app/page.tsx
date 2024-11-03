import Dashboard from './dashboard';

export default function Home() {
  return (
    <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start min-h-screen bg-[#F9F7F3] p-8 text-[#2D3436]">
      <Dashboard />
    </main>
  );
}
