import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Deposit({ location }) {
  const [amount, setAmount] = useState('');
  const [transactionHistory, setTransactionHistory] = useState([]);

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const handleDepositSubmit = (event) => {
    event.preventDefault();
    console.log(`Depositing ${amount}`);

    axios.post('/deposit', {
      userID: location.state.userID,
      amount: amount
    }).then(response => {
      console.log(response.data);
      // TODO: handle success response
      const newTransaction = {
        type: 'deposit',
        amount: response.data.amount,
        date: new Date().toLocaleString(),
      };
      setTransactionHistory(prevState => [...prevState, newTransaction]);
      setAmount('');
    }).catch(error => {
      console.log(error);
      // TODO: handle error response
    });
  };

  return (
    <div>
      <h1>Deposit</h1>
      <form onSubmit={handleDepositSubmit}>
        <label>Amount:</label>
        <input
          type="text"
          name="amount"
          value={amount}
          onChange={handleAmountChange}
        />
        <button type="submit">Deposit</button>
      </form>
      <div>
        <h2>Transaction History</h2>
        {transactionHistory.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Type</th>
                <th>Amount</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {transactionHistory.map((transaction, index) => (
                <tr key={index}>
                  <td>{transaction.type}</td>
                  <td>{transaction.amount}</td>
                  <td>{transaction.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No transactions yet.</p>
        )}
      </div>
      <div>
        <Link to="/dashboard">Back to Dashboard</Link>
      </div>
    </div>
  );
}

export default Deposit;
