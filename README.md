# 🧩 Wallet Dashboard

A React-based dashboard that connects to MetaMask and displays wallet information including ETH balance and DAI token balance.

## ✨ Features

- 🦊 **Connect to MetaMask** wallet with a single click
- 💰 **View ETH Balance** from your connected wallet
- 🔄 **View DAI Token Balance** (fetched from Ethereum mainnet)
- 📛 **Display ENS Name** if available for your address
- 🌓 **Dark/Light Mode Toggle** for comfortable viewing
- 📱 **Responsive Design** that works on all devices

## 🛠️ Tech Stack

- ⚛️ **React** with functional components and hooks
- 🔗 **ethers.js** for Ethereum interactions
- 🌐 **Context API** for state management
- 🎨 **CSS** for styling

## 🚀 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/wallet-dashboard.git
   cd wallet-dashboard
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## 📖 Usage

1. **Install MetaMask**: Make sure you have the [MetaMask extension](https://metamask.io/download/) installed in your browser.

2. **Connect Wallet**: Click the "Connect Wallet" button to connect your MetaMask wallet.

3. **View Balances**: Once connected, you'll see your:
   - Wallet address (or ENS name if available)
   - ETH balance
   - DAI token balance

4. **Toggle Theme**: Use the light/dark mode toggle in the header to switch between themes.

## 🔍 Implementation Details

- Uses ethers.js to connect to MetaMask and fetch wallet data
- Fetches DAI token balance using the ERC-20 contract interface
- Uses a dedicated mainnet provider to resolve ENS names regardless of connected network
- Implements a dark/light mode toggle using React Context
- Provides user feedback for connection issues and missing MetaMask

## 📁 Project Structure

```
wallet-dashboard/
├── src/
│   ├── components/
│   │   ├── BalanceDisplay.jsx    # ETH balance display component
│   │   ├── DaiBalance.jsx        # DAI balance display component
│   │   └── WalletConnect.jsx     # Wallet connection component
│   ├── context/
│   │   ├── ThemeContext.jsx      # Theme management context
│   │   └── WalletContext.jsx     # Wallet connection and data context
│   ├── App.css                   # Main application styles
│   ├── App.jsx                   # Main application component
│   └── main.jsx                  # Entry point
└── index.html
```

## 📜 License

MIT

---

<div align="center">
  <p>Made with ❤️ by <a href="https://github.com/yourusername">Aniket Kumar</a></p>
</div>
