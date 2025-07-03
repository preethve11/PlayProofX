// src/services/verdictAPI.js

// Import the AI fairness analyzer function
import { analyzeSession } from '../ai/riskAnalyzer';

/**
 * analyzeGameSession
 * ------------------
 * Accepts a user's gambling session data, runs it through the fairness analyzer,
 * and returns the risk verdict and related metrics.
 *
 * @param {Object} sessionData - The session object containing game/bet history.
 * @returns {Object} verdictResult - Includes verdict, winRate, severity, etc.
 */
export function analyzeGameSession(sessionData) {
  // Run the AI-based analysis
  const verdictResult = analyzeSession(sessionData);

  // Return the result object to the caller (e.g., frontend UI)
  return verdictResult;
}
