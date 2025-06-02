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

      {/* Scrollable Slides Container */}
      <div className="scroll-slides-container">
        {/* Slide 1 */}
        <section className="slide slide-1">
          <h1>UNMASK THE FUTURE OF <br />
           DECENTRALIZED FINANCE</h1>
          <p>
            Experience decentralized finance with seamless functions such as Deposit,Loan,Invest and  NFT features—empowering users to 
            control assets, earn yield, and explore Web3 opportunities in a secure, transparent, and borderless ecosystem.
          </p>
        </section>

        {/* Slide 2 - Signup Form (moved here) */}
        <section className="slide slide-2">
          <h2>Sign Up to Explore All</h2>
          <form className="signup-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                name="username"
                value={user.username}
                placeholder="Enter your username"
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="fullname">Full Name</label>
              <input
                type="text"
                name="fullname"
                value={user.fullname}
                placeholder="Enter your full name"
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                value={user.email}
                placeholder="Enter your email"
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                value={user.password}
                placeholder="Enter your password"
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit">Sign Up</button>
            <p>
            Already have an account? <Link to="/signin">Sign In</Link>
          </p>
          </form>
          
        </section>

        {/* Slide 3 */}
        <section className="slide slide-3">
          <h2>About NFTNinja</h2>
          <p>nftninja is a limited collection of 5,000 warriors.</p>
          <div className="ninja-cards">
            <div className="ninja-card">
              <h3>🧩 Shadowfang #1729</h3>
              <p>Never reflects light—and his presence is felt only after it’s too late.</p>
              <p>Rarity Score: 8.7/10</p>
            </div>
            <div className="ninja-card">
              <h3>🧩 Duskshard #0666</h3>
              <p>Each ninja is uniquely crafted with rare traits and hidden power.</p>
              <p>Rarity Score: 8.7/10</p>
            </div>
          </div>
        </section>

        {/* Slide 4 */}
        <section className="slide slide-4">
          <h2>Unlock The Perks</h2>
          <ul>
            <li>🗡️ <strong>Collectible and Unique Ninjas:</strong> One of a kind — crafted with hundreds of traits.</li>
            <li>🧠 <strong>Community Powered DAO:</strong> The rarer your ninja, the more access and rewards.</li>
            <li>💰 <strong>Staking and $SHADOW Rewards:</strong> Earn as you hold, mint, and battle.</li>
          </ul>
          <button>Mint Your Ninja</button>
        </section>

        {/* Slide 5 */}
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
