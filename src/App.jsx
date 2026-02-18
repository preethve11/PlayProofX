import React from 'react';
import StatsCard from './components/StatsCard.jsx';

/**
 * Root app component. Renders the PlayProof X stats dashboard.
 * sessionHistory can be wired to state/API later; for now we pass empty for a runnable UI.
 */
function App() {
  const sessionHistory = [];

  return (
    <main style={{ minHeight: '100vh', padding: '2rem', background: '#0a0a0a' }}>
      <StatsCard sessionHistory={sessionHistory} />
    </main>
  );
}

export default App;
