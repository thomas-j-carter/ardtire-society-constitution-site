import { redirect } from 'next/navigation';
import { supabaseServer } from '@/lib/supabase/server';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = supabaseServer()

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect('/login')
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <nav className="border-b bg-white px-6 py-4 flex justify-between items-center">
        <h1 className="font-bold text-indigo-900 tracking-tight">Ardtire Dashboard</h1>
        <div className="flex items-center gap-4">
          {/* existing nav/actions */}
        </div>
      </nav>
      {children}
    </div>
  )
}