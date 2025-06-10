import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { URL } from '../utils/url';
import axios from 'axios';
import { toast } from 'react-toastify';
import '../styles/signup.css';

const Signup = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.body.classList.add('no-navbar-footer');
    return () => {
      document.body.classList.remove('no-navbar-footer');
    };
  }, []);

  const [user, setUser] = useState({
    username: '',
    fullname: '',
    email: '',
    password: '',
  });

  const { username, fullname, email, password } = user;

  const slideSpacing = 200; // pixels

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${URL}/user/signup`, user);
      if (response.status === 201) {
        toast.success('User registered successfully');
        setUser({ username: '', fullname: '', email: '', password: '' });
        navigate('/signin');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Signup failed');
      console.error(error);
    }
  };

  return (
    <>
      {/* Fixed Header */}
      <div className="fincrypt-header">FINCRYPT</div>

      {/* Scrollable Slides */}
      <div className="scroll-slides-container">
        
        {/* Slide 1 - Intro */}
        <section className="slide slide-1">
          <h1>UNMASK THE FUTURE OF <br />DECENTRALIZED FINANCE</h1>
          <p>
            Experience decentralized finance with seamless functions such as Deposit, Loan, Invest, and NFT features—empowering users to control assets, earn yield, and explore Web3 opportunities in a secure, transparent, and borderless ecosystem.
          </p>
        </section>

        {/* Slide 2 - Signup Form */}
        <section className="slide slide-2">
          <h2>Sign Up to Explore All</h2>
          <form className="signup-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                value={username}
                placeholder="Enter your username"
                onChange={handleChange}
                required
                autoComplete="username"
              />
            </div>
            <div className="form-group">
              <label htmlFor="fullname">Full Name</label>
              <input
                type="text"
                id="fullname"
                name="fullname"
                value={fullname}
                placeholder="Enter your full name"
                onChange={handleChange}
                required
                autoComplete="name"
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                placeholder="Enter your email"
                onChange={handleChange}
                required
                autoComplete="email"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                placeholder="Enter your password"
                onChange={handleChange}
                required
                autoComplete="new-password"
              />
            </div>
            <button type="submit">Sign Up</button>
            <p>
              Already have an account? <Link to="/signin">Sign In</Link>
            </p>
          </form>
        </section>

        {/* Slide Spacing */}
        <div style={{ height: `${slideSpacing}px` }}></div>

        {/* Slide 3 - About Fincrypt */}
        <section className="slide slide-3">
          <h2>About Fincrypt</h2>
          <p>
            Fincrypt is a next-generation decentralized finance (DeFi) platform built to redefine how users interact with financial services. By combining smart contract automation, NFT-based rewards, and transparent lending protocols, Fincrypt empowers users to lend, borrow, and earn in a trustless, permissionless environment. Our mission is to unmask the future of finance by putting control back into the hands of the community—secure, transparent, and borderless.
          </p>
        </section>

        {/* Slide Spacing */}
        <div style={{ height: `${slideSpacing}px` }}></div>

        {/* Slide 4 - Features & NFTs */}
        <section className="slide slide-4">
  <h2>Features & Perks</h2>
  <div className="feature-cards">

    {/* Deposit Feature */}
    <div className="feature-card">
      <h3>💰 Deposit</h3>
      <p>Effortlessly deposit your crypto assets into a secure virtual wallet to earn passive income.</p>
      <ul>
        <li>High-yield staking opportunities for deposited funds</li>
        <li>Auto-compounding interest for maximized returns</li>
        <li>Fully audited smart contract infrastructure</li>
        <li>Instant wallet balance updates and transaction tracking</li>
      </ul>
    </div>

    {/* Loan Feature */}
    <div className="feature-card">
      <h3>🏦 Loan</h3>
      <p>Unlock instant liquidity through our decentralized lending system. Borrow and repay seamlessly.</p>
      <ul>
        <li>Borrow loans by pledging crypto as collateral</li>
        <li>Flexible repayment options and real-time loan tracking</li>
        <li>Pay off your loan anytime to retrieve your assets</li>
        <li>Competitive and transparent interest rates</li>
      </ul>
    </div>

    {/* Investment Feature */}
    <div className="feature-card">
      <h3>📈 Investment</h3>
      <p>Grow your digital wealth through our DeFi investment module backed by smart contracts.</p>
      <ul>
        <li>Diversified crypto asset pools with yield optimization</li>
        <li>Low-risk staking strategies with real-time ROI metrics</li>
        <li>Decentralized governance over investment mechanisms</li>
        <li>Secure and permissionless participation</li>
      </ul>
    </div>

    {/* NFT Feature */}
    <div className="feature-card">
      <h3>🎴 NFT Utilities</h3>
      <p>Each Ninja NFT unlocks exclusive perks in the ecosystem and carries unique digital attributes.</p>
      <ul>
        <li>On-chain rarity with a score of 8.7/10</li>
        <li>Boosts staking rewards and reduces loan interest rates</li>
        <li>Tradable on secondary marketplaces</li>
        <li>Holders gain voting rights in protocol governance</li>
      </ul>
    </div>

  </div>
</section>


        {/* Slide 5 - Shadow Economy */}
        <section className="slide slide-5">
          <h2>The Shadow Economy</h2>
          <div className="shadow-economy-grid">
            <div>
              <h3>• Marketplace</h3>
              <p>Trade rare ninjas on a decentralized, trustless marketplace.</p>
            </div>
            <div>
              <h3>• Battle Arenas</h3>
              <p>Use your ninja in strategic battles to win $SHADOW and prizes.</p>
            </div>
            <div>
              <h3>• Governance</h3>
              <p>Vote on project direction, rewards, and ecosystem expansions.</p>
            </div>
            <div>
              <h3>• Staking Vault</h3>
              <p>Stake your NFTs and $SHADOW tokens for compounded rewards.</p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Signup;
