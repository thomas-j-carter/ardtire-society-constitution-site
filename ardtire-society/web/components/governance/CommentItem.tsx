export function CommentItem({ comment }: { comment: any }) {
  return (
    <div className="pl-4 border-l-2 border-slate-100 mt-4">
      <div className="bg-slate-50 p-4 rounded-lg">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-bold text-indigo-900">{comment.author_name}</span>
          <span className="text-[10px] text-slate-400 uppercase tracking-tighter">
            {new Date(comment.created_at).toLocaleDateString()}
          </span>
        </div>
        <p className="text-sm text-slate-700 leading-relaxed">{comment.content}</p>
      </div>

      {/* RECURSIVE RENDER: If this comment has replies, render them using the same component */}
      {comment.replies && comment.replies.length > 0 && (
        <div className="ml-4 space-y-2">
          {comment.replies.map((reply: any) => (
            <CommentItem key={reply.id} comment={reply} />
          ))}
        </div>
      )}
    </div>
  );
}