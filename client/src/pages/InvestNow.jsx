import React, { useState } from 'react';
import '../styles/investnow.css';

const Invest = () => {
    const [invest, setInvest] = useState({
        coinName: 'Bitcoin',
        amount: '',
        duration: ''
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setInvest({ ...invest, [id]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert(`You selected ${invest.coinName} with amount $${invest.amount} for ${invest.duration} year(s).`);
    };

    const coinOptions = [
        'Bitcoin', 'Ethereum', 'Litecoin', 'Dogecoin', 'Ripple', 'Cardano',
        'Polkadot', 'Uniswap', 'Chainlink', 'Stellar', 'Bitcoin Cash', 'Binance Coin'
    ];

    return (
        <div className="invest-container">
            <div className="invest-card">
                <div className="invest-header">
                    <h1>Invest</h1>
                </div>
                <div className="invest-body">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="coinName">Coin Name</label>
                            <select
                                id="coinName"
                                value={invest.coinName}
                                onChange={handleChange}
                            >
                                {coinOptions.map((option, index) => (
                                    <option key={index} value={option}>{option}</option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="amount">Amount</label>
                            <input
                                type="number"
                                id="amount"
                                placeholder="Amount in dollars"
                                value={invest.amount}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="duration">Duration</label>
                            <input
                                type="number"
                                id="duration"
                                placeholder="Enter Duration in years"
                                value={invest.duration}
                                onChange={handleChange}
                            />
                        </div>
                        <button type="submit" className="invest-button">Invest</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Invest;
