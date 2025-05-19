import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { NFTContext } from '../contexts/NFTcontext';
import "../styles/navbar.css";

const Navbar = () => {
  const { connectWallet, connectedAccount } = React.useContext(NFTContext);
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showInvestDropdown, setShowInvestDropdown] = useState(false);
  const [showNFTDropdown, setShowNFTDropdown] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/signin");
  };

  const hideNavbarRoutes = ["/signup", "/signin"];
  if (hideNavbarRoutes.includes(location.pathname)) return null;

  return (
    <nav className="navbar-container">
      <div className="navbar-content">
        <Link to="/home" className="navbar-brand">DeFi Lending</Link>

        <button
          className="navbar-mobile-button"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <XMarkIcon className="navbar-icon" /> : <Bars3Icon className="navbar-icon" />}
        </button>

        <div className={`navbar-links ${isOpen ? "navbar-links-mobile" : ""}`}>
          {isAuthenticated && (
            <>
              <Link to="/home" className="navbar-link">Home</Link>
              <Link to="/deposit" className="navbar-link">Deposit</Link>
              <Link to="/loan" className="navbar-link">Loan</Link>

              <div
                className="navbar-link dropdown"
                onClick={() => setShowInvestDropdown(!showInvestDropdown)}
              >
                <span>Invest ▾</span>
                {showInvestDropdown && (
                  <div className="dropdown-menu">
                    <Link to="/invest" className="dropdown-item">Invest Now</Link>
                    <Link to="/my-investments" className="dropdown-item">My Investments</Link>
                  </div>
                )}
              </div>

              <div
                className="navbar-link dropdown"
                onClick={() => setShowNFTDropdown(!showNFTDropdown)}
              >
                <span>NFT's ▾</span>
                {showNFTDropdown && (
                  <div className="dropdown-menu">
                    <Link to="/my-nft" className="dropdown-item">My NFTs</Link>
                    <Link to="/buy-nft" className="dropdown-item">Buy NFT</Link>
                    <Link to="/mint-nft" className="dropdown-item">Mint NFT</Link>
                  </div>
                )}
              </div>

              <Link to="/dashboard" className="navbar-link">Dashboard</Link>

              {!connectedAccount ? (
                <button onClick={connectWallet} className="navbar-link">
                  Connect Wallet
                </button>
              ) : (
                <p className="navbar-link">
                  {connectedAccount.substring(0, 6)}...{connectedAccount.slice(-4)}
                </p>
              )}

              <button onClick={handleLogout} className="navbar-link">Logout</button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
