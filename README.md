# PlayProofX

PlayProofX is a small prototype that:

- **Analyzes** a gambling session for basic risk/fairness signals (rule-based).
- **Logs** the session to an in-memory “blockchain-like” chain (hash + timestamp).
- **Displays** simple stats in a React UI (Chart.js).

## Requirements

- **Node.js**: 18+ recommended
- **npm**: comes with Node

## Quick start

```bash
npm install
npm run dev
```

Then open the local URL printed by Vite.

## Scripts

- **dev**: `npm run dev` — start Vite dev server
- **build**: `npm run build` — build production assets to `dist/`
- **preview**: `npm run preview` — serve the production build locally
- **test**: `npm test` — run unit tests (Vitest)
- **lint**: `npm run lint` — run ESLint on `src/`

## Project layout

- **UI**
  - `src/App.jsx`: root component (currently renders `StatsCard` with empty `sessionHistory`)
  - `src/components/StatsCard.jsx`: stats card + bar chart (wins vs losses)
  - `src/main.jsx`: React entry point (mounts `App` into `index.html`)
- **Analysis**
  - `src/ai/riskAnalyzer.js`: `analyzeSession(session)` → `{ winRate, lossStreak, verdict, severity }`
  - `src/services/verdictAPI.js`: `analyzeGameSession(sessionData)` wrapper around the analyzer
- **Logging (mock chain)**
  - `src/blockchain/log.js`: `logSessionToChain(sessionData)` and `getChain()`
- **Tests**
  - `src/**/*.test.js`: unit tests (Vitest)

## Notes

- The “blockchain” is currently **in-memory only**; `getChain()` returns the process-local array.
- Hashing uses **`crypto-js` SHA256** to be portable across Node and browsers.
