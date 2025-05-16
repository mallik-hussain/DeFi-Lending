// src/pages/Borrow.jsx
import React, { useState } from "react";
import "../styles/loan.css"; // Import Borrow CSS

const Borrow = () => {
  const [amount, setAmount] = useState("");

  const handleBorrow = () => {
    console.log(`Borrowing or Paying ${amount} ETH`);
    // Integrate your borrowing or payment logic here
  };

  return (
    <>
      <div className="loan-sections">
  <div className="borrow-container">
    <div className="borrow-box">
      <h1 className="borrow-title">Take Loan</h1>
      <input
        type="number"
        placeholder="Amount to Borrow"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="borrow-input"
      />
      <div className="borrow-buttons">
        <button onClick={handleBorrow} className="borrow-button borrow-button-borrow">
          Submit
        </button>
        <button className="borrow-button borrow-button-cancel">Cancel</button>
        <button className="borrow-button borrow-button-transactions">View Transactions</button>
      </div>
    </div>
  </div>

  <div className="payloan-container">
    <div className="pay-box">
      <h1 className="borrow-title">Pay Loan</h1>
      <input
        type="number"
        placeholder="Amount to Pay"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="borrow-input"
      />
      <div className="borrow-buttons">
        <button onClick={handleBorrow} className="borrow-button borrow-button-borrow">
          Submit
        </button>
        <button className="borrow-button borrow-button-cancel">Cancel</button>
        <button className="borrow-button borrow-button-transactions">View Transactions</button>
      </div>
    </div>
  </div>
</div>

    </>
  );
};

export default Borrow;
