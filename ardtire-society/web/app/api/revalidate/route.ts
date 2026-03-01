import { NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';
import { parseBody } from 'next-sanity/webhook';

export async function POST(req: Request) {
  try {
    const { body, isValidSignature } = await parseBody(
      req,
      process.env.SANITY_REVALIDATE_SECRET
    );

    if (!isValidSignature) {
      return new Response('Invalid signature', { status: 401 });
    }

    if (!body?._type) {
      return new Response('Bad Request', { status: 400 });
    }

    // Production-Hardened: Purge specific cache tags based on document type
    revalidateTag(body._type);
    
    console.log(`✅ Revalidated cache for type: ${body._type}`);
    return NextResponse.json({ revalidated: true, now: Date.now() });
  } catch (err: any) {
    return new Response(err.message, { status: 500 });
  }
}