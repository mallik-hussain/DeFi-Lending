import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import "../styles/navbar.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
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
              <Link to="/invest" className="navbar-link">Invest</Link>
              <Link to="/nft" className="navbar-link">NFT's</Link>
              <Link to="/dashboard" className="navbar-link">Dashboard</Link>
              <Link to="/wallet" className="navbar-link">Wallet Connect</Link>
              <button onClick={handleLogout} className="navbar-link">Logout</button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
