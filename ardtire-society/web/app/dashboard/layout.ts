import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const supabase = createServerComponentClient({ cookies });
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) redirect('/login');

  return (
    <div className="min-h-screen bg-slate-50">
      <nav className="border-b bg-white px-6 py-4 flex justify-between items-center">
        <h1 className="font-bold text-indigo-900 tracking-tight">Ardtire Dashboard</h1>
        <div className="flex items-center gap-4">
          <span className="text-xs font-mono text-slate-400">{session.user.email}</span>
        </div>
      </nav>
      <main className="p-8 max-w-7xl mx-auto">{children}</main>
    </div>
  );
}