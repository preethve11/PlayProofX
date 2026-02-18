import React, { useState } from 'react';
import StatsCard from './components/StatsCard.jsx';
import BlockchainViewer from './components/BlockchainViewer.jsx';
import { analyzeGameSession } from './services/verdictAPI.js';
import { logSessionToChain } from './blockchain/log.js';

/**
 * Root app component with interactive session analysis
 */
function App() {
  const [sessionHistory, setSessionHistory] = useState([]);
  const [formData, setFormData] = useState({
    sessionId: `session-${Date.now()}`,
    startBalance: '',
    gamesPlayed: '',
    wins: '',
    losses: '',
    totalLossAmount: '',
    betHistory: '',
  });
  const [currentAnalysis, setCurrentAnalysis] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const parseBetHistory = (betHistoryString) => {
    if (!betHistoryString.trim()) return [];
    
    // Try to parse as JSON array first
    try {
      const parsed = JSON.parse(betHistoryString);
      if (Array.isArray(parsed)) return parsed;
    } catch {
      // If not JSON, try simple format: "win,loss,loss" or "w,l,l"
      const bets = betHistoryString.split(',').map(bet => {
        const trimmed = bet.trim().toLowerCase();
        if (trimmed === 'w' || trimmed === 'win') return { result: 'win' };
        if (trimmed === 'l' || trimmed === 'loss') return { result: 'loss' };
        return { result: trimmed };
      });
      return bets.filter(b => b.result === 'win' || b.result === 'loss');
    }
    
    return [];
  };

  const handleAnalyze = () => {
    const sessionData = {
      sessionId: formData.sessionId || `session-${Date.now()}`,
      gamesPlayed: parseInt(formData.gamesPlayed) || 0,
      wins: parseInt(formData.wins) || 0,
      losses: parseInt(formData.losses) || 0,
      totalLossAmount: parseFloat(formData.totalLossAmount) || 0,
      startBalance: parseFloat(formData.startBalance) || 0,
      betHistory: parseBetHistory(formData.betHistory),
    };

    const analysis = analyzeGameSession(sessionData);
    setCurrentAnalysis({ ...analysis, sessionData });

    // Add to session history for display
    const sessionEntry = {
      result: sessionData.wins > sessionData.losses ? 'win' : 'loss',
      amount: sessionData.totalLossAmount,
      timestamp: new Date().toISOString(),
      aiVerdict: analysis.verdict,
      ...sessionData,
    };

    setSessionHistory(prev => [...prev, sessionEntry]);
  };

  const handleLogToChain = () => {
    if (!currentAnalysis) return;
    
    const sessionDataWithVerdict = {
      ...currentAnalysis.sessionData,
      verdict: currentAnalysis.verdict,
      severity: currentAnalysis.severity,
      winRate: currentAnalysis.winRate,
    };

    logSessionToChain(sessionDataWithVerdict);
    alert('✅ Session logged to blockchain! Check console for details.');
  };

  const handleReset = () => {
    setFormData({
      sessionId: `session-${Date.now()}`,
      startBalance: '',
      gamesPlayed: '',
      wins: '',
      losses: '',
      totalLossAmount: '',
      betHistory: '',
    });
    setCurrentAnalysis(null);
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return 'text-red-500 border-red-500';
      case 'medium': return 'text-yellow-500 border-yellow-500';
      case 'low': return 'text-green-500 border-green-500';
      default: return 'text-gray-500 border-gray-500';
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-red-500 mb-2">
            🕹️ PlayProof X
          </h1>
          <p className="text-gray-400 text-lg">
            Analyze your gambling sessions for fairness and risk
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left: Input Form */}
          <div className="space-y-6">
            <div className="bg-black border border-red-900 rounded-2xl p-6 shadow-xl">
              <h2 className="text-2xl font-bold text-red-500 mb-4">
                📊 Enter Session Data
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-400 text-sm mb-1">
                    Session ID
                  </label>
                  <input
                    type="text"
                    name="sessionId"
                    value={formData.sessionId}
                    onChange={handleInputChange}
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-red-500 focus:outline-none"
                    placeholder="session-123"
                  />
                </div>

                <div>
                  <label className="block text-gray-400 text-sm mb-1">
                    Starting Balance ($)
                  </label>
                  <input
                    type="number"
                    name="startBalance"
                    value={formData.startBalance}
                    onChange={handleInputChange}
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-red-500 focus:outline-none"
                    placeholder="100"
                  />
                </div>

                <div>
                  <label className="block text-gray-400 text-sm mb-1">
                    Total Games Played
                  </label>
                  <input
                    type="number"
                    name="gamesPlayed"
                    value={formData.gamesPlayed}
                    onChange={handleInputChange}
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-red-500 focus:outline-none"
                    placeholder="10"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-400 text-sm mb-1">
                      Wins
                    </label>
                    <input
                      type="number"
                      name="wins"
                      value={formData.wins}
                      onChange={handleInputChange}
                      className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-red-500 focus:outline-none"
                      placeholder="3"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm mb-1">
                      Losses
                    </label>
                    <input
                      type="number"
                      name="losses"
                      value={formData.losses}
                      onChange={handleInputChange}
                      className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-red-500 focus:outline-none"
                      placeholder="7"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-400 text-sm mb-1">
                    Total Loss Amount ($)
                  </label>
                  <input
                    type="number"
                    name="totalLossAmount"
                    value={formData.totalLossAmount}
                    onChange={handleInputChange}
                    step="0.01"
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-red-500 focus:outline-none"
                    placeholder="50.00"
                  />
                </div>

                <div>
                  <label className="block text-gray-400 text-sm mb-1">
                    Bet History (optional)
                    <span className="text-xs text-gray-500 ml-2">
                      Format: &quot;win,loss,loss&quot; or JSON array
                    </span>
                  </label>
                  <textarea
                    name="betHistory"
                    value={formData.betHistory}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-red-500 focus:outline-none"
                    placeholder='[&quot;win&quot;, &quot;loss&quot;, &quot;loss&quot;] or win,loss,loss'
                  />
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={handleAnalyze}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
                  >
                    🔍 Analyze Session
                  </button>
                  <button
                    onClick={handleReset}
                    className="px-4 bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-lg transition-colors"
                  >
                    🔄 Reset
                  </button>
                </div>
              </div>
            </div>

            {/* Analysis Results */}
            {currentAnalysis && (
              <div className={`bg-black border-2 ${getSeverityColor(currentAnalysis.severity)} rounded-2xl p-6 shadow-xl`}>
                <h2 className="text-2xl font-bold mb-4">📋 Analysis Results</h2>
                
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Win Rate:</span>
                    <span className="font-bold">{currentAnalysis.winRate}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Loss Streak:</span>
                    <span className="font-bold">{currentAnalysis.lossStreak ? 'Yes' : 'No'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Severity:</span>
                    <span className={`font-bold uppercase ${getSeverityColor(currentAnalysis.severity).split(' ')[0]}`}>
                      {currentAnalysis.severity}
                    </span>
                  </div>
                </div>

                <div className="bg-gray-900 rounded-lg p-4 mb-4">
                  <p className="text-white font-semibold">{currentAnalysis.verdict}</p>
                </div>

                <button
                  onClick={handleLogToChain}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
                >
                  🔗 Log to Blockchain
                </button>
              </div>
            )}
          </div>

          {/* Right: Stats Dashboard */}
          <div>
            <StatsCard sessionHistory={sessionHistory} />
            
            {/* Blockchain Viewer */}
            <div className="mt-6">
              <BlockchainViewer />
            </div>

            {/* Quick Examples */}
            <div className="mt-6 bg-black border border-red-900 rounded-2xl p-6 shadow-xl">
              <h3 className="text-xl font-bold text-red-500 mb-4">💡 Quick Examples</h3>
              <div className="space-y-3 text-sm text-gray-400">
                <div>
                  <strong className="text-white">Suspicious Session:</strong>
                  <p>Games: 10, Wins: 2, Losses: 8, Start: $100, Lost: $50</p>
                  <p className="text-yellow-500">→ Will flag as &quot;possibly unfair&quot;</p>
                </div>
                <div>
                  <strong className="text-white">Dangerous Session:</strong>
                  <p>Games: 5, Wins: 1, Losses: 4, Start: $100, Lost: $350</p>
                  <p className="text-red-500">→ Will flag as &quot;dangerous gambling behavior&quot;</p>
                </div>
                <div>
                  <strong className="text-white">Fair Session:</strong>
                  <p>Games: 10, Wins: 5, Losses: 5, Start: $100, Lost: $20</p>
                  <p className="text-green-500">→ Will show as &quot;appears fair&quot;</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;
