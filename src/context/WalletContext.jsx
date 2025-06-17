// src/context/WalletContext.jsx
import { createContext, useState, useEffect, useContext } from 'react';
import { ethers } from 'ethers';

// ERC20 ABI for DAI token
const ERC20_ABI = [
    "function name() view returns (string)",
    "function symbol() view returns (string)",
    "function decimals() view returns (uint8)",
    "function balanceOf(address) view returns (uint)"
];

// DAI token address on Ethereum mainnet
const DAI_ADDRESS = "0x6B175474E89094C44Da98b954EedeAC495271d0F";

const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
    const [account, setAccount] = useState(null);
    const [ethBalance, setEthBalance] = useState(null);
    const [daiBalance, setDaiBalance] = useState(null);
    const [ensName, setEnsName] = useState(null);
    const [isConnected, setIsConnected] = useState(false);
    const [provider, setProvider] = useState(null);
    const [hasMetaMask, setHasMetaMask] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    // Check if MetaMask is installed
    const checkIfWalletIsConnected = async () => {
        try {
            if (!window.ethereum) {
                console.log("Make sure you have MetaMask installed!");
                setHasMetaMask(false);
                return;
            }

            // Check if we're authorized to access the user's wallet
            const accounts = await window.ethereum.request({ method: "eth_accounts" });

            if (accounts.length !== 0) {
                const account = accounts[0];
                setAccount(account);
                setIsConnected(true);

                // Setup provider
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                setProvider(provider);

                // Get ETH balance
                await fetchEthBalance(account, provider);

                // Get DAI balance
                await fetchDaiBalance(account, provider);

                // Try to get ENS name
                await fetchEnsName(account);
            }
        } catch (error) {
            console.log(error);
            setError("Failed to connect to wallet");
        }
    };

    // Connect wallet
    const connectWallet = async () => {
        setIsLoading(true);
        setError(null);

        try {
            if (!window.ethereum) {
                setError("MetaMask is not installed");
                window.open('https://metamask.io/download/', '_blank');
                return;
            }

            // Request account access
            const accounts = await window.ethereum.request({
                method: "eth_requestAccounts",
            });

            const account = accounts[0];
            setAccount(account);
            setIsConnected(true);

            // Setup provider
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            setProvider(provider);

            // Get ETH balance
            await fetchEthBalance(account, provider);

            // Get DAI balance
            await fetchDaiBalance(account, provider);

            // Try to get ENS name
            await fetchEnsName(account);
        } catch (error) {
            console.log(error);
            setError("Failed to connect wallet");
        } finally {
            setIsLoading(false);
        }
    };

    // Fetch ETH balance
    const fetchEthBalance = async (account, provider) => {
        try {
            const balance = await provider.getBalance(account);
            setEthBalance(ethers.utils.formatEther(balance));
        } catch (error) {
            console.log("Error fetching ETH balance:", error);
        }
    };

    // Fetch DAI balance
    const fetchDaiBalance = async (account, provider) => {
        try {
            // Try to fetch DAI on any network
            if (provider) {
                try {
                    const daiContract = new ethers.Contract(DAI_ADDRESS, ERC20_ABI, provider);
                    const balance = await daiContract.balanceOf(account);
                    const decimals = await daiContract.decimals();
                    setDaiBalance(ethers.utils.formatUnits(balance, decimals));
                } catch (error) {
                    // If contract call fails, try with mainnet provider
                    console.log("Error fetching DAI balance on current network, trying mainnet:", error);
                    const mainnetProvider = new ethers.providers.JsonRpcProvider(
                        "https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161"
                    );
                    const daiContract = new ethers.Contract(DAI_ADDRESS, ERC20_ABI, mainnetProvider);
                    const balance = await daiContract.balanceOf(account);
                    const decimals = await daiContract.decimals();
                    setDaiBalance(ethers.utils.formatUnits(balance, decimals));
                }
            }
        } catch (error) {
            console.log("Error fetching DAI balance:", error);
            // Set a default value for DAI balance
            setDaiBalance("0");
        }
    };



    // Fetch ENS name using a dedicated mainnet provider
    const fetchEnsName = async (account) => {
        try {
            // Create a mainnet provider specifically for ENS lookups
            const mainnetProvider = new ethers.providers.JsonRpcProvider(
                "https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161" // Public Infura endpoint
            );

            // Try to get ENS name using mainnet provider
            const name = await mainnetProvider.lookupAddress(account);
            if (name) {
                console.log("Found ENS name:", name);
                setEnsName(name);
            }
        } catch (error) {
            console.log("Error fetching ENS name:", error);
        }
    };

    // Handle chain changes
    const handleChainChanged = async () => {
        if (provider && account) {
            await fetchEthBalance(account, provider);
            await fetchDaiBalance(account, provider);
        }
    };

    // Listen for account changes
    useEffect(() => {
        checkIfWalletIsConnected();

        if (window.ethereum) {
            window.ethereum.on("accountsChanged", (accounts) => {
                if (accounts.length > 0) {
                    setAccount(accounts[0]);
                    if (provider) {
                        fetchEthBalance(accounts[0], provider);
                        fetchDaiBalance(accounts[0], provider);
                        fetchEnsName(accounts[0]);
                    }
                } else {
                    setAccount(null);
                    setEthBalance(null);
                    setDaiBalance(null);
                    setEnsName(null);
                    setIsConnected(false);
                }
            });

            window.ethereum.on("chainChanged", handleChainChanged);
        } else {
            setHasMetaMask(false);
        }

        return () => {
            if (window.ethereum) {
                window.ethereum.removeAllListeners("accountsChanged");
                window.ethereum.removeAllListeners("chainChanged");
            }
        };
    }, []);

    return (
        <WalletContext.Provider
            value={{
                account,
                ethBalance,
                daiBalance,
                ensName,
                isConnected,
                hasMetaMask,
                isLoading,
                error,
                connectWallet,
            }}
        >
            {children}
        </WalletContext.Provider>
    );
};

export const useWallet = () => useContext(WalletContext);
