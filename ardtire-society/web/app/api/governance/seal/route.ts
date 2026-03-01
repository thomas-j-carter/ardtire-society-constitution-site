import { NextResponse } from 'next/server';
import { signSocietyInstrument } from '@/lib/governance/signer';
import { createClient } from '@sanity/client';

const writeClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_WRITE_TOKEN, // Requires a token with "Write" permissions
  useCdn: false,
});

export async function POST(req: Request) {
  const body = await req.json();

  // 1. Generate the proof
  const proof = signSocietyInstrument({
    citeId: body.citeId,
    status: body.status,
    contentHash: body.contentHash, // Calculated from block text
  });

  // 2. Patch the document in Sanity with the new proof
  await writeClient
    .patch(body._id)
    .set({ proof_metadata: proof })
    .commit();

  return NextResponse.json({ sealed: true, proof });
}