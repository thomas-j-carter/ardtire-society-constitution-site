export function Callout(props: { variant: 'notice'|'policy'|'boundary'; title?: string; text: string }) {
  const variantClass =
    props.variant === 'policy' ? 'border-indigo-200 bg-indigo-50' :
    props.variant === 'boundary' ? 'border-slate-300 bg-white' :
    'border-slate-200 bg-slate-50'
  return (
    <aside className={`card p-4 ${variantClass}`} aria-label={props.title ?? props.variant}>
      {props.title ? <div className="font-semibold">{props.title}</div> : null}
      <div className="mt-1 text-sm text-slate-700">{props.text}</div>
    </aside>
  )
}
