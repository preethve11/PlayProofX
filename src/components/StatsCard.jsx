// src/components/StatsCard.jsx

import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

/**
 * StatsCard
 * ----------
 * Displays a user's betting stats in a dark Sith-themed dashboard card.
 *
 * @param {Array} sessionHistory - Array of session objects with result, amount, timestamp, aiVerdict
 */
const StatsCard = ({ sessionHistory }) => {
  if (!sessionHistory || sessionHistory.length === 0) {
    return (
      <div className="bg-black text-red-500 p-6 rounded-2xl shadow-lg">
        <h2 className="text-xl font-bold text-center">🕹️ PlayProof X</h2>
        <p className="text-center mt-4">No games played yet</p>
      </div>
    );
  }

  const totalGames = sessionHistory.length;
  const wins = sessionHistory.filter(s => s.result === 'win').length;
  const losses = totalGames - wins;
  const winRate = ((wins / totalGames) * 100).toFixed(1);

  // Calculate current loss streak
  let lossStreak = 0;
  for (let i = sessionHistory.length - 1; i >= 0; i--) {
    if (sessionHistory[i].result === 'loss') {
      lossStreak++;
    } else {
      break;
    }
  }

  const mostRecentVerdict = sessionHistory
    .slice()
    .reverse()
    .find(s => s.aiVerdict)?.aiVerdict || 'N/A';

  const chartData = {
    labels: ['Wins', 'Losses'],
    datasets: [
      {
        label: 'Games',
        data: [wins, losses],
        backgroundColor: ['#ff1a1a', '#660000'],
        borderRadius: 8,
      },
    ],
  };

  const chartOptions = {
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: '#ff4d4d',
        },
        grid: {
          color: '#222',
        },
      },
      x: {
        ticks: {
          color: '#ff4d4d',
        },
        grid: {
          color: '#222',
        },
      },
    },
  };

  return (
    <div className="bg-black text-red-400 p-6 rounded-2xl shadow-xl max-w-md w-full mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center text-red-500">
        🧠 PlayProof X – Stats
      </h2>
      <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
        <div>
          <p className="text-gray-400">Total Games</p>
          <p className="text-lg font-semibold">{totalGames}</p>
        </div>
        <div>
          <p className="text-gray-400">Wins</p>
          <p className="text-lg font-semibold">{wins}</p>
        </div>
        <div>
          <p className="text-gray-400">Losses</p>
          <p className="text-lg font-semibold">{losses}</p>
        </div>
        <div>
          <p className="text-gray-400">Win Rate</p>
          <p className="text-lg font-semibold">{winRate}%</p>
        </div>
        <div>
          <p className="text-gray-400">Loss Streak</p>
          <p className="text-lg font-semibold">{lossStreak}</p>
        </div>
        <div>
          <p className="text-gray-400">AI Verdict</p>
          <p className="text-lg font-semibold">{mostRecentVerdict}</p>
        </div>
      </div>

      <div className="bg-gray-900 p-4 rounded-xl">
        <Bar data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default StatsCard;
