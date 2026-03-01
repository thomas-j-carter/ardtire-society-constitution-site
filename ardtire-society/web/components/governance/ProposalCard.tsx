'use client';

import { supabaseBrowser } from '@/lib/supabase/client';
import { useState } from 'react';

export function ProposalCard({ proposal }: { proposal: any }) {
  const supabase = supabaseBrowser();
  const [loading, setLoading] = useState(false);

  async function castVote(type: 'for' | 'against' | 'abstain') {
    setLoading(true);
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) return alert("Please sign in to vote.");

    const { error } = await supabase
      .from('votes')
      .insert({ proposal_id: proposal.id, user_id: user.id, vote_type: type });

    if (error) {
      alert(error.message === 'duplicate key value violates unique constraint "votes_proposal_id_user_id_key"' 
        ? "You have already voted on this proposal." 
        : "Voting failed. Check your role permissions.");
    } else {
      window.location.reload(); // Refresh to see updated tallies from the RPC trigger
    }
    setLoading(false);
  }

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
      <h3 className="text-xl font-bold text-slate-900 mb-2">{proposal.title}</h3>
      <p className="text-slate-600 mb-6 text-sm">{proposal.description}</p>
      
      <div className="flex gap-2 mb-6">
        <button 
          onClick={() => castVote('for')} 
          disabled={loading}
          className="flex-1 bg-emerald-50 text-emerald-700 border border-emerald-200 py-2 rounded-lg font-bold hover:bg-emerald-100 disabled:opacity-50"
        >
          For ({proposal.votes_for})
        </button>
        <button 
          onClick={() => castVote('against')} 
          disabled={loading}
          className="flex-1 bg-rose-50 text-rose-700 border border-rose-200 py-2 rounded-lg font-bold hover:bg-rose-100 disabled:opacity-50"
        >
          Against ({proposal.votes_against})
        </button>
      </div>
    </div>
  );
}