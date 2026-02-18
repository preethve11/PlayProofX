import React, { useState, useEffect } from 'react';
import { getChain } from '../blockchain/log.js';

/**
 * Component to display the blockchain log
 */
const BlockchainViewer = () => {
  const [chain, setChain] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const refreshChain = () => {
    setChain([...getChain()]);
  };

  useEffect(() => {
    refreshChain();
    const interval = setInterval(refreshChain, 2000); // Refresh every 2 seconds
    return () => clearInterval(interval);
  }, []);

  const getSeverityColor = (severity) => {
    if (!severity) return 'text-gray-500';
    const severityLower = severity.toLowerCase();
    if (severityLower.includes('high') || severityLower.includes('dangerous') || severityLower.includes('manipulation')) {
      return 'text-red-500';
    }
    if (severityLower.includes('medium') || severityLower.includes('unfair') || severityLower.includes('cautious')) {
      return 'text-yellow-500';
    }
    return 'text-green-500';
  };

  return (
    <div className="bg-black border border-blue-900 rounded-2xl p-6 shadow-xl">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-blue-500">
          🔗 Blockchain Log
        </h2>
        <div className="flex gap-2">
          <button
            onClick={refreshChain}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm transition-colors"
          >
            🔄 Refresh
          </button>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg text-sm transition-colors"
          >
            {isOpen ? '▼' : '▶'}
          </button>
        </div>
      </div>

      <div className="text-gray-400 text-sm mb-4">
        Total Blocks: <span className="text-white font-bold">{chain.length}</span>
      </div>

      {isOpen && (
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {chain.length === 0 ? (
            <p className="text-gray-500 text-center py-8">
              No sessions logged yet. Analyze a session and click &quot;Log to Blockchain&quot; to add blocks.
            </p>
          ) : (
            chain.slice().reverse().map((block, index) => (
              <div
                key={block.id}
                className="bg-gray-900 border border-gray-700 rounded-lg p-4"
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <div className="text-xs text-gray-500">Block #{chain.length - index}</div>
                    <div className="text-xs text-gray-500 font-mono">
                      Hash: {block.sessionHash.slice(0, 20)}...
                    </div>
                  </div>
                  <div className="text-xs text-gray-500">
                    {new Date(block.timestamp).toLocaleString()}
                  </div>
                </div>
                
                <div className="mt-2 space-y-1">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Session ID:</span>
                    <span className="text-white font-mono text-sm">
                      {block.gameData?.sessionId || 'N/A'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Games:</span>
                    <span className="text-white">
                      {block.gameData?.gamesPlayed || 0}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Win Rate:</span>
                    <span className="text-white">
                      {block.gameData?.winRate?.toFixed(1) || 'N/A'}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Verdict:</span>
                    <span className={`font-semibold ${getSeverityColor(block.verdict)}`}>
                      {block.verdict}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default BlockchainViewer;
