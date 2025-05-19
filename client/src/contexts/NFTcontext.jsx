import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export const NFTContext = React.createContext();
const { ethereum } = window;

export const NFTProvider = ({ children }) => {
  const [connectedAccount, setConnectedAccount] = useState(null);

  const checkIfWalletIsConnected = async () => {
    if (!ethereum) {
      toast.error("Please install MetaMask");
      return;
    }
    try {
      const accounts = await ethereum.request({ method: 'eth_accounts' });
      if (accounts.length > 0) {
        setConnectedAccount(accounts[0]);
      }
    } catch (err) {
      toast.error("Failed to check wallet connection");
      console.error(err);
    }
  };

  const connectWallet = async () => {
    if (!ethereum) {
      toast.error("Please install MetaMask");
      return;
    }
    try {
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
      if (accounts.length > 0) {
        setConnectedAccount(accounts[0]);
        toast.success("Wallet connected!");
      }
    } catch (err) {
      toast.error("Connection failed");
      console.error(err);
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  return (
    <NFTContext.Provider value={{ connectWallet, connectedAccount }}>
      {children}
    </NFTContext.Provider>
  );
};
