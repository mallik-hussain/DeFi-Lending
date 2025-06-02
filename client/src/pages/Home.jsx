import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/home.css';

const cardData = [
  { title: 'Deposit', color: '#F472B6', route: '/deposit' },       // Pink
  { title: 'Borrow', color: '#F472B6', route: '/borrow' },         // Light Purple          // Soft Purple
  { title: 'Pay Loan', color: '#F472B6', route: '/payloan' },     // Pink
  { title: 'Invest Now', color: '#F472B6', route: '/invest' },     // Orchid Pink
  { title: 'My Investment', color: '#F472B6', route: '/my-investments' }, // Light Grey
  { title: 'BUY NFTs', color: '#F472B6', route: '/buy-nft' },     // Light Lavender
  { title: 'MINT NFTs', color: '#F472B6', route: '/mint-nft' },       // Pinkish Grey
  { title: 'MY NFTs', color: '#F472B6', route: '/my-nft' },   // Muted Grey
  { title: 'Dashboard', color: '#F472B6', route: '/dashboard' },  
  { title: 'Connect Wallet', color: '#F472B6', route: '/walletconnect' } // Purple
];

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div className="card-grid">
        {cardData.map((card, index) => (
          <div
            key={index}
            className="card"
            style={{ borderColor: card.color }}
            onClick={() => navigate(card.route)}
          >
            <span className="card-title" style={{ color: card.color }}>{card.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
