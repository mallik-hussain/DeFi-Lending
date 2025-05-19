import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/myInvestment.css'; // Make sure the file name is correct

const URL = 'http://localhost:5000'; // Update if your backend URL differs

const Investments = () => {
    const [investments, setInvestments] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${URL}/user/invest`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                setInvestments(response.data.investments);
            } catch (error) {
                console.error('Error fetching investments:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="invest-container">
            <h1 className="invest-title">My Investments</h1>
            {investments.length === 0 ? (
                <p className="invest-empty">No investments available</p>
            ) : (
                <div className="invest-table-container">
                    <table className="invest-table">
                        <thead>
                            <tr>
                                <th>Investment</th>
                                <th>Amount</th>
                                <th>Duration</th>
                            </tr>
                        </thead>
                        <tbody>
                            {investments.map((investment, index) => (
                                <tr key={index}>
                                    <td>{investment.coinName}</td>
                                    <td>{investment.amount}</td>
                                    <td>{investment.duration}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default Investments;
