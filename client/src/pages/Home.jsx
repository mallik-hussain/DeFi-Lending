import React from 'react';
import '../styles/home.css';

const Home = () => {
  return (
    <div className="home-container">
      {/* Main Heading */}
      <h1 className="home-title">
        Welcome to Decentralized Finance Lending Platform
      </h1>
      <div className="feature-card">
        <h2 className="text-2xl font-bold text-pink-400 mb-4">Platform Features</h2>
        <ul className="feature-list">
          <li>
            <span className="feature-icon">🔒</span>
            <span className="font-bold text-pink-400">Secure & Trustless:</span> Blockchain-based transactions ensure transparency and security.
          </li>
          <li>
            <span className="feature-icon">🏦</span>
            <span className="font-bold text-pink-400">Decentralized & Permissionless:</span> No banks, no intermediaries—only decentralized finance.
          </li>
          <li>
            <span className="feature-icon">💰</span>
            <span className="font-bold text-pink-400">Earn by Lending:</span> Provide liquidity and earn passive income.
          </li>
          <li>
            <span className="feature-icon">⚡</span>
            <span className="font-bold text-pink-400">Instant Borrowing:</span> Borrow assets instantly with collateral.
          </li>
          <li>
            <span className="feature-icon">📊</span>
            <span className="font-bold text-pink-400">Dynamic Interest Rates:</span> Rates adjust based on market demand and supply.
          </li>
          <li>
            <span className="feature-icon">⚙️</span>
            <span className="font-bold text-pink-400">Low Transaction Fees:</span> Optimized gas fees for cost-effective transactions.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Home;
