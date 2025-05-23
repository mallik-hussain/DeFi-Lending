import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { NFTContext } from '../contexts/NFTcontext';
import "../styles/navbar.css";

const Navbar = () => {
  const { connectWallet, connectedAccount, disconnectWallet } = React.useContext(NFTContext);
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    disconnectWallet();       // Clear connected wallet info on logout
    setIsAuthenticated(false);
    navigate("/signin");
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = (name) => {
    setActiveDropdown(activeDropdown === name ? null : name);
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
          aria-label="Toggle menu"
        >
          {isOpen ? <XMarkIcon className="navbar-icon" /> : <Bars3Icon className="navbar-icon" />}
        </button>

        <div
          className={`navbar-links ${isOpen ? "navbar-links-mobile" : ""}`}
          ref={dropdownRef}
        >
          {isAuthenticated && (
            <>
              <Link to="/home" className="navbar-link">Home</Link>
              <Link to="/deposit" className="navbar-link">Deposit</Link>

              <div
                className="navbar-link dropdown"
                onClick={() => toggleDropdown("loan")}
                style={{ position: 'relative', cursor: 'pointer' }}
              >
                <span>Loan ▾</span>
                {activeDropdown === "loan" && (
                  <div className="dropdown-menu">
                    <Link to="/borrow" className="dropdown-item">Borrow Loan</Link>
                    <Link to="/payloan" className="dropdown-item">Pay Loan</Link>
                  </div>
                )}
              </div>

              <div
                className="navbar-link dropdown"
                onClick={() => toggleDropdown("invest")}
                style={{ position: 'relative', cursor: 'pointer' }}
              >
                <span>Invest ▾</span>
                {activeDropdown === "invest" && (
                  <div className="dropdown-menu">
                    <Link to="/invest" className="dropdown-item">Invest Now</Link>
                    <Link to="/my-investments" className="dropdown-item">My Investments</Link>
                  </div>
                )}
              </div>

              <div
                className="navbar-link dropdown"
                onClick={() => toggleDropdown("nft")}
                style={{ position: 'relative', cursor: 'pointer' }}
              >
                <span>NFT's ▾</span>
                {activeDropdown === "nft" && (
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
