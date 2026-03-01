import { createServerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { ProposalCard } from '@/components/governance/ProposalCard';
import { CommentItem } from '@/components/governance/CommentItem';
import Breadcrumbs from '@/components/ui/Breadcrumbs';

export default async function ProposalDetailPage({ params }: { params: { id: string } }) {
  const supabase = createServerComponentClient({ cookies });
  
  // Fetch Proposal
  const { data: proposal } = await supabase
    .from('proposals')
    .select('*')
    .eq('id', params.id)
    .single();

  // Fetch Mock Comments (In a real app, these would come from a 'comments' table)
  const comments = [
    { 
      id: 1, 
      author_name: "Founder_Alpha", 
      content: "Does this comply with the 2026 Charter?",
      created_at: new Date().toISOString(),
      replies: [
        { id: 2, author_name: "Member_Beta", content: "Yes, verified via Section 4.", created_at: new Date().toISOString() }
      ]
    }
  ];

  if (!proposal) return <div>Proposal Not Found</div>;

  return (
    <div className="max-w-4xl mx-auto">
      <Breadcrumbs items={[{ label: 'Proposals', href: '/dashboard' }, { label: proposal.title, href: '#' }]} />
      
      <ProposalCard proposal={proposal} />

      <div className="mt-12">
        <h4 className="text-lg font-bold text-slate-900 border-b pb-4 mb-4">Deliberation</h4>
        {comments.map(c => <CommentItem key={c.id} comment={c} />)}
      </div>
    </div>
  );
}