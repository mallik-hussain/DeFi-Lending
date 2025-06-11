import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { ethers } from 'ethers';

export const NFTContext = React.createContext();

export const NFTProvider = ({ children }) => {
  const [connectedAccount, setConnectedAccount] = useState(null);
  const [signer, setSigner] = useState(null);
  const [provider, setProvider] = useState(null);
  const [userBalance, setUserBalance] = useState(null); // optional

  // Setup provider and signer
  const setupProviderAndSigner = async (account) => {
    try {
      const ethProvider = new ethers.providers.Web3Provider(window.ethereum);
      const ethSigner = ethProvider.getSigner();

      setProvider(ethProvider);
      setSigner(ethSigner);

      const balance = await ethProvider.getBalance(account);
      setUserBalance(ethers.utils.formatEther(balance)); // optional

      console.log("Provider & signer set. Balance:", ethers.utils.formatEther(balance));
    } catch (err) {
      console.error("Failed to set up provider and signer:", err);
    }
  };

  const checkIfWalletIsConnected = async () => {
    if (!window.ethereum) {
      toast.error("Please install MetaMask");
      return;
    }
    try {
      const accounts = await window.ethereum.request({ method: 'eth_accounts' });
      if (accounts.length > 0) {
        console.log("Wallet already connected:", accounts[0]);
        setConnectedAccount(accounts[0]);
        await setupProviderAndSigner(accounts[0]);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to check wallet connection");
    }
  };

  const connectWallet = async () => {
    if (!window.ethereum) {
      toast.error("Please install MetaMask");
      return;
    }
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      if (accounts.length > 0) {
        console.log("Wallet connected:", accounts[0]);
        setConnectedAccount(accounts[0]);
        toast.success("Wallet connected!");
        await setupProviderAndSigner(accounts[0]);
      }
    } catch (err) {
      console.error(err);
      toast.error("Connection failed or denied");
    }
  };

  const disconnectWallet = () => {
    setConnectedAccount(null);
    setSigner(null);
    setProvider(null);
    setUserBalance(null);
  };

  useEffect(() => {
    console.log("NFTProvider mounted, checking wallet connection...");
    checkIfWalletIsConnected();

    const handleAccountsChanged = (accounts) => {
      if (accounts.length > 0) {
        setConnectedAccount(accounts[0]);
        setupProviderAndSigner(accounts[0]);
      } else {
        disconnectWallet();
      }
    };

    if (window.ethereum) {
      window.ethereum.on("accountsChanged", handleAccountsChanged);
    }

    return () => {
      if (window.ethereum?.removeListener) {
        window.ethereum.removeListener("accountsChanged", handleAccountsChanged);
      }
    };
  }, []);

  return (
    <NFTContext.Provider
      value={{
        connectWallet,
        disconnectWallet,
        connectedAccount,
        signer,
        provider,
        user: {
          address: connectedAccount,
          wallet: userBalance, // Optional: `wallet` here means ETH balance
        }
      }}
    >
      {children}
    </NFTContext.Provider>
  );
};
