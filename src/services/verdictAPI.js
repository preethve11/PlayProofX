// src/services/verdictAPI.js

import { analyzeSession } from '../ai/riskAnalyzer.js';

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
  const verdictResult = analyzeSession(sessionData);
  return verdictResult;
}
