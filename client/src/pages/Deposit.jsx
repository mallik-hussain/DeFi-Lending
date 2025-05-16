import React, { useState } from 'react';
import '../styles/deposit.css'; // Importing the new CSS file

const Lend = () => {
  const [amount, setAmount] = useState('');

  const handleLend = () => {
    console.log(`Lending ${amount} ETH`);
    // Integrate your lending logic here
  };

  return (
    <div className="lend-container">
      <div className="lend-box">
        <h1 className="lend-title">Deposit Amount</h1>

        <input
          type="number"
          placeholder="Amount to Deposit (ETH)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="lend-input"
        />

        {/* Buttons Container */}
        <div className="lend-buttons">
          <button onClick={handleLend} className="lend-button lend-button-lend">
            Deposit
          </button>
          <button className="lend-button lend-button-cancel">
            Cancel
          </button>
          <button className="lend-button lend-button-transactions">
            View Transactions
          </button>
        </div>
      </div>
    </div>
  );
};

export default Lend;
