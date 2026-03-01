import {revalidateTag} from 'next/cache'
import {type NextRequest, NextResponse} from 'next/server'
import {parseBody} from 'next-sanity/webhook'

type WebhookPayload = {
  _type: string
}

export async function POST(req: NextRequest) {
  try {
    if (!process.env.SANITY_REVALIDATE_SECRET) {
      return new Response('Missing environment variable SANITY_REVALIDATE_SECRET', {status: 500})
    }

    const {body, isValidSignature} = await parseBody<WebhookPayload>(
      req,
      process.env.SANITY_REVALIDATE_SECRET,
    )

    if (!isValidSignature) {
      return new Response(JSON.stringify({message: 'Invalid signature', body}), {status: 401})
    }

    if (!body?._type) {
      return new Response(JSON.stringify({message: 'Bad Request', body}), {status: 400})
    }

    revalidateTag(body._type)
    return NextResponse.json({body})
  } catch (err) {
    console.error(err)
    return new Response((err as Error).message, {status: 500})
  }
}
