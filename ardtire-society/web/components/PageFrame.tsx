import { ProseBlocks } from './ProseBlocks'

export function PageFrame(props: { kicker?: string; title: string; subtitle?: string; body?: any[] }) {
  return (
    <div className="container py-8">
      {props.kicker ? <div className="text-xs font-semibold tracking-wide text-indigo-700">{props.kicker}</div> : null}
      <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">{props.title}</h1>
      {props.subtitle ? <p className="mt-2 max-w-2xl text-slate-700">{props.subtitle}</p> : null}
      {props.body ? <div className="mt-6"><ProseBlocks value={props.body} /></div> : null}
    </div>
  )
}
