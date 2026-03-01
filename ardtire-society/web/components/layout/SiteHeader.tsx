import Link from 'next/link';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export default async function SiteHeader() {
  const supabase = createServerComponentClient({ cookies });
  const { data: { user } } = await supabase.auth.getUser();
  
  // Fetch user role for the "Role Badge"
  const { data: profile } = user 
    ? await supabase.from('profiles').select('role').eq('id', user.id).single()
    : { data: null };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl flex h-16 items-center justify-between px-6">
        <div className="flex items-center gap-8">
          <Link href="/" className="text-xl font-bold text-indigo-900 tracking-tighter">
            ARDTIRE <span className="font-light text-slate-400">SOCIETY</span>
          </Link>
          <nav className="hidden md:flex gap-6 text-sm font-medium text-slate-600">
            <Link href="/instruments" className="hover:text-indigo-600 transition">Instruments</Link>
            <Link href="/proposals" className="hover:text-indigo-600 transition">Governance</Link>
          </nav>
        </div>
        
        <div className="flex items-center gap-4">
          {profile && (
            <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold text-indigo-700 uppercase tracking-widest border border-indigo-100">
              {profile.role}
            </span>
          )}
          {user ? (
            <Link href="/dashboard" className="text-sm font-semibold text-slate-900">Dashboard</Link>
          ) : (
            <Link href="/login" className="text-sm font-semibold text-indigo-600">Sign In</Link>
          )}
        </div>
      </div>
    </header>
  );
}