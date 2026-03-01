import { NextResponse } from 'next/server';
import { createClient } from 'next-sanity';
import { generateInstrumentProof } from '@/lib/governance/signing';

// Initialize a read-only client with no cache for real-time verification
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2024-01-01',
  useCdn: false, // Bypass CDN to get the absolute source of truth
});

export async function GET(
  request: Request,
  { params }: { params: { citeId: string } }
) {
  const { citeId } = params;

  try {
    // 1. Fetch the Instrument by its Citation ID
    const instrument = await client.fetch(
      `*[_type == "instrument" && citeId == $citeId][0]{
        title,
        citeId,
        status,
        content,
        _updatedAt,
        proof_metadata
      }`,
      { citeId }
    );

    if (!instrument) {
      return NextResponse.json({ error: 'Instrument Not Found' }, { status: 404 });
    }

    // 2. Re-calculate the proof based on the current live data
    const liveProof = generateInstrumentProof({
      citeId: instrument.citeId,
      status: instrument.status,
      content: instrument.content,
      _updatedAt: instrument._updatedAt
    });

    // 3. Compare the live calculation against the stored "Seal"
    const isAuthentic = liveProof === instrument.proof_metadata;

    return NextResponse.json({
      verified: isAuthentic,
      society: "The Ardtire Society",
      document: {
        title: instrument.title,
        citeId: instrument.citeId,
        status: instrument.status,
        lastUpdated: instrument._updatedAt
      },
      audit: {
        sealMatch: isAuthentic,
        checksum: liveProof.substring(0, 12),
        protocol: "HMAC-SHA256-KMS"
      }
    });

  } catch (error) {
    console.error('Verification API Error:', error);
    return NextResponse.json({ error: 'Internal Verification Failure' }, { status: 500 });
  }
}