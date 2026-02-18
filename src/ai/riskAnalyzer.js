// riskAnalyzer.js

/**
 * Analyze a user's gambling session for risky or unfair behavior
 * @param {Object} session - The gambling session data
 * @returns {Object} result - Analysis outcome
 */
function analyzeSession(session) {
  if (session == null || typeof session !== 'object') {
    return {
      winRate: 0,
      lossStreak: false,
      verdict: 'Session appears fair',
      severity: 'low',
    };
  }

  const {
    gamesPlayed = 0,
    wins = 0,
    totalLossAmount = 0,
    startBalance = 0,
    betHistory,
  } = session;

  const safeBetHistory = Array.isArray(betHistory) ? betHistory : [];
  const safeGamesPlayed = Number(gamesPlayed) || 0;
  const safeWins = Number(wins) || 0;
  const safeTotalLossAmount = Number(totalLossAmount) || 0;
  const safeStartBalance = Number(startBalance) || 0;

  // Calculate win rate as a percentage
  const winRate = safeGamesPlayed > 0 ? (safeWins / safeGamesPlayed) * 100 : 0;

  // Check if last 3 games were all losses
  const lastThreeBets = safeBetHistory.slice(-3);
  const lossStreak = lastThreeBets.length === 3 && lastThreeBets.every(bet => bet && bet.result === 'loss');

  // Rule 1: Unfair if winRate < 30% over 10+ games
  const isUnfairWinRate = safeGamesPlayed >= 10 && winRate < 30;

  // Rule 2: Dangerous loss amount if losses exceed 3× starting balance
  const isDangerousLoss = safeStartBalance > 0 && safeTotalLossAmount > 3 * safeStartBalance;

  // Decide verdict based on the rules above
  let verdict = "Session appears fair";
  let severity = "low";

  if (isDangerousLoss && isUnfairWinRate) {
    verdict = "Session shows signs of possible manipulation and financial risk";
    severity = "high";
  } else if (isDangerousLoss) {
    verdict = "Session indicates dangerous gambling behavior";
    severity = "high";
  } else if (isUnfairWinRate) {
    verdict = "Session seems possibly unfair (very low win rate)";
    severity = "medium";
  } else if (lossStreak) {
    verdict = "Loss streak detected – be cautious";
    severity = "medium";
  }

  // Return all results
  return {
    winRate: parseFloat(winRate.toFixed(2)),
    lossStreak,
    verdict,
    severity,
  };
}

export { analyzeSession };
