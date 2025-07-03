// riskAnalyzer.js

/**
 * Analyze a user's gambling session for risky or unfair behavior
 * @param {Object} session - The gambling session data
 * @returns {Object} result - Analysis outcome
 */
function analyzeSession(session) {
  const {
    gamesPlayed,
    wins,
    losses,
    totalLossAmount,
    startBalance,
    betHistory,
  } = session;

  // Calculate win rate as a percentage
  const winRate = gamesPlayed > 0 ? (wins / gamesPlayed) * 100 : 0;

  // Check if last 3 games were all losses
  const lastThreeBets = betHistory.slice(-3);
  const lossStreak = lastThreeBets.length === 3 && lastThreeBets.every(bet => bet.result === 'loss');

  // Rule 1: Unfair if winRate < 30% over 10+ games
  const isUnfairWinRate = gamesPlayed >= 10 && winRate < 30;

  // Rule 2: Dangerous loss amount if losses exceed 3× starting balance
  const isDangerousLoss = totalLossAmount > 3 * startBalance;

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

// Export the module so it can be used in other files
module.exports = {
  analyzeSession,
};
