'use client'

import { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabaseBrowser } from '@/lib/supabase/client'

export function ProposalCreateForm() {
  const supabase = useMemo(() => supabaseBrowser(), [])
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [summary, setSummary] = useState('')
  const [body, setBody] = useState('')
  const [status, setStatus] = useState<'idle'|'saving'|'error'>('idle')

  async function submit() {
    setStatus('saving')
    const { data: user } = await supabase.auth.getUser()
    if (!user.user) return setStatus('error')

    const { data, error } = await supabase
      .from('proposals')
      .insert({ title, summary: summary || null, body: body || null, created_by: user.user.id, status: 'draft' })
      .select('id')
      .single()

    if (error || !data?.id) return setStatus('error')
    router.push(`/app/proposals/${data.id}`)
  }

  return (
    <div className="card p-4 max-w-2xl">
      <div className="grid gap-3">
        <label className="text-sm font-semibold">Title</label>
        <input value={title} onChange={(e) => setTitle(e.target.value)} className="rounded-2xl border border-slate-200 px-3 py-2 text-sm" />
        <label className="text-sm font-semibold">Summary</label>
        <textarea value={summary} onChange={(e) => setSummary(e.target.value)} className="rounded-2xl border border-slate-200 px-3 py-2 text-sm" rows={3} />
        <label className="text-sm font-semibold">Body</label>
        <textarea value={body} onChange={(e) => setBody(e.target.value)} className="rounded-2xl border border-slate-200 px-3 py-2 text-sm" rows={8} />
        <button className="btn btn-primary mt-2" onClick={submit} disabled={!title || status==='saving'}>Create proposal</button>
        {status==='error' ? <div className="text-sm text-slate-700">Could not create proposal.</div> : null}
      </div>
    </div>
  )
}
