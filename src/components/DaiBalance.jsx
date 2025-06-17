// src/components/DaiBalance.jsx
import { useWallet } from '../context/WalletContext';

const DaiBalance = () => {
    const { daiBalance, isConnected } = useWallet();

    if (!isConnected) {
        return null;
    }

    // Format balance safely
    const formattedBalance = daiBalance && !isNaN(parseFloat(daiBalance))
        ? parseFloat(daiBalance).toFixed(2)
        : "0.00";

    return (
        <div className="balance-card">
            <h2 className="card-title">DAI Balance</h2>

            <div className="info-row">
                <span className="info-label">Balance:</span>
                <div>
                    <span className="balance-amount">{formattedBalance}</span>
                    <span className="balance-currency">DAI</span>
                </div>
            </div>
        </div>
    );
};

export default DaiBalance;
