import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export const NFTContext = React.createContext();

export const NFTProvider = ({ children }) => {
  const [connectedAccount, setConnectedAccount] = useState(null);

  // Check for previously connected wallet silently (no popup)
  const checkIfWalletIsConnected = async () => {
    if (!window.ethereum) {
      toast.error("Please install MetaMask");
      return;
    }
    try {
      const accounts = await window.ethereum.request({ method: 'eth_accounts' });
      if (accounts.length > 0) {
        setConnectedAccount(accounts[0]);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to check wallet connection");
    }
  };

  // Trigger MetaMask popup on user action
  const connectWallet = async () => {
    if (!window.ethereum) {
      toast.error("Please install MetaMask");
      return;
    }
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      if (accounts.length > 0) {
        setConnectedAccount(accounts[0]);
        toast.success("Wallet connected!");
      }
    } catch (err) {
      console.error(err);
      toast.error("Connection failed or denied");
    }
  };

  // Manual disconnect (only clears local state)
  const disconnectWallet = () => {
    setConnectedAccount(null);
  };

  useEffect(() => {
    checkIfWalletIsConnected();

    // Optional: Listen to account change and update state
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length > 0) {
          setConnectedAccount(accounts[0]);
        } else {
          setConnectedAccount(null);
        }
      });
    }

    // Cleanup listeners
    return () => {
      if (window.ethereum?.removeListener) {
        window.ethereum.removeListener("accountsChanged", () => {});
      }
    };
  }, []);

  return (
    <NFTContext.Provider value={{ connectWallet, connectedAccount, disconnectWallet }}>
      {children}
    </NFTContext.Provider>
  );
};
