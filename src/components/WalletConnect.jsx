// src/components/WalletConnect.jsx
import { useWallet } from '../context/WalletContext';

const WalletConnect = () => {
    const {
        account,
        ensName,
        isConnected,
        connectWallet,
        hasMetaMask,
        isLoading,
        error
    } = useWallet();

    // Format address for display
    const formatAddress = (address) => {
        return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
    };

    return (
        <div className="wallet-card">
            <h2 className="card-title">Wallet Connection</h2>

            {!isConnected ? (
                <div>
                    <button
                        onClick={connectWallet}
                        className="connect-button"
                        disabled={isLoading}
                    >
                        {isLoading && <span className="loading-spinner"></span>}
                        {isLoading ? "Connecting..." : hasMetaMask ? "Connect Wallet" : "Install MetaMask"}
                    </button>
                    {!hasMetaMask && (
                        <p className="error-message">
                            MetaMask is not installed. Clicking the button will redirect you to the MetaMask website.
                        </p>
                    )}
                    {error && <p className="error-message">{error}</p>}
                </div>
            ) : (
                <div>
                    <div className="info-row">
                        <span className="info-label">Address:</span>
                        <span className="address-display">
                            {ensName ? `${ensName} (${formatAddress(account)})` : formatAddress(account)}
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default WalletConnect;
