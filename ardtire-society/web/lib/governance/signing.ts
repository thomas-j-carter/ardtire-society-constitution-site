import { createHmac } from 'crypto';

/**
 * PRODUCTION-HARDENED: Generates a Digital Seal.
 * We include the CiteID, Status, and a hash of the content blocks.
 */
export function generateInstrumentProof(instrument: {
  citeId: string;
  status: string;
  content: any[]; // Sanity Portable Text array
  _updatedAt: string;
}) {
  const secret = process.env.SOCIETY_KMS_KEY_ID;
  
  if (!secret) {
    throw new Error("CRITICAL: KMS_KEY_MISSING. Signing aborted to prevent insecure publication.");
  }

  // 1. Create a deterministic string of the legal content
  // We stringify the portable text to ensure any change in formatting breaks the seal
  const contentSnapshot = JSON.stringify(instrument.content);
  
  // 2. Build the "Signing Payload"
  const payload = [
    instrument.citeId,
    instrument.status,
    contentSnapshot,
    instrument._updatedAt
  ].join('|');

  // 3. Generate HMAC-SHA256 Signature
  return createHmac('sha256', secret)
    .update(payload)
    .digest('hex');
}