import { useState, useEffect } from "react";
import "../styles/ConnectWallet.css";

const ConnectWallet = () => {
  const [account, setAccount] = useState(null);
  const [isMetaMaskInstalled, setIsMetaMaskInstalled] = useState(false);

  useEffect(() => {
    if (window.ethereum) {
      setIsMetaMaskInstalled(true);
      checkWalletConnection();
    }
  }, []);

  const checkWalletConnection = async () => {
    try {
      const accounts = await window.ethereum.request({ method: "eth_accounts" });
      if (accounts.length > 0) {
        setAccount(accounts[0]);
      }
    } catch (error) {
      console.error("Error checking wallet connection:", error);
    }
  };

  const connectWallet = async () => {
    if (!window.ethereum) return;
    
    try {
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      setAccount(accounts[0]);
    } catch (error) {
      console.error("Error connecting wallet:", error);
    }
  };

  return (
    <div className="connect-wallet-container">
      {isMetaMaskInstalled ? (
        account ? (
          <p className="wallet-connected">
            ✅ Connected: {account.substring(0, 6)}...{account.slice(-4)}
          </p>
        ) : (
          <button onClick={connectWallet} className="connect-wallet-button">
            Connect Wallet
          </button>
        )
      ) : (
        <p className="install-metamask-message">
          🚨 MetaMask is not installed. Please install it from{" "}
          <a href="https://metamask.io/" target="_blank" rel="noopener noreferrer">
            here
          </a>.
        </p>
      )}
    </div>
  );
};

export default ConnectWallet;
