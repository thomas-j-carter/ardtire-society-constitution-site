import { redirect } from 'next/navigation'
import { supabaseBrowser } from '@/lib/supabase/client'

export const dynamic = 'force-dynamic'

async function signOut() {
  'use server'
  const supabase = supabaseBrowser()
  await supabase.auth.signOut()
  redirect('/')
}

export default function SignOutPage() {
  return (
    <div className="container py-12">
      <h1 className="text-2xl font-semibold text-slate-900">Sign out</h1>
      <form action={signOut} className="mt-6">
        <button className="btn btn-primary" type="submit">Sign out</button>
      </form>
    </div>
  )
}
