import { supabaseServer } from '../../../../lib/supabase/server'
import { VotePanel } from '../../../../components/app/VotePanel'

export const dynamic = 'force-dynamic'

export default async function ProposalDetail({ params }: { params: { id: string } }) {
  const supabase = supabaseServer()
  const { data: proposal } = await supabase.from('proposals').select('*').eq('id', params.id).maybeSingle()
  const { data: tallies } = await supabase.from('proposal_vote_tallies').select('*').eq('proposal_id', params.id).maybeSingle()

  if (!proposal) return <div className="card p-4 text-sm text-slate-700">No entries published.</div>

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="card p-4">
        <div className="text-xs font-semibold uppercase tracking-wide text-indigo-700">{proposal.status}</div>
        <h1 className="mt-2 text-2xl font-semibold text-slate-900">{proposal.title}</h1>
        {proposal.summary ? <div className="mt-3 text-sm text-slate-700">{proposal.summary}</div> : null}
        {proposal.body ? <div className="mt-4 whitespace-pre-wrap text-sm text-slate-800">{proposal.body}</div> : null}
        <div className="mt-6 card p-4">
          <div className="text-sm font-semibold text-slate-900">Tallies</div>
          <div className="mt-2 grid grid-cols-3 gap-2 text-sm">
            <div className="card p-3"><div className="text-xs text-slate-600">Yes</div><div className="text-lg font-semibold">{tallies?.yes_count ?? 0}</div></div>
            <div className="card p-3"><div className="text-xs text-slate-600">No</div><div className="text-lg font-semibold">{tallies?.no_count ?? 0}</div></div>
            <div className="card p-3"><div className="text-xs text-slate-600">Abstain</div><div className="text-lg font-semibold">{tallies?.abstain_count ?? 0}</div></div>
          </div>
        </div>
      </div>
      <div className="grid gap-6">
        <VotePanel proposalId={proposal.id} />
      </div>
    </div>
  )
}
