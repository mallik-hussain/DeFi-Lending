import React, { useState, useContext } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { URL } from '../utils/url';
import { contractABI, contractAddress } from '../utils/contract';
import { NFTContext } from '../contexts/NFTcontext';
import { ethers } from 'ethers';

const Invest = () => {
    const history = useNavigate();
    const { connectedAccount, user, signer } = useContext(NFTContext); // Get signer from context

    const [invest, setInvest] = useState({
        coinName: 'Bitcoin',
        amount: '',
        duration: ''
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setInvest({ ...invest, [id]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (Number(invest.amount) <= 0 || Number(invest.duration) <= 0) {
                toast.error('Please enter a valid amount and duration');
                return;
            }

            if (!connectedAccount) {
                toast.error('Please connect your wallet');
                return;
            }

            if (!user || typeof user.wallet === 'undefined') {
                toast.error('User wallet not loaded. Please wait and try again.');
                return;
            }

            if (Number(user.wallet) < Number(invest.amount)) {
                toast.error('Insufficient funds');
                return;
            }

            if (!signer) {
                toast.error('Wallet signer not available');
                return;
            }

            // Initialize contract instance with signer
            const contract = new ethers.Contract(contractAddress, contractABI, signer);

            // Convert amount to wei
            const amountInWei = ethers.utils.parseEther(invest.amount.toString());

            // Call smart contract's invest function
            const tx = await contract.invest(invest.coinName, amountInWei, invest.duration);

            toast.info('Transaction sent. Waiting for confirmation...');
            await tx.wait();

            // Send investment info to backend
            const response = await axios.post(
                `${URL}/user/invest`,
                invest,
                {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                }
            );

            if (response.status === 200) {
                toast.success('Investment successful');
                history('/invested');
            }
        } catch (error) {
            toast.error('Error investing. See console for details.');
            console.error('Error investing:', error);
        }
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
