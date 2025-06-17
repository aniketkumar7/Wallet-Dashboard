// src/components/BalanceDisplay.jsx
import { useWallet } from '../context/WalletContext';

const BalanceDisplay = () => {
    const { ethBalance, isConnected } = useWallet();

    if (!isConnected) {
        return null;
    }

    // Format balance safely
    const formattedBalance = ethBalance && !isNaN(parseFloat(ethBalance))
        ? parseFloat(ethBalance).toFixed(4)
        : "0.0000";

    return (
        <div className="balance-card">
            <h2 className="card-title">ETH Balance</h2>

            <div className="info-row">
                <span className="info-label">Balance:</span>
                <div>
                    <span className="balance-amount">{formattedBalance}</span>
                    <span className="balance-currency">ETH</span>
                </div>
            </div>
        </div>
    );
};

export default BalanceDisplay;
