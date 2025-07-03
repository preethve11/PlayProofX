// src/blockchain/log.js

// In-memory mock blockchain array
const mockChain = [];

/**
 * Generates a fake hash string using timestamp, session ID, and random suffix.
 * Simulates a blockchain-like hash for a block.
 * @param {string} sessionId
 * @returns {string} Simulated hash
 */
function fakeHash(sessionId) {
  const timestamp = Date.now();
  const randomSuffix = Math.random().toString(36).substring(2, 10);
  return `0x${Buffer.from(`${sessionId}-${timestamp}-${randomSuffix}`).toString('hex').slice(0, 64)}`;
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

// Export functions
module.exports = {
  logSessionToChain,
  getChain,
};
