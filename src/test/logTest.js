
const { logSessionToChain, getChain } = require('../blockchain/log');

const testSession = {
  sessionId: 'test-session-001',
  verdict: 'High Risk',
  gamesPlayed: 12,
  wins: 2,
  losses: 10,
  totalLossAmount: 300,
  startBalance: 50,
  betHistory: [
    { result: 'loss', betAmount: 50, payout: 0, gameTime: new Date().toISOString() },
    { result: 'loss', betAmount: 75, payout: 0, gameTime: new Date().toISOString() },
    { result: 'win', betAmount: 30, payout: 60, gameTime: new Date().toISOString() }
  ]
};

logSessionToChain(testSession);

console.log("\n📜 Full Chain:");
console.log(getChain());
