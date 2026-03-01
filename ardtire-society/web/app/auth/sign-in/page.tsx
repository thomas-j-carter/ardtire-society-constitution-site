import { redirect } from 'next/navigation'
import { supabaseServer } from '../../../lib/supabase/server'

export const dynamic = 'force-dynamic'

async function signIn(formData: FormData) {
  'use server'
  const email = String(formData.get('email') ?? '')
  const password = String(formData.get('password') ?? '')
  const supabase = supabaseServer()
  const { error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) redirect('/auth/sign-in?error=1')
  redirect('/app/dashboard')
}

export default function SignInPage({ searchParams }: { searchParams: { error?: string } }) {
  return (
    <div className="container py-12">
      <h1 className="text-2xl font-semibold text-slate-900">Sign in</h1>
      {searchParams.error ? <div className="mt-3 card p-4 text-sm text-slate-700">Sign-in failed.</div> : null}
      <form action={signIn} className="mt-6 grid gap-3 max-w-md">
        <label className="text-sm font-semibold">Email</label>
        <input name="email" type="email" required className="rounded-2xl border border-slate-200 px-3 py-2 text-sm" />
        <label className="text-sm font-semibold mt-2">Password</label>
        <input name="password" type="password" required className="rounded-2xl border border-slate-200 px-3 py-2 text-sm" />
        <button className="btn btn-primary mt-4" type="submit">Sign in</button>
      </form>
    </div>
  )
}
