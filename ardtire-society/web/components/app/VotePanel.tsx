'use client'

import { useEffect, useMemo, useState } from 'react'
import { supabaseBrowser } from '@/lib/supabase/client'

type VoteValue = 'yes'|'no'|'abstain'

export function VotePanel({ proposalId }: { proposalId: string }) {
  const supabase = useMemo(() => supabaseBrowser(), [])
  const [status, setStatus] = useState<'idle'|'saving'|'error'>('idle')
  const [myVote, setMyVote] = useState<VoteValue | ''>('')

  async function loadMyVote() {
    const { data: user } = await supabase.auth.getUser()
    if (!user.user) return
    const { data } = await supabase.from('proposal_votes')
      .select('vote')
      .eq('proposal_id', proposalId)
      .eq('voter_id', user.user.id)
      .maybeSingle()
    setMyVote((data?.vote as any) ?? '')
  }

  useEffect(() => { loadMyVote() }, [proposalId])

  useEffect(() => {
    const channel = supabase
      .channel('proposal_votes_changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'proposal_votes', filter: `proposal_id=eq.${proposalId}` }, () => {
        loadMyVote()
      })
      .subscribe()
    return () => { supabase.removeChannel(channel) }
  }, [proposalId, supabase])

  async function cast(vote: VoteValue) {
    setStatus('saving')
    const { error } = await supabase.rpc('cast_vote', { proposal_id: proposalId, vote_value: vote, reason_text: null })
    if (error) setStatus('error')
    else {
      setMyVote(vote)
      setStatus('idle')
    }
  }

  return (
    <div className="card p-4">
      <div className="text-sm font-semibold text-slate-900">Vote</div>
      <div className="mt-3 flex flex-wrap gap-2">
        <button className="btn btn-primary" onClick={() => cast('yes')} aria-pressed={myVote==='yes'}>Yes</button>
        <button className="btn btn-primary" onClick={() => cast('no')} aria-pressed={myVote==='no'}>No</button>
        <button className="btn" onClick={() => cast('abstain')} aria-pressed={myVote==='abstain'}>Abstain</button>
      </div>
      <div className="mt-3 text-xs text-slate-600">
        {myVote ? `Your vote: ${myVote}` : 'No vote recorded.'}
        {status==='saving' ? ' Saving…' : null}
        {status==='error' ? ' Error.' : null}
      </div>
    </div>
  )
}
