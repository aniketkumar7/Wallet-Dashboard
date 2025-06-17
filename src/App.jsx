import { useTheme } from './context/ThemeContext';
import WalletConnect from './components/WalletConnect';
import BalanceDisplay from './components/BalanceDisplay';
import DaiBalance from './components/DaiBalance';
import './App.css';

function App() {
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <div className={`app-container ${darkMode ? 'dark-mode' : 'light-mode'}`}>
      <div className="container">
        <header className="header">
          <h1 className="title">Wallet Dashboard</h1>
          <button
            onClick={toggleDarkMode}
            className={`theme-toggle ${darkMode ? 'dark' : 'light'}`}
          >
            {darkMode ? '🌙 Dark' : '☀️ Light'}
          </button>
        </header>

        <main className="main-content">
          <WalletConnect />
          <BalanceDisplay />
          <DaiBalance />
        </main>

        <footer className="footer">
          <p>Wallet Dashboard - Built with React, Vite, and ethers.js</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
