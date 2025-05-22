import React, { useState } from "react";

const initialMessages = [
  { from: "bot", text: "Welcome to DeFi-Lending! I’m your DeFi lending assistant. How can I help you today?" }
];

function Chatbot() {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");

  const faq = [
    {
      q: /lend.*crypto/i,
      a: "To lend your crypto, connect your wallet, select the asset, enter the amount, and confirm. Need detailed steps?"
    },
    {
      q: /interest.*USDC/i,
      a: "Our USDC lending interest rates are variable. You can view current rates in the Lending Pools section."
    },
    {
      q: /connect.*wallet/i,
      a: "Click 'Connect Wallet' at the top right and follow the prompts to link your crypto wallet."
    },
    {
      q: /collateral.*safe/i,
      a: "Your collateral is secured in smart contracts. However, DeFi has risks like liquidation and smart contract bugs."
    },
    {
      q: /loan.*status/i,
      a: "Go to 'My Loans' to view your loan status, repayments, and details."
    },
    {
      q: /supported.*(crypto|currenc|token)/i,
      a: "We support major tokens like ETH, USDC, DAI, and more. Check our Supported Assets list."
    },
    {
      q: /security|phishing|scam/i,
      a: "Never share your seed phrase. Only use official links. Watch out for phishing and scams!"
    }
  ];

  function getBotReply(userInput) {
    for (const f of faq) {
      if (f.q.test(userInput)) return f.a;
    }
    if (/borrow/i.test(userInput)) {
      return "To borrow, connect your wallet, select an asset to borrow, provide sufficient collateral, and confirm.";
    }
    if (/help|support|problem|issue/i.test(userInput)) {
      return "For account-specific issues, I’ll connect you to our support team.";
    }
    return "I’m not sure I understood that. Could you please rephrase or ask a different question?";
  }

  function handleSend(e) {
    e.preventDefault();
    if (!input.trim()) return;
    const userMsg = { from: "user", text: input };
    const botMsg = { from: "bot", text: getBotReply(input) };
    setMessages([...messages, userMsg, botMsg]);
    setInput("");
  }

  return (
    <div className="chatbot-container">
      <div className="chatbot-messages">
        {messages.map((msg, idx) => (
          <div key={idx} className={`chatbot-msg chatbot-msg-${msg.from}`}>
            <span>{msg.text}</span>
          </div>
        ))}
      </div>
      <form className="chatbot-input-row" onSubmit={handleSend}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="

