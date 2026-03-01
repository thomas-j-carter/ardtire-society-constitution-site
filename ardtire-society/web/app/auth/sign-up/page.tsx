import { redirect } from 'next/navigation'
import { supabaseBrowser } from '@/lib/supabase/client'

export const dynamic = 'force-dynamic'

async function signUp(formData: FormData) {
  'use server'
  const email = String(formData.get('email') ?? '')
  const password = String(formData.get('password') ?? '')
  const displayName = String(formData.get('display_name') ?? '')
  const supabase = supabaseBrowser()
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { display_name: displayName } },
  })
  if (error) redirect('/auth/sign-up?error=1')
  redirect('/app/dashboard')
}

export default function SignUpPage({ searchParams }: { searchParams: { error?: string } }) {
  return (
    <div className="container py-12">
      <h1 className="text-2xl font-semibold text-slate-900">Create account</h1>
      {searchParams.error ? <div className="mt-3 card p-4 text-sm text-slate-700">Sign-up failed.</div> : null}
      <form action={signUp} className="mt-6 grid gap-3 max-w-md">
        <label className="text-sm font-semibold">Display name</label>
        <input name="display_name" type="text" className="rounded-2xl border border-slate-200 px-3 py-2 text-sm" />
        <label className="text-sm font-semibold mt-2">Email</label>
        <input name="email" type="email" required className="rounded-2xl border border-slate-200 px-3 py-2 text-sm" />
        <label className="text-sm font-semibold mt-2">Password</label>
        <input name="password" type="password" required className="rounded-2xl border border-slate-200 px-3 py-2 text-sm" />
        <button className="btn btn-primary mt-4" type="submit">Create account</button>
      </form>
    </div>
  )
}
