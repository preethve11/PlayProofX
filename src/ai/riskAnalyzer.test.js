import { describe, it, expect } from 'vitest';
import { analyzeSession } from './riskAnalyzer.js';

const safeDefault = {
  winRate: 0,
  lossStreak: false,
  verdict: 'Session appears fair',
  severity: 'low',
};

describe('analyzeSession', () => {
  it('returns safe default when session is null', () => {
    expect(analyzeSession(null)).toEqual(safeDefault);
  });

  it('returns safe default when session is undefined', () => {
    expect(analyzeSession(undefined)).toEqual(safeDefault);
  });

  it('returns safe default when session is not an object', () => {
    expect(analyzeSession(42)).toEqual(safeDefault);
    expect(analyzeSession('session')).toEqual(safeDefault);
  });

  it('returns fair verdict and zero win rate when no games played', () => {
    const result = analyzeSession({
      gamesPlayed: 0,
      wins: 0,
      losses: 0,
      totalLossAmount: 0,
      startBalance: 100,
      betHistory: [],
    });
    expect(result.winRate).toBe(0);
    expect(result.verdict).toBe('Session appears fair');
    expect(result.severity).toBe('low');
    expect(result.lossStreak).toBe(false);
  });

  it('flags unfair win rate when 10+ games and win rate below 30%', () => {
    const result = analyzeSession({
      gamesPlayed: 10,
      wins: 2,
      losses: 8,
      totalLossAmount: 20,
      startBalance: 100,
      betHistory: [],
    });
    expect(result.winRate).toBe(20);
    expect(result.verdict).toBe('Session seems possibly unfair (very low win rate)');
    expect(result.severity).toBe('medium');
  });

  it('flags dangerous loss when losses exceed 3× start balance', () => {
    const result = analyzeSession({
      gamesPlayed: 5,
      wins: 3,
      losses: 2,
      totalLossAmount: 400,
      startBalance: 100,
      betHistory: [],
    });
    expect(result.verdict).toBe('Session indicates dangerous gambling behavior');
    expect(result.severity).toBe('high');
  });

  it('flags both manipulation and financial risk when dangerous loss and unfair win rate', () => {
    const result = analyzeSession({
      gamesPlayed: 10,
      wins: 1,
      losses: 9,
      totalLossAmount: 400,
      startBalance: 100,
      betHistory: [],
    });
    expect(result.verdict).toBe('Session shows signs of possible manipulation and financial risk');
    expect(result.severity).toBe('high');
  });

  it('flags loss streak when last 3 bets are all losses', () => {
    const result = analyzeSession({
      gamesPlayed: 5,
      wins: 2,
      losses: 3,
      totalLossAmount: 50,
      startBalance: 100,
      betHistory: [
        { result: 'win' },
        { result: 'loss' },
        { result: 'loss' },
        { result: 'loss' },
      ],
    });
    expect(result.lossStreak).toBe(true);
    expect(result.verdict).toBe('Loss streak detected – be cautious');
    expect(result.severity).toBe('medium');
  });

  it('returns fair verdict for healthy session', () => {
    const result = analyzeSession({
      gamesPlayed: 10,
      wins: 5,
      losses: 5,
      totalLossAmount: 50,
      startBalance: 100,
      betHistory: [],
    });
    expect(result.winRate).toBe(50);
    expect(result.verdict).toBe('Session appears fair');
    expect(result.severity).toBe('low');
    expect(result.lossStreak).toBe(false);
  });

  it('treats missing betHistory as empty array', () => {
    const result = analyzeSession({
      gamesPlayed: 2,
      wins: 1,
      losses: 1,
      totalLossAmount: 0,
      startBalance: 100,
    });
    expect(result.lossStreak).toBe(false);
    expect(result.verdict).toBe('Session appears fair');
  });

  it('treats non-array betHistory as empty', () => {
    const result = analyzeSession({
      gamesPlayed: 2,
      wins: 1,
      losses: 1,
      totalLossAmount: 0,
      startBalance: 100,
      betHistory: 'not an array',
    });
    expect(result.lossStreak).toBe(false);
  });

  it('does not treat dangerous loss when start balance is zero', () => {
    const result = analyzeSession({
      gamesPlayed: 10,
      wins: 2,
      losses: 8,
      totalLossAmount: 1000,
      startBalance: 0,
      betHistory: [],
    });
    expect(result.verdict).toBe('Session seems possibly unfair (very low win rate)');
    expect(result.severity).toBe('medium');
  });
});
