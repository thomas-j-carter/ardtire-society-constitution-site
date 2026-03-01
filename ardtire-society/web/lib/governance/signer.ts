import { createHmac } from 'crypto';

/**
 * Production-Hardened: Generates a deterministic signature for an Instrument.
 * This combines the document's Cite ID, Status, and Content Hash.
 */
export function signSocietyInstrument(instrument: {
  citeId: string;
  status: string;
  contentHash: string;
}) {
  const secret = process.env.SOCIETY_KMS_KEY_ID;

  if (!secret) {
    throw new Error('CRITICAL_SECURITY_FAILURE: KMS Key Missing');
  }

  // Combine key fields into a "signing string"
  const message = `${instrument.citeId}|${instrument.status}|${instrument.contentHash}`;

  // Sign using SHA-256
  return createHmac('sha256', secret)
    .update(message)
    .digest('hex');
}