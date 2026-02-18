import { describe, it, expect, beforeEach } from 'vitest';
import { logSessionToChain, getChain } from './log.js';

describe('blockchain log', () => {
  beforeEach(() => {
    getChain().length = 0;
  });

  it('getChain returns an array', () => {
    expect(Array.isArray(getChain())).toBe(true);
  });

  it('logSessionToChain adds a block with sessionHash, verdict, gameData', () => {
    const sessionData = {
      sessionId: 'test-123',
      verdict: 'High Risk',
      gamesPlayed: 5,
    };
    logSessionToChain(sessionData);
    const chain = getChain();
    expect(chain.length).toBe(1);
    const block = chain[0];
    expect(block).toHaveProperty('sessionHash');
    expect(block.sessionHash).toMatch(/^0x[0-9a-f]{64}$/i);
    expect(block).toHaveProperty('verdict', 'High Risk');
    expect(block).toHaveProperty('gameData', sessionData);
    expect(block).toHaveProperty('timestamp');
    expect(block).toHaveProperty('id');
  });

  it('multiple logs append to chain', () => {
    logSessionToChain({ sessionId: 'a', verdict: 'Low' });
    logSessionToChain({ sessionId: 'b', verdict: 'Medium' });
    const chain = getChain();
    expect(chain.length).toBe(2);
    expect(chain[0].gameData.sessionId).toBe('a');
    expect(chain[1].gameData.sessionId).toBe('b');
  });
});
