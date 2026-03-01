'use client'

import { PortableText } from '@portabletext/react'
import { Callout } from './Callout'

export function ProseBlocks({ value }: { value: any[] }) {
  return (
    <div className="prose prose-slate max-w-none">
      <PortableText
        value={value}
        components={{
          types: {
            callout: (p: any) => <Callout variant={p.value.variant} title={p.value.title} text={p.value.text} />,
          },
        }}
      />
    </div>
  )
}
