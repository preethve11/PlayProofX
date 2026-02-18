# 🚀 Quick Setup Guide for PlayProof X

This guide will help you get PlayProof X running quickly after cloning the repository.

## ⚡ Quick Start (3 Steps)

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

### 3. Open in Browser
Navigate to: **http://localhost:5173/**

That's it! The app should be running.

---

## 📋 Detailed Setup

### Prerequisites Check

Before starting, verify you have:

```bash
node --version   # Should be 18.0.0 or higher
npm --version    # Should be 9.0.0 or higher
```

### Installation Steps

1. **Clone the repository** (if you haven't already):
   ```bash
   git clone https://github.com/preethve11/PlayProofX.git
   cd PlayProofX
   ```

2. **Install all dependencies**:
   ```bash
   npm install
   ```
   
   This installs:
   - React and React DOM
   - Vite (build tool)
   - Chart.js (for charts)
   - Tailwind CSS (for styling)
   - crypto-js (for blockchain hashing)
   - All other required packages

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser**:
   - Look for the message: `Local: http://localhost:5173/`
   - Click the link or copy-paste into your browser

---

## 🐛 Troubleshooting

### Issue: Port 5173 Already in Use

**Solution**: Use a different port
```bash
npm run dev -- --port 3000
```

### Issue: Module Not Found Errors

**Solution**: Clean install
```bash
rm -rf node_modules package-lock.json
npm install
```

### Issue: Windows Permission Error (EPERM)

**Solution**: 
1. Add project folder to Windows Defender exclusions
2. Or run PowerShell as Administrator

### Issue: Styles Not Loading

**Solution**: 
1. Ensure `src/index.css` exists with Tailwind directives
2. Restart the dev server

---

## ✅ Verification

After installation, verify everything works:

1. **Check dependencies**:
   ```bash
   npm list --depth=0
   ```

2. **Run tests** (optional):
   ```bash
   npm test
   ```

3. **Check linting** (optional):
   ```bash
   npm run lint
   ```

---

## 🎯 Next Steps

Once running:

1. **Try analyzing a session**:
   - Enter sample data in the form
   - Click "Analyze Session"
   - Review the AI verdict

2. **Log to blockchain**:
   - After analysis, click "Log to Blockchain"
   - View logged sessions in the Blockchain Viewer

3. **Explore the code**:
   - Check `src/App.jsx` for main logic
   - See `src/ai/riskAnalyzer.js` for analysis rules
   - Review `src/blockchain/log.js` for blockchain logic

---

## 📚 More Information

For detailed documentation, see [README.md](./README.md)

---

**Need Help?** Open an issue on [GitHub](https://github.com/preethve11/PlayProofX/issues)
