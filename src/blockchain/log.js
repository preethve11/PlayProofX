// src/blockchain/log.js

import CryptoJS from 'crypto-js';

// In-memory mock blockchain array
const mockChain = [];

/**
 * Generates a hash string using timestamp, session ID, and random suffix.
 * Uses crypto-js (SHA256) so it works in both Node and browser.
 * @param {string} sessionId
 * @returns {string} Hash string (0x + 64 hex chars)
 */
function fakeHash(sessionId) {
  const timestamp = Date.now();
  const randomSuffix = Math.random().toString(36).substring(2, 10);
  const input = `${sessionId}-${timestamp}-${randomSuffix}`;
  const hex = CryptoJS.SHA256(input).toString(CryptoJS.enc.Hex);
  return `0x${hex.slice(0, 64)}`;
}

/**
 * Logs a gambling session to the mock blockchain.
 * @param {Object} sessionData - Includes sessionId, verdict, and full game data
 */
function logSessionToChain(sessionData) {
  const { sessionId, verdict } = sessionData;

  const sessionHash = fakeHash(sessionId);
  const block = {
    id: Date.now(),
    timestamp: new Date().toISOString(),
    sessionHash,
    verdict,
    gameData: sessionData,
  };

  mockChain.push(block);

  console.log("🔗 Block added:", block);
}

/**
 * Returns the entire mock blockchain.
 * @returns {Array} Array of all blocks
 */
function getChain() {
  return mockChain;
}

export { logSessionToChain, getChain };
