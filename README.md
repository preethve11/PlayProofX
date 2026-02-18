# 🕹️ PlayProof X

**PlayProof X** is a web application that analyzes gambling sessions for fairness and risk assessment. It provides AI-powered verdicts on gaming sessions, tracks statistics, and logs sessions to an in-memory blockchain-like ledger for transparency and auditability.

---

## 📋 Table of Contents

- [What is PlayProof X?](#what-is-playproof-x)
- [Why Was It Created?](#why-was-it-created)
- [Who Is It For?](#who-is-it-for)
- [How It Works](#how-it-works)
- [Features](#features)
- [Installation Guide](#installation-guide)
- [How to Run](#how-to-run)
- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)
- [Usage Guide](#usage-guide)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)

---

## 🎯 What is PlayProof X?

PlayProof X is a **gambling session analysis tool** that helps users:

- **Analyze** their gaming sessions for fairness indicators
- **Detect** suspicious patterns or unfair gameplay
- **Track** statistics and win/loss rates
- **Log** sessions to an immutable blockchain-like ledger
- **Visualize** data with interactive charts and dashboards

The application uses rule-based AI analysis to evaluate gaming sessions and provide risk assessments based on win rates, loss streaks, and financial patterns.

---

## 🤔 Why Was It Created?

PlayProof X was created to address several concerns in online gambling:

1. **Transparency**: Many users question the fairness of online gaming platforms
2. **Accountability**: There's a need for immutable logging of gaming sessions
3. **Risk Awareness**: Users need tools to identify dangerous gambling patterns
4. **Self-Monitoring**: Help users track their own gaming behavior and make informed decisions

The project demonstrates how blockchain-like technology can be used for gaming session transparency and how AI can analyze patterns to detect potential issues.

---

## 👥 Who Is It For?

PlayProof X is designed for:

- **Gamblers** who want to analyze their gaming sessions for fairness
- **Researchers** studying gambling patterns and fairness algorithms
- **Developers** interested in blockchain logging and AI-based analysis
- **Advocates** promoting responsible gambling and transparency
- **Casino operators** who want to demonstrate fairness to their users

---

## ⚙️ How It Works

### Architecture Overview

PlayProof X follows a **React-based frontend architecture** with modular components:

```
┌─────────────────────────────────────────────────┐
│           User Interface (React)               │
│  ┌──────────────┐  ┌──────────────────────┐   │
│  │  Input Form  │  │  Stats Dashboard     │   │
│  └──────┬───────┘  └──────────┬───────────┘   │
│         │                     │                │
│         ▼                     ▼                │
│  ┌──────────────────────────────────────┐     │
│  │      Analysis Engine (AI)            │     │
│  │  - Win Rate Calculation              │     │
│  │  - Loss Streak Detection            │     │
│  │  - Risk Assessment                  │     │
│  └──────────────┬───────────────────────┘     │
│                 │                              │
│                 ▼                              │
│  ┌──────────────────────────────────────┐     │
│  │   Blockchain Logger (In-Memory)     │     │
│  │  - Hash Generation (SHA256)         │     │
│  │  - Timestamp Logging                │     │
│  │  - Immutable Chain Storage          │     │
│  └──────────────────────────────────────┘     │
└─────────────────────────────────────────────────┘
```

### Component Flow

1. **User Input**: User enters session data (games played, wins, losses, amounts)
2. **Analysis**: Data is processed by the risk analyzer which applies fairness rules
3. **Verdict**: AI provides a verdict (fair/unfair/dangerous) with severity level
4. **Visualization**: Stats are displayed in charts and dashboards
5. **Blockchain Logging**: Session is logged to an in-memory blockchain with hash
6. **Viewing**: Users can view the blockchain log to see all logged sessions

### Analysis Rules

The AI analyzer uses the following rules:

1. **Unfair Win Rate**: If win rate < 30% over 10+ games → "Possibly unfair"
2. **Dangerous Loss**: If losses exceed 3× starting balance → "Dangerous gambling behavior"
3. **Loss Streak**: If last 3 games were losses → "Be cautious"
4. **Combined Risk**: Multiple risk factors → "High severity" warning

### Blockchain Logging

- Each session is hashed using **SHA256** (via crypto-js)
- Hash includes: Session ID, timestamp, and random suffix
- Blocks are stored in an in-memory array (currently not persistent)
- Each block contains: ID, timestamp, hash, verdict, and full game data

---

## ✨ Features

- ✅ **Session Analysis**: Analyze gaming sessions for fairness and risk
- ✅ **AI-Powered Verdicts**: Get automated assessments of your gaming sessions
- ✅ **Statistics Dashboard**: View win rates, loss streaks, and game statistics
- ✅ **Interactive Charts**: Visualize wins vs losses with Chart.js
- ✅ **Blockchain Logging**: Log sessions to an immutable ledger
- ✅ **Blockchain Viewer**: View all logged sessions in a blockchain explorer
- ✅ **Real-time Updates**: Statistics update as you analyze more sessions
- ✅ **Responsive Design**: Works on desktop and mobile devices
- ✅ **Dark Theme**: Modern dark UI with red/blue accent colors

---

## 📦 Installation Guide

### Prerequisites

Before installing PlayProof X, ensure you have:

- **Node.js** version 18 or higher ([Download Node.js](https://nodejs.org/))
- **npm** (comes with Node.js) or **yarn**
- **Git** (for cloning the repository)

### Step-by-Step Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/preethve11/PlayProofX.git
   cd PlayProofX
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```
   
   This will install all required packages including:
   - React and React DOM
   - Vite (build tool)
   - Chart.js and react-chartjs-2
   - crypto-js (for hashing)
   - Tailwind CSS (for styling)
   - ESLint (for code quality)

3. **Verify Installation**
   ```bash
   npm list --depth=0
   ```
   
   You should see all dependencies listed without errors.

### Windows-Specific Notes

If you encounter permission errors (EPERM) on Windows:

1. **Add Windows Defender Exception**:
   - Open Windows Security
   - Go to Virus & threat protection → Manage settings
   - Under Exclusions, add: `C:\path\to\PlayProofX\node_modules\esbuild`

2. **Run as Administrator** (if needed):
   - Right-click PowerShell/Command Prompt
   - Select "Run as Administrator"
   - Navigate to project folder and run `npm install`

---

## 🚀 How to Run

### Development Mode

1. **Start the Development Server**
   ```bash
   npm run dev
   ```

2. **Open Your Browser**
   - The terminal will display: `Local: http://localhost:5173/`
   - Open this URL in your web browser
   - The app will automatically reload when you make changes

### Production Build

1. **Build for Production**
   ```bash
   npm run build
   ```
   
   This creates an optimized production build in the `dist/` folder.

2. **Preview Production Build**
   ```bash
   npm run preview
   ```
   
   This serves the production build locally for testing.

### Other Commands

- **Run Tests**: `npm test`
- **Lint Code**: `npm run lint`
- **Check Version**: `npm --version` and `node --version`

---

## 📁 Project Structure

```
PlayProofX/
├── src/
│   ├── components/
│   │   ├── StatsCard.jsx          # Statistics dashboard with charts
│   │   └── BlockchainViewer.jsx   # Blockchain log viewer
│   ├── ai/
│   │   ├── riskAnalyzer.js        # Core analysis logic
│   │   └── riskAnalyzer.test.js   # Unit tests
│   ├── services/
│   │   └── verdictAPI.js          # Analysis service wrapper
│   ├── blockchain/
│   │   ├── log.js                 # Blockchain logging functions
│   │   └── log.test.js            # Blockchain tests
│   ├── App.jsx                    # Main application component
│   ├── main.jsx                   # React entry point
│   └── index.css                  # Tailwind CSS imports
├── index.html                     # HTML template
├── package.json                   # Dependencies and scripts
├── vite.config.js                 # Vite configuration
├── tailwind.config.js             # Tailwind CSS configuration
├── postcss.config.js              # PostCSS configuration
├── eslint.config.js               # ESLint configuration
└── README.md                      # This file
```

### Key Files Explained

- **`src/App.jsx`**: Main component with form, analysis display, and session management
- **`src/ai/riskAnalyzer.js`**: Contains the fairness analysis rules and logic
- **`src/blockchain/log.js`**: Handles blockchain-like logging with SHA256 hashing
- **`src/components/StatsCard.jsx`**: Displays statistics and charts
- **`src/components/BlockchainViewer.jsx`**: Shows the blockchain log

---

## 🛠️ Technologies Used

### Frontend Framework
- **React 18.2.0**: UI library for building components
- **React DOM**: React rendering for web

### Build Tools
- **Vite 5.0.0**: Fast build tool and dev server
- **@vitejs/plugin-react**: React plugin for Vite

### Styling
- **Tailwind CSS 3.4.13**: Utility-first CSS framework
- **PostCSS**: CSS processing
- **Autoprefixer**: CSS vendor prefixing

### Data Visualization
- **Chart.js 4.5.0**: Charting library
- **react-chartjs-2 5.3.0**: React wrapper for Chart.js

### Cryptography
- **crypto-js 4.2.0**: SHA256 hashing for blockchain

### Development Tools
- **ESLint 9.0.0**: Code linting
- **Vitest 2.0.0**: Unit testing framework

---

## 📖 Usage Guide

### Analyzing a Session

1. **Enter Session Data**:
   - Session ID (auto-generated or custom)
   - Starting Balance ($)
   - Total Games Played
   - Number of Wins
   - Number of Losses
   - Total Loss Amount ($)
   - Bet History (optional): Format as `win,loss,loss` or JSON array

2. **Click "Analyze Session"**:
   - The AI will analyze your session
   - Results show: Win Rate, Loss Streak, Severity, and Verdict

3. **Review Analysis**:
   - **Low Severity (Green)**: Session appears fair
   - **Medium Severity (Yellow)**: Possible issues detected
   - **High Severity (Red)**: Dangerous patterns or unfair gameplay

4. **Log to Blockchain** (Optional):
   - Click "Log to Blockchain" to save the session
   - Session is hashed and added to the blockchain log
   - View logged sessions in the Blockchain Viewer

### Example Sessions

**Suspicious Session**:
- Games: 10, Wins: 2, Losses: 8
- Start: $100, Lost: $50
- **Result**: "Possibly unfair" (Medium severity)

**Dangerous Session**:
- Games: 5, Wins: 1, Losses: 4
- Start: $100, Lost: $350
- **Result**: "Dangerous gambling behavior" (High severity)

**Fair Session**:
- Games: 10, Wins: 5, Losses: 5
- Start: $100, Lost: $20
- **Result**: "Appears fair" (Low severity)

### Viewing Statistics

- The **Stats Dashboard** shows:
  - Total games played
  - Wins vs Losses
  - Win rate percentage
  - Current loss streak
  - Most recent AI verdict
  - Interactive bar chart

### Viewing Blockchain Log

- Click the **Blockchain Log** section
- Expand to view all logged sessions
- Each block shows:
  - Block number
  - Hash (first 20 characters)
  - Timestamp
  - Session ID
  - Games played
  - Win rate
  - Verdict

---

## 🔧 Troubleshooting

### Common Issues

#### 1. **Port Already in Use**
```
Error: Port 5173 is already in use
```
**Solution**: 
- Kill the process using port 5173: `npx kill-port 5173`
- Or use a different port: `npm run dev -- --port 3000`

#### 2. **Module Not Found**
```
Error: Cannot find module '...'
```
**Solution**:
```bash
rm -rf node_modules package-lock.json
npm install
```

#### 3. **Windows Permission Error (EPERM)**
```
Error: spawn EPERM
```
**Solution**:
- Add project folder to Windows Defender exclusions
- Run terminal as Administrator
- Check antivirus settings

#### 4. **Build Errors**
```
Error during build
```
**Solution**:
- Clear Vite cache: `rm -rf node_modules/.vite`
- Reinstall dependencies: `npm install`
- Check Node.js version: `node --version` (should be 18+)

#### 5. **Styles Not Loading**
```
Tailwind styles not applied
```
**Solution**:
- Ensure `src/index.css` contains Tailwind directives
- Check `tailwind.config.js` content paths
- Restart dev server

### Getting Help

- Check [GitHub Issues](https://github.com/preethve11/PlayProofX/issues)
- Review the code comments in source files
- Check Node.js and npm versions match requirements

---

## 🤝 Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Make your changes
4. Run tests: `npm test`
5. Run linter: `npm run lint`
6. Commit your changes: `git commit -m "Add your feature"`
7. Push to branch: `git push origin feature/your-feature`
8. Open a Pull Request

---

## 📝 License

This project is licensed under the ISC License.

---

## 🙏 Acknowledgments

- Built with React and Vite
- Styled with Tailwind CSS
- Charts powered by Chart.js
- Hashing via crypto-js

---

## 📞 Contact & Support

- **GitHub**: [preethve11/PlayProofX](https://github.com/preethve11/PlayProofX)
- **Issues**: [Report an Issue](https://github.com/preethve11/PlayProofX/issues)

---

**Made with ❤️ for transparency in gaming**
