'use server';

import { generateInstrumentProof } from './signing';

/**
 * Validates an instrument's local proof against the Society's master key.
 * Used by the Public Verification Badge.
 */
export async function verifyInstrumentIntegrity(instrument: any) {
  try {
    const expectedProof = generateInstrumentProof({
      citeId: instrument.citeId,
      status: instrument.status,
      content: instrument.content,
      _updatedAt: instrument._updatedAt
    });

    // Check if the proof stored in Sanity matches our calculated proof
    const isValid = expectedProof === instrument.proof_metadata;

    return {
      isValid,
      checksum: expectedProof.substring(0, 8), // Short hash for UI display
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    console.error("Verification Error:", error);
    return { isValid: false, error: "System Integrity Check Failed" };
  }
}