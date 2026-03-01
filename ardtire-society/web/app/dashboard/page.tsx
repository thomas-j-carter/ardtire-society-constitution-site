import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import Link from 'next/link';

export default async function MemberDashboard() {
  const supabase = createServerComponentClient({ cookies });
  
  // Fetch active proposals and the user's role
  const { data: proposals } = await supabase
    .from('proposals')
    .select('*')
    .order('created_at', { ascending: false });

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Active Governance</h2>
        <p className="text-slate-500">Review and cast your weighted vote on pending Society changes.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {proposals?.map((proposal) => (
          <Link 
            key={proposal.id} 
            href={`/proposals/${proposal.id}`}
            className="group block p-6 bg-white border border-slate-200 rounded-xl hover:border-indigo-300 hover:shadow-md transition-all"
          >
            <div className="flex justify-between items-start mb-4">
              <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-600 bg-indigo-50 px-2 py-1 rounded">
                {proposal.status}
              </span>
            </div>
            <h3 className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
              {proposal.title}
            </h3>
            <p className="text-sm text-slate-500 line-clamp-2 mt-2">
              {proposal.description}
            </p>
            <div className="mt-6 flex items-center gap-4 text-xs font-medium text-slate-400">
              <span>For: {proposal.votes_for}</span>
              <span>Against: {proposal.votes_against}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}